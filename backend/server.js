const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require("./models/Transaction");

const app = express();

app.use(cors());
app.use(express.json());

/* =======================================================
   MONGODB CONNECTION (FIXED FOR DEPLOYMENT)
======================================================= */
// This reads the MONGO_URI from Render's Environment variables.
// If it's running on your local machine, it falls back to localhost.
const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expense-tracker";

mongoose
  .connect(dbURI)
  .then(() => console.log("🚀 MongoDB successfully connected!"))
  .catch((err) => console.log("❌ Database connection error:", err));

/* =======================
   TEST ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("Backend is running and database is connected!");
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

/* =======================
   CREATE TRANSACTION
======================= */
app.post("/api/transactions", async (req, res) => {
  try {
    const transaction = new Transaction({
      title: req.body.title,
      amount: Number(req.body.amount),
      type: req.body.type,
      category: req.body.category,
      createdAt: new Date(),
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

/* =======================================================
   START SERVER (FIXED PORT FOR DEPLOYMENT)
======================================================= */
// Render assigns its own port dynamically. This ensures your app complies.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});