import { createToken } from "./createToken.js";
import type { userObj } from "../types/validationInterface.js";
import { addNewDevice, type RefreshTokenEntry } from "./addDevice.js";

export const createRefreshTokenObject = (
    deviceId: string , 
    refreshToken: string, 
    createdAt: Date): RefreshTokenEntry =>  {
    return {
        deviceId,
        refreshToken,
        createdAt
    }
}

export const setRefreshTokensArray = ( 
    userObj: userObj , 
    deviceId: string,
    oldRefreshTokenArr?: RefreshTokenEntry[]): { newRefreshTokenArr: RefreshTokenEntry[], refreshToken: string } => {

        const refreshToken = createToken(userObj, "refresh");
        const refreshTokenObject = createRefreshTokenObject(deviceId, refreshToken, new Date());
        const newRefreshTokenArr = addNewDevice(oldRefreshTokenArr || [], refreshTokenObject);
    
        return { newRefreshTokenArr, refreshToken } ;
}