const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

// Check critical env vars
const requiredEnvVars = ["JWT_SECRET"];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error("❌ MISSING ENV VARS:", missingVars);
  process.exit(1);
}

const app = express();

/* ================= MIDDLEWARE ================= */

// Enable CORS with proper origin handling
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://career-guide-teal.vercel.app",
      /\.vercel\.app$/,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests (Express v5 does not support '*' wildcard)
// Preflight is handled by main CORS middleware above

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running 🚀", timestamp: new Date() });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

/* ================= DATABASE CONNECTION ================= */
console.log("📡 Connecting to MongoDB...");
connectDB();

/* ================= ROUTES ================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/career", require("./routes/careerRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
app.use("/api/resumes", require("./routes/resumeRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

/* ================= ERROR HANDLING ================= */
app.use((req, res) => {
  console.log(`404 - Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ message: "Route not found" });
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`✅ 🚀 Backend running on port ${PORT}`);
  console.log(`   Base URL: http://localhost:${PORT}`);
});