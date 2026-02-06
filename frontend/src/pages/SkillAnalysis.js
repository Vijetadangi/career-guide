import "./SkillAnalysis.css";
import { useNavigate } from "react-router-dom";

const SkillAnalysis = () => {
  const navigate = useNavigate();

  return (
    <div className="skill-analysis-page">

      {/* TOP SUMMARY */}
      <div className="overall-card">
        <h2>Overall Performance</h2>
        <div className="score">9 / 10 (90%)</div>
        <span className="level">Skill Level: Advanced 🚀</span>
      </div>

      {/* GRID SECTION */}
      <div className="analysis-grid">

        {/* LEFT COLUMN */}
        <div className="left-col">

          <div className="card">
            <h3>🧠 Performance Insight</h3>
            <p><b>Confidence Level:</b> Medium 🚀</p>
            <p>Good speed with improving accuracy 🔥</p>
            <p><b>Suggested Retake:</b> Mon Feb 16 2026</p>
          </div>

          <div className="card">
            <h3>💪 Strengths & ⚠ Improvement Areas</h3>
            <p><b>Strongest Skill:</b> Frontend</p>
            <p><b>Needs Improvement:</b> Fundamentals</p>
          </div>

          <div className="card">
            <h3>📊 Skill Breakdown</h3>
            <div className="skill-row">
              <span>Frontend</span>
              <span>4 points</span>
            </div>
            <div className="skill-row">
              <span>Logic</span>
              <span>2 points</span>
            </div>
            <div className="skill-row">
              <span>Fundamentals</span>
              <span>1 point</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="right-col">

          <div className="card highlight">
            <h3>🎭 Your Skill Persona</h3>
            <h4>Frontend-Focused Developer 🎨</h4>
            <p>
              You excel at UI and user experience. Strengthening logic
              will make you more job-ready.
            </p>
          </div>

          <div className="card">
            <h3>📘 Personalized Learning Plan</h3>
            <p><b>Current Focus:</b> Web Fundamentals</p>
            <p><b>Duration:</b> 1–2 Weeks</p>

            <ul>
              <li>Understand how browsers work</li>
              <li>Learn HTTP & client-server flow</li>
              <li>Study DOM & event handling</li>
              <li>Understand basic system design</li>
            </ul>

            <p className="outcome">
              🎯 Expected Outcome: Strong foundation for any tech role
            </p>
          </div>

          <div className="card next">
            <h3>🚀 What You Should Do Next</h3>
            <ul>
              <li>Follow your personalized learning plan</li>
              <li>Build at least 2 real-world projects</li>
              <li>Predict your career path using AI</li>
            </ul>
          </div>

        </div>
      </div>

      {/* 🔥 FINAL CTA SECTION */}
      <div className="career-cta">
        <h2>Ready for the next step?</h2>
        <p>
          Based on your skills and performance, we can now predict the
          best career path tailored just for you.
        </p>
        <button onClick={() => navigate("/predict")}>
          🎯 Predict My Career Path
        </button>
      </div>

    </div>
  );
};

export default SkillAnalysis;
