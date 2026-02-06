import SkillTest from "../components/skillTest/SkillTest";
import "./SkillTestPage.css";
import { useNavigate } from "react-router-dom";

const SkillTestPage = () => {
  const navigate = useNavigate();

  // ✅ CALLED WHEN TEST IS COMPLETED
  const handleSkillTestComplete = () => {
    localStorage.setItem("skillTestDone", "true");
    navigate("/dashboard"); // go back to dashboard
  };

  return (
    <div className="skill-test-page">
      {/* Ambient background (visual only) */}
      <div className="skill-test-ambient" />

      {/* Context / breadcrumb */}
      <div className="skill-test-context">
        <span>Frontend Skill Assessment</span>
        <span>• Timed Test</span>
        <span>• Answer Carefully</span>
      </div>

      {/* Main wrapper */}
      <div className="skill-test-wrapper">
        {/* Header */}
        <div className="skill-test-header">
          <h1>🧠 Skill Assessment</h1>
          <p>
            Answer honestly to evaluate your current skill level.
            This helps us personalize your learning roadmap.
          </p>
        </div>

        {/* Test Card (UNCHANGED LOGIC) */}
        <div className="skill-test-center">
          <SkillTest onComplete={handleSkillTestComplete} />
        </div>
      </div>

      {/* Side hints (visual only) */}
      <div className="skill-test-side left">
        <p>📌 Tip</p>
        <span>Accuracy + speed improves confidence score</span>
      </div>

      <div className="skill-test-side right">
        <p>🔥 Focus</p>
        <span>You’re building your career foundation</span>
      </div>
    </div>
  );
};

export default SkillTestPage;
