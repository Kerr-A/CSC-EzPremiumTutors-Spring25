import express from "express";
import Appointment from "../models/Appointment.js"; // adjust path to your model
const router = express.Router();

// GET /api/tutor/payroll?email=xyz
router.get("/tutor/payroll", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Tutor email is required" });
  }

  try {
    const sessions = await Appointment.find({ tutorEmail: email });

    const result = sessions.map(session => ({
      date: session.date,
      time: session.time,
      studentName: session.studentName,
      duration: session.duration || 1 // fallback
    }));

    res.json(result);
  } catch (err) {
    console.error("❌ Error fetching payroll:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
