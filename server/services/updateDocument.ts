import User from "../models/User.js";
import Product from "../models/Product.js";
import Shop from "../models/Shop.js";
import { getModels, type Models } from "./models.js";


export const saveTo = async (
    model: "user" | "product" | "shop",
    data: any ): Promise< { saved: true, save: any} | { saved: false, errorMsg: string}> => {

        try {
            const Model = getModels(model);
            const newData = new Model(data);

            const save = await newData.save();

            return { saved: true, save }


        } catch (err: any) {
            console.error(err.message, err);
            return { saved: false, errorMsg: "Couldn't save." }
        }
}


export const findAndUpdate = async (
    model: Models,
    findBy: object,
    set: object,
    options: object = { new: true , lean: true} )
    : Promise<
        |{ updated: true, found: true ;  newData?: any}
        |{ updated: false, found: false, errorMsg: string }> => {

            console.log("Updating", model, "with", findBy, set, options);

        try {
            const Model = getModels(model);
            const newData = await Model.findOneAndUpdate( findBy, set, options );

            if (!newData) {
                console.log("Couldn't find or update.", model, findBy, set, options);
                throw new Error("Couldn't find or update.");
            }

            console.log("Updated");
            return { updated: true, found: true, newData };

        } catch (err: any) {
            console.error("Couldn't find or update.",err.message, err);
            return { updated: false, found: false, errorMsg: "Couldn't find or update." }
        }
}


export const deleteOne = async (model: Models, findBy: object): 
    Promise<
        { deleted: true, deletedData: any } | 
        { deleted: false, errorMsg: string }
    > => {
    try {
        const Model = getModels(model);
        const deletedData = await Model.findOneAndDelete( findBy );

        if (!deletedData.acknowledged) {
            console.log("Couldn't find or delete.", model, findBy);
            throw new Error("Couldn't find or delete.");
        }

        console.log("Deleted", deletedData);
        return { deleted: true, deletedData };

    } catch (err: any) {
        console.error("Couldn't find or delete.",err.message, err);
        return { deleted: false, errorMsg: "Couldn't find or delete." }
    }
}

export const deleteByIds = async (model: Models, ids: string[], findBy: Record<string, any> = {}): 
    Promise<
        { deleted: true, deletedData: any, deletedCount: number } | 
        { deleted: false, errorMsg: string }
    > => {
    try {
        const Model = getModels(model);
        const deletedData = await Model.deleteMany( { _id: { $in: ids }, ...findBy } );

        if (!deletedData.acknowledged) {
            console.log("Couldn't find or delete.", model, ids, findBy);
            throw new Error("Couldn't find or delete.");
        }

        console.log("Deleted", deletedData);
        return { deleted: true, deletedData, deletedCount: deletedData.deletedCount };

    } catch (err: any) {
        console.error("Couldn't find or delete.",err.message, err);
        return { deleted: false, errorMsg: "Couldn't find or delete." }
    }
}