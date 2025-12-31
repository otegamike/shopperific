import type { Request, Response, NextFunction } from "express";
import { toObjectId } from "../lib/mongoose.js";
import Shop from "../models/Shop.js";

export const requireSeller = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== "seller" || !req.user?.userId) {
        return res.status(403).json({ message: "Forbidden: Seller access required." });
    }

    const shop = await Shop.findOne({ owner: toObjectId(req.user.userId) });
    
    if (shop) {
       req.user.shopOwnerId = shop._id.toString();
       req.user.shopName = shop.shopName;
    }

    next();
};