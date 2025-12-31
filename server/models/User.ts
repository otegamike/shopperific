
import { db } from "../lib/mongoose.js";
const { Schema, model, models } = db;

export type UserRole = "buyer" | "seller";

const RefreshTokenEntrySchema = new Schema({
  deviceId: { type: String, required: true },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now},
});

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "seller",
      required: true,
    },

    refreshTokens: {
      type: [RefreshTokenEntrySchema],
      default: [],
    },

    // provider: {
    //   type: String, // "google", "github", etc
    // },

    // providerId: {
    //   type: String,
    // },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", UserSchema);