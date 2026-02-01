import { getModels, type Models } from "./models.js"
import { PipelineStage } from 'mongoose';

export interface aggregateCountObj {
    fieldName: string;
    filter: object;
}

export interface Facet {
    [key: string]: PipelineStage.FacetPipelineStage[];
}

export const aggregateCount = async(
    model: Models,
    aggregateCountObjArr: aggregateCountObj[]
) => {
    console.log("getting count of : ", aggregateCountObjArr)

    const facet: Facet = {};
    aggregateCountObjArr.forEach(({ fieldName, filter }) => {
        facet[fieldName] = [
                { $match: filter },
                { $count: "count" }
            ]
    });

    const Model = getModels(model);

    const count = await Model.aggregate([{ $facet: facet }]);

    return count;
    

}