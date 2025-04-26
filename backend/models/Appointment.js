import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  tutorName: { type: String, required: true },
  date: { type: String, required: true },   // e.g. "2025-04-28"
  time: { type: String, required: true },   // e.g. "15:00"
  notes: { type: String },
  tutorEmail: { type: String, required: true },
  reminderSent: { type: Boolean, default: false }, // ✅ Added
});

export default mongoose.model("Appointment", appointmentSchema);
