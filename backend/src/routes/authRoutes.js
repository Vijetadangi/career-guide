const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

// ✅ TEST ROUTE (keep this)
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Auth route working ✅" });
});

// ✅ REGISTER
router.post("/register", async (req, res, next) => {
  try {
    // Basic safety log (does NOT expose password)
    console.log("Register request received:", {
      name: req.body?.name,
      email: req.body?.email,
      hasPassword: !!req.body?.password,
    });

    await register(req, res);
  } catch (error) {
    console.error("Register route error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res, next) => {
  try {
    console.log("Login request received:", {
      email: req.body?.email,
      hasPassword: !!req.body?.password,
    });

    await login(req, res);
  } catch (error) {
    console.error("Login route error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
