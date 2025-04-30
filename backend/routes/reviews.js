import express from "express";
import Review from "../models/Review.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ Submit a new review after session
router.post("/", async (req, res) => {
  const { tutorEmail, studentEmail, sessionId, rating, comment } = req.body;

  if (!tutorEmail || !studentEmail || !rating || !sessionId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create and save the review
    const newReview = new Review({
      tutorEmail,
      studentEmail,
      sessionId,
      rating,
      comment,
    });

    await newReview.save();

    // Recalculate tutor's average rating
    const reviews = await Review.find({ tutorEmail });
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = (total / reviews.length).toFixed(2);

    // Update tutor profile
    await User.findOneAndUpdate(
      { email: tutorEmail },
      { rating: avgRating }
    );

    res.json({ message: "Review submitted", avgRating });
  } catch (err) {
    console.error("❌ Review submission error:", err);
    res.status(500).json({ message: "Server error while submitting review." });
  }
});

export default router;
