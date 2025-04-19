import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  studentName: String,
  tutorName: String,
  date: String,
  time: String,
  notes: String,
});

export default mongoose.model("Appointment", appointmentSchema);
