import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Project Info */}
        <div className="footer-section">
          <h3>CareerGuide</h3>
          <p>
            Career Guidance and Skill Development Platform helping students
            plan careers, improve skills, and track progress.
          </p>
        </div>

        {/* Features */}
        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li>Career Prediction</li>
            <li>Skill Analysis</li>
            <li>Career Roadmap</li>
            <li>Resume Builder</li>
            <li>Progress Tracking</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="footer-section">
          <h4>Tech Stack</h4>
          <ul>
            <li>React.js</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CareerGuide | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
