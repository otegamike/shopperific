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
      required: false
    },
    stock: {
      type: Number,
      required: false
    },
    images: [{
      type: String
    }],
    shopName: {
      type: String,
      require: true,
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