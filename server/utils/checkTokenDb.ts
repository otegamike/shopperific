import User from  "../models/User.js";
import type { RefreshTokenEntry } from "./addDevice.js";

export const checkTokenDb = async (token: string, deviceId: string, userId: string): Promise<boolean> => {
    
    let bool: boolean = false;

    const user = await User.findById(userId)
        .select("refreshTokens");

    const sessions: RefreshTokenEntry[] = user.refreshTokens;
    if (!sessions) {
        return false;
    }

    console.log("Checking if token exists in DB for device");

    const exists = sessions.some( (s) =>
            s.deviceId === deviceId &&
            s.refreshToken === token
        );
    if (exists) {
        bool = true;
        console.log("Token found in DB for device:", deviceId);
    };
    return bool
}