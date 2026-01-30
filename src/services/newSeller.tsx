// Axios 
import api from "../api/client";

export const newSeller = async ():  Promise<{ success: true, message: string } | { success: false, errorMsg: string }> => {
    try {
        const response = await api.post("/sellers/new");
        const message = response.data.message;
        return { success: true, message }

    } catch (error: any) {
        const { errorMsg } = error.response.data;
        console.log(error)
        return { success: false, errorMsg }
    }
};
