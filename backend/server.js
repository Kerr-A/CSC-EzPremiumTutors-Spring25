import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Route imports
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import appointmentRoutes from "./routes/appointments.js"; // ✅ Corrected file name

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);                 // Auth (register/login)
app.use("/api/chat", chatRoutes);                 // Chat system
app.use("/api/appointment", appointmentRoutes);   // Booking + Email

// Root route for server check
app.get("/", (req, res) => {
  res.send("✅ EzPremium Tutors Backend is running!");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});
