// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "tutor", "admin"],
    default: "student",
  },
  bio: {
    type: String,
    default: "",
  },
  subjects: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    default: null,
  },
  photoUrl: {
    type: String,
    default: "",
  },
  isAvailable: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
