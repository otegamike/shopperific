import { Types } from "../lib/mongoose.js";

export interface OrderItemType {
    productId: Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
}

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

export interface ShopOrderInterface {
    sellerRef: Types.ObjectId;
    shopRef: Types.ObjectId;
    orderUniqueId: string;
    orderitems: OrderItemType[];
    totalAmount: number;
    status: OrderStatus;
}

export type Orders = string;

export interface FullShopOrderInterface extends ShopOrderInterface {
    _id: Types.ObjectId;
}
