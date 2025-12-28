import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const decodeToken = (token: string , tokenType: "access" | "refresh") => {
    const secret = tokenType === "access" ? process.env.JWT_ACCESS_SECRET_KEY as string : process.env.JWT_REFRESH_SECRET_KEY as string;

    try {
            const payload = jwt.verify(token, secret);
            return {decoded: true, payload};
        } catch (err: any) {
            console.error("Token verification failed", err.message);
            return {decoded: false, error: "Unauthorized"};
        }
}