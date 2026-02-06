import "./Roadmap.css";
import { useNavigate } from "react-router-dom";

const Roadmap = () => {
  const navigate = useNavigate();

  return (
    <div className="roadmap-page">
      <div className="roadmap-layout">

        {/* LEFT TIMELINE */}
        <div className="timeline-rail" />

        {/* MAIN CONTENT */}
        <div className="roadmap-main">

          {/* ✅ CENTERED HEADER */}
          <div className="roadmap-header center">
            <h1>Career Roadmap</h1>

            <p className="subtitle">
              Your step-by-step journey to becoming job-ready.
            </p>

            <div className="stats">
              🔥 Current Streak: 0 weeks &nbsp;&nbsp;
              🏆 Best Streak: 0 weeks &nbsp;&nbsp;
              📊 Progress: 0%
            </div>
          </div>

          {/* PHASE 1 */}
          <div className="phase-card blue">
            <h3>Phase 1: Foundations <span>Weeks 1–2</span></h3>
            <p>Why this phase? Builds strong fundamentals before moving to frameworks.</p>
            <strong>Week 1</strong>
            <ul>
              <li>HTML, semantics & accessibility</li>
              <li>CSS basics</li>
              <li>Basic Git commands</li>
            </ul>
            <strong>Week 2</strong>
            <ul>
              <li>CSS Flexbox & Grid</li>
              <li>Responsive design</li>
              <li>JavaScript basics</li>
            </ul>
          </div>

          {/* PHASE 2 */}
          <div className="phase-card purple">
            <h3>Phase 2: Core Frontend <span>Weeks 3–5</span></h3>
            <p>Learn React fundamentals and build interactive UIs.</p>
            <strong>Week 3</strong>
            <ul>
              <li>React basics</li>
              <li>JSX & components</li>
              <li>Props & state</li>
            </ul>
            <strong>Week 4</strong>
            <ul>
              <li>React hooks</li>
              <li>Component reuse</li>
              <li>State lifting</li>
            </ul>
            <strong>Week 5</strong>
            <ul>
              <li>Forms & validation</li>
              <li>API basics</li>
              <li>Mini project</li>
            </ul>
          </div>

          {/* PHASE 3 */}
          <div className="phase-card purple">
            <h3>Phase 3: Advanced Frontend & Projects <span>Weeks 6–8</span></h3>
            <p>Strengthen real-world skills and build production-ready projects.</p>
            <strong>Week 6</strong>
            <ul>
              <li>Advanced React patterns</li>
              <li>Performance optimization</li>
              <li>Reusable architecture</li>
            </ul>
            <strong>Week 7</strong>
            <ul>
              <li>Authentication & protected routes</li>
              <li>State management</li>
              <li>Error handling</li>
            </ul>
            <strong>Week 8</strong>
            <ul>
              <li>Major portfolio project</li>
              <li>Code review & refactoring</li>
              <li>Deployment</li>
            </ul>
          </div>

          {/* PHASE 4 */}
          <div className="phase-card green">
            <h3>Phase 4: Job Ready <span>Weeks 9–10</span></h3>
            <p>Prepare for interviews and job applications.</p>
            <strong>Week 9</strong>
            <ul>
              <li>Resume optimization</li>
              <li>Portfolio review</li>
              <li>Mock interviews</li>
            </ul>
            <strong>Week 10</strong>
            <ul>
              <li>Apply to jobs</li>
              <li>Networking</li>
              <li>Interview practice</li>
            </ul>
          </div>

          {/* OUTCOME + TIP */}
          <div className="bottom-insights">
            <div className="insight-card">
              <h3>🎯 Outcome</h3>
              <ul>
                <li>Job-ready Frontend Developer</li>
                <li>Strong React & JavaScript foundation</li>
                <li>Real-world projects portfolio</li>
                <li>ATS-friendly resume</li>
              </ul>
            </div>

            <div className="insight-card tip">
              <h3>💡 Tip</h3>
              <p>
                Treat each phase like a sprint. Don’t rush — consistency beats speed.
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="roadmap-actions">
            <button onClick={() => navigate("/dashboard")}>
              ← Back to Dashboard
            </button>
            <button className="primary" onClick={() => navigate("/resume")}>
              Build Resume →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Roadmap;
