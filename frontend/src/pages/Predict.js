import "./Predict.css";
import SkillBarChart from "../components/SkillBarChart";
import MatchCircle from "../components/MatchCircle";
import {
  FaLaptopCode,
  FaPalette,
  FaProjectDiagram,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Predict = () => {
  const navigate = useNavigate();

  const result = JSON.parse(localStorage.getItem("skillTestResult"));

  useEffect(() => {
    if (result) {
      sessionStorage.removeItem("historySaved");
    }
  }, [result]);

  useEffect(() => {
    if (!result) return;

    const saveHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      if (sessionStorage.getItem("historySaved")) return;

      const { categoryScore } = result;

      const strongestSkill = Object.keys(categoryScore).reduce((a, b) =>
        categoryScore[a] > categoryScore[b] ? a : b
      );

      const careerMap = {
        Frontend: { role: "Frontend Developer", match: 84 },
        Logic: { role: "Software Engineer", match: 80 },
        Fundamentals: { role: "Web Developer", match: 76 },
      };

      const primaryCareer = careerMap[strongestSkill] || careerMap.Logic;

      try {
        await fetch("http://localhost:4000/api/history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            role: primaryCareer.role,
            confidence: primaryCareer.match,
            skills: Object.keys(categoryScore),
          }),
        });

        sessionStorage.setItem("historySaved", "true");
      } catch (err) {
        console.error("History save failed", err);
      }
    };

    saveHistory();
  }, [result]);

  if (!result || !result.categoryScore) return null;

  const { categoryScore } = result;

  const strongestSkill = Object.keys(categoryScore).reduce((a, b) =>
    categoryScore[a] > categoryScore[b] ? a : b
  );

  const careerMap = {
    Frontend: {
      role: "Frontend Developer",
      match: 84,
      salary: "₹6–10 LPA",
      icon: <FaLaptopCode />,
      reason:
        "You show strong UI understanding, layout skills, and frontend confidence.",
    },
    Logic: {
      role: "Software Engineer",
      match: 80,
      salary: "₹7–12 LPA",
      icon: <FaProjectDiagram />,
      reason:
        "Your problem-solving and algorithmic thinking indicate engineering strength.",
    },
    Fundamentals: {
      role: "Web Developer",
      match: 76,
      salary: "₹5–9 LPA",
      icon: <FaPalette />,
      reason:
        "You understand how the web works and can build reliable applications.",
    },
  };

  const primaryCareer = careerMap[strongestSkill] || careerMap.Logic;

  const secondaryCareers = Object.keys(careerMap)
    .filter((key) => key !== strongestSkill)
    .map((key) => ({
      ...careerMap[key],
      match: careerMap[key].match - 10,
    }));

  return (
    <div className="predict-page">
      {/* ✅ CENTERED TITLE + SUBTITLE */}
      <div className="predict-header">
        <h1>🎯 Career Prediction Results</h1>
        <p className="subtitle">
          Generated using your skill assessment & performance patterns.
        </p>
      </div>

      {/* ✅ TOP BLUE CARD (VISIBLE CONTENT) */}
      <div className="main-career-card">
        <div className="left">
          <div className="career-icon">{primaryCareer.icon}</div>
          <h2 className="career-role">{primaryCareer.role}</h2>
          <p className="career-reason">{primaryCareer.reason}</p>
          <div className="stats">
            <span>💼 Avg Salary: {primaryCareer.salary}</span>
          </div>
          <button className="roadmap-btn" onClick={() => navigate("/roadmap")}>
            View Career Roadmap
          </button>
        </div>

        <div className="right">
          <MatchCircle percent={primaryCareer.match} />
        </div>
      </div>

      <div className="radar-section">
        <h3>📊 Skill Breakdown (Clear View)</h3>
        <SkillBarChart scores={categoryScore} />
      </div>

      <h3 className="secondary-title">Other Strong Matches</h3>
      <div className="secondary-grid">
        {secondaryCareers.map((career, i) => (
          <div className="secondary-card" key={i}>
            <div className="icon">{career.icon}</div>
            <h4>{career.role}</h4>
            <p>Match: {career.match}%</p>
            <span>{career.salary}</span>
          </div>
        ))}
      </div>

      <div className="next-steps">
        <h3>🚀 What You Should Do Next</h3>
        <ul>
          <li>Follow the personalized career roadmap</li>
          <li>Build 2–3 real-world projects</li>
          <li>Prepare your resume & portfolio</li>
        </ul>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Predict;
