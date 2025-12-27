import { db } from "../lib/mongoose.js";

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
    cached.promise = db.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30_000,
      socketTimeoutMS: 30_000,
      maxPoolSize: 10,
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
