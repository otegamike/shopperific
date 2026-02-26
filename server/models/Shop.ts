import { db , Types } from "../lib/mongoose.js";
const { Schema, model, models } = db;

export interface ShopReqBody {
    shopName: string;
    shopId: string;
    description: string;
}

export interface ShopDataType {
    _id: Types.ObjectId;
    shopName: string;
    shopId: string;
    displayImageUrl: string;
    description: string;
    productsCount: number;
    salesCount: number;
    sellerIndex: number;
    sellerId: string;
    userRef: Types.ObjectId;
}

export type ShopSchema = ShopDataType;

const ShopSchema = new Schema<Omit<ShopSchema, "_id">> (
  {
    shopName: {
        type: String,
        required: true,
        trim: true,
    },
    shopId: {
        type: String,
        unique: true,
        required:  true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    displayImageUrl: {
        type: String,
        required: true,
        trim: true,
    },
    productsCount: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    salesCount: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    sellerIndex: {
        type: Number,
        required: true
    },
    sellerId: {
        type: String,
        required: true,
        trim: true
    },
    userRef: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

  },
  {
    timestamps: true,
  }
);

export default models.Shop || model("Shop", ShopSchema);