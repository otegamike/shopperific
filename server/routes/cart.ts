import { Router } from "express";
import { createCart, getCart, addItemToCart, removeItemFromCart, updateItemQuantity } from "../services/cart.js";
import { updateUser } from "../services/user.js";
import { GetProductById } from "../services/productServices.js";

import { CartItem } from "../types/cartInterface.js";

const router = Router();

router.post('/add-new-item', async (req, res) => {
    try {
        const userObj = req.user;
        const { item }: { item: CartItem } = req.body;

        if (!userObj) {
            return res.status(401).json({ errorMsg: "Unauthorized" });
        }

        const { deviceId, userId} = userObj;
        
        let cartId = userObj.cartId;

        if (!userId || !deviceId) {
            return res.status(401).json({ errorMsg: "Unauthorized" });
        }

        if (!cartId) {
            const newCart = await createCart(userId, deviceId);
            if (!newCart) {
                console.log("Error creating cart");
                return res.status(500).json({ errorMsg: "Internal Server Error" });
            }

            const newCartId = newCart._id;
            cartId = newCartId;

            const updatedUser = await updateUser(userId, { cartId });
            if (!updatedUser) {
                console.log("Error updating user cartId");
                return res.status(500).json({ errorMsg: "Internal Server Error" });
            }
        }

        const cart = addItemToCart(cartId, item);
        return res.status(200).json({ success: true, cart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Failed to add item to cart" });
    }
})

router.post('/remove-item', async (req, res) => {
    try {
        const userObj = req.user;
        const { productId }: { productId: string } = req.body;

        if (!userObj) {
            return res.status(401).json({ errorMsg: "Unauthorized" });
        }

        const { deviceId, userId } = userObj;
        
        let cartId = userObj.cartId;

        if (!userId || !deviceId) {
            return res.status(401).json({ errorMsg: "Unauthorized" });
        }

        if (!cartId) {
            return res.status(404).json({ errorMsg: "Cart not found" });
        }

        const cart = removeItemFromCart(cartId, productId);
        return res.status(200).json({ success: true, cart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Failed to remove item from cart" });
    }
})

router.post('/update-item-quantity', async (req, res) => {
    try {
        const userObj = req.user;
        const { productId, quantity }: { productId: string, quantity: number } = req.body;

        if (!userObj) {
            return res.status(401).json({ errorMsg: "Unauthorized" });
        }

        const { deviceId, userId } = userObj;
        
        let cartId = userObj.cartId;

        if (!userId || !deviceId) {
            return res.status(401).json({ errorMsg: "Unauthorized" });
        }

        if (!cartId) {
            return res.status(404).json({ errorMsg: "Cart not found" });
        }

        const product = await GetProductById(productId);
        if (!product) {
            return res.status(404).json({ errorMsg: "Product not found" });
        }

        const cart = updateItemQuantity(cartId, productId, quantity, product.price);
        if (!cart) {
            return res.status(500).json({ errorMsg: "Failed to update item quantity" });
        }
        
        return res.status(200).json({ success: true, cart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Failed to update item quantity" });
    }
})




export default router;