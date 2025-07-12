const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  category: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Report", ReportSchema);
