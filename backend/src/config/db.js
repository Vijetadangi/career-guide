const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/career_predictor",
      {
        serverSelectionTimeoutMS: 5000,
      }
    );

    console.log("✅ MongoDB connected to career_predictor");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
