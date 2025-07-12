const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  target: {
    type: Number,
    required: true,
  },
  saved: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    required: true,
  },
  category: String,
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
});

module.exports = mongoose.model("Goal", goalSchema);
