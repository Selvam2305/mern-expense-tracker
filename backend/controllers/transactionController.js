const Transaction = require("../models/Transaction");

// ADD
exports.addTransaction = async (req, res) => {
  const txn = await Transaction.create(req.body);
  res.json(txn);
};

// GET
exports.getTransactions = async (req, res) => {
  const txns = await Transaction.find().sort({ date: -1 });
  res.json(txns);
};

// DELETE
exports.deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};