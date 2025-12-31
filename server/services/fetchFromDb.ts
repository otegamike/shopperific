import Product from "../models/Product"
import Shop from "../models/Shop";

export const getProduct = async (
    findBy : any,
    reqLimit: number = 12, reqPage: number = 1,
    fields: string = "name price description images shopName" ) 
    : Promise<{found: boolean, products?: any , message?: string }> => {
        
        
        const page = Math.max(Number(reqPage) || 1, 1);
        const limit = Math.min(Number(reqLimit) || 12, 50);

        try {
                const products = await Product.find( (findBy==="all")?"":findBy )
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
    fields: string = "name price description images shopName" ) 
    : Promise<{found: boolean, shops?: any , message?: string }> => {
        
        
        const page = Math.max(Number(reqPage) || 1, 1);
        const limit = Math.min(Number(reqLimit) || 12, 50);

        try {
                const shops = await Shop.find( (findBy==="all")?"":findBy )
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