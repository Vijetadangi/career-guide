import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaClipboardCheck,
  FaRoad,
  FaFileAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-page">
      {/* AMBIENT BACKGROUND */}
      <div className="dashboard-ambient" />
      <div className="dashboard-shimmer"></div>
      <div className="dashboard-nodes"></div>
      <div className="dashboard-shard" />
      <div className="dashboard-accent-right" />
      <div className="dashboard-accent-left" />
      <div className="dashboard-bright-overlay" />

      <div className="dashboard-container">
        {/* PROGRESS HEADER */}
        <div className="progress-header">
          <h2>Level 1: Skill Foundation</h2>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "60%" }}
            />
          </div>

          <div className="progress-meta">
            <span>Build Mode: All features unlocked</span>
            <span>Progress tracking disabled</span>
          </div>
        </div>

        {/* ================= LEVEL 1 ================= */}
        <Section
          level="Level 1: Skill Foundation"
          desc="Understand where you stand before choosing your career path."
        >
          <Card
            title="Skill Test"
            desc="Take an interactive assessment to evaluate your technical skills."
            icon={<FaClipboardCheck />}
            button="Start / Retake Test"
            highlight
            onClick={() => goTo("/skill-test")}
          />

          <Card
            title="Skill Analysis"
            desc="Visual breakdown of strengths, weaknesses, and improvement areas."
            icon={<FaChartLine />}
            button="View Analysis"
            onClick={() => goTo("/skill-analysis")}
          />
        </Section>

        {/* ================= LEVEL 2 ================= */}
        <Section
          level="Level 2: Career Direction"
          desc="Discover career paths aligned with your skills and interests."
        >
          <Card
            title="Career Prediction"
            desc="AI-driven recommendations based on your performance."
            icon={<FaChartLine />}
            button="Predict Career"
            onClick={() => goTo("/predict")}
          />

          <Card
            title="Career Roadmap"
            desc="Step-by-step roadmap tailored to your target role."
            icon={<FaRoad />}
            button="View Roadmap"
            onClick={() => goTo("/roadmap")}
          />
        </Section>

        {/* ================= LEVEL 3 ================= */}
        <Section
          level="Level 3: Career Growth"
          desc="Prepare for real-world opportunities."
        >
          <Card
            title="Resume Builder"
            desc="Generate an ATS-friendly resume with role-based suggestions."
            icon={<FaFileAlt />}
            button="Build Resume"
            onClick={() => goTo("/resume-builder")}
          />

          <Card
            title="Progress Tracker"
            desc="Track learning streaks, consistency, and milestones."
            icon={<FaChartLine />}
            button="Track Progress"
            onClick={() => goTo("/progress")}
          />
        </Section>
      </div>
    </div>
  );
}

/* ================= SECTION ================= */

function Section({ level, desc, children }) {
  return (
    <div className="level-section">
      <div className="level-bar">
        <h3>{level}</h3>
      </div>

      <p className="level-desc">{desc}</p>

      <div className="card-row">{children}</div>
    </div>
  );
}

/* ================= CARD ================= */

function Card({ title, desc, icon, button, highlight, onClick }) {
  return (
    <div className={`dashboard-card ${highlight ? "highlight" : ""}`}>
      <div className="card-top">
        <div className="card-icon">{icon}</div>
        {highlight && (
          <span className="badge">
            Recommended Next Step
          </span>
        )}
      </div>

      <h4>{title}</h4>
      <p>{desc}</p>

      <button className="card-btn" onClick={onClick}>
        {button}
      </button>
    </div>
  );
}
