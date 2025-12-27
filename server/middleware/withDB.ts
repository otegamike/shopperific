import type { Request, Response, NextFunction } from "express";
import { connectDB } from "../utils/db.js";

export const  withDb = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection failed", err);
    res.status(500).json({ message: "Database connection failed" });
  }
}
