export interface CartItem {
    productId: string;
    productImage: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productTotalPrice: number;
    productShopRef: string;
}

export interface CartInterface {
    _id: string;
    deviceId: string;
    userId: string | null;
    items: CartItem[];
    totalAmount: number;
}

export interface ClientCart {
    cartItems: CartItem[];
    totalItems?: number;
    totalPrice: number;
}