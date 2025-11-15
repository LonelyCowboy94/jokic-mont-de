import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// runtime provera
if (!MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}

// sada TS zna da je ovo string
const mongoUri: string = MONGO_URI;

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

const cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export default async function connectMongo(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
