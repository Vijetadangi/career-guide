const Resume = require("../models/Resume");

exports.createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.user.id });
  res.json(resumes);
};
