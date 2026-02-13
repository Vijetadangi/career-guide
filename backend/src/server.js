const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: [
      "https://profound-nasturtium-3fea32.netlify.app",
      "https://698ed05c116ac688cc08dce7--profound-nasturtium-3fea32.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// ❌ REMOVE THIS LINE (it was crashing Render)
// app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
