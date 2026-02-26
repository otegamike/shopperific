import { findAndUpdate } from "./database/updateDocument.js"
import { toObjectId } from "../lib/mongoose.js"
import { ShopSchema } from "../models/Shop.js";

export const addToShopProductCount = async (shopId: string, count: number = 1 ): Promise<
    {updated: true, updatedShop: ShopSchema} | 
    {updated: false, updatedShop: null}
> => {
    const shop = await findAndUpdate("shop", {_id: toObjectId(shopId)}, {$inc: {productCount: count}}) 
    if (!shop.found) { return {updated: false, updatedShop: null} }
    return {updated: true, updatedShop: shop.newData}
}

export const removeFromShopProductCount = async (shopId: string, count: number = 1 ): Promise<
    {updated: true, updatedShop: ShopSchema} | 
    {updated: false, updatedShop: null}
> => {
    const shop = await findAndUpdate("shop", {_id: toObjectId(shopId)}, {$inc: {productCount: -count}}) 
    if (!shop.found) { return {updated: false, updatedShop: null} }
    return {updated: true, updatedShop: shop.newData}
}
