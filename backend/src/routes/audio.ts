import { Router } from "express";
import {
  uploadAudio,
  listAudio,
  playAudio,
  deleteAudio,
  upload,
} from "../controllers/audio";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post("/upload", authenticateToken, upload.single("audio"), uploadAudio);
router.get("/", authenticateToken, listAudio);
router.get("/:id/play", authenticateToken, playAudio);
router.delete("/:id", authenticateToken, deleteAudio);

export default router;
