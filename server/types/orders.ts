import { Types } from "../lib/mongoose.js";

export interface OrderItemType {
    product: Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
}

export interface OrderType {
  seller: Types.ObjectId;
  shop: Types.ObjectId;
  products: OrderItemType[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}