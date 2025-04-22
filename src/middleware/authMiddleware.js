const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const protect = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the correct secret key
    req.admin = decoded; // Store admin data in request
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = protect;
