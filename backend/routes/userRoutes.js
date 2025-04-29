import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get all users (students + tutors)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "name _id role");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get one tutor profile by email
router.get("/tutor", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const tutor = await User.findOne({ email, role: "tutor" });

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    res.json({
      name: tutor.name,
      email: tutor.email,
      bio: tutor.bio || "",
      subjects: tutor.subjects || [],
    });
  } catch (err) {
    console.error("❌ Error fetching tutor profile:", err);
    res.status(500).json({ message: "Failed to fetch tutor profile", error: err.message });
  }
});

// ✅ Get all tutors (student side)
router.get("/tutors", async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor" }).select("-password"); // No passwords!
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

