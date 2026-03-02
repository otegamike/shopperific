// Axios 
import api from "../../api/client";

//util
import { alertObj } from "../../utils/alerts/alert";

// Types 
import type { ClientUser } from "../../types/clientUser";
import type { ClientCart } from "../../types/CartInterface";

export const validateUser = async (): Promise<{
    user: ClientUser;
    cart: ClientCart;
    message: string;
} | { errorMsg: string }> => {
    try {
        const response = await api.post("/auth/validate");
        const { user, cart, message } = response.data;
        
        return { user, cart, message };
        

       
    } catch (error : any) {
        const { errorMsg } = error.response.data;
        console.error("Validation failed:", errorMsg);
        
        alertObj(errorMsg || "Error Connecting to our Servers", "warning");
        return errorMsg? {errorMsg}: {errorMsg: "Error Connecting to Servers"};
    }
};