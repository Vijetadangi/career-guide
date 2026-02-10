const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: "https://profound-nasturtium-3fea32.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));

/* ================= DATABASE ================= */
connectDB();

/* ================= ROUTES ================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/career", require("./routes/careerRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
app.use("/api/resumes", require("./routes/resumeRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
