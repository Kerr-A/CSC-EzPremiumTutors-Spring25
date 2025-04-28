import express from "express";
import User from "../models/User.js"; // Assuming you have User model

const router = express.Router();

// GET /api/tutors/all - Get all tutor profiles
router.get("/all", async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor" }).select("-password"); // Don't send password
    res.json(tutors);
  } catch (err) {
    console.error("❌ Fetch Tutors Error:", err.message);
    res.status(500).json({ message: "Failed to fetch tutors", error: err.message });
  }
});

export default router;
