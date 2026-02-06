const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

// TEST ROUTE (IMPORTANT)
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working ✅" });
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
