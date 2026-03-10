import api from "../api/client";
import type { OrdersData } from "../types/OrderInterface";

export const getOverviewData = async () => {
    try {
        const response = await api.post("/dashboard/overview");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to load overview data");
    }
};

export const getDashboardOrders = async (currentShop: string = "", status: string = "", page: number = 1, limit: number = 10): Promise<OrdersData> => {
    try {
        const response = await api.post("/dashboard/orders", { clientCurrentShop: currentShop, status, page, limit });
       const { ordersData } = response.data;
       console.log(ordersData);
       return ordersData;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to load dashboard orders data");
    }
};
