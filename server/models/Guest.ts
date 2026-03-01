import { db } from "../lib/mongoose.js";
const { Schema, model, models } = db;

export interface GuestType {
    deviceId: string;
    cartId: string | null;
}

const GuestSchema = new Schema<GuestType>(
    {
        deviceId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        cartId: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export default models.Guest || model<GuestType>("Guest", GuestSchema);
