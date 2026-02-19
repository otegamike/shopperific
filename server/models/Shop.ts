import { db , Types } from "../lib/mongoose.js";
const { Schema, model, models } = db;

export interface ShopReqBody {
    shopName: String;
    shopId: String;
    description: String;
}

export interface ShopDataType {
    shopName: String;
    shopId: String;
    displayImageUrl: string;
    description: String;
    productsCount: Number;
    salesCount: Number;
    sellerIndex: Number;
    sellerId: String;
    userRef: Types.ObjectId;
}

export type ShopSchema = ShopDataType;

const ShopSchema = new Schema<ShopSchema> (
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