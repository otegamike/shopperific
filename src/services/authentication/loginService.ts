// Axios 
import api from "../../api/client";

//util
import { alertObj } from "../../utils/alerts/alert";

// Types 
import type { LoginCredentials } from "../../types/authContextInterface";
import type { ClientUser } from "../../types/clientUser";



export const loginService = async (credentials: LoginCredentials)
: Promise<
    |{ user : ClientUser, message: string }
    |{ errorMsg: string}> => {
        try {
            const response = await api.post("/auth/login", credentials);
            const { user , message } = response.data;
            
            alertObj(message, "success");
            return { user, message };

           
        } catch (error : any) {
            const { errorMsg } = error.response.data;
            console.error("Login failed:", errorMsg);
            
            alertObj(errorMsg, "error");
            return errorMsg? {errorMsg}: {errorMsg: "Error Connection to Server"};
        }
    };
