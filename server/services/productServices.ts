import Product from "../models/Product.js";
import { type ProductType as ProductInterface, type ProductStatsType } from "../models/Product.js";
import { AppError } from "../utils/appError.js";
import { type OrderItemType } from "../types/orders.js";

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

export const getRecentlyAdded = async (limit = 10) => {
  return await Product.find({})
    .sort({ createdAt: -1 }) // Newest first
    .limit(limit);
};

export const getBestSellers = async (limit = 10) => {
  return await Product.find({ "productStats.sales": { $gt: 0 } })
    .sort({ "productStats.sales": -1 })
    .limit(limit);
};

export const getBestDeals = async (limit = 10) => {
  return await Product.aggregate([
    {
      $match: {
        // Ensure we only look at products that actually have reviews/ratings
        "productStats.rating": { $gte: 4 }, 
        "stock": { $gt: 0 }
      }
    },
    {
      $addFields: {
        // Higher score = Better deal (High rating for a low price)
        valueScore: { 
          $divide: ["$productStats.rating", "$price"] 
        }
      }
    },
    { $sort: { valueScore: -1 } },
    { $limit: limit }
  ]);
};

export const cheapestProducts = async (limit = 10) => {
  return await Product.find({ 
    stock: { $gt: 0 } 
  })
  .sort({ price: 1 }) 
  .limit(limit); 
};

export const updateSalesStats = async (orderItems: OrderItemType[]) => {
  const bulkOps = orderItems.map(item => ({
    updateOne: {
      filter: { _id: item.productId },
      update: { $inc: { "productStats.sales": item.quantity } }
    }
  }));
  await Product.bulkWrite(bulkOps);
};