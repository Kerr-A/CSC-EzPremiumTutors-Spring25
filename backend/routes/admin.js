import express from "express";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

const router = express.Router();

// GET /api/admin/appointments
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch appointments", error: err.message });
  }
});

// GET /api/admin/users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

// DELETE /api/admin/users/:id
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
});

// GET /api/admin/analytics
router.get("/analytics", async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTutors = await User.countDocuments({ role: "tutor" });
    const totalSessions = await Appointment.countDocuments({});
    const sessionPrice = 50; // Assume $50 per session
    const totalRevenue = totalSessions * sessionPrice;

    res.json({ totalStudents, totalTutors, totalSessions, totalRevenue });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch analytics", error: err.message });
  }
});

export default router;
