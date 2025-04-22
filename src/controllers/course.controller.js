const express = require("express");
const router = express.Router();
const Course = require("../model/course.js");
const asyncHandler = require("../utils/asyncHandler.js");

//add course
const addCourse = asyncHandler(async (req, res) => {
  const {
    title,
    subtitle,
    course_name,
    description,
    listone,
    listtwo,
    listthree,
  } = req.body;

  const image = req.file ? req.file.path : null; // Cloudinary gives the full secure URL

  try {
    const newCourse = new Course({
      title,
      subtitle,
      image, // Save Cloudinary URL
      course_name,
      description,
      listone,
      listtwo,
      listthree,
    });

    await newCourse.save();
    res.status(201).json({
      message: "Course added successfully!",
      course: newCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding course" });
  }
});

//update course
const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    subtitle,
    course_name,
    description,
    listone,
    listtwo,
    listthree,
  } = req.body;

  const updateData = {
    title,
    subtitle,
    course_name,
    description,
    listone,
    listtwo,
    listthree,
  };

  if (req.file) {
    updateData.image = req.file.path; // new Cloudinary URL
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course updated successfully!",
      course: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating course" });
  }
});

//delete course
const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting course" });
  }
});

//Get Slug
const getCourseBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching course" });
  }
});

// Get all courses
const readCourse = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching courses" });
  }
});

module.exports = {
  addCourse,
  readCourse,
  updateCourse,
  deleteCourse,
  getCourseBySlug,
};
