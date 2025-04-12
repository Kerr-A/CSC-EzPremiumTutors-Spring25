import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"; // ✅ adjust path if needed

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Mount the routes properly
app.use("/api/auth", authRoutes);

// Optional: test route to confirm server is running
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// MongoDB connection
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
