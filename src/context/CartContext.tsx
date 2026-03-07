import { createContext, useState, useEffect } from "react";

// types 
import type { CartItem, ClientCart } from "../types/CartInterface";
import type { ProductDataType } from "../types/productInterface/productInterface";

// hooks
import { useAuth } from "../hooks/useAuth";

// utils
import { alertObj } from "../utils/alerts/alert";

// services
import { AddNewItemToCart, RemoveItemFromCart, UpdateItemQuantity, clearCart as clearCartService } from "../services/cartServices";

export interface CartContextType {
  cart: ClientCart | null;
  addToCart: (item: ProductDataType) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { cart : clientCart, updateCart } = useAuth();
    console.log(clientCart);

    useEffect(() => {
        if (clientCart) {
            setCart(clientCart);
        }
    }, [clientCart]);

    const [cart, setCart] = useState<ClientCart | null>(clientCart);

    const addToCart = async (item: ProductDataType) => {
        const newCartItem = productToCartItem(item);

        let previousCart: ClientCart | null = null;

        setCart((prevCart) => {
            previousCart = prevCart;
            const previousCartItems = prevCart?.cartItems || [];
            const previousTotalPrice = prevCart?.totalPrice || 0;
            
            return {
                ...prevCart,
                cartItems: [...previousCartItems, newCartItem],
                totalPrice: previousTotalPrice + newCartItem.productTotalPrice,
            };
        });

        const response = await AddNewItemToCart(newCartItem);
        if (!response) {
            console.log("Error adding item to cart");
            setCart(previousCart);
            alertObj("Error adding item to cart", "error");
            return;
        }

        setCart(response);

    };

    const removeFromCart = async (productId: string) => {

        let previousCart: ClientCart | null = null;

        setCart((prevCart) => {
            if (!prevCart) return null;
            previousCart = prevCart;
            const cartItem = prevCart.cartItems.find((item) => item.productId === productId);
            if (!cartItem) return prevCart;
            const newTotalPrice = prevCart.totalPrice - cartItem.productTotalPrice;

            return {
                ...prevCart,
                cartItems: prevCart.cartItems.filter((item) => item.productId !== productId),
                totalPrice: newTotalPrice,
            };
        });

        const response = await RemoveItemFromCart(productId);
        if (!response) {
            console.log("Error removing item from cart");
            setCart(previousCart);
            alertObj("Error removing item from cart", "error");
            return;
        }
        console.log(response);

        setCart(response);
    };

    const increaseQuantity = async (productId: string) => {
        let previousCart: ClientCart | null = cart? { ...cart }: null ;

        setCart((prevCart) => {
            if (!prevCart) return null;

            const cartItem = prevCart.cartItems.find((item) => item.productId === productId);
            if (!cartItem) return prevCart;

            const newQuantity = cartItem.productQuantity + 1;
            const newTotalPrice = prevCart.totalPrice + cartItem.productPrice;
            
            const updatedItem = { 
                ...cartItem, 
                productQuantity: newQuantity, 
                productTotalPrice: cartItem.productPrice * newQuantity 
            };

            return {
                ...prevCart,
                cartItems: prevCart.cartItems.map((item) => 
                    item.productId === productId ? updatedItem : item
                ),
                totalPrice: newTotalPrice,
            };
        });

        const response = await UpdateItemQuantity(productId, +1 );
        if (!response) {
            console.log("Error increasing item quantity");
            setCart(previousCart);
            alertObj("Error increasing item quantity", "error");
            return;
        }

        setCart(response);
    };

    const decreaseQuantity = async (productId: string) => {
        
        let previousCart: ClientCart | null = cart? { ...cart }: null ;

        setCart((prevCart) => {
            if (!prevCart) return null;

            const cartItem = prevCart.cartItems.find((item) => item.productId === productId);
            if (!cartItem) return prevCart;

            const newQuantity = cartItem.productQuantity - 1;
            const newTotalPrice = prevCart.totalPrice - cartItem.productPrice;
            
            const updatedItem = { 
                ...cartItem, 
                productQuantity: newQuantity, 
                productTotalPrice: cartItem.productPrice * newQuantity 
            };

            return {
                ...prevCart,
                cartItems: prevCart.cartItems.map((item) => 
                    item.productId === productId ? updatedItem : item
                ),
                totalPrice: newTotalPrice,
            };
        });

        const response = await UpdateItemQuantity(productId, -1);
        if (!response) {
            console.log("Error decreasing item quantity");
            setCart(previousCart);
            alertObj("Error decreasing item quantity", "error");
            return;
        }

        setCart(response);
    };

    const clearCart = async () => {
        const previousCart = cart? { ...cart }: null ;
        try {
            const emptyCart: ClientCart = {
                cartItems: [],
                totalPrice: 0,
            };
            await clearCartService();
            setCart(emptyCart);
            updateCart(emptyCart);
        } catch (err: any) {
            if (previousCart) setCart(previousCart);
            console.log(err);
            alertObj("Error clearing cart", "error");
        }
    }

    return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart}}>
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