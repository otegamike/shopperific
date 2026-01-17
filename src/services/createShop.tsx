import { getDeviceId } from "./deviceId";

export type createShopType = {
    shopName: string,
    shopId: string,
    shopLink: string,
    description: string
}

export const checkShopId = async (shopId: string): Promise<| { error: string } | { available: boolean, message: string }> => {

    if (!shopId) {
        return { error: "Shop ID is required." };
    }

    try {

        const result = await fetch('./api/shops/shop-id', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-device-id": `${getDeviceId()}`
            },
            body: JSON.stringify({
                shopId
            })
        })

        const data = await result.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return { available: data.available, message: data.message };

    } catch (err: any) {
        console.error(err.message, err);
        return { error: "Error establishing a connection. please try again" };
    }
}

export const createShop = async (
    shopData: createShopType)
    : Promise<| { error: string } | { created: true; message: string }> => {


    const { shopName, shopId, description } = shopData;
    if (!shopName || !shopId || !description) {
        return { error: "All fields are required." };
    }

    try {
        const result: Response = await fetch('./api/shops/new', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-device-id": `${getDeviceId()}`
            },
            body: JSON.stringify({
                shopName,
                shopId,
                description
            })

        })

        if (result.status === 201) {
            return { created: true, message: "Shop created successfully." };
        } else {
            return { error: "Error establishing a connection. please try again" };
        }
    } catch (err: any) {
        console.error(err.message, err);
        return { error: "Error establishing a connection. please try again" };
    }

}

export const validateShopId = async (value: string): Promise<{ isValid: boolean, message: string }> => {

    const check = await checkShopId(value);
    if ('available' in check) {
        console.log(check);
        return { isValid: check.available, message: check.message }
    } else {
        return { isValid: false, message: check.error }
    }
}