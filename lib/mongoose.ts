import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/print-hub";

type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var Mongoose: MongooseConnection;
}

if (!global.Mongoose) global.Mongoose = { conn: null, promise: null };

async function dbConnect() {
  if (global.Mongoose.conn) return global.Mongoose.conn;

  if (!global.Mongoose.promise) {
    global.Mongoose.promise = mongoose
      .connect(MONGO_URI, { dbName: "tomiwa_printhub", bufferCommands: false })
      .then((mongoose) => mongoose);
  }
  global.Mongoose.conn = await global.Mongoose.promise;
  await dbConnect().
  return global.Mongoose.conn;
}


export default dbConnect;
