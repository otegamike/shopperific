import Cart from "../models/Cart.js";
import { CartItem, CartInterface } from "../types/cartInterface.js";
import { toObjectId } from "../lib/mongoose.js";
import { ClientCart } from "../types/cartInterface.js";
import { getUserById } from "./user.js";
import { getGuest } from "./guest.js";

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
        const cart = await Cart.findOne({ _id: toObjectId(CartId) }).lean();
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
        const cart = await Cart.findOneAndUpdate(
            { _id: toObjectId(CartId) },
            { $push: { items: item } , 
              $inc: { totalAmount: +item.productTotalPrice } 
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
        const cartBefore: CartInterface | null = await Cart.findOne({ _id: toObjectId(CartId), "items.productId": productId }).lean();
        if (!cartBefore) {
            console.log("Cart not found or does not exist");
            return null;
        }
        const itemToRemove = cartBefore.items.find(item => item.productId === productId);
        const priceReduction = itemToRemove ? itemToRemove.productTotalPrice : 0;

        const cart = await Cart.findOneAndUpdate(
            { _id: toObjectId(CartId) },
            { 
                $pull: { items: { productId } }, 
                $inc: { totalAmount: -priceReduction } 
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
                    "items.$.productTotalPrice": adjustment * price ,
                    "totalAmount": adjustment * price
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

export { createCart, getCart, addItemToCart, removeItemFromCart, updateItemQuantity, convertCartToClientCart, getCartId };