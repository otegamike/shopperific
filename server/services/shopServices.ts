import Shop, {type ShopDataType} from "../models/Shop.js";
import { queryDatabase, AggregateCountObj } from "./database/DbAggregationPipeline.js";
import { AppError } from "../utils/appError.js";
import { toObjectId } from "../lib/mongoose.js";

export const getShopStats = async (shopId: string) => {
    try {
        const shopStatsPipeline: AggregateCountObj[] = [
            {
                fieldName: "Orders",
                match: { shopRef: toObjectId(shopId) },
                sumField: "productStats.sales"
            },
            {
                fieldName: "totalRevenue",
                match: { shopRef: toObjectId(shopId) },
                sumExpression: { $multiply: [
                    { $ifNull: ["$productStats.sales", 0] }, 
                    { $ifNull: ["$price", 0] }
                ] }
            },
            {
                fieldName: "visits",
                match: { shopRef: toObjectId(shopId) },
                sumField: "productStats.views"
            }
        ];

        const pendingOrdersPipeline:  AggregateCountObj[] = [
            {
                fieldName: "pendingOrders",
                match: { shopRef: toObjectId(shopId), status: "pending" },
            }
        ];

        const [productResults, orderResults ] = await Promise.all([
            queryDatabase("product", shopStatsPipeline),
            queryDatabase("order", pendingOrdersPipeline)
        ])

        if ("errorMsg" in productResults) throw new AppError(productResults.errorMsg, 404);
        if ("errorMsg" in orderResults) throw new AppError(orderResults.errorMsg, 404);
        
        const shopStats = {...productResults.docCount, ...orderResults.docCount}
        return shopStats;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.error("Error fetching shop:", error);
        throw new AppError("Error fetching shop", 500);
    }
}

export const getUserShopsData = async (userId: string): Promise<ShopDataType[] | null> => {
    try {
        const shops: ShopDataType[] = await Shop.find({userRef: toObjectId(userId)}).lean()
        if (shops.length === 0) return null
        return shops
    } catch (error) {
        console.log("error getting user shops" , error);
        throw new AppError("Internal server error", 500 );
    }
    
}