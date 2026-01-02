import Product from "../models/Product"
import Shop from "../models/Shop";
import User from "../models/User";

export type models  = "user" | "product" | "shop";

const queryLog = (findBy: any, model: string ) => {
   return `fetching ${findBy==="all"?findBy:''}${model}${findBy!=="all"?' by ':''} `
}

export const getProduct = async (
    findBy : any,
    reqLimit: number = 12, reqPage: number = 1,
    fields: string = "name price description images shopName" ) 
    : Promise<{found: boolean, products?: any , message?: string }> => {
        
        console.log(queryLog(findBy, "Products"));

        const page = Math.max(Number(reqPage) || 1, 1);
        const limit = Math.min(Number(reqLimit) || 12, 50);

        try {
                const products = await Product.find( (findBy==="all")?{}:findBy )
                    .select(fields)
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .lean();

                return {found: true, products};
        
            } catch (err: any) {
                console.error(err.message, err);
                return {found: false , message: "error fetching products"}
        }

} 

export const getShop = async (
    findBy : any,
    reqLimit: number = 12, reqPage: number = 1,
    fields: string = "shopName shopId description owner" ) 
    : Promise<{found: boolean, shops?: any , message?: string }> => {
        
        console.log(queryLog(findBy, "Shops"));

        const page = Math.max(Number(reqPage) || 1, 1);
        const limit = Math.min(Number(reqLimit) || 12, 50);

        try {
                const shops = await Shop.find( (findBy==="all")?{}:findBy )
                    .select(fields)
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .lean();

                return {found: true, shops};
        
            } catch (err: any) {
                console.error(err.message, err);
                return {found: false , message: "error fetching Shops"}
        }

} 

export const getUser = async (
    findBy : any,
    reqLimit: number = 12, reqPage: number = 1,
    fields: string = "firstName lastName email role" ) 
    : Promise<{found: boolean, user?: any , message?: string }> => {
        
        console.log(queryLog(findBy, "Shops"));

        const page = Math.max(Number(reqPage) || 1, 1);
        const limit = Math.min(Number(reqLimit) || 12, 50);

        try {
                const user = await User.find( (findBy==="all")?{}:findBy )
                    .select(fields)
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .lean();

                return {found: true, user};
        
            } catch (err: any) {
                console.error(err.message, err);
                return {found: false , message: "error fetching Users"}
        }

} 

export const getFromDb = async (
    Model: "user" | "product" | "shop",
    findBy : any,
    fields: string = "_id" ,
    reqLimit: number = 12, reqPage: number = 1 )
    : Promise<{found: boolean, data?: any , message?: string }> => {


        let Data;
        if (Model==="user") {
            Data = User;
        } else if (Model==="product") {
            Data = Product;
        } else if (Model==="shop") {
            Data = Shop;
        } else return { found: false };

        console.log(queryLog(findBy, Model), findBy);
        

        const page = Math.max(Number(reqPage) || 1, 1);
        const limit = Math.min(Number(reqLimit) || 12, 50);

        try {
                const data = await Data.find( (findBy==="all")?{}:findBy )
                    .select(fields)
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .lean();

                return {found: true, data};
        
            } catch (err: any) {
                console.error(err.message, err);
                return {found: false , message: "error fetching Users"}
        }
} 

export const quickCheckDb = async (
    Model: models,
    findBy: object ,
    select: string,
    options: object = { lean: true } ) : 
    Promise<
        |{ found: true , payload: object }
        |{ found: false } 
    > => {

    let Data;
        if (Model==="user") {
            Data = User;
        } else if (Model==="product") {
            Data = Product;
        } else if (Model==="shop") {
            Data = Shop;
        } else return { found: false };

    try {
        const payload = await Data.findOne(findBy, select, options);
        return { found: true, payload } ;

    } catch (err: any) {
        return { found: false }
    }  

}