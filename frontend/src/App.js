import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SkillTestPage from "./pages/SkillTestPage";
import SkillAnalysis from "./pages/SkillAnalysis";

import Landing from "./pages/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Contact from "./pages/Contact";

import Skills from "./pages/Skills";
import Roadmap from "./pages/Roadmap";
import Resume from "./pages/Resume";

import Predict from "./pages/Predict";
import ResumeBuilder from "./pages/ResumeBuilder";
import ProgressTracker from "./pages/ProgressTracker";
import "./styles/theme.css";


function App() {
  const [darkMode, setDarkMode] = useState(false);

  /* ================= USER ID INITIALIZATION ================= */
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", "demo-user-123");
    }
  }, []);

  /* ================= DARK MODE ================= */
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={darkMode ? "app dark" : "app"}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= SKILL FLOW ================= */}
          <Route
            path="/skill-test"
            element={
              <ProtectedRoute>
                <SkillTestPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/skill-analysis"
            element={
              <ProtectedRoute>
                <SkillAnalysis />
              </ProtectedRoute>
            }
          />

          {/* ================= DASHBOARD ================= */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= CAREER ================= */}
          <Route
            path="/predict"
            element={
              <ProtectedRoute>
                <Predict />
              </ProtectedRoute>
            }
          />

          <Route
            path="/roadmap"
            element={
              <ProtectedRoute>
                <Roadmap />
              </ProtectedRoute>
            }
          />

          {/* ================= RESUME ================= */}
          <Route
            path="/resume-builder"
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            }
          />

          {/* ✅ FIX: /resume now opens ResumeBuilder */}
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            }
          />

          {/* ================= TRACKING ================= */}
          <Route
            path="/skills"
            element={
              <ProtectedRoute>
                <Skills />
              </ProtectedRoute>
            }
          />

          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <ProgressTracker />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
