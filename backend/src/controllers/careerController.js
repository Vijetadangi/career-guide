const careers = require("../data/careers");
const Profile = require("../models/Profile");
const skillResources = require("../data/skillResources");


/**
 * ======================================
 * PREDICT CAREER + SAVE HISTORY
 * ======================================
 */
exports.predictCareer = async (req, res) => {
  try {
    const { skills } = req.body;

    // ✅ Auth check (from authMiddleware)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: "Skills are required" });
    }

    let bestMatch = null;
    let highestScore = 0;

    // 🔍 Find best career match
    careers.forEach((career) => {
      const matchedSkills = career.skills.filter((skill) =>
        skills.includes(skill)
      );

      const matchPercentage = Math.round(
        (matchedSkills.length / career.skills.length) * 100
      );

      if (matchPercentage > highestScore) {
        highestScore = matchPercentage;
        bestMatch = career;
      }
    });

    if (!bestMatch) {
      return res.status(404).json({ message: "No suitable career found" });
    }

    const missingSkills = bestMatch.skills.filter(
      (skill) => !skills.includes(skill)
    );

    // 💾 SAVE PREDICTION HISTORY
    const profile = new Profile({
      userId: req.user.id,
      skills,
      predictedCareer: bestMatch.name,
      confidence: highestScore,
      missingSkills,
    });

    await profile.save();

    // ✅ RESPONSE FOR FRONTEND
    const learningLinks = missingSkills.map((skill) => ({
  skill,
  link: skillResources[skill] || "https://www.google.com"
}));

res.status(200).json({
  career: bestMatch.name,
  match: highestScore,
  roadmap: bestMatch.roadmap,
  missingSkills,
  learningLinks   // 👈 NEW
});

  } catch (error) {
    console.error("Career prediction error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ======================================
 * GET CAREER HISTORY (USER SPECIFIC)
 * ======================================
 */
exports.getCareerHistory = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const history = await Profile.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error("Career history error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
