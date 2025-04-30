// routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/User.js";
import BlacklistedToken from "../models/BlacklistedToken.js"; // 👈 NEW
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

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,           // 🔒 use .env secret
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// LOGOUT with JWT Blacklisting
router.post("/logout", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const expiry = new Date(decoded.exp * 1000); // convert expiry to ms

      // Save blacklisted token
      const blacklisted = new BlacklistedToken({ token, expiresAt: expiry });
      await blacklisted.save();

      return res.status(200).json({ message: "Logged out and token blacklisted" });
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(400).json({ message: "No token provided" });
  }
});

// FORGOT PASSWORD
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
