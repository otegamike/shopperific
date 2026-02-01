import api from "../api/client";

export const fetchDashboardProductsData = async () => {
    try {
        const response = await api.post("/dashboard/products");
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
}