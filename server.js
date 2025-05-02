// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const server = http.createServer(app); // HTTP server needed for Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use("/webhook", bodyParser.raw({ type: "application/json" }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
connectDB();

// Tutor schema
const tutorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
});
const Tutor = mongoose.model("Tutor", tutorSchema);

// Auth Middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.tutorId = decoded.id;
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
};

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "video-call.html"));
});

app.post("/api/tutors/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields are required." });

    const existingTutor = await Tutor.findOne({ email });
    if (existingTutor) return res.status(400).json({ error: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTutor = new Tutor({ name, email, password: hashedPassword });
    await newTutor.save();

    res.status(201).json({ message: "Tutor registered successfully!" });
});

app.post("/api/tutors/login", async (req, res) => {
    const { email, password } = req.body;
    const tutor = await Tutor.findOne({ email });
    if (!tutor || !(await bcrypt.compare(password, tutor.password))) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: tutor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, tutorId: tutor._id });
});

app.post("/api/checkout", async (req, res) => {
    const { tutorId, price } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: { name: `Tutoring Session with Tutor ${tutorId}` },
                    unit_amount: price * 100,
                },
                quantity: 1,
            }],
            mode: "payment",
            success_url: "http://localhost:55555/success",
            cancel_url: "http://localhost:55555/cancel",
            metadata: { tutorId },
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: "Stripe checkout failed" });
    }
});

app.post("/webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook Error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const tutorId = session.metadata.tutorId;

        try {
            const tutor = await Tutor.findById(tutorId);
            if (tutor) {
                tutor.balance += 40;
                await tutor.save();
                console.log(`✅ Payment recorded for tutor ${tutorId}`);
            } else {
                console.log("Tutor not found for payment.");
            }
        } catch (err) {
            console.error("Error updating tutor:", err.message);
        }
    }

    res.status(200).send("Received");
});

app.get("/api/tutors/:id", authenticate, async (req, res) => {
    if (req.tutorId !== req.params.id) return res.status(403).json({ error: "Access denied" });

    try {
        const tutor = await Tutor.findById(req.params.id);
        if (!tutor) return res.status(404).json({ error: "Tutor not found" });

        res.json({ name: tutor.name, balance: tutor.balance });
    } catch (error) {
        console.error("Error fetching tutor:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/products", (req, res) => {
    res.send("Server is ready");
});

// WebRTC signaling using Socket.IO
io.on("connection", (socket) => {
    console.log("🟢 New socket connected:", socket.id);

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-joined", socket.id);
    });

    socket.on("offer", ({ offer, to }) => {
        io.to(to).emit("offer", { offer, from: socket.id });
    });

    socket.on("answer", ({ answer, to }) => {
        io.to(to).emit("answer", { answer, from: socket.id });
    });

    socket.on("ice-candidate", ({ candidate, to }) => {
        io.to(to).emit("ice-candidate", { candidate, from: socket.id });
    });

    socket.on("disconnect", () => {
        console.log("🔴 Socket disconnected:", socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 55555;
server.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});
