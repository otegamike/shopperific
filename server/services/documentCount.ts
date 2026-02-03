import { getModels, type Models } from "./models.js"
import { PipelineStage } from 'mongoose';

export interface aggregateCountObj {
    fieldName: string;
    filter: object;
    sumField?: string;
}

export interface Facet {
    [key: string]: PipelineStage.FacetPipelineStage[];
}

export const aggregateCount = async(
    model: Models,
    aggregateCountObjArr: aggregateCountObj[]
) => {
    console.log("getting count of : ", aggregateCountObjArr)
    try {
        const facet: Facet = {};
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

        const cleanResult: Record<string, number> = {};

        if (rawResult[0]) {
            for (const key in rawResult[0]) {
                // Extract the number from the first element of the array, or default to 0
                const data = rawResult[0][key][0];
                cleanResult[key] = data ? (data.count || data.total || 0) : 0;
            }
        }

        return cleanResult;

    } catch (err: any) {
        console.log(err.message);
    }  

}