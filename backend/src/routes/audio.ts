import { Router } from "express";
const router = Router();

// Placeholder audio routes
router.post("/upload", (req, res) => res.json({ message: "Upload audio" }));
router.get("/", (req, res) => res.json({ message: "List audio files" }));
router.get("/:id/play", (req, res) => res.json({ message: "Play audio" }));

export default router;
