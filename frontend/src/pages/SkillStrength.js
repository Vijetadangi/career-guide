import "./SkillStrength.css";

const SkillStrength = () => {
  // Mock data (later can come from backend)
  const skills = [
    { name: "HTML", level: 85 },
    { name: "CSS", level: 75 },
    { name: "JavaScript", level: 65 },
    { name: "React", level: 60 },
    { name: "Node.js", level: 45 },
    { name: "MongoDB", level: 40 },
  ];

  const getLevelText = (value) => {
    if (value >= 75) return "Strong";
    if (value >= 50) return "Intermediate";
    return "Needs Improvement";
  };

  return (
    <div className="skill-container">
      <h1>🧠 Skill Strength Analysis</h1>
      <p className="subtitle">
        Visual representation of your current skill levels
      </p>

      <div className="skill-list">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <div className="skill-header">
              <h3>{skill.name}</h3>
              <span className="level-text">
                {getLevelText(skill.level)}
              </span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>

            <span className="percentage">{skill.level}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillStrength;
