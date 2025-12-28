import { db } from "../lib/mongoose.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

type MongooseCache = {
  conn: typeof db | null;
  promise: Promise<typeof db> | null;
};

const globalForMongoose = globalThis as unknown as {
  _mongooseCache?: MongooseCache;
};

const cached =
  globalForMongoose._mongooseCache ??
  (globalForMongoose._mongooseCache = { conn: null, promise: null });

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = db.connect(MONGODB_URI,  {
      dbName: "Shopperific",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
   console.log(
    "Mongoose connection state:",
    db.connection.readyState
  );
  return cached.conn;
}
