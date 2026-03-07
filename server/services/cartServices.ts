import Cart from "../models/Cart.js";
import { CartItem, CartInterface } from "../types/cartInterface.js";
import { toObjectId } from "../lib/mongoose.js";
import { ClientCart } from "../types/cartInterface.js";
import { getUserById } from "./userServices.js";
import { AppError } from "../utils/appError.js";
import { getGuest } from "./guest.js";
import type { FullProductInterface } from "./productServices.js";

const calculateTotalAmount = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.productTotalPrice, 0);
}

const createCart = async (userId: string, deviceId: string): Promise<CartInterface> => {
    try { 
        const cart = new Cart({
            userId,
            deviceId,
        });
        await cart.save();
        return cart;

    } catch (error) {
        console.log(error);
        throw new AppError("Error creating user Cart", 500)
    }
}



const getCart = async (CartId: string): Promise<CartInterface> => {
    
    try { 
        let cart = await Cart.findOne({ _id: toObjectId(CartId) }).lean();
        if (!cart) throw new AppError("Cart not found or does not exist", 404);
        
        const cartTotalAmount = calculateTotalAmount(cart.items);
        if (cartTotalAmount !== cart.totalAmount) {
            const updatedCart = await updateCart(CartId, { totalAmount: cartTotalAmount });
            if (!updatedCart) throw new AppError("Cart not found or does not exist", 404);

            cart = updatedCart;
        }
        return cart;

    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError("Error getting cart", 500);
    }
}



const updateCart = async (CartId: string, updates: Partial<CartInterface>): Promise<CartInterface> => {
    try { 
        const cart = await Cart.findOneAndUpdate(
            { _id: toObjectId(CartId) },
            { $set: updates },
            { new: true }
        );
        if (!cart) throw new AppError("Cart not found or does not exist", 404);

        return cart;
        
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError("Error updating cart", 500);
    }
}



const addItemToCart = async (CartId: string, item: CartItem): Promise<CartInterface> => {
    try { 
        const previousCart: CartInterface | null = await getCart(CartId);
        if (!previousCart) throw new AppError("Cart not found or does not exist", 404);

        const itemExists = previousCart.items.find(previousCartItem => previousCartItem.productId === item.productId);
        if (itemExists) throw new AppError("Item already exists in cart", 400);

        const totalAmount = calculateTotalAmount(previousCart.items);
        const newTotalAmount = totalAmount + item.productTotalPrice;
        const cart = await Cart.findOneAndUpdate(
            { _id: toObjectId(CartId) },
            { $push: { items: item } , 
              $set: { totalAmount: newTotalAmount } 
            },
            { new: true }
        );
        if (!cart) throw new AppError("Cart not found or does not exist", 404);

        return cart;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError("Error adding item to cart", 500);
    }
}



const removeItemFromCart = async (CartId: string, productId: string): Promise<CartInterface> => {
    try {
        const previousCart: CartInterface | null = await getCart(CartId);
        if (!previousCart) throw new AppError("Cart not found or does not exist", 404);

        const itemToRemove = previousCart.items.find(previousCartItem => previousCartItem.productId === productId);
        if (!itemToRemove) throw new AppError("Item not found in cart", 404);

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
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError("Error removing item from cart", 500);
    }
}



const updateItemQuantity = async (
    CartId: string, 
    productId: string, 
    adjustment: number, 
    price: number
): Promise<CartInterface> => {
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

        if (!cart) throw new AppError("Item or Cart not found", 404);

        return cart;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.error("Update failed:", error);
        throw new AppError("Error updating item quantity", 500);
    }
}



const convertCartToClientCart = (cart: CartInterface): ClientCart => {
    return {
        cartItems: cart.items,
        totalPrice: cart.totalAmount,
        totalItems: cart.items.length
    }
}



const getCartId = async (userId: string, deviceId: string): Promise<string> => {
    try {
    
    const fetchUserDetail = Promise.all([
        getUserById(userId),
        getGuest(deviceId)
    ])

    const [user, guest] = await fetchUserDetail;
        if (!user && !guest) throw new AppError("User not found", 404);

        const cartId = user?.cartId || guest?.cartId;
        if (!cartId) throw new AppError("Cart not found", 404);
        
        return cartId;
        
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError("Error getting cart id", 500);
    }
}

function productToCartItem(product: FullProductInterface ): CartItem {
    return {
        productId: product._id.toString(),
        productImage: product.images?.[0] || "",
        productName: product.name,
        productPrice: product.price,
        productQuantity: 1,
        productTotalPrice: product.price,
        productShopRef: product.shopRef._id.toString()
    };
}



export { 
    createCart, 
    getCart, 
    addItemToCart, 
    removeItemFromCart, 
    updateItemQuantity, 
    convertCartToClientCart, 
    getCartId, 
    updateCart, 
    productToCartItem 
};