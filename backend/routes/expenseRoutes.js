const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

router.post("/add", async (req, res) => {
  const data = await Expense.create(req.body);
  res.json(data);
});

router.get("/", async (req, res) => {
  const data = await Expense.find();
  res.json(data);
});

module.exports = router;