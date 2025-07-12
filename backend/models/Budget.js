const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  category: { type: String, required: true },
  budget: { type: Number, required: true },
  spent: { type: Number, required: true },
  month: { type: String, required: true }
});

module.exports = mongoose.model("Budget", budgetSchema);
