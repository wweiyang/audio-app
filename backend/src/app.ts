import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import audioRoutes from "./routes/audio";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/audio", audioRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

export default app;
