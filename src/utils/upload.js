// const multer = require("multer");
// const path = require("path");

// // Set up storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public"); // make sure this folder exists
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, filename);
//   },
// });

// // Filter to accept only images
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."),
//       false
//     );
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
// });

// module.exports = upload;



const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "courses", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;

