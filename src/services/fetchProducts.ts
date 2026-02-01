//  Utils
import { alertObj } from "../utils/alerts/alert";

import api from "../api/client";

export const fetchProducts = async (page: number = 1, limit: number = 12) => {
    try {
        const response = await api.post(`/products?page=${page}&limit=${limit}`)
        return response.data;

    } catch (error: any) {
        alertObj("Failed to fetch products", "error");
        return { errorMsg: "Failed to fetch products" };
    }
}