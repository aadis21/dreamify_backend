const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminCredentials = require("../utils/adminCredentials");
const asyncHandler = require("../utils/asyncHandler");
const dotenv = require("dotenv");
dotenv.config();

const adminController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check username
  if (username !== adminCredentials.username) {
    return res.status(401).json({ message: "Invalid username" });
  }

  // Compare hashed password
  const isMatch = bcrypt.compareSync(password, adminCredentials.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // ✅ If both checks pass, generate the token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Set HTTP-only cookie (secure)
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Login successful!" });
});

const logoutController = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0), // Expire the cookie immediately
  });

  return res.status(200).json({ message: "Logout successful!" });
});

module.exports = { adminController, logoutController };
