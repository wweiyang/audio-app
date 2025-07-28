import { Router } from "express";
import {
  getCurrentUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post("/", createUser);
router.get("/me", authenticateToken, getCurrentUser);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;
