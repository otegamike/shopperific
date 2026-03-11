import { getModels, type Models } from "./models.js";
import { PipelineStage } from 'mongoose';

export interface AggregateCountObj {
    fieldName: string;
    match: object;
    sumField?: string;
    sumExpression?: any;
}

export interface CustomPipeline {
    fieldName: string;
    pipeline: PipelineStage.FacetPipelineStage[];
}

export interface ProjectionParameters {
    match?: object;
    group?: { _id: any;[prop: string]: any };
    project?: object;
    addFields?: object;
    sort?: Record<string, 1 | -1>;
    skip?: number;
    limit?: number;
}

export interface ComplexDatabaseQueryParameters {
    model: Models;
    countQuery?: AggregateCountObj[];
    projectionQuery?: ProjectionObject;
    customQuery?: CustomPipeline[];
}

export type ProjectionObject = Record<string, ProjectionParameters>;

export interface Facet {
    [key: string]: PipelineStage.FacetPipelineStage[];
}

// Fixed the return type to be more flexible for the spread docData
export const complexDatabaseQuery = async (
    queries: ComplexDatabaseQueryParameters
): Promise<{ found: true;[key: string]: any; docCount: Record<string, number> } | { found: false; errorMsg: string }> => {

    const { model, countQuery: aggregateCountObjArr, projectionQuery: projectionParameters, customQuery: customPipelines } = queries;
    try {
        const facet: Facet = {};

        // Order matters in MongoDB, but this sequence is standard for most queries
        const pipelineKeys: (keyof ProjectionParameters)[] = [
            "match", "group", "addFields", "project", "sort", "skip", "limit"
        ];

        // 1. Handle Named Data Projections
        if (projectionParameters) {
            Object.entries(projectionParameters).forEach(([name, paramObj]) => {
                const pipeline: PipelineStage.FacetPipelineStage[] = [];
                pipelineKeys.forEach((key) => {
                    const value = paramObj[key];
                    if (value !== undefined && value !== null) {
                        pipeline.push({ [`$${key}`]: value } as any);
                    }
                });
                facet[name] = pipeline;
            });
        }

        // 2. Handle Custom Pipelines (now supports multiple)
        if (customPipelines) {
            customPipelines.forEach(({ fieldName, pipeline }) => {
                facet[fieldName] = pipeline;
            });
        }

        // 3. Handle Dynamic Counts/Sums
        if (aggregateCountObjArr) {
            aggregateCountObjArr.forEach(({ fieldName, match, sumField, sumExpression }) => {
                const countKey = `${fieldName}COUNT`;
                if (sumField || sumExpression) {
                    facet[countKey] = [
                        { $match: match },
                        {
                            $group: {
                                _id: null,
                                total: { $sum: sumExpression || `$${sumField}` }
                            }
                        }
                    ];
                } else {
                    facet[countKey] = [
                        { $match: match },
                        { $count: "count" }
                    ];
                }
            });
        }

        const Model = getModels(model);
        const [rawResult] = await Model.aggregate([{ $facet: facet }]);
        console.log(rawResult);


        const docCount: Record<string, number> = {};
        const docData: Record<string, any> = {};

        if (rawResult) {
            for (const key in rawResult) {
                if (key.endsWith("COUNT")) {
                    const cleanKey = key.slice(0, -5);
                    const dataArray = rawResult[key];
                    const entry = dataArray[0];
                    // Handles the result from both $count (entry.count) and $group (entry.total)
                    docCount[cleanKey] = entry ? (entry.count ?? entry.total ?? 0) : 0;
                } else {
                    docData[key] = rawResult[key];
                }
            }
        }

        return { ...docData, docCount, found: true };

    } catch (err: any) {
        console.error("Aggregation Error:", err.message);
        return { found: false, errorMsg: err.message };
    }
};