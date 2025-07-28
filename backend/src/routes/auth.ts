import { Router } from "express";
const router = Router();

// Placeholder login route
router.post("/login", (req, res) => {
  res.json({ message: "Login endpoint" });
});

export default router;
