import { Router } from "express";
import { createCart, getCartId, convertCartToClientCart, addItemToCart, removeItemFromCart, updateItemQuantity } from "../services/cart.js";
import { getUserById, updateUser } from "../services/user.js";
import { getGuest, createGuestCart } from "../services/guest.js";
import { GetProductById } from "../services/productServices.js";

import { CartItem, ClientCart } from "../types/cartInterface.js";
import { TypedResponse } from "../utils/types/utilTypes.js";
import { tResponseError } from "../types/routesInterface.js";

const router = Router();

router.post('/add-new-item', async (req, res): Promise<TypedResponse<ClientCart | tResponseError>> => {
    try {
        const userObj = req.user;
        const { item }: { item: CartItem } = req.body;
        console.log(userObj, item);

        if (!userObj) {
            return res.status(401).json({ errorMsg: "Unauthorized" });
        }

        const { deviceId, userId, role} = userObj;

        if (!userId || !deviceId || !role) {
            return res.status(401).json({ errorMsg: "Unauthorized" });
        }
        
        let cartId = await getCartId(userId, deviceId);
        if (!cartId) {
            const newCart = await createCart(userId, deviceId);
            if (!newCart) {
                console.log("Error creating cart");
                return res.status(500).json({ errorMsg: "Internal Server Error" });
            }

            const newCartId = newCart._id;
            cartId = newCartId;

            if ( role === "guest" ) {
                const updatedGuest = await createGuestCart(deviceId, newCartId);
                if (!updatedGuest) {
                    console.log("Error updating guest cartId");
                    return res.status(500).json({ errorMsg: "Internal Server Error" });
                }

            } else {
                const updatedUser = await updateUser(userId, { cartId });
                if (!updatedUser) {
                    console.log("Error updating user cartId");
                    return res.status(500).json({ errorMsg: "Internal Server Error" });
                }

            }
        }

        const cart = await addItemToCart(cartId, item);
        if (!cart) {
            console.log("Error adding item to cart");
            return res.status(500).json({ errorMsg: "Internal Server Error" });
        }

        const clientCart = convertCartToClientCart(cart);

        return res.status(200).json({ success: true, clientCart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Failed to add item to cart" });
    }
})

router.post('/remove-item', async (req, res) => {
    try {
        const userObj = req.user;

        const { productId }: { productId: string } = req.body;

        if (!userObj || !userObj.deviceId || !userObj.userId) {
            return res.status(401).json({ errorMsg: "Unauthorized" });
        }

        const { deviceId, userId } = userObj;
        
        let cartId = await getCartId(userId, deviceId);
        
        if (!cartId) {
            return res.status(404).json({ errorMsg: "Cart not found" });
        }

        const cart = await removeItemFromCart(cartId, productId);
        if (!cart) {
            console.log("Error removing item from cart");
            return res.status(500).json({ errorMsg: "Internal Server Error" });
        }
        
        const clientCart = convertCartToClientCart(cart);

        return res.status(200).json({ success: true, clientCart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Failed to remove item from cart" });
    }
})

router.post('/update-item-quantity', async (req, res) => {
    try {
        const userObj = req.user;
        const { productId, quantity }: { productId: string, quantity: number } = req.body;

        if (!userObj || !userObj.deviceId || !userObj.userId) {
            return res.status(401).json({ errorMsg: "Unauthorized" });
        }

        const { deviceId, userId } = userObj;
        
        let cartId = await getCartId(userId, deviceId);

        if (!cartId) {
            return res.status(404).json({ errorMsg: "Cart not found" });
        }

        const product = await GetProductById(productId);
        if (!product) {
            return res.status(404).json({ errorMsg: "Product not found" });
        }

        const cart = await updateItemQuantity(cartId, productId, quantity, product.price);
        if (!cart) {
            console.log("Error updating item quantity");
            return res.status(500).json({ errorMsg: "Internal Server Error" });
        }
        
        const clientCart = convertCartToClientCart(cart);

        return res.status(200).json({ success: true, clientCart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Failed to update item quantity" });
    }
})




export default router;