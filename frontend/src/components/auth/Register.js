import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

/* 🔐 Password strength helper */
const getPasswordStrength = (password) => {
  if (!password) return { label: "", level: 0 };
  if (password.length < 6) return { label: "Weak", level: 1 };
  if (password.match(/[A-Z]/) && password.match(/[0-9]/))
    return { label: "Strong", level: 3 };
  return { label: "Medium", level: 2 };
};

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const strength = getPasswordStrength(password);

  const handleNext = () => {
    if (!name || !email) return;
    setStep(2);
  };

  // ✅ FIXED: REAL REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("https://career-guide-backend-tdgq.onrender.com/api/auth/register", {


        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      // 🔐 Auto-login after register
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Account created successfully 🎉");
      navigate("/dashboard");
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="register-page">
      {/* LEFT PANEL */}
      <div className="register-left">
        <h1>
          Build your career
          <br />
          step by step
        </h1>
        <p>Smart onboarding • Clear goals • Faster growth</p>

        <div className="register-features">
          <span>🎯 Career Roadmaps</span>
          <span>📈 Skill Growth</span>
          <span>🏆 Progress Tracking</span>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="register-right">
        <div className="register-card">
          {/* PROGRESS */}
          <div className="register-steps">
            <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
            <div className="line"></div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
          </div>

          <h2>Create Account</h2>
          <p>Step {step} of 2</p>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="next-btn"
                  onClick={handleNext}
                >
                  Continue →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {password && (
                  <div className="password-strength">
                    <div className={`strength-bar level-${strength.level}`} />
                    <span className={`strength-text level-${strength.level}`}>
                      {strength.label}
                    </span>
                  </div>
                )}

                <button type="submit">Create Account</button>
              </>
            )}
          </form>

          <div className="register-footer">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
