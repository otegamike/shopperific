import { createContext, useState } from "react";

// types 
import type { CartItem } from "../types/CartInterface";
import type { ProductDataType } from "../types/productInterface/productInterface";

// hooks
import { useAuth } from "../hooks/useAuth";

// utils
import { alertObj } from "../utils/alerts/alert";

// services
import { AddNewItemToCart, RemoveItemFromCart, UpdateItemQuantity } from "../services/cartServices";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: ProductDataType) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { cart } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>(cart || []);

    const addToCart = async (item: ProductDataType) => {
        const newCartItem = productToCartItem(item);
        
        let previousItems: CartItem[] = [] ;

        setCartItems((prevItems) => {
            previousItems = prevItems;
            return [...prevItems, newCartItem];
        });

        const response = await AddNewItemToCart(newCartItem);
        if (!response) {
            console.log("Error adding item to cart");
            setCartItems(previousItems);
            alertObj("Error adding item to cart", "error");
            return;
        }

    };

    const removeFromCart = async (productId: string) => {
        let previousItems: CartItem[] = [];

        setCartItems((prevItems) => {
            previousItems = prevItems;
            return prevItems.filter((item) => item.productId !== productId);
        });

        const response = await RemoveItemFromCart(productId);
        if (!response) {
            console.log("Error removing item from cart");
            setCartItems(previousItems);
            alertObj("Error removing item from cart", "error");
            return;
        }
    };

    const increaseQuantity = async (productId: string) => {
        let previousItems: CartItem[] = [];

        setCartItems((prevItems) => {
            previousItems = prevItems;
            return prevItems.map((item) => item.productId === productId ? { ...item, productQuantity: item.productQuantity + 1, productTotalPrice: item.productPrice * (item.productQuantity + 1) } : item);
        });

        const response = await UpdateItemQuantity(productId, +1 );
        if (!response) {
            console.log("Error increasing item quantity");
            setCartItems(previousItems);
            alertObj("Error increasing item quantity", "error");
            return;
        }
    };

    const decreaseQuantity = async (productId: string) => {
        let previousItems: CartItem[] = [];

        setCartItems((prevItems) => {
            previousItems = prevItems;
            return prevItems.map((item) => item.productId === productId ? { ...item, productQuantity: item.productQuantity - 1, productTotalPrice: item.productPrice * (item.productQuantity - 1) } : item);
        });

        const response = await UpdateItemQuantity(productId, -1);
        if (!response) {
            console.log("Error decreasing item quantity");
            setCartItems(previousItems);
            alertObj("Error decreasing item quantity", "error");
            return;
        }

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