import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/User.js";
import { sendEmail } from "../utils/emailsender.js";

dotenv.config();
const router = express.Router();

// REGISTER (no password hashing)
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Registration failed", error: err });
  }
});

// LOGIN (student, tutor, admin - plain password)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "secret123", { expiresIn: "1d" });
    res.json({ token, role: user.role });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed", error: err });
  }
});

// FORGOT PASSWORD (shared across all roles)
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "If the email exists, a reset link has been sent." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.tokenExpiry = Date.now() + 3600000;
    await user.save();

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const html = `
      <p>Hello ${user.name},</p>
      <p>You requested a password reset.</p>
      <p>Click this link to reset your password:</p>
      <a href="${resetURL}">${resetURL}</a>
      <p>This link expires in 1 hour.</p>
    `;

    await sendEmail(user.email, "Reset Your Password - EzPremium Tutors", html);

    res.json({ message: "Reset link sent! Check your email." });
  } catch (err) {
    console.error("❌ Forgot password error:", err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

export default router;
