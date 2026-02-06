const History = require("../models/History");

/* ================= SAVE HISTORY ================= */
exports.saveHistory = async (req, res) => {
  try {
    const { role, confidence, skills } = req.body;

    if (!role || !confidence || !skills) {
      return res.status(400).json({ message: "Invalid history data" });
    }

    const history = await History.create({
      role,
      confidence,
      skills,
    });

    res.status(201).json(history);
  } catch (err) {
    console.error("Save history error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET HISTORY ================= */
exports.getHistory = async (req, res) => {
  try {
    const history = await History.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error("Get history error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
