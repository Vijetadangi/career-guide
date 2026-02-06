const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: String,
    role: String,
    email: String,
    phone: String,

    skills: [String],
    projects: [String],
    certificates: [String],

    education: [
      {
        degree: String,
        institute: String,
        year: String,
      },
    ],

    template: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
