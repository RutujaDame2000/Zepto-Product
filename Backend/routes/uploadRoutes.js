// backend/routes/uploadRoutes.js
import express from "express";
import multer from "multer";

const router = express.Router();

// Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/public/uploads/products"); // ✅ Save to this folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 📥 Only upload image
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imagePath = `/uploads/products/${req.file.filename}`;
    res.status(201).json({ imagePath }); // ✅ Return only image path
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
});

export default router;
