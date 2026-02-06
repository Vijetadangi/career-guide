import "./ProgressTracker.css";
import { useNavigate } from "react-router-dom";

const ProgressTracker = () => {
  const navigate = useNavigate();

  return (
    <div className="progress-page">
      <div className="progress-container">

        {/* HEADER */}
        <div className="progress-header">
          <h1>📈 Progress Tracker</h1>
          <p>Your career readiness based on real activity</p>
        </div>

        {/* HERO */}
        <div className="progress-hero">
          <div className="progress-circle">
            <span className="percent">43%</span>
            <span className="stage">Early Stage 🚀</span>
          </div>

          <div className="progress-info">
            <h3>Career Readiness</h3>
            <p>
              You’re building a strong foundation.
              Focus on roadmap consistency to grow faster.
            </p>
            <button onClick={() => navigate("/roadmap")}>
              Start Roadmap →
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="progress-stats">
          <div className="stat-card">💪<strong>100%</strong><span>Skill Strength</span></div>
          <div className="stat-card">🗺️<strong>0%</strong><span>Roadmap</span></div>
          <div className="stat-card">🔥<strong>0%</strong><span>Consistency</span></div>
          <div className="stat-card">📄<strong>40%</strong><span>Resume</span></div>
        </div>

        {/* MAIN GRID */}
        <div className="progress-grid">

          <div className="progress-card highlight">
            <h3>🧠 Smart Insights</h3>
            <ul>
              <li>Strong skill foundation detected</li>
              <li>Roadmap not started yet</li>
              <li>Resume partially complete</li>
            </ul>
            <button onClick={() => navigate("/resume")}>
              Complete Resume →
            </button>
          </div>

          <div className="progress-card">
            <h3>🕒 Recent Activity</h3>
            <ul>
              <li>✔ Skill Test Completed</li>
              <li>✔ Career Predicted</li>
              <li>✖ Roadmap Not Started</li>
            </ul>
          </div>

          <div className="progress-card">
            <h3>📆 This Week</h3>
            <ul>
              <li>✔ Skill test done</li>
              <li>✖ Start roadmap</li>
              <li>✖ Finish resume</li>
            </ul>
          </div>

        </div>

        {/* TIMELINE */}
        <div className="progress-timeline">
          <h3>🛣️ Career Journey</h3>
          <div className="timeline-steps">
            <div className="step done">Skill Test</div>
            <div className="step done">Career Prediction</div>
            <div className="step pending">Roadmap</div>
            <div className="step pending">Resume</div>
            <div className="step pending">Job Ready</div>
          </div>
        </div>

        {/* CTA */}
        <div className="progress-cta">
          <h3>🚀 What You Should Do Next</h3>
          <p>
            Completing your roadmap will unlock real career momentum.
          </p>
          <button onClick={() => navigate("/roadmap")}>
            Start Roadmap Now →
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProgressTracker;
