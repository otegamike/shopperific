export interface CartItem {
    productId: string;
    productImage: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productTotalPrice: number;
    productShopRef: string;
    productSellerRef: string;
}

export type ClientCartItem = Omit<CartItem, "productSellerRef" | "productShopRef">;

export interface CartInterface {
    _id: string;
    deviceId: string;
    userId: string | null;
    items: CartItem[];
    totalAmount: number;
}

export interface ClientCart {
    cartItems: ClientCartItem[];
    totalItems?: number;
    totalPrice: number;
}