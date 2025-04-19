// backend/routes/chat.js
import express from "express";
import Message from "../models/Messages.js";
import User from "../models/User.js";

const router = express.Router();

// Save a new message
router.post("/send", async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const newMsg = new Message({ sender, receiver, content });
    await newMsg.save();
    res.status(201).json({ message: "Message sent", data: newMsg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages between two users
router.get("/conversations/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get contacts list (for left panel)
router.get("/contacts/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const filterRole = user.role === "student" ? "tutor" : "student";
    const contacts = await User.find({ role: filterRole }, "name email _id");

    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
