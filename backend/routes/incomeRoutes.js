const express = require("express");
const Income = require("../models/Income");

const router = express.Router();

// Add income
router.post("/add", async (req, res) => {
  const data = await Income.create(req.body);
  res.json(data);
});

// Get all income
router.get("/", async (req, res) => {
  const data = await Income.find();
  res.json(data);
});

module.exports = router;