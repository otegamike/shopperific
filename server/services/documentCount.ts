import { getModels, type Models } from "./models.js"
import { PipelineStage } from 'mongoose';

export interface AggregateCountObj {
    fieldName: string;
    filter: object;
    sumField?: string;
}

export interface ProjectionParameters {
    match: object;
    project: object;
    addFields?: object;
    sort?: Record<string, 1 | -1>;
    skip?: number;
    limit?: number;
}

export interface Facet {
    [key: string]: PipelineStage.FacetPipelineStage[];
}

export const aggregateCount = async(
    model: Models,
    aggregateCountObjArr: AggregateCountObj[],
    projectionParameters?: ProjectionParameters
) => {
    console.log("getting count of : ", aggregateCountObjArr)
    try {
        const facet: Facet = {};
        if (projectionParameters) {
            const { match, project, sort, skip, limit } = projectionParameters;
            facet.data = [
                { $match: match },
                { $project: project },
                { $sort: sort? sort: { createdAt: -1} },
                { $skip: skip? skip: 0 },
                { $limit: limit? limit: 12 }
            ];
        }
        aggregateCountObjArr.forEach(({ fieldName, filter, sumField }) => {
            if (sumField) {
                // If sumField is provided, we sum that field
                facet[fieldName] = [
                    { $match: filter },
                    { $group: { _id: null, total: { $sum: `$${sumField}` } } }
                ];
            } else {
                // Default to counting documents
                facet[fieldName] = [
                    { $match: filter },
                    { $count: "count" }
                ];
            }
        });

        const Model = getModels(model);

        const rawResult = await Model.aggregate([{ $facet: facet }]);

        const docCount: Record<string, number> = {};
        let docData: object[] = [];

        if (rawResult[0]) {
            for (const key in rawResult[0]) {
                if (key==="data") {
                    docData = rawResult[0][key];
                } else {
                    // Extract the number from the first element of the array, or default to 0
                    const data = rawResult[0][key][0];
                    docCount[key] = data ? (data.count || data.total || 0) : 0;
                }
                
            }
        }

        return { docData, docCount};

    } catch (err: any) {
        console.log(err.message);
    }  

}