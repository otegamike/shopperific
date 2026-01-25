import { db , Types } from "../lib/mongoose.js";
const { Schema, model, models } = db;

export interface ProductType {
  name: string;
  description: string;
  price: number;
  sellerId: string;
  category?: string;
  stock?: number;
  images?: string[];
  shopName: string;
  shopId: string;
  shopRef: Types.ObjectId;
}

const ProductSchema = new Schema<ProductType>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    sellerId: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    images: [{
      type: String
    }],
    shopName: {
      type: String,
      required: true,
    },
    shopId: {
      type: String,
      required: true,
    },
    shopRef: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    }
  },
  {
    timestamps: true
  }
);
export default models.Product || model<ProductType>("Product", ProductSchema);