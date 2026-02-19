import type { Request, Response, NextFunction } from "express";
import { toObjectId } from "../lib/mongoose.js";
import Shop from "../models/Shop.js";

export const requireSeller = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== "seller" || !req.user?.userId) {
        res.status(403).json({ message: "Forbidden: Seller access required." });
        console.log("Forbidden: Seller access required.");
        return;
    }

    const { currentShop } = req.body;

    const currentShopRef = currentShop?{ _id: toObjectId(currentShop) }:{ };

    const shop = await Shop.findOne({ sellerId: req.user.userId, ...currentShopRef });
    
    console.log("requireSeller:", currentShop, shop);
    if (shop) {
       req.user.sellerId = shop.sellerId;
       req.user.shopRef = shop._id.toString();
       req.user.shopName = shop.shopName;
       req.user.shopId = shop.shopId;
    }

    next();
};