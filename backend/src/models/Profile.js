const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    predictedCareer: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
      required: true,
    },
    missingSkills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
