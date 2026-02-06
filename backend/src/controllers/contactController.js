const ContactMessage = require("../models/ContactMessage");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message saved",
      data: newMessage,
    });
  } catch (err) {
    console.error("CONTACT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
