import { getDeviceId } from "./deviceId"

export const fetchProducts = async (page: number = 1, limit: number = 12) => {
    try {
        const response = await fetch(`./api/products?page=${page}&limit=${limit}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-device-id": `${getDeviceId()}`
            }
        })
        const data = await response.json();
        if (!response.ok) {
            return { error: data.message };
        }
        return data;

    } catch (error: any) {
        return { error: error.message };
    }
}