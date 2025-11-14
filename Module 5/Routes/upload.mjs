import express from "express";
import multer from "multer";
import { UserData } from "../Mongoose/Schemas/localUserDataSchema.mjs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload/:userId", upload.single("image"), async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserData.findByIdAndUpdate(
      userId,
      { profileImage: req.file.filename }, 
      { new: true }
    );

    res.status(200).json({ message: "Image uploaded successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
