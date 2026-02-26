import { toObjectId } from "../lib/mongoose.js";
import { queryDatabase, type AggregateCountObj } from "./database/DbAggregationPipeline.js";
import { ShopSchema } from "../models/Shop.js";


export const getShopProductCount = async ( shops: ShopSchema[], match: object = {}  ) => {
    
    const shopList = shops.map((shop) => {
        return { shop_Id: shop._id.toString(), shopName: shop.shopName };
    });
    
    const countParameters: AggregateCountObj[] = shopList.map((shop) => {
        return {
            fieldName: shop.shopName,
            match: { shopRef: toObjectId(shop.shop_Id), ...match }
        }
    })

    const result = await queryDatabase("product", countParameters);
    return result;

}