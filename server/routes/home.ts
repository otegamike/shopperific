import {Router, type Request, type Response} from "express";
import { getRecentlyAdded, getBestSellers, cheapestProducts as getBestDeals } from "../services/productServices.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../middleware/errorHandler.js";

const router = Router();

router.get("/", catchAsync(async (req: Request, res: Response) => {

    const user = req.user;

    if (!user) throw new AppError("User not found or does not exist", 404);

    const [recentlyAdded, bestSellers, bestDeals] = await Promise.all([
        getRecentlyAdded(),
        getBestSellers(),
        getBestDeals()
    ]);
    res.json({ recentlyAdded, bestSellers, bestDeals });
}));

export default router;