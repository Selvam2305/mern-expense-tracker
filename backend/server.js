const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require("./models/Transaction");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/expense-tracker")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

/* =======================
   TEST ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* =======================
   GET ALL TRANSACTIONS
======================= */
app.get("/api/transactions", async (req, res) => {
  try {
    const data = await Transaction.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const transaction = new Transaction({
      title: req.body.title,
      amount: Number(req.body.amount),
      type: req.body.type,
      category: req.body.category,
      createdAt: new Date(), // IMPORTANT FIX
    });

    const saved = await transaction.save();

    console.log("SAVED:", saved); // DEBUG

    res.status(201).json(saved);
  } catch (err) {
    console.log("POST ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});
/* =======================
   DELETE TRANSACTION
======================= */
app.delete("/api/transactions/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
  START SERVER
======================= */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});