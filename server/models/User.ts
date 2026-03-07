
import { db } from "../lib/mongoose.js";
import { RefreshTokenEntry } from "../utils/addDevice.js";
const { Schema, model, models } = db;

export type UserRole = "buyer" | "seller";

const RefreshTokenEntrySchema = new Schema({
  deviceId: { type: String, required: true },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now},
});

export interface VerifyEmailType {
  isEmailVerified: boolean;
  emailVerificationToken: string;
  emailVerificationCode: string;
  emailVerificationExpiresAt: number;
}

export interface RegisterUserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface RefreshTokens {
  refreshTokens: RefreshTokenEntry[];
}

type CartId = {
  cartId: string;
}

type Orders = {
  orders: string[];
}

export type UserDocument = 
  VerifyEmailType & 
  RefreshTokens & 
  RegisterUserType &
  CartId &
  Orders;

const UserSchema = new Schema<UserDocument>(
  {
   
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

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
      default: "buyer",
      required: true,
    },
    
    refreshTokens: {
      type: [RefreshTokenEntrySchema],
      default: [],
    },

    // Cart
    cartId: {
      type: String,
      required: false,
      unique: true,
      default: null,
    },


    // For Email verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      trim: true,
    },
    emailVerificationCode: {
      type: String,
      trim: true
    },
    emailVerificationExpiresAt: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", UserSchema);


