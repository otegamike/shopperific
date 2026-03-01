import { createContext, useState } from "react";

// types 
import type { CartItem } from "../types/CartInterface";
import type { ProductDataType } from "../types/productInterface/productInterface";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: ProductDataType) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: ProductDataType) => {
        const newCartItem = productToCartItem(item);

        setCartItems((prevItems) => {
            return [...prevItems, newCartItem];
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    };

    const increaseQuantity = (productId: string) => {
        setCartItems((prevItems) => prevItems.map((item) => item.productId === productId ? { ...item, productQuantity: item.productQuantity + 1, productTotalPrice: item.productPrice * (item.productQuantity + 1) } : item));
    };

    const decreaseQuantity = (productId: string) => {
        setCartItems((prevItems) => prevItems.map((item) => item.productId === productId ? { ...item, productQuantity: item.productQuantity - 1, productTotalPrice: item.productPrice * (item.productQuantity - 1) } : item));
    };

    return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
    );
};

function productToCartItem(product: ProductDataType): CartItem {
    return {
        productId: product._id,
        productImage: product.images[0],
        productName: product.name,
        productPrice: product.price,
        productQuantity: 1,
        productTotalPrice: product.price
    };
}