const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

let tutors = []; // Temporary array to store tutors (use a database in production)

app.post("/api/tutors/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Check if email already exists
    if (tutors.find(tutor => tutor.email === email)) {
        return res.status(400).json({ error: "Email already in use." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save tutor to database (for now, using an array)
    const newTutor = { id: tutors.length + 1, name, email, password: hashedPassword };
    tutors.push(newTutor);

    res.status(201).json({ message: "Tutor registered successfully!" });
});

app.listen(34375, () => console.log("Server running on port 34375"));
