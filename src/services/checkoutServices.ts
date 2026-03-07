import api from "../api/client";
import { alertObj } from "../utils/alerts/alert";

export const checkOut = async () => {
    try {
        await api.post('/orders/create');
        alertObj("Order created successfully", "success");

    } catch (err: any) {
        
        const {errorMsg} = err.response.data;
        alertObj(errorMsg || "Order creation failed", "error");
        throw new Error(errorMsg || "Order creation failed");
    }
    
}