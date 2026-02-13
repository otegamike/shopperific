//  Utils
import { alertObj } from "../utils/alerts/alert";
import { cacheData, getCachedData } from "../utils/cacheData";
// api
import api from "../api/client";
// types
import type { ProductDataType } from "../types/productInterface/productInterface";

export const fetchProducts = async (page: number = 1, limit: number = 12) => {
    try {
        const response = await api.post(`/products?page=${page}&limit=${limit}`)
        const products = response.data;
        cacheData(`products-${page}-${limit}`, products);
        return products;

    } catch (error: any) {
        const cachedProducts = getCachedData(`products-${page}-${limit}`);
        if (cachedProducts) {
            alertObj("couldn't connect to our servers. loading cached data", "warning")
            return cachedProducts;
        }
        alertObj("Failed to fetch products", "error");
        return { errorMsg: "Failed to fetch products" };
    }
}

export const fetchProduct = async (id: string): Promise<ProductDataType | { errorMsg: string }> => {
    try {
        const response = await api.post(`products/product/${id}`);
        const { data } = response;

        const product = data[0];
        cacheData(`product-${id}`, product);
        return product;

    } catch (error: any) {
        const cachedProduct = getCachedData(`product-${id}`);
        if (cachedProduct) {
            alertObj("couldn't connect to our servers. loading cached data" , "warning")
            return cachedProduct;
        }
        alertObj("Failed to fetch products", "error");
        return { errorMsg: "Failed to fetch products" };
    }
}