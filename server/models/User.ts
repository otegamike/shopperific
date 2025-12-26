import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

export type UserRole = "buyer" | "seller";

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
      required: true,
    },

    // provider: {
    //   type: String, // "google", "github", etc
    // },

    // providerId: {
    //   type: String,
    // },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", UserSchema);