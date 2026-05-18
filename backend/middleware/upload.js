import multer from "multer";

/* =========================
   MEMORY STORAGE (Cloudinary-ready)
========================= */
const storage = multer.memoryStorage();

/* =========================
   FILE FILTER (SAFETY)
========================= */
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpg, png, webp) are allowed"), false);
  }
};

/* =========================
   MULTER CONFIG
========================= */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export default upload;