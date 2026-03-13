import api from "../api/client";

export const homeService = async () => {
    try {
        const res = await api.get('/home');
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Failed to load home", error);
        return { errorMsg: "Failed to load home" };
    }
}
