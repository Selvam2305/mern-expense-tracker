const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
title: String,
amount: Number,
type: {
    type: String,
    default: "income"
},
date: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model("Income", incomeSchema);