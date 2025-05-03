/* const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { Media } = require("./databasa Schema Two/media");

const router = express.Router();

const JWT_SECRET = "mySuperSecretKey123!@#";

// ✅ Middleware to check JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
};

// ✅ POST: Upload photo/video
router.post("/upload", authenticateToken, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;
    const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];

    if (!allowedTypes.includes(file.mimetype)) {
      return res
        .status(400)
        .json({ msg: "Only JPEG, PNG, and MP4 files are allowed" });
    }

    const uploadPath = path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadPath, filename);

    // ✅ Save file to disk
    file.mv(filePath, async (err) => {
      if (err) {
        console.error("❌ Error saving file:", err.message);
        return res.status(500).json({ msg: "Failed to save file" });
      }

      // ✅ Save file metadata to database
      const media = await Media.create({
        comment: req.body.comment || "",
        filename,
        filetype: file.mimetype,
        mediaUrl: `/uploads/${filename}`,
        userId: req.user.id
      });

      res.status(201).json({
        msg: "File uploaded successfully",
        media
      });
    });
  } catch (error) {
    console.error("❌ Error uploading file:", error.message);
    res.status(500).json({ msg: "Error uploading file", error: error.message });
  }
});

// ✅ GET: Fetch all media for logged-in user
router.get("/media", authenticateToken, async (req, res) => {
  try {
    const media = await Media.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json({ media });
  } catch (error) {
    console.error("❌ Error fetching media:", error.message);
    res.status(500).json({ msg: "Error fetching media", error: error.message });
  }
});

// ✅ GET: Serve media files
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

module.exports = router; */

// right one
const express = require("express");
const fs = require("fs");
const path = require("path");
const { Media } = require("./databasa Schema Two/media");
const authenticateToken = require("../Middleware/authMiddleware"); // ✅ Import middleware

const router = express.Router();

// ✅ POST: Upload photo/video
router.post("/upload", authenticateToken, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;
    const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];

    if (!allowedTypes.includes(file.mimetype)) {
      return res
        .status(400)
        .json({ msg: "Only JPEG, PNG, and MP4 files are allowed" });
    }

    const uploadPath = path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadPath, filename);

    file.mv(filePath, async (err) => {
      if (err) {
        console.error("❌ Error saving file:", err.message);
        return res.status(500).json({ msg: "Failed to save file" });
      }

      // ✅ Save file metadata to database
      const media = await Media.create({
        comment: req.body.comment || "",
        filename,
        filetype: file.mimetype,
        mediaUrl: `/uploads/${filename}`,
        userId: req.user.id // ✅ Automatically available from decoded token
      });

      res.status(201).json({
        msg: "File uploaded successfully",
        media
      });
    });
  } catch (error) {
    console.error("❌ Error uploading file:", error.message);
    res.status(500).json({ msg: "Error uploading file", error: error.message });
  }
});

// ✅ GET: Fetch all media for logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const media = await Media.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json({ media });
  } catch (error) {
    console.error("❌ Error fetching media:", error.message);
    res.status(500).json({ msg: "Error fetching media", error: error.message });
  }
});
// delete media base on media id
router.delete("/delete/:id", authenticateToken, async (req, res) => {
  const { id } = req.params; // Fix: Use req.params instead of req.body

  try {
    const media = await Media.findOne({
      where: { id: id }
    });

    if (!media) {
      return res.status(404).json({ msg: "Media not found" });
    }

    await media.destroy(); // Fix: Destroy the media after finding it
    res.status(200).json({ msg: "Media deleted successfully" });
  } catch (error) {
    console.error("Error deleting media:", error); // Fix: Log the actual error
    res.status(500).json({ msg: "Error deleting media" });
  }
});

// ✅ GET: Serve media files
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

module.exports = router;
