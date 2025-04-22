const asyncHandler = require("../utils/asyncHandler");
const Candidate = require("../model/candidate.model");

// Create a new candidate and save to the database
const createCandidate = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  // Check if the candidate already exists
  const existingCandidate = await Candidate.findOne({ email });
  if (existingCandidate) {
    return res
      .status(400)
      .json({ message: "Candidate with this email already exists." });
  }

  const candidate = new Candidate({ name, email, phone });

  await candidate.save();
  res
    .status(201)
    .json({ message: "Candidate created successfully!", candidate });
});

// Read all candidates from the database
const readCandidate = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find();
  res.status(200).json(candidates);
});

module.exports = { createCandidate, readCandidate };
