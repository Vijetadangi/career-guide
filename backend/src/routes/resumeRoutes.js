const express = require("express");
const Resume = require("../models/Resume");
const auth = require("../middleware/authMiddleware"); // ✅ FIXED IMPORT

const router = express.Router();

/* ================= GET USER RESUMES ================= */
router.get("/", auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (err) {
    console.error("GET RESUME ERROR:", err);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
});

/* ================= CREATE / UPDATE RESUME ================= */
router.post("/", auth, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = req.body;

    let resume;

    if (data._id) {
      resume = await Resume.findOneAndUpdate(
        { _id: data._id, user: req.user.id },
        data,
        { new: true }
      );
    } else {
      resume = await Resume.create({
        ...data,
        user: req.user.id,
      });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (err) {
    console.error("SAVE RESUME ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Resume save failed",
      error: err.message,
    });
  }
});

/* ================= MOCK AI REWRITE ================= */
router.post("/rewrite", (req, res) => {
  res.json({
    rewritten: `Optimized: ${req.body.text}`,
  });
});

module.exports = router;
