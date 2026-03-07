import { db, Types } from "../lib/mongoose.js";
const { Schema, model, models } = db;
import  type { ShopOrderInterface , OrderItemType} from "../types/orders.js";

const OrderItemSchema = new Schema<OrderItemType>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtPurchase: {
    type: Number,
    required: true,
  },
});


const OrderSchema = new Schema<ShopOrderInterface>(
  {
    shopRef: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true,
    },
    orderitems: {
      type: [OrderItemSchema],
      required: true,
      validate: (arr: any[]) => arr.length > 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Order || model<ShopOrderInterface>("Order", OrderSchema);
