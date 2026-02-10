import api from "../api/client";
import { alertObj } from "../utils/alerts/alert";

// types
import type { DashboardProductsData, DashboardProductsDataStats } from "../types/dashboardDataType";

// fetch dashboard data
export const fetchDashboardProductsData = async (): 
    Promise<
        | {productsStats: DashboardProductsDataStats, productsData: DashboardProductsData[]}
        | {errorMsg: string}
    > => {
    try {
        const response = await api.post("/dashboard/products");
        const { data } = response;
        const { docCount, productsData, productsByCategory } = data;
        
        productsData.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        
        console.log("data", productsByCategory, data);
        const DashboardProductData = {productsStats: docCount, productsData};

        localStorage.setItem("dashboardDataCache", JSON.stringify(DashboardProductData));
        return DashboardProductData;
       
    } catch (error: any) {
        console.error("Error fetching dashboard data:", error.message);
        const dashboardDataCache = localStorage.getItem("dashboardDataCache");
        if (dashboardDataCache) {
            alertObj("couldn't connect to our servers. loading cached data", "warning")
            return JSON.parse(dashboardDataCache);
        }
        return { errorMsg: "Error fetching dashboard data" }
    }
}

// edit product
export const editProduct = async (id: string, productData: Partial<DashboardProductsData>): 
    Promise<
        | {updated: true, message: string}
        | {updated: false, errorMsg: string}
    > => {
    try {
        const response = await api.put(`/dashboard/products/edit`, {id, ...productData});
        const { message } = response.data;
        return { updated: true, message };

    } catch (error: any) {
        console.error("Error editing product:", error.message);
        return { updated: false, errorMsg: "Error editing product" }
    }
}

// delete product
export const deleteProduct = async (ids: string[] ): 
    Promise<
        | {deleted: true, message: string}
        | {deleted: false, errorMsg: string}
    > => {
    try {
        const response = await api.post(`/dashboard/products/delete`, {ids});
        const { message } = response.data;
        return { deleted: true, message };

    } catch (error: any) {
        console.error("Error deleting product:", error.message);
        return { deleted: false, errorMsg: "Error deleting product" }
    }
}

