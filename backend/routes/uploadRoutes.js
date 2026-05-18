import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage()
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // ✅ CHECK FILE FIRST (IMPORTANT FIX)
    if (!req.file) {
      return res.status(400).json({
        message: "No image file uploaded"
      });
    }

    const fileStr = req.file.buffer.toString("base64");

    const fileType = req.file.mimetype;

    // ✅ FIX: dynamic mime type
    const dataUri = `data:${fileType};base64,${fileStr}`;

    const uploadResponse = await cloudinary.uploader.upload(
      dataUri,
      {
        folder: "luxe-wigs"
      }
    );

    return res.json({
      url: uploadResponse.secure_url
    });

  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    return res.status(500).json({
      message: "Upload failed"
    });
  }
});

export default router;