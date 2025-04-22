const express = require("express");
const {
  adminController,
  logoutController,
} = require("../controllers/adminlogin.controller");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Login Route
router.post("/login", adminController);

// Protected Dashboard Route
router.get("/dashboard", protect, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});

// Logout Route (Clears cookie)
router.post("/logout", logoutController);

module.exports = router;
