import type { Request, Response, NextFunction } from "express";
import { findOneFromDB } from "../services/database/fetchFromDb.js";

export const isEmailVerified = async (req: Request, res: Response, next: NextFunction) => {

    const email = req.user?.email;
    const userId = req.user?.userId;

    if (typeof email !== "string" || !email || typeof userId !== "string" || !userId) {
        res.status(401).json({ error: "Unauthorized Access is forbidden" });
        console.log("Unauthorized Access is forbidden Email or userId is invalid");
        return;
    }

    const emailVerifyStatus = await findOneFromDB("user", { email, userId }, "isEmailVerified -id");

    if (!emailVerifyStatus.found) {
        res.status(500).json({ error: "Internal serveer error. Try again later." });
        console.log("Internal serveer error. Try again later.");
        return;
    }

    const verify = emailVerifyStatus.payload as any;

    if (!verify.isEmailVerified) {
        res.status(401).json({ error: "Your Email Adress is unverified. Pkease verify." });
        console.log("Your Email Adress is unverified. Pkease verify.");
        return;
    }

    next()

}
