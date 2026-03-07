import User, { type UserDocument } from "../models/User.js";
import { AppError } from "../utils/appError.js";


import { Orders } from "../types/orders.js";
interface FullUserDocument extends UserDocument {
    _id: string;
}

export const getUserById = async (userId: string): Promise<FullUserDocument | null> => {
    try {
        const user = await User.findById(userId).lean();
        if (!user) {
            console.log("User not found or does not exist");
            return null;
        }
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export const updateUser = async ( userId: string, update: Partial<UserDocument> ): Promise<FullUserDocument> => {
    try {
        const user = await User.findByIdAndUpdate(userId, update, { new: true }).lean();
        if (!user) throw new AppError("User not found or does not exist", 404);
        return user;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.error("Error updating user:", error);
        throw new AppError("Error updating user", 500);
    }
};

export const updateUserOrders = async (userId: string, order: Orders): Promise<void> => {
    try {
        console.log(order)
        const user: FullUserDocument = await User.findByIdAndUpdate(userId, { $push: { orders: order } }, { new: true }).lean();
        if (!user) throw new AppError("User not found or does not exist", 404);
        console.log(`user ${user.email} orders updated successfully: orderId ${user.orders}`)
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.error("Error updating user:", error);
        throw new AppError("Error updating user", 500);
    }
}