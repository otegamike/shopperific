import User, { type UserDocument } from "../models/User.js";

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

export const updateUser = async ( userId: string, update: Partial<UserDocument> ): Promise<FullUserDocument | null> => {
    try {
        const user = await User.findByIdAndUpdate(userId, update, { new: true }).lean();
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
};