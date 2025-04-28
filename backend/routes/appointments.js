import express from "express";
import Appointment from "../models/Appointment.js";
import { sendEmail } from "../utils/emailsender.js";

const router = express.Router();

// ========================
// 📬 Book a new appointment
// ========================
router.post("/book", async (req, res) => {
  const { studentName, tutor, date, time, notes, tutorEmail } = req.body;

  try {
    const zoomLink = `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}?pwd=${Math.random().toString(36).substring(2, 10)}`;

    const newAppointment = new Appointment({
      studentName,
      tutorName: tutor,
      date,
      time,
      notes,
      tutorEmail,
      reminderSent: false,
    });

    await newAppointment.save();

    // Send email to tutor
    const subject = "📬 New Tutoring Appointment - EzPremium Tutors";
    const html = `
      <h2>New Appointment Details</h2>
      <p><strong>Student:</strong> ${studentName}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Notes:</strong> ${notes || "None"}</p>
      <p><strong>Zoom Link:</strong> <a href="${zoomLink}">${zoomLink}</a></p>
    `;

    await sendEmail(tutorEmail, subject, html);

    res.status(200).json({ message: "Appointment booked and email sent!", zoomLink });
  } catch (err) {
    res.status(500).json({ message: "Failed to book appointment", error: err.message });
  }
});

// ==================================
// 📖 Get all appointments for student
// ==================================
router.get("/student/:name", async (req, res) => {
  try {
    const appointments = await Appointment.find({ studentName: req.params.name });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch student appointments", error: err.message });
  }
});

// ==================================
// 📖 Get all upcoming appointments for a student (for notifications)
// ==================================
router.get("/upcoming-student", async (req, res) => {
  const { studentName } = req.query;

  try {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    const appointments = await Appointment.find({
      studentName,
      date: { $gte: today }, // Only future or today appointments
    }).sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch upcoming appointments", error: err.message });
  }
});

// ==================================
// 📖 Get all upcoming appointments for a tutor
// ==================================
router.get("/upcoming", async (req, res) => {
  const { tutorEmail } = req.query;

  try {
    const today = new Date().toISOString().split('T')[0];
    const appointments = await Appointment.find({
      tutorEmail,
      date: { $gte: today },
    }).sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tutor upcoming appointments", error: err.message });
  }
});

// ===========================
// ❌ Cancel (delete) an appointment
// ===========================
router.delete("/cancel/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment canceled successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel appointment", error: err.message });
  }
});

export default router;


