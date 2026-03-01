import Product from "../models/Product.js";
import { type ProductType as ProductInterface } from "../models/Product.js";

interface FullProductInterface extends ProductInterface {
    _id: string;
}

export const GetProductById = async (productId: string): Promise<FullProductInterface | null> => {
    try { 
        const product = await Product.findById(productId).lean();
        if (!product) {
            console.log("Product not found or does not exist");
            return null;
        }
        return product;
    } catch (error) {
        console.log(error);
        return null;
    }
}