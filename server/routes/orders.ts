import { Router } from "express";
import { createOrder } from "../services/OrderServices.js";
import { getCart, getCartId } from "../services/cartServices.js";
import { catchAsync } from "../middleware/errorHandler.js";
import { AppError } from "../utils/appError.js";
import { type Request, type Response } from "express";
import { updateOrders } from "../services/userServices.js";

const router = Router();

router.post("/create", catchAsync(async (req: Request, res: Response) => {

    const user = req.user;
    if (!user) throw new Error("Unauthorized");

    const { userId, deviceId } = user;

    if (!userId || !deviceId) throw new AppError("User ID and Device ID are required", 400);

    const cartId = await getCartId(userId, deviceId);
    const cart = await getCart(cartId);

    const orders = await createOrder(cart);

    await updateOrders(userId, orders);
    return res.status(201).json({ message: "Order created successfully", orders });

}));

export default router;