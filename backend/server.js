import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import jwt from "jsonwebtoken"; // ✅ Correctly import jwt if you ever need (not used here)

import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import appointmentRoutes from "./routes/appointments.js";
import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/admin.js";

import Appointment from "./models/Appointment.js";
import { sendEmail } from "./utils/emailsender.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("✅ EzPremium Tutors Backend is running!");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
  startReminderCron();
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

// Cron Job: Send Appointment Reminders
function startReminderCron() {
  cron.schedule('*/10 * * * *', async () => {
    console.log("⏰ Checking upcoming appointments...");

    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    try {
      const appointments = await Appointment.find({ reminderSent: false });

      for (const appt of appointments) {
        const appointmentDateTime = new Date(`${appt.date}T${appt.time}`);
        if (appointmentDateTime >= now && appointmentDateTime <= oneHourLater) {
          const subject = "⏰ Reminder: Your Tutoring Session is Coming Up!";
          const html = `
            <h2>Reminder</h2>
            <p><strong>Student:</strong> ${appt.studentName}</p>
            <p><strong>Tutor:</strong> ${appt.tutorName}</p>
            <p><strong>Date:</strong> ${appt.date}</p>
            <p><strong>Time:</strong> ${appt.time}</p>
          `;
          await sendEmail(appt.tutorEmail, subject, html);

          appt.reminderSent = true;
          await appt.save();
          console.log(`✅ Reminder sent to tutor ${appt.tutorName}`);
        }
      }
    } catch (error) {
      console.error("❌ Reminder error:", error.message);
    }
  });
}

