const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
