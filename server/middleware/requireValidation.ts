
import type { Request, NextFunction } from "express";
import type { TypedResponse } from "../utils/types/utilTypes.js";


export const requireValidation = async (
  req: Request,
  res: TypedResponse<{errorMsg: string, validated: boolean }>,
  next: NextFunction
) => {
    if (!req.user || !req.user.validated) {
        return res.status(401).json({ errorMsg: "Unauthorized" , validated: false });
    }
    next();
 }