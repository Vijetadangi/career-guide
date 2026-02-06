import "./Roadmap.css";

const roadmapSteps = [
  {
    step: 1,
    title: "Skills to Develop",
    desc: "Learn core skills required for your target career.",
    icon: "🧠",
  },
  {
    step: 2,
    title: "Certifications",
    desc: "Earn certifications to validate your skills.",
    icon: "📜",
  },
  {
    step: 3,
    title: "Projects & Networking",
    desc: "Build real-world projects and grow your network.",
    icon: "🤝",
  },
  {
    step: 4,
    title: "Job Applications",
    desc: "Apply strategically to jobs that match your profile.",
    icon: "💼",
  },
  {
    step: 5,
    title: "Long-Term Goals",
    desc: "Set long-term goals and keep upgrading yourself.",
    icon: "🎯",
  },
];

const Roadmap = () => {
  return (
    <div className="roadmap-page">
      <h1 className="roadmap-title">Your Career Roadmap</h1>
      <p className="roadmap-subtitle">
        Follow this step-by-step path to build a successful career
      </p>

      <div className="roadmap-container">
        <div className="roadmap-line" />

        {roadmapSteps.map((item, index) => (
          <div
            key={item.step}
            className={`roadmap-item ${
              index % 2 === 0 ? "left" : "right"
            }`}
          >
            <div className="roadmap-content">
              <span className="roadmap-icon">{item.icon}</span>
              <h3>
                Step {item.step}: {item.title}
              </h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
