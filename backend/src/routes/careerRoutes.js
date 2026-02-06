const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  predictCareer,
  getCareerHistory,
} = require("../controllers/careerController");

router.post("/predict", authMiddleware, predictCareer);
router.get("/history", authMiddleware, getCareerHistory);

module.exports = router;
