import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // 🔓 Plain text for development
  role: { type: String, enum: ["student", "tutor"], required: true },
  resetToken: { type: String },
  tokenExpiry: { type: Date },
});

export default mongoose.model("User", userSchema);

