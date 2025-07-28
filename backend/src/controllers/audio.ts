import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import prisma from "../prisma/client";

interface AuthRequest extends Request {
  user?: { id: number; username: string };
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/ogg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only audio files are allowed."));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

export const uploadAudio = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const allowedCategories = ["MUSIC", "RECORDING", "SOUNDEFFECT", "OTHER"];

    const { description, category } = req.body;
    const selectedCategory = allowedCategories.includes(category)
      ? category
      : "OTHER";

    const audio = await prisma.audio.create({
      data: {
        filename: req.file.filename,
        description: description || "",
        category: selectedCategory,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Audio uploaded successfully",
      audio: {
        id: audio.id,
        filename: audio.filename,
        description: audio.description,
        category: audio.category,
        createdAt: audio.createdAt,
      },
    });
  } catch (error) {
    console.error("Upload audio error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listAudio = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const audios = await prisma.audio.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        filename: true,
        description: true,
        category: true,
        createdAt: true,
      },
    });

    res.json(audios);
  } catch (error) {
    console.error("List audio error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const playAudio = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { id } = req.params;

    const audio = await prisma.audio.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    });

    if (!audio) {
      return res.status(404).json({ message: "Audio not found" });
    }

    const filePath = path.join(__dirname, "../uploads", audio.filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Audio file not found" });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    // const range = req.headers.range;

    // if (range) {
    //   const parts = range.replace(/bytes=/, "").split("-");
    //   const start = parseInt(parts[0], 10);
    //   const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    //   const chunksize = end - start + 1;
    //   const file = fs.createReadStream(filePath, { start, end });
    //   const head = {
    //     "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    //     "Accept-Ranges": "bytes",
    //     "Content-Length": chunksize,
    //     "Content-Type": "audio/mpeg",
    //   };
    //   res.writeHead(206, head);
    //   file.pipe(res);
    // } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
    // }
  } catch (error) {
    console.error("Play audio error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAudio = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { id } = req.params;

    const audio = await prisma.audio.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    });

    if (!audio) {
      return res.status(404).json({ message: "Audio not found" });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, "../uploads", audio.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await prisma.audio.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Audio deleted successfully" });
  } catch (error) {
    console.error("Delete audio error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
