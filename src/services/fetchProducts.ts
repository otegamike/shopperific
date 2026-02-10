//  Utils
import { alertObj } from "../utils/alerts/alert";
// api
import api from "../api/client";
// types
import type { ProductType } from "../types/productInterface/productInterface";

export const fetchProducts = async (page: number = 1, limit: number = 12) => {
    try {
        const response = await api.post(`/products?page=${page}&limit=${limit}`)
        return response.data;

    } catch (error: any) {
        alertObj("Failed to fetch products", "error");
        return { errorMsg: "Failed to fetch products" };
    }
}

export const fetchProduct = async (id: string): Promise<ProductType | { errorMsg: string }> => {
    try {
        const response = await api.post(`products/product/${id}`);
        const { data } = response;
        return data[0]

    } catch (error: any) {
        alertObj("Failed to fetch products", "error");
        return { errorMsg: "Failed to fetch products" };
    }
}