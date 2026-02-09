import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
  "https://career-guide-backend-tdg.onrender.com/api/auth/login",
  {
    email,
    password,
  }
);


      console.log("LOGIN RESPONSE 👉", res.data);

      // ✅ Handle ALL possible backend token keys
      const token =
        res.data.token ||
        res.data.accessToken ||
        res.data.jwt ||
        res.data?.data?.token;

      if (!token) {
        alert("Login failed: token not received");
        return;
      }

      localStorage.setItem("token", token);

      // optional but safe
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT PANEL */}
      <div className="auth-left">
        <h1>Your career journey continues here</h1>
        <p>Track skills • Follow roadmaps • Grow confidently</p>

        <div className="auth-tags">
          <span>🚀 Career Roadmap</span>
          <span>📊 Skill Progress</span>
          <span>🏆 Level Up</span>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <form className="auth-card" onSubmit={onSubmit}>
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to continue your journey</p>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={onChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
          />

          <button type="submit">Login</button>

          <p className="switch-text">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
