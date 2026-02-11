const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

/* ================= TEST ROUTE ================= */
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Auth route working ✅" });
});

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    await register(req, res);
  } catch (error) {
    console.error("Register route error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.error("Login route error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
