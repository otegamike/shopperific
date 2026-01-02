
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
  emailverificationExpiresAt: number;
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

export type User = 
  VerifyEmailType & 
  RefreshTokens & 
  RegisterUserType;

const UserSchema = new Schema<User>(
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
    emailverificationExpiresAt: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", UserSchema);










    // provider: {
    //   type: String, // "google", "github", etc
    // },

    // providerId: {
    //   type: String,
    // },