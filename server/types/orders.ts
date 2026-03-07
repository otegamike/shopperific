import { Types } from "../lib/mongoose.js";

export interface OrderItemType {
    productId: Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
}

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

export interface ShopOrderInterface {
    shopRef: Types.ObjectId;
    orderitems: OrderItemType[];
    totalAmount: number;
    status: OrderStatus;
}

export interface FullShopOrderInterface extends ShopOrderInterface {
    _id: Types.ObjectId;
}
