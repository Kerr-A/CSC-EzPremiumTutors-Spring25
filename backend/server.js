import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";

import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import appointmentRoutes from "./routes/appointments.js";
import Appointment from "./models/Appointment.js";
import { sendEmail } from "./utils/emailsender.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/appointment", appointmentRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("✅ EzPremium Tutors Backend is running!");
});

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
  startReminderCron(); // Start cron after DB connection
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

// CRON job: Send reminders
function startReminderCron() {
  cron.schedule('*/10 * * * *', async () => {
    console.log("⏰ Checking for upcoming tutoring appointments...");

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
            <p><strong>👤 Student:</strong> ${appt.studentName}</p>
            <p><strong>👨‍🏫 Tutor:</strong> ${appt.tutorName}</p>
            <p><strong>📅 Date:</strong> ${appt.date}</p>
            <p><strong>⏰ Time:</strong> ${appt.time}</p>
            <p>See you soon on Zoom!</p>
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

