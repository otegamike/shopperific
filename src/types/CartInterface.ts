
export interface CartItem {
    productId: string;
    productImage: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productTotalPrice: number;
}

export interface ClientCart {
    cartItems: CartItem[];
    totalItems?: number;
    totalPrice: number;
}
