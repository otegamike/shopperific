import Order from "../models/Order.js";
import { type ShopOrderInterface, OrderItemType, FullShopOrderInterface } from "../types/orders.js";
import { type CartInterface } from "../types/cartInterface.js";
import { toObjectId } from "../lib/mongoose.js";
import { UpdateProductStats } from "./productServices.js";
import { AppError } from "../utils/appError.js";



export async function createOrder(cart: CartInterface): Promise<string[]> {
    try {
        const items = cart.items;

        if (!items || items.length === 0) throw new AppError("Cannot create order: Cart is empty", 400);

        // Use a Record to group and accumulate totals simultaneously
        const groupedOrders: Record<string, ShopOrderInterface> = {};
        const products: { productId: string, quantity: number }[] = [];

        items.forEach((item) => {
            const { productShopRef, productPrice, productQuantity, productId } = item;
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
                    shopRef: toObjectId(productShopRef),
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

        // Convert the record object into the final array
        const shopOrders: ShopOrderInterface[] = Object.values(groupedOrders);

        console.log("Grouped Shop Orders:", shopOrders);

        const createdOrders: FullShopOrderInterface[] = await Order.insertMany(shopOrders, { ordered: true });

        const updatedProducts = await Promise.all(
            products.map(product => UpdateProductStats(product.productId, "sales", product.quantity))
        );

        // updatedProducts is an array, so we check if any stat update returned null or rejected
        if (!updatedProducts || updatedProducts.includes(null)) throw new AppError("Failed to update product stats", 400);

        const orders = createdOrders.map(order => order._id.toString());
        return orders;

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
