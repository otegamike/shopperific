// api client
import api from "../api/client";

// types
import type { ShopDataType } from "../types/shopsInterface";

// utils
import { alertObj } from "../utils/alerts/alert";

export async function getShops(sellerId?: string): Promise< {errorMsg: string} | {shops: ShopDataType[]} > {
    try {
        const response = await api.post("/shops", {
            sellerId: sellerId || ""
        });
        const shops = response.data;
        return  {shops};
    } catch (error: any) {
        console.log(error);
        const errorMsg =  "error fetching shops" ;
        alertObj(errorMsg, "error");
        return {errorMsg}
    }
}

export async function getShopByShopId(shopId: string): Promise< {errorMsg: string} | {shop: ShopDataType} > {
    try {
        const response = await api.get(`/shops/shop/${shopId}`);
        const shop = response.data;
        console.log("shop", shop);

        return  {shop};
    } catch (error: any) {
        console.log(error);
        const errorMsg =  "error fetching shop" ;
        alertObj(errorMsg, "error");
        return {errorMsg}
    }
}
