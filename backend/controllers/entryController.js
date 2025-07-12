// backend/controllers/entryController.js
const Entry = require("../models/Entry");

// @desc    Create a new entry
const createEntry = async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  const userId = req.user.id;

  try {
    const newEntry = new Entry({
      user: userId,
      type,
      amount,
      category,
      description,
      date: date || new Date(),
    });

    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to create entry" });
  }
};

// @desc    Get all entries for logged-in user
const getUserEntries = async (req, res) => {
  const userId = req.user.id;

  try {
    const entries = await Entry.find({ user: userId }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
};

// @desc    Delete an entry
const deleteEntry = async (req, res) => {
  const { id } = req.params;

  try {
    await Entry.findByIdAndDelete(id);
    res.json({ msg: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
};

module.exports = {
  createEntry,
  getUserEntries,
  deleteEntry,
};
