import { db , Types } from "../lib/mongoose.js";
const { Schema, model, models } = db;

export interface ShopReqBody {
    shopName: String;
    shopId: String;
    description: String;
}

export type ShopSchema = ShopReqBody & { sellerId: Number, owner: Types.ObjectId };

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
    sellerId: {
        type: Number,
        required: true
    },
    owner: {
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