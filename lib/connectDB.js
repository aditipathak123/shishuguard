import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI or MONGODB_URI in .env.local");
}

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
      dbName: "forbabies",
      serverSelectionTimeoutMS: 5000,
    });

    return db.connections[0].readyState === 1;
  } catch (error) {
    console.error("DB Connection Error:", error?.message || error);
    return false;
  }
}

export default connectDB;
