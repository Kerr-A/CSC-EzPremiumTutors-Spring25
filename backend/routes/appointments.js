import express from "express";
import { sendEmail } from "../utils/emailsender.js";
import Appointment from "../models/Appointment.js"; // ✅ Make sure this model exists

const router = express.Router();

// POST /api/appointments/book
router.post("/book", async (req, res) => {
  const { studentName, tutor, date, time, notes, tutorEmail } = req.body;

  try {
    // Generate a dummy Zoom link
    const zoomLink = `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}?pwd=${Math.random().toString(36).substring(2, 10)}`;

    // Save to database
    const newAppointment = new Appointment({
      studentName,
      tutorName: tutor,
      date,
      time,
      notes,
    });

    await newAppointment.save();

    // Email content
    const subject = "📬 New Tutoring Appointment - EzPremium Tutors";
    const html = `
      <h2>New Appointment Details</h2>
      <p><strong>👤 Student:</strong> ${studentName}</p>
      <p><strong>📅 Date:</strong> ${date}</p>
      <p><strong>⏰ Time:</strong> ${time}</p>
      <p><strong>📝 Notes:</strong> ${notes || "None"}</p>
      <p><strong>🔗 Zoom Link:</strong> <a href="${zoomLink}">${zoomLink}</a></p>
    `;

    // Send email to tutor
    await sendEmail(tutorEmail, subject, html);

    res.status(200).json({ message: "Appointment booked and email sent!", zoomLink });
  } catch (err) {
    console.error("❌ Booking Error:", err);
    res.status(500).json({ message: "Failed to book appointment", error: err.message });
  }
});

// GET /api/appointments/tutor/:name
router.get("/tutor/:name", async (req, res) => {
  try {
    const appointments = await Appointment.find({ tutorName: req.params.name });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch appointments", error: err.message });
  }
});

export default router;
