import "./ResumeEditor.css";
import { useState } from "react";

/* 🤖 AI Skill Suggestions */
const AI_SKILLS = [
  "JavaScript",
  "React.js",
  "HTML/CSS",
  "Node.js",
  "REST APIs",
  "Git & GitHub",
  "Problem Solving",
  "Responsive Design",
];

const ResumeEditor = ({ activeSection, resume, setResume }) => {
  const [newSkill, setNewSkill] = useState("");

  /* ================= SKILLS LOGIC ================= */

  const addSkill = () => {
    if (!newSkill.trim()) return;
    if (resume.skills.includes(newSkill)) return;

    setResume({ ...resume, skills: [...resume.skills, newSkill] });
    setNewSkill("");
  };

  const removeSkill = (skill) => {
    setResume({
      ...resume,
      skills: resume.skills.filter((s) => s !== skill),
    });
  };

  const addAISkill = (skill) => {
    if (!resume.skills.includes(skill)) {
      setResume({ ...resume, skills: [...resume.skills, skill] });
    }
  };

  /* ================= SKILLS SECTION ================= */

  if (activeSection === "skills") {
    return (
      <div className="resume-editor">
        <h2>🛠 Skills</h2>
        <p className="hint">
          Add skills relevant to your role. AI suggestions help optimize ATS
          ranking.
        </p>

        {/* SKILL CHIPS */}
        <div className="skill-chips">
          {resume.skills.map((skill, i) => (
            <span className="chip" key={i}>
              {skill}
              <button onClick={() => removeSkill(skill)}>×</button>
            </span>
          ))}
        </div>

        {/* ADD SKILL */}
        <div className="add-skill">
          <input
            type="text"
            placeholder="Add a skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button onClick={addSkill}>Add</button>
        </div>

        {/* AI SUGGESTIONS */}
        <div className="ai-suggestions">
          <h4>🤖 AI Suggestions</h4>
          <div className="ai-skill-list">
            {AI_SKILLS.map((skill, i) => (
              <button
                key={i}
                className="ai-skill"
                onClick={() => addAISkill(skill)}
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ================= OTHER SECTIONS ================= */

  return (
    <div className="resume-editor">
      <h2>{activeSection.toUpperCase()}</h2>
      <textarea
        placeholder={`Enter your ${activeSection}`}
        value={resume[activeSection] || ""}
        onChange={(e) =>
          setResume({ ...resume, [activeSection]: e.target.value })
        }
      />
    </div>
  );
};

export default ResumeEditor;
