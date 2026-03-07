import { Router } from "express";
import { createCart, getCartId, convertCartToClientCart, addItemToCart, removeItemFromCart, updateItemQuantity, productToCartItem, clearCart } from "../services/cartServices.js";
import { getUserById, updateUser } from "../services/userServices.js";
import { getGuest, createGuestCart } from "../services/guest.js";
import { GetProductById } from "../services/productServices.js";

import { CartItem, ClientCart } from "../types/cartInterface.js";
import { TypedResponse } from "../utils/types/utilTypes.js";
import { tResponseError } from "../types/routesInterface.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../middleware/errorHandler.js";
import { Request, Response } from "express";

const router = Router();

router.post('/add-new-item', catchAsync(async (req: Request, res: Response): Promise<TypedResponse<ClientCart | tResponseError>> => {
    
    const userObj = req.user;
    const { item }: { item: CartItem } = req.body;
    console.log(userObj, item);

    if (!userObj) throw new AppError("Unauthorized", 401);

    const { deviceId, userId, role } = userObj;
    if (!userId || !deviceId || !role) throw new AppError("Unauthorized", 401);

    let cartId = await getCartId(userId, deviceId);
    if (!cartId) {
        // initaite new cart if user doesn't have a cart
        const newCart = await createCart(userId, deviceId);
        const newCartId = newCart._id;
        cartId = newCartId;

        if (role === "guest") {
           await createGuestCart(deviceId, newCartId);
        } else {
            await updateUser(userId, { cartId });
        }
    }

    const product = await GetProductById(item.productId);
    const cartItem = productToCartItem(product);

    const cart = await addItemToCart(cartId, cartItem);

    const clientCart = convertCartToClientCart(cart);

    return res.status(200).json({ success: true, clientCart });

}))

router.post('/remove-item', catchAsync(async (req: Request, res: Response): Promise<TypedResponse<ClientCart>> => {
    
    const userObj = req.user;

    const { productId }: { productId: string } = req.body;

    if (!userObj || !userObj.deviceId || !userObj.userId) throw new AppError("Unauthorized", 401, {validated: false});
    
    const { deviceId, userId } = userObj;

    let cartId = await getCartId(userId, deviceId);
    const cart = await removeItemFromCart(cartId, productId);
    const clientCart = convertCartToClientCart(cart);

    return res.status(200).json({ success: true, clientCart });

}))

router.post('/update-item-quantity', catchAsync(async (req: Request, res: Response): Promise<TypedResponse<ClientCart>> => {
   
    // check user credentials
    const userObj = req.user;
    // get request body
    const { productId, quantity }: { productId: string, quantity: number } = req.body;

    // log user out if user has not been validated or not authenticated
    if (!userObj || !userObj.deviceId || !userObj.userId) throw new AppError("Unauthorized", 401, {validated: false});

    const { deviceId, userId } = userObj;
    // get cart id and update item quantity
    let cartId = await getCartId(userId, deviceId);
    const product = await GetProductById(productId);
    const cart = await updateItemQuantity(cartId, productId, quantity, product.price);
    const clientCart = convertCartToClientCart(cart);

    return res.status(200).json({ success: true, clientCart });

}))

router.post('/clear-cart', catchAsync(async (req: Request, res: Response): Promise<TypedResponse<ClientCart>> => {
    
    const userObj = req.user;

    if (!userObj || !userObj.deviceId || !userObj.userId) throw new AppError("Unauthorized", 401, {validated: false});
    
    const { deviceId, userId } = userObj;
    let cartId = await getCartId(userId, deviceId);
    await clearCart(cartId);

    return res.status(200).json({ success: true });

}))



export default router;