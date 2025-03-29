// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js"; // ✅ add this

dotenv.config(); // ✅ load .env variables before using them

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// ✅ Routes
app.use("/api/auth", authRoutes); // e.g. /api/auth/register, /api/auth/login

// ✅ Example test route
app.get("/products", (req, res) => {
  res.json({ message: "Products route is working" });
});

// ✅ Connect DB and start server
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("✅ Server started at http://localhost:5000");
  });
});
