import mongoose from "mongoose";

declare global {
  var mongoose: any;
}

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env"
  );
}

let cached = global.mongoose as any;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "digital-products",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    if (!MONGODB_URL) {
      throw new Error(
        "Please define the MONGODB_URL environment variable inside .env"
      );
    }

    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
