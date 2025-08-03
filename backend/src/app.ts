import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import audioRoutes from "./routes/audio.js";

const app = express();

// Middleware
app.use(cors()); // handles CORS issues
app.use(express.json()); // parses incoming JSON requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/audio", audioRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

export default app;
