import Order from "../models/Order.js";
import type { ShopOrderInterface, OrderItemType, FullShopOrderInterface, Orders } from "../types/orders.js";
import { type CartInterface } from "../types/cartInterface.js";
import { toObjectId } from "../lib/mongoose.js";
import { UpdateProductStats } from "./productServices.js";
import { AppError } from "../utils/appError.js";
import { generateUniqueId } from "../utils/generateAphaNumId.js";
import { type Pagination } from "../utils/paginationHelper.js";
import { type ProjectionParameters, type CustomPipeline, type AggregateCountObj, complexDatabaseQuery } from "../services/database/DbAggregationPipeline.js";

interface OrderInterface extends ShopOrderInterface {
    _id: string;
}

export function generateOrderId() {
    return generateUniqueId("ORD");
}

export async function createOrder(cart: CartInterface): Promise<Orders> {
    try {
        const items = cart.items;

        if (!items || items.length === 0) throw new AppError("Cannot create order: Cart is empty", 400);

        // Use a Record to group and accumulate totals simultaneously
        const orderId = generateOrderId();
        const groupedOrders: Record<string, ShopOrderInterface> = {};
        const products: { productId: string, quantity: number }[] = [];

        items.forEach((item) => {
            console.log(item);
            const { productShopRef, productPrice, productQuantity, productId, productSellerRef } = item;
            const itemTotal = productPrice * productQuantity;
            products.push({ productId, quantity: productQuantity });

            const newOrderItem: OrderItemType = {
                productId: toObjectId(productId),
                quantity: productQuantity,
                priceAtPurchase: productPrice
            };

            if (!groupedOrders[productShopRef]) {
                // Initialize a new shop order if it doesn't exist
                groupedOrders[productShopRef] = {
                    sellerRef: toObjectId(productSellerRef),
                    shopRef: toObjectId(productShopRef),
                    orderUniqueId: orderId,
                    orderitems: [newOrderItem],
                    totalAmount: itemTotal, // Start the total
                    status: "pending"          // Default status
                };
            } else {
                // Update existing shop order
                groupedOrders[productShopRef].orderitems.push(newOrderItem);
                groupedOrders[productShopRef].totalAmount += itemTotal;
            }
        });

        console.log(groupedOrders);

        // Convert the record object into the final array
        const shopOrders: ShopOrderInterface[] = Object.values(groupedOrders);

        const createdOrders: FullShopOrderInterface[] = await Order.insertMany(shopOrders, { ordered: true });

        const updatedProducts = await Promise.all(
            products.map(product => UpdateProductStats(product.productId, "sales", product.quantity))
        );

        // updatedProducts is an array, so we check if any stat update returned null or rejected
        if (!updatedProducts || updatedProducts.includes(null)) throw new AppError("Failed to update product stats", 400);

        const orders = createdOrders.map(order => order._id.toString());
        return orderId;

    } catch (error: any) {
        if (error.name === 'ValidationError') {
            console.error("Data didn't match the schema:", error.message);
        } else if (error.code === 11000) {
            console.error("Duplicate Key Error: One of these orders already exists.");
        } else {
            console.error("A bulk write error occurred:", error);
        }
        throw new AppError("internal server error", 500);
    }
}


export const getOrderById = async (orderId: string): Promise<FullShopOrderInterface | null> => {
    try {
        const order = await Order.findById(orderId).lean();
        if (!order) {
            console.error("Order not found or does not exist");
            return null;
        }
        return order;
    } catch (error) {
        console.error("Error fetching order:", error);
        return null;
    }
}

export const getOrderByParameter = async (parameter: Partial<OrderInterface>, select: string | Record<string, 0 | 1> | {} = {}): Promise<OrderInterface[]> => {
    try {
        const order = await Order.find(parameter, select, { new: true }).lean();
        if (!order) throw new AppError("order not found", 404);
        return order;
    } catch (error) {
        if (error instanceof AppError) throw error
        console.error("Error fetching order:", error, parameter);
        throw new AppError("Error fetching order by parameter", 500)
    }
}

interface OrdersAndStatsParameters {
    userId: string;
    shopId?: string;
    pagination?: Pagination;
    status?: string;
}

export const getOrdersAndStats = async (parameters: OrdersAndStatsParameters) => {
    const { userId, shopId, pagination, status } = parameters;
    console.log(parameters);

    // Fallback values for pagination
    const skip = pagination?.skip || 0;
    const limit = pagination?.limit || 12;

    const $match = {
        sellerRef: toObjectId(userId),
        ...(shopId && shopId !== "" && { shopRef: toObjectId(shopId) }),
        ...(status && status !== "" && { status })
    };

    console.log("match", $match)

    try {
        const customPipelines: CustomPipeline[] = [
            {
                fieldName: "orderProducts",
                pipeline: [
                    { $match: $match },
                    { $unwind: "$orderitems" },
                    { $lookup: { from: "products", localField: "orderitems.productId", foreignField: "_id", as: "product" } },
                    { $unwind: "$product" },
                    {
                        $project: {
                            _id: 1,
                            status: 1,
                            orderId: "$orderUniqueId",
                            quantity: "$orderitems.quantity",
                            price: "$orderitems.priceAtPurchase",
                            date: "$createdAt",
                            productName: "$product.name",
                            image: "$product.images",
                            productId: "$product._id",
                        }
                    },
                    //Sort before paginating to ensure consistent results
                    { $sort: { date: -1 } },
                    // Apply pagination
                    { $skip: skip },
                    { $limit: limit }
                ]
            }
        ];

        const countParameters: AggregateCountObj[] = [
            { fieldName: "pending", match: { ...$match, status: "pending" } },
            { fieldName: "shipped", match: { ...$match, status: "shipped" } },
            { fieldName: "delivered", match: { ...$match, status: "delivered" } },
            { fieldName: "cancelled", match: { ...$match, status: "cancelled" } },
            //Count total items (unwound) so the frontend knows total pages
            { fieldName: "totalItems", match: $match }
        ];

        const orderData = await complexDatabaseQuery({model:"order", countQuery: countParameters, customQuery: customPipelines});

        console.log(orderData);
        if ("errorMsg" in orderData) throw new AppError(orderData.errorMsg, 500);

        const { orderProducts, docCount: stats } = orderData;

        return {
            orderProducts,
            stats,
            clientPagination: {
                totalItems: stats.totalItems,
                currentPage: Math.floor(skip / limit) + 1,
                limit
            }
        };

    } catch (error) {
        if (error instanceof AppError) throw error;
        console.error("Error fetching orders and stats:", error);
        throw new AppError("Error fetching orders and stats", 500);
    }
}