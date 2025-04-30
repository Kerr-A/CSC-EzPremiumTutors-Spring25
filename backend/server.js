import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import jwt from "jsonwebtoken";

import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import appointmentRoutes from "./routes/appointments.js";
import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/userRoutes.js";
import payrollRoutes from "./routes/payroll.js";
import tutorRoutes from "./routes/tutors.js";
import Appointment from "./models/Appointment.js";
import BlacklistedToken from "./models/BlacklistedToken.js"; // ✅ NEW
import { sendEmail } from "./utils/emailsender.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server manually for socket.io
const server = http.createServer(app);

// Attach Socket.io server
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api", payrollRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("✅ EzPremium Tutors Backend is running!");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");

  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

  startReminderCron();
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

// Cron Job: Send Appointment Reminders
function startReminderCron() {
  cron.schedule("*/10 * * * *", async () => {
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

// --- SOCKET.IO EVENTS (REALTIME CHAT) ---
io.on("connection", (socket) => {
  console.log("🔵 New socket connected:", socket.id);

  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    io.emit("receiveMessage", { senderId, receiverId, content, createdAt: new Date() });
  });

  socket.on("typing", ({ senderId, receiverId }) => {
    io.emit("showTyping", { senderId, receiverId });
  });

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    io.emit("hideTyping", { senderId, receiverId });
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});
