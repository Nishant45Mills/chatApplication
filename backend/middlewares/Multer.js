const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "My images", // Cloudinary folder to store files
    format: async (req, file) => "png", // Force a specific file format
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`, // Custom file name
  },
});

const upload = multer({ storage });

module.exports = upload;
