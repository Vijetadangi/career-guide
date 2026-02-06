import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const featuresRef = useRef(null);

  // Fade-in on scroll
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-wrapper">
      {/* Background bubbles */}
      <div className="bubble one"></div>
      <div className="bubble two"></div>
      <div className="bubble three"></div>

      {/* HERO SECTION */}
      <section className="landing-content fade-in">
        <h1>Career Guidance and Skill Development Platform</h1>
        <p>
          Plan your career, analyze your skills, improve gaps, build resumes,
          and track your professional growth — all in one powerful platform.
        </p>

        <div className="landing-buttons">
          <button
            className="primary-btn"
            onClick={() =>
              featuresRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Features
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </section>

      {/* STATS SECTION */}
      <div className="stats-section fade-in">
        <div className="stat-card">
          <h2>10+</h2>
          <p>Career Paths</p>
        </div>
        <div className="stat-card">
          <h2>25+</h2>
          <p>Skills Analyzed</p>
        </div>
        <div className="stat-card">
          <h2>100+</h2>
          <p>Students Guided</p>
        </div>
      </div>

      {/* WHY SECTION */}
      <section className="why-section" ref={featuresRef}>
        <h2 className="why-title fade-in">Why use CareerGuide?</h2>

        <div className="features-grid">
          {/* 1️⃣ SKILL TEST */}
          <div className="feature-card fade-in">
            <h3>📝 Skill Test</h3>
            <p>
              Take a structured skill test to evaluate your technical and
              logical abilities.
            </p>
          </div>

          {/* 2️⃣ SKILL ANALYSIS */}
          <div className="feature-card fade-in">
            <h3>📊 Skill Analysis</h3>
            <p>
              Get a detailed breakdown of your strengths and areas that need
              improvement.
            </p>
          </div>

          {/* 3️⃣ CAREER PREDICTION */}
          <div className="feature-card fade-in">
            <h3>🎯 Career Prediction</h3>
            <p>
              Discover the most suitable career paths based on your skill
              performance.
            </p>
          </div>

          {/* 4️⃣ CAREER ROADMAP */}
          <div className="feature-card fade-in">
            <h3>🛣 Career Roadmap</h3>
            <p>
              Follow a step-by-step roadmap designed to make you job-ready.
            </p>
          </div>

          {/* 5️⃣ RESUME BUILDER */}
          <div className="feature-card fade-in">
            <h3>📄 Resume Builder</h3>
            <p>
              Create a professional, ATS-friendly resume tailored to your
              career goals.
            </p>
          </div>

          {/* 6️⃣ PROGRESS TRACKER */}
          <div className="feature-card fade-in">
            <h3>📈 Progress Tracker</h3>
            <p>
              Monitor your learning progress and career readiness over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
