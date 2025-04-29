import express from "express";
import User from "../models/User.js"; // your User model

const router = express.Router();

// Get all users (students + tutors) — for now, no auth
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "name _id role"); // only send needed fields
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
