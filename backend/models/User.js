const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  phone: String,
  dob: String,
  bio: String,
  street: String,
  city: String,
  country: String,
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
