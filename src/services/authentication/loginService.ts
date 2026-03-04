// Axios 
import api from "../../api/client";

//util
import { alertObj } from "../../utils/alerts/alert";

// Types 
import type { LoginCredentials } from "../../types/authContextInterface";
import type { ClientUser } from "../../types/clientUser";
import type { ClientCart } from "../../types/CartInterface";


export const loginService = async (credentials: LoginCredentials)
: Promise<
    |{ user : ClientUser, cart: ClientCart | null, message: string }
    |{ errorMsg: string}> => {
        try {
            const response = await api.post("/auth/login", credentials);
            const { user , cart, message } = response.data;
            
            alertObj(message, "success");
            return { user, cart, message };

           
        } catch (error : any) {
            const { errorMsg } = error.response.data;
            console.error("Login failed:", errorMsg);
            
            alertObj(errorMsg, "error");
            return errorMsg? {errorMsg}: {errorMsg: "Error Connection to Server"};
        }
    };
