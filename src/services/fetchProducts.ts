import { getDeviceId } from "./deviceId"

export const fetchProducts = async () => {
    try {
        const response = await fetch("./api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-device-id": `${getDeviceId()}`
            }
        })
        const data = await response.json();
        if (!response.ok) {
            return {error: data.message};
        }
        return {products: data.products};

    } catch (error: any) {
        return {error: error.message};
    }
}