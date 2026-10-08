import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn(
      "MongoDB connection skipped: MONGO_URI is not configured. Database-dependent routes will be unavailable."
    );
    return false;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Mongodb connected");
    return true;
  } catch (error) {
    console.error("mongodb connection failed", error);
    return false;
  }
};

export default connectDB;