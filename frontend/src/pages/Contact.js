import "./Contact.css";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Contact save failed:", data);
        alert("❌ Failed to send message. Try again.");
        return;
      }

      alert("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("❌ Contact error:", err);
      alert("❌ Server error. Please try later.");
    }
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>Let’s talk. Questions, ideas, or feedback — we’re listening.</p>
      </div>

      {/* CONTENT */}
      <div className="contact-container">

        {/* LEFT */}
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>
            Whether you need roadmap help, resume feedback,
            or have a feature request — drop us a message.
          </p>

          <div className="info-box">
            <span>💬</span>
            <div>
              <h4>We read every message</h4>
              <p>Your feedback directly shapes CareerGuide.</p>
            </div>
          </div>

          <div className="info-box">
            <span>⚡</span>
            <div>
              <h4>Fast response</h4>
              <p>We usually reply within 24–48 hours.</p>
            </div>
          </div>

          <div className="info-box">
            <span>🎓</span>
            <div>
              <h4>Built for learners</h4>
              <p>Everything we build is focused on your growth.</p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send a message</h3>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            rows="6"
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit">Send Message</button>
        </form>

      </div>

      <div className="contact-footer">
        🤝 We’re here to support your career journey — every step of the way.
      </div>

    </div>
  );
};

export default Contact;
