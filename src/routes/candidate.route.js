const express = require("express");
const router = express.Router();
const {
  createCandidate,
  readCandidate,
} = require("../controllers/candidate.controller");

//login route
router.post("/create", createCandidate);
router.get("/read", readCandidate);

module.exports = router;
