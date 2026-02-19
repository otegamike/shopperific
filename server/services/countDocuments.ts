import { getModels, type Models } from "./models.js";

export const countDocuments = async (
    model: Models,
    findBy: object = {}
): Promise<number> => {
    const Model = getModels(model);
    return await Model.countDocuments(findBy);
}