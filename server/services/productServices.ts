import Product from "../models/Product.js";
import { type ProductType as ProductInterface, type ProductStatsType } from "../models/Product.js";
import { AppError } from "../utils/appError.js";

export interface FullProductInterface extends ProductInterface {
    _id: string;
}

export const GetProductById = async (productId: string): Promise<FullProductInterface> => {
    try { 
        const product = await Product.findById(productId).lean();
        if (!product) throw new AppError("Product not found or does not exist", 404);
        return product;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError("Internal Server Error", 500);
    }
}

export const UpdateProductStats = async (productId: string, stats: keyof ProductStatsType, value: number = 1): Promise<FullProductInterface | null> => {
    try { 
        const updateKey = `productStats.${stats}`;

        const product = await Product.findByIdAndUpdate(
            productId, 
            { $inc: { [updateKey]: value } }, // Correct way to increment nested fields
            { new: true }
        ).lean();

        if (!product) {
            console.error("Product not found or does not exist");
            return null;
        }

        return product as FullProductInterface;
    } catch (error) {
        console.log(error);
        return null;
    }
}