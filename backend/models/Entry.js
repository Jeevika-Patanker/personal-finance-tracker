// models/Entry.js for transactions
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  userId: String,
  type: String, // 'income' or 'expense'
  amount: Number,
  category: String,
  description: String,
  date: { type: Date, default: Date.now }
},
  { timestamps: true }
);

module.exports = mongoose.model('Entry', entrySchema);

