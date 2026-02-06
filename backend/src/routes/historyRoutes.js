const express = require("express");
const router = express.Router();
const {
  saveHistory,
  getHistory,
} = require("../controllers/historyController");

// SAVE prediction history
router.post("/", saveHistory);

// FETCH history
router.get("/", getHistory);

module.exports = router;
