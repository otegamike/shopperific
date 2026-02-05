import api from "../api/client";

// 
import type { DashboardProductsData, DashboardProductsDataStats } from "../types/dashboardDataType";

export const fetchDashboardProductsData = async (): 
    Promise<
        | {productsStats: DashboardProductsDataStats, productsData: DashboardProductsData[]}
        | {errorMsg: string}
    > => {
    try {
        const response = await api.post("/dashboard/products");
        const { data } = response;
        const { docCount, docData } = data;

        console.log("data", data);
        return {productsStats: docCount, productsData: docData};
       
    } catch (error: any) {
        console.error("Error fetching dashboard data:", error.message);
        return { errorMsg: "Error fetching dashboard data" }
    }
}