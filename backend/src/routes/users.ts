import { Router } from "express";
const router = Router();

// Placeholder user CRUD routes
router.post("/", (req, res) => res.json({ message: "Create user" }));
router.put("/:id", (req, res) => res.json({ message: "Update user" }));
router.delete("/:id", (req, res) => res.json({ message: "Delete user" }));
router.get("/me", (req, res) => res.json({ message: "Get current user" }));

export default router;
