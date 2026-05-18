import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  try {

    const fileStr = req.file.buffer.toString("base64");

    const uploadResponse = await cloudinary.uploader.upload(
      `data:image/png;base64,${fileStr}`,
      {
        folder: "luxe-wigs" // 👈 THIS IS THE LINE YOU ASKED ABOUT
      }
    );

    res.json({ url: uploadResponse.secure_url });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;