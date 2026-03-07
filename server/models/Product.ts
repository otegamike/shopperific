// MongoDB models and types
import { db , Types } from "../lib/mongoose.js";
const { Schema, model, models } = db;

// Types
import type { Category } from "../types/productInterface.js";

export interface ProductType {
  name: string;
  description: string;
  price: number;
  sellerId: string;
  category?: Category;
  subCategory?: string;
  stock?: number;
  images?: string[];
  shopName: string;
  productStats?: ProductStatsType;
  shopId: string;
  shopRef: Types.ObjectId;
}

export interface ProductStatsType {
  views?: number;
  likes?: number;
  comments?: number;
  sales?: number;
  rating?: number;
  reviews?: number;
}

const ProductStatsSchema = new Schema<ProductStatsType>(
  {
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    sales: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    }
  }
);

const ProductSchema = new Schema<ProductType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      index: true
    },
    sellerId: {
      type: String,
      required: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      index: true
    },
    subCategory: {
      type: String,
      required: false,
      index: true
    },
    stock: {
      type: Number,
      required: true
    },
    images: [{
      type: String
    }],
    productStats: {
      type: ProductStatsSchema,
    },
    shopName: {
      type: String,
      required: true,
    },
    shopId: {
      type: String,
      required: true,
      index: true
    },
    shopRef: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

ProductSchema.index(
  { 
    name: "text", 
    description: "text", 
    category: "text", 
    subCategory: "text" 
  },
  { 
    weights: { name: 10, category: 5, description: 1 },
    name: "ProductSearchIndex" 
  }
);

ProductSchema.index({ shopRef: 1, category: 1, createdAt: -1 });
ProductSchema.index({ "productStats.views": -1 }); 
ProductSchema.index({ "productStats.likes": -1 });
ProductSchema.index({ "productStats.sales": -1 });
ProductSchema.index({ "productStats.rating": -1 });
ProductSchema.index({ "productStats.reviews": -1 });

export default models.Product || model<ProductType>("Product", ProductSchema);