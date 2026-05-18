import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/* =========================
   MULTER CONFIG
========================= */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit (important for production)
  }
});

/* =========================
   UPLOAD ROUTE
========================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    /* =========================
       VALIDATION 1: FILE EXISTS
    ========================= */
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded"
      });
    }

    /* =========================
       VALIDATION 2: CLOUDINARY CONFIG
       (THIS FIXES YOUR DEPLOYMENT CRASH)
    ========================= */
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("❌ Cloudinary env missing");

      return res.status(500).json({
        success: false,
        message: "Cloudinary not configured on server"
      });
    }

    /* =========================
       CONVERT FILE
    ========================= */
    const fileStr = req.file.buffer.toString("base64");
    const fileType = req.file.mimetype;

    const dataUri = `data:${fileType};base64,${fileStr}`;

    /* =========================
       UPLOAD TO CLOUDINARY
    ========================= */
    const uploadResponse = await cloudinary.uploader.upload(
      dataUri,
      {
        folder: "luxe-wigs"
      }
    );

    /* =========================
       SUCCESS RESPONSE
    ========================= */
    return res.status(200).json({
      success: true,
      url: uploadResponse.secure_url
    });

  } catch (error) {
    console.error("❌ UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Upload failed"
    });
  }
});

export default router;