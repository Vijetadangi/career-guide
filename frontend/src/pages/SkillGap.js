import "./SkillGap.css";

const SkillGap = () => {
  // Mock skill gap data (can be dynamic later)
  const skillGaps = [
    {
      skill: "Node.js",
      required: 70,
      current: 45,
      link: "https://www.youtube.com/results?search_query=nodejs+tutorial",
    },
    {
      skill: "MongoDB",
      required: 65,
      current: 40,
      link: "https://www.youtube.com/results?search_query=mongodb+tutorial",
    },
    {
      skill: "System Design",
      required: 60,
      current: 30,
      link: "https://www.youtube.com/results?search_query=system+design+basics",
    },
    {
      skill: "Data Structures",
      required: 75,
      current: 50,
      link: "https://www.freecodecamp.org/learn",
    },
  ];

  return (
    <div className="skillgap-container">
      <h1>📉 Skill Gap Analysis</h1>
      <p className="subtitle">
        Identify missing skills and start learning to improve your career readiness
      </p>

      <div className="skillgap-list">
        {skillGaps.map((item, index) => {
          const gap = item.required - item.current;

          return (
            <div className="skillgap-card" key={index}>
              <div className="skillgap-header">
                <h3>{item.skill}</h3>
                <span className="gap-text">
                  Gap: {gap > 0 ? gap : 0}%
                </span>
              </div>

              <div className="skill-values">
                <span>Current: {item.current}%</span>
                <span>Required: {item.required}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${item.current}%` }}
                ></div>
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="learn-btn"
              >
                Start Learning
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillGap;
