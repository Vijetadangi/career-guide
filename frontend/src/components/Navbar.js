import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className={`navbar ${darkMode ? "navbar-dark" : ""}`}>
      <div className="logo" onClick={() => navigate("/")}>
        🚀 CareerGuide
      </div>

      <div className="nav-links">
        {!token ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-nav">
              Get Started
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>

            {/* ❌ REMOVED: Predict link (already available in dashboard cards) */}

            <Link to="/history">History</Link>
            <Link to="/contact">Contact</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {/* 🌙 DARK MODE TOGGLE */}
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
