import { getModels, type Models } from "./models.js";
import { PipelineStage } from 'mongoose';

export interface AggregateCountObj {
    fieldName: string;
    match: object;
    sumField?: string;
    sumExpression?: any; // for custom sum like $sum: { $multiply: ["$price", "$quantity"] }
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

export interface Facet {
    [key: string]: PipelineStage.FacetPipelineStage[];
}

export const queryDatabase = async (
    model: Models,
    aggregateCountObjArr?: AggregateCountObj[],
    projectionParameters?: Record<string, ProjectionParameters>
): Promise<{ found: true; [key: string]: any; docCount: Record<string, number> } | { found: false; errorMsg: string }> => {
    try {
        const facet: Facet = {};
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

        // 2. Handle Dynamic Counts/Sums with "COUNT" suffix
        if (aggregateCountObjArr) {
            aggregateCountObjArr.forEach(({ fieldName, match, sumField, sumExpression }) => {
                const countKey = `${fieldName}COUNT`;
                if (sumField || sumExpression) {
                    facet[countKey] = [
                        { $match: match },
                        { $group: {
                            _id: null, 
                            total: { $sum: sumExpression || `$${sumField}` } } }
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
        const rawResult = await Model.aggregate([{ $facet: facet }]);

        const docCount: Record<string, number> = {};
        const docData: Record<string, any> = {};

        if (rawResult[0]) {
            for (const key in rawResult[0]) {
                if (key.endsWith("COUNT")) {
                    // Slice off "COUNT" (5 chars) to get the original fieldName
                    const cleanKey = key.slice(0, -5);
                    const dataArray = rawResult[0][key];
                    const entry = dataArray[0];

                    docCount[cleanKey] = entry ? (entry.count || entry.total || 0) : 0;
                } else {
                    // Standard data results (like your productsByCategory)
                    docData[key] = rawResult[0][key];
                }
            }
        }

        console.log("Aggregation Success:", {
            dataSets: Object.keys(docData),
            counts: docCount
        });

        // Spread docData so named results are top-level properties
        return { ...docData, docCount, found: true };

    } catch (err: any) {
        console.error("Aggregation Error:", err.message);
        console.error("Aggregation Error:", err);
        return { found: false, errorMsg: err.message };
    }
};