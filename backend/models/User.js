import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Plain text for now
  role: { type: String, enum: ["student", "tutor", "admin"], required: true },
  subjects: { type: [String], default: [] }, // 🆕 List of subjects (for tutors)
  bio: { type: String, default: "" },         // 🆕 Short biography (for tutors)
  resetToken: { type: String },
  tokenExpiry: { type: Date },
});

export default mongoose.model("User", userSchema);


