import { Router } from "express";

// types
import type { Request } from "express";
import type { TypedResponse } from "../utils/types/utilTypes.js";
import type { tSellerResponseSuccess , tResponseError } from "../types/routesInterface.js";
import type { userObj , Role } from "../types/validationInterface.js";

//utils
import { setRefreshTokensArray } from "../utils/RefreshDBTokens.js";
import { createToken } from "../utils/createToken.js";

//services
import { findAndUpdate } from "../services/saveToDb.js";

//utils
import { toObjectId } from "../lib/mongoose.js";

const router = Router();

router.post("/new", async(req: Request, res: TypedResponse<tSellerResponseSuccess | tResponseError>) => {

    const deviceId: string = req.headers["x-device-id"] as string;
    if (!req.user || !deviceId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { userId, email, role } = req.user ;

    if (role == "seller") {
        res.status(403).json({ errorMsg: "You're already a seller." });
        return;
    }

    const newRole: Role = "seller";
    const findBy = { _id: toObjectId(userId) };
    const update = { role: newRole };
    const options = { new: false };

    const seller = await findAndUpdate("user", findBy, update, options);
    
    if (!seller.updated) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    if (!seller.newData) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    const user = seller.newData;

    if (user.role === "seller" && role as string === "seller") {
        res.status(200).json({ message: "You're already a seller" });
        return;
    }

    // update refresh tokens with new data

    const newUserObj: userObj  = { userId, email, role: newRole };
    const {newRefreshTokenArr, refreshToken} = setRefreshTokensArray( newUserObj, deviceId, );

    const updateRefreshTokens = await findAndUpdate("user", findBy, { refreshTokens: newRefreshTokenArr });

    if (!updateRefreshTokens.updated) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

    res.setHeader("Authorization", `Bearer ${createToken(newUserObj, "access")}`);

    res.json({ message: "you're now a  Shopperific  seller" });
});

export default router;
