import type { Request, Response, NextFunction } from "express";

export const requireSeller = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== "seller") {
        return res.status(403).json({ message: "Forbidden: Seller access required." });
    }
    next();
};