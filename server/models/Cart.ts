import { db, Types } from "../lib/mongoose.js";
const { Schema, model, models } = db;
import { CartInterface } from "../types/cartInterface.js";
import { CartItem } from "../types/cartInterface.js";

const cartItemSchema = new Schema<CartItem>({
    productId: { type: String, required: true },
    productImage: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    productTotalPrice: { type: Number, required: true },
});

type CartShema = Omit<CartInterface, "_id"> & {
    userRef: Types.ObjectId;
};

const CartSchema = new Schema<CartShema>(
    {
        deviceId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: false,
        },
        items: {
            type: [cartItemSchema],
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        userRef: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export default models.Cart || model<CartShema>("Cart", CartSchema);
