
import type { Request, Response, NextFunction } from "express";
import { createToken } from "../utils/createToken.js";
import { ReqUser } from "../utils/types/utilTypes.js";
import { decodeToken } from "../utils/decodeToken.js";
import dotenv from "dotenv";
import { checkTokenDb } from "../utils/checkTokenDb.js";


dotenv.config();


export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  //checks
  let userObj: ReqUser | null = null;
  let isVerified = false;
  let newAccessToken = null;

  //Authorization Credentials 
  const deviceId = req.headers["x-device-id"] as string;
  const authHeader = req.headers.authorization;
  const refreshToken = req.cookies?.refreshToken;

    if (authHeader?.startsWith("Bearer ")) {
        console.log("Access token found in Authorization header. Verifying...");
        const accessToken = authHeader.split(" ")[1];

        const verifyToken = decodeToken(accessToken, "access");

        if (verifyToken.decoded) {
            isVerified = true;
            const payload = verifyToken.payload as { userId: string; email: string; role: "buyer" | "seller" };
            userObj = { userId: payload.userId, email: payload.email, role: payload.role };
            console.log("Access token verified. userObj set.");
        }
    }

    if (!isVerified && !userObj && refreshToken) {
        
        // if access token invalid or non-existant, try refresh token.
        console.log("Error verifying access token. Verifying refresh token from cookies...");
        const verifyToken = decodeToken(refreshToken, "refresh");
        
        if (verifyToken.decoded) {
            console.log("Refresh token verified. Checking token in DB...");
            const payload = verifyToken.payload as { userId: string; email: string; role: "buyer" | "seller" };
            
            // Check if token exists in DB for that user and device
            const tokenValidInDb = await checkTokenDb(refreshToken, deviceId, payload.userId);
            if (tokenValidInDb) {
                userObj = { userId: payload.userId, email: payload.email, role: payload.role };
                isVerified = true;
                // Issue a new accesstoken
                newAccessToken = createToken(userObj, "access");
                console.log("Refresh token valid in DB. New access token issued.");
            }
        }
       
    }

    if (!isVerified || !userObj) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    if (newAccessToken) {
       res.setHeader("Authorization", `Bearer ${newAccessToken}`);
    }

        req.user = userObj;  
        next(); 
};