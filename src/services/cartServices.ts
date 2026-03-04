import api from "../api/client.js";
import type { CartItem, ClientCart } from "../types/CartInterface.js";

export const AddNewItemToCart = async (item: CartItem): Promise<ClientCart | null> => {
    try {
        const response = await api.post("/cart/add-new-item", { item });
        const { clientCart } = response.data;
        return clientCart;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const RemoveItemFromCart = async (productId: string): Promise<ClientCart | null> => {
    try {
        const response = await api.post("/cart/remove-item", { productId });
        const { clientCart } = response.data;
        return clientCart;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const UpdateItemQuantity = async (productId: string, quantity: number): Promise<ClientCart | null> => {
    try {
        const response = await api.post("/cart/update-item-quantity", { productId, quantity });
        const { clientCart } = response.data;
        return clientCart;
    } catch (error) {
        console.log(error);
        return null;
    }
}