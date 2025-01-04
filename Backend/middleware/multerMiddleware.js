const multer = require("multer");
const path = require("path");

// Define the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store the image in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

// Filter the uploaded file to accept only images
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."), false);
  }
};

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
