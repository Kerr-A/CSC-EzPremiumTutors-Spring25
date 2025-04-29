import express from "express";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js"; // ✅ Import your Appointment model

const router = express.Router();

// Existing update profile route
router.put("/update", async (req, res) => {
  const { email, name, bio, subjects } = req.body;

  try {
    const tutor = await User.findOne({ email, role: "tutor" });
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    if (name !== undefined) tutor.name = name;
    if (bio !== undefined) tutor.bio = bio;
    if (subjects !== undefined) tutor.subjects = subjects;

    await tutor.save();
    res.json({ message: "Tutor updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ NEW route to get tutor sessions
router.get("/sessions", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const sessions = await Appointment.find({ tutorEmail: email }).sort({ date: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
