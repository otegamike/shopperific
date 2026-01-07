import User from "../models/User.js";
import Product from "../models/Product.js";
import Shop from "../models/Shop.js";


export const saveTo = async (
    model: "user" | "product" | "shop",
    data: any ): Promise< { saved: boolean , save?: any}> => {

        try {
            let newData

            if (model==="user") {
                newData = new User(data);

            } else if (model==="product") {
                newData = new Product(data);

            } else if (model==="shop") {
                newData = new Shop(data);

            } else return { saved: false };

            const save = await newData.save();

            return { saved: true, save }


        } catch (err: any) {
            console.error(err.message, err);
            return { saved: false }
        }
}

export const findAndUpdate = async (
    model: "user" | "product" | "shop",
    findBy: object,
    set: object,
    options: object = { new: true , lean: true} )
    : Promise<
        |{ updated: true, newData?: any}
        |{ updated: false }> => {

            console.log("Updating", model, "with", findBy, set, options);

        try {
            let newData;

            if (model==="user") {
                newData = await User.findOneAndUpdate( findBy, set, options );

            } else if (model==="product") {
                newData = await Product.findOneAndUpdate( findBy, set, options );

            } else if (model==="shop") {
                newData = await Shop.findOneAndUpdate( findBy, set, options );

            } else return { updated: false };

            if (!newData) {
                console.log("Couldn't find or update.", model, findBy, set, options);
                return { updated: false };
            }

            console.log("Updated", newData);


            return { updated: true, newData };


        } catch (err: any) {
            console.error("Couldn't find or save.",err.message, err);
            return { updated: false }
        }
}