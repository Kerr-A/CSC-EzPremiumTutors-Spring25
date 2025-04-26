const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// Book a new session
router.post('/book', async (req, res) => {
  const { studentName, studentEmail, tutorName, startTime } = req.body;

  try {
    const session = new Session({
      studentName,
      studentEmail,
      tutorName,
      startTime: new Date(startTime),
      reminderSent: false,
    });

    await session.save();

    res.status(201).json({ message: 'Session booked successfully!' });
  } catch (error) {
    console.error('Error booking session:', error);
    res.status(500).json({ error: 'Error booking session.' });
  }
});

module.exports = router;
