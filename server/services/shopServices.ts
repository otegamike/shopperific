import Shop, { type ShopDataType } from "../models/Shop.js";
import { complexDatabaseQuery, AggregateCountObj, CustomPipeline } from "./database/DbAggregationPipeline.js";
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
                sumExpression: {
                    $multiply: [
                        { $ifNull: ["$productStats.sales", 0] },
                        { $ifNull: ["$price", 0] }
                    ]
                }
            },
            {
                fieldName: "visits",
                match: { shopRef: toObjectId(shopId) },
                sumField: "productStats.views"
            }
        ];

        const pendingOrdersPipeline: AggregateCountObj[] = [
            {
                fieldName: "pendingOrders",
                match: { shopRef: toObjectId(shopId), status: "pending" },
            }
        ];

        const [productResults, orderResults] = await Promise.all([
            complexDatabaseQuery({ model: "product", countQuery: shopStatsPipeline }),
            complexDatabaseQuery({ model: "order", countQuery: pendingOrdersPipeline })
        ])

        if ("errorMsg" in productResults) throw new AppError(productResults.errorMsg, 404);
        if ("errorMsg" in orderResults) throw new AppError(orderResults.errorMsg, 404);

        const shopStats = { ...productResults.docCount, ...orderResults.docCount }
        return shopStats;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.error("Error fetching shop:", error);
        throw new AppError("Error fetching shop", 500);
    }
}

export const getUserShopsData = async (userId: string): Promise<ShopDataType[] | null> => {
    try {
        const shops: ShopDataType[] = await Shop.find({ userRef: toObjectId(userId) }).lean()
        if (shops.length === 0) return null
        return shops
    } catch (error) {
        console.log("error getting user shops", error);
        throw new AppError("Internal server error", 500);
    }

}

export const getShopsData = async (userId: string) => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const shopsDataPipeline: CustomPipeline[] = [
            {
                fieldName: "dashboardShopData",
                pipeline: [
                    // 1. Match shops owned by the user
                    {
                        $match: { userRef: toObjectId(userId) }
                    },
                    // 2. Lookup Products to get Count and Views
                    {
                        $lookup: {
                            from: "products",
                            localField: "_id",
                            foreignField: "shopRef",
                            as: "productData"
                        }
                    },
                    // 3. Lookup Orders to get Sales (Total Amount Sold)
                    {
                        $lookup: {
                            from: "orders",
                            localField: "_id",
                            foreignField: "shopRef",
                            as: "orderData"
                        }
                    },
                    // 4. Calculate everything in a Projection
                    {
                        $project: {
                            _id: 1,
                            shopName: 1,
                            shopId: 1,
                            displayImageUrl: 1,
                            productsCount: { $size: "$productData" },

                            // Summing views from the productStats object in the product array
                            visitors: { $sum: "$productData.productStats.views" },

                            // Total Sales: Sum of totalAmount from all orders
                            totalSalesRevenue: { $sum: "$orderData.totalAmount" },

                            // Monthly Sales: Sum of totalAmount where order was created this month
                            monthlySales: {
                                $sum: {
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: "$orderData",
                                                as: "order",
                                                cond: { $gte: ["$$order.createdAt", startOfMonth] }
                                            }
                                        },
                                        as: "filteredOrder",
                                        in: "$$filteredOrder.totalAmount"
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];

        const shopsData = await complexDatabaseQuery({model:"shop",customQuery: shopsDataPipeline})
        if ("errorMsg" in shopsData) throw new AppError(shopsData.errorMsg, 404);
        return shopsData;
    } catch (error) {
        console.log("error getting shops", error);
        throw new AppError("Internal server error", 500);
    }

}