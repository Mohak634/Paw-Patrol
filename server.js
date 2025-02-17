import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import Report from "./models/Report.js";

const app = express();
const PORT = 5000;

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/paw_patrol", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Route to handle form submission
app.post("/submit", upload.single("image"), async (req, res) => {
  try {
    const { name, phone, location, description } = req.body;
    const image = req.file ? req.file.path : null;

    const newReport = new Report({ name, phone, location, description, image });
    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error submitting report" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
