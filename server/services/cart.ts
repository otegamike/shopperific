import Cart from "../models/Cart.js";
import { CartItem, CartInterface } from "../types/cartInterface.js";
import { toObjectId } from "../lib/mongoose.js";
import { ClientCart } from "../types/cartInterface.js";
import { getUserById } from "./user.js";
import { getGuest } from "./guest.js";

const calculateTotalAmount = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.productTotalPrice, 0);
}

const createCart = async (userId: string, deviceId: string): Promise<CartInterface | null> => {
    try { 
        const cart = new Cart({
            userId,
            deviceId,
        });
        await cart.save();
        return cart;

    } catch (error) {
        console.log(error);
        return null;
    }
}



const getCart = async (CartId: string): Promise<CartInterface | null> => {
    
    try { 
        let cart = await Cart.findOne({ _id: toObjectId(CartId) }).lean();
        if (!cart) {
            console.log("Cart not found or does not exist");
            return null;
        }
        const cartTotalAmount = calculateTotalAmount(cart.items);
        if (cartTotalAmount !== cart.totalAmount) {
            const updatedCart = await updateCart(CartId, { totalAmount: cartTotalAmount });
            if (!updatedCart) {
                console.log("Cart not found or does not exist");
                return null;
            }
            cart = updatedCart;
        }
        return cart;
    } catch (error) {
        console.log(error);
        return null;
    }
}



const updateCart = async (CartId: string, updates: Partial<CartInterface>): Promise<CartInterface | null> => {
    try { 
        const cart = await Cart.findOneAndUpdate(
            { _id: toObjectId(CartId) },
            { $set: updates },
            { new: true }
        );
        if (!cart) {
            console.log("Cart not found or does not exist");
            return null;
        }
        return cart;
    } catch (error) {
        console.log(error);
        return null;
    }
}



const addItemToCart = async (CartId: string, item: CartItem): Promise<CartInterface | null> => {
    try { 
        const previousCart: CartInterface | null = await getCart(CartId);
        if (!previousCart) {
            console.log("Cart not found or does not exist");
            return null;
        }

        const itemExists = previousCart.items.find(previousCartItem => previousCartItem.productId === item.productId);
        if (itemExists) {
            console.log("Item already exists in cart");
            return null;
        }

        const totalAmount = calculateTotalAmount(previousCart.items);
        const newTotalAmount = totalAmount + item.productTotalPrice;
        const cart = await Cart.findOneAndUpdate(
            { _id: toObjectId(CartId) },
            { $push: { items: item } , 
              $set: { totalAmount: newTotalAmount } 
            },
            { new: true }
        );
        if (!cart) {
            console.log("Cart not found or does not exist");
            return null;
        }
        return cart;
    } catch (error) {
        console.log(error);
        return null;
    }
}



const removeItemFromCart = async (CartId: string, productId: string): Promise<CartInterface | null> => {
    try {
        const previousCart: CartInterface | null = await getCart(CartId);
        if (!previousCart) {
            console.log("Cart not found or does not exist");
            return null;
        }

        const itemToRemove = previousCart.items.find(previousCartItem => previousCartItem.productId === productId);
        if (!itemToRemove) {
            console.log("Item not found in cart");
            return null;
        }

        const totalAmount = calculateTotalAmount(previousCart.items);
        const newTotalAmount = totalAmount - itemToRemove.productTotalPrice;

        const cart = await Cart.findOneAndUpdate(
            { _id: toObjectId(CartId) },
            { 
                $pull: { items: { productId } }, 
                $set: { totalAmount: newTotalAmount } 
            },
            { new: true }
        );
        return cart;
    } catch (error) {
        console.log(error);
        return null;
    }
}



const updateItemQuantity = async (
    CartId: string, 
    productId: string, 
    adjustment: number, 
    price: number
): Promise<CartInterface | null> => {
    try { 
        
        const cart = await Cart.findOneAndUpdate(
            { 
                _id: toObjectId(CartId), 
                "items.productId": productId 
            },
            { 
                $inc: { 
                    "items.$.productQuantity": adjustment, 
                    "items.$.productTotalPrice": (adjustment * price).toFixed(2) ,
                    "totalAmount": (adjustment * price).toFixed(2)
                } 
            },
            { new: true }
        );

        if (!cart) {
            console.log("Item or Cart not found");
            return null;
        }

        return cart;
    } catch (error) {
        console.error("Update failed:", error);
        return null;
    }
}



const convertCartToClientCart = (cart: CartInterface): ClientCart => {
    return {
        cartItems: cart.items,
        totalPrice: cart.totalAmount,
        totalItems: cart.items.length
    }
}



const getCartId = async (userId: string, deviceId: string): Promise<string | null | undefined> => {
    try {
    
    const fetchUserDetail = Promise.all([
        getUserById(userId),
        getGuest(deviceId)
    ])

    const [user, guest] = await fetchUserDetail;
        if (!user && !guest) {
            return null;
        }

        const cartId = user?.cartId || guest?.cartId;
        return cartId;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}



export { createCart, getCart, addItemToCart, removeItemFromCart, updateItemQuantity, convertCartToClientCart, getCartId, updateCart };