const multer = require("multer");
const path = require("path");

// Configure Multer to store files in memory
const storage = multer.memoryStorage();

// Set up Multer middleware with local storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

module.exports = upload;
