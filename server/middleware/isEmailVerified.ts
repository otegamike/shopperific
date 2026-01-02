import type { Request, Response, NextFunction } from "express";
import { quickCheckDb } from "../services/fetchFromDb";

export const isEmailVerified = async (req: Request, res: Response, next: NextFunction) => { 

    const email = req.user?.email;
    const userId = req.user?.userId;

    if ( typeof email !== "string" || !email || typeof userId !== "string" || !userId) {
        return res.status(401).json({ error: "Unauthorized Access is forbidden" });
    }

    const emailVerifyStatus = await quickCheckDb("user", {email, userId}, "isEmailVerified -id");

    if (!emailVerifyStatus.found) {
        return res.status(500).json({ error: "Internal serveer error. Try again later." });
    }

    const verify = emailVerifyStatus.payload as any;

    if (!verify.isEmailVerified) {
         return res.status(401).json({ error: "Your Email Adress is unverified. Pkease verify." });
    }

    next()

}
