import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();    

const mongoURI = process.env.MONGO_URI as string;

if (!mongoURI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoURI, {
      dbName: "Shopperific",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}