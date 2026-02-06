import "./ResumeBuilder.css";
import { useState, useEffect, useRef, useMemo } from "react";
import html2pdf from "html2pdf.js";

const ResumeBuilder = () => {
  const previewRef = useRef(null);

  /* ================= TEMPLATE ================= */
  const [template, setTemplate] = useState("classic");

  /* ================= PERSONAL ================= */
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /* ================= CONTENT ================= */
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [education, setEducation] = useState("");
  const [certificates, setCertificates] = useState("");

  /* ================= ATS SCORE (LIVE) ================= */
  const atsScore = useMemo(() => {
    let score = 0;
    if (name) score += 15;
    if (role) score += 10;
    if (email) score += 10;
    if (phone) score += 5;
    if (skills.length > 20) score += 20;
    if (projects.length > 30) score += 20;
    if (education.length > 20) score += 10;
    if (certificates.length > 10) score += 10;
    return Math.min(score, 100);
  }, [name, role, email, phone, skills, projects, education, certificates]);

  /* ================= AUTO SAVE (DEBOUNCED) ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      saveResume(true);
    }, 10000); // ⏱️ 10s debounce (prevents 413)

    return () => clearTimeout(timer);
  }, [
    name,
    role,
    email,
    phone,
    skills,
    projects,
    education,
    certificates,
    template,
    atsScore,
  ]);

  /* ================= SAVE ================= */
  const saveResume = async (silent = false) => {
    const token = localStorage.getItem("token");

    if (!token) {
      if (!silent) alert("⚠️ Please login to save your resume");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          role,
          email,
          phone,
          skills,
          projects,
          education,
          certificates,
          template,
          atsScore,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Save failed");
      }

      if (!silent) alert("✅ Resume saved to your collection");
    } catch (err) {
      console.error(err);
      if (!silent) alert("❌ Failed to save resume");
    }
  };

  /* ================= PDF ================= */
  const downloadPDF = () => {
    html2pdf().from(previewRef.current).save(`${name || "resume"}.pdf`);
  };

  return (
    <div className="rb-page">
      <div className="rb-hero">
        <h1>AI Resume Builder</h1>
        <p>Build recruiter-ready, ATS-friendly resumes</p>
      </div>

      <div className="rb-layout">
        {/* LEFT */}
        <div className="rb-editor">
          <h3>Personal Information</h3>

          <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Role / Title" value={role} onChange={(e) => setRole(e.target.value)} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <h3>Skills</h3>
          <textarea value={skills} onChange={(e) => setSkills(e.target.value)} />

          <h3>Projects</h3>
          <textarea value={projects} onChange={(e) => setProjects(e.target.value)} />

          <h3>Education</h3>
          <textarea value={education} onChange={(e) => setEducation(e.target.value)} />

          <h3>Certificates</h3>
          <textarea value={certificates} onChange={(e) => setCertificates(e.target.value)} />

          <h3>Template</h3>
          <div className="template-buttons">
            <button onClick={() => setTemplate("classic")}>Classic</button>
            <button onClick={() => setTemplate("modern")}>Modern</button>
          </div>

          <div className="actions">
            
            <button onClick={downloadPDF}>📄 Download PDF</button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="rb-preview" ref={previewRef}>
          <div className="ats-box">
            <svg width="100" height="100">
              <circle cx="50" cy="50" r="45" stroke="#eee" strokeWidth="8" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#5b5bf0"
                strokeWidth="8"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * atsScore) / 100}
              />
              <text x="50%" y="54%" textAnchor="middle" fontSize="18" fontWeight="bold">
                {atsScore}%
              </text>
            </svg>
            <p>ATS Score</p>
          </div>

          <div className={`resume ${template}`}>
            <h1>{name || "Your Name"}</h1>
            <h2>{role}</h2>
            <p>{email} | {phone}</p>

            <h3>Skills</h3>
            <p>{skills}</p>

            <h3>Projects</h3>
            <p>{projects}</p>

            <h3>Education</h3>
            <p>{education}</p>

            <h3>Certificates</h3>
            <p>{certificates}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
