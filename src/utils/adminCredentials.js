const bcrypt = require("bcryptjs");
const adminUsername = "admin";
const adminPassword = "pass";

// Hash password before exporting
const hashedPassword = bcrypt.hashSync(adminPassword, 10);

module.exports = {
  username: adminUsername,
  password: hashedPassword,
};