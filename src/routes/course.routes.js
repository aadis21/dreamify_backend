const express = require("express");
const router = express.Router();
const {
  addCourse,
  readCourse,
  updateCourse,
  deleteCourse,
  getCourseBySlug,
} = require("../controllers/course.controller");
const upload = require("../utils/upload");

//login route
router.post("/add", upload.single("image"), addCourse);
router.get("/slug/:slug", getCourseBySlug);
router.get("/read", readCourse);
router.put("/update/:id", upload.single("image"), updateCourse);
router.delete("/delete/:id", deleteCourse);

module.exports = router;
