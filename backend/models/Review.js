import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  tutorEmail: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Review", reviewSchema);
