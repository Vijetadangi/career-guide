import { useState } from "react";
import "./CareerForm.css";

const CareerForm = () => {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const skillText = skills.toLowerCase();
    const interestText = interests.toLowerCase();

    let careers = [];

    if (skillText.includes("java") || skillText.includes("python")) {
      careers.push("Software Developer");
    }
    if (interestText.includes("web")) {
      careers.push("Web Developer");
    }
    if (interestText.includes("ai") || skillText.includes("ml")) {
      careers.push("AI / ML Engineer");
    }
    if (interestText.includes("data")) {
      careers.push("Data Analyst");
    }

    if (careers.length === 0) {
      careers.push("IT Consultant", "Technical Analyst");
    }

    setResult(careers);
  };

  return (
    <div className="predict-page">
      {/* Heading */}
      <div className="predict-header">
        <h1>Predict Your Career</h1>
        <p>
          Enter your skills and interests to get personalized career
          suggestions.
        </p>
      </div>

      {/* Form Card */}
      <div className="predict-card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your skills (e.g. Java, Python)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter your interests (e.g. Web, AI)"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            required
          />

          <button type="submit">Predict Career</button>
        </form>
      </div>

      {/* RESULT */}
      {result && (
        <div className="prediction-result">
          <h2>Recommended Career Paths</h2>
          <ul>
            {result.map((career, index) => (
              <li key={index}>{career}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CareerForm;
