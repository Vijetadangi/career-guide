
const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is not defined in environment variables!");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    // Don't exit - let the server start anyway with a failed DB connection
    console.log("⚠️  Server starting without database connection...");
  }
};

module.exports = connectDB;
