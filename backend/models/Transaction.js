const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: {
    type: String,
    enum: ["food", "travel", "rent", "salary", "other"],
    default: "other",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);