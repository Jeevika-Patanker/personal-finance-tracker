// for transactions route
const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");



router.post("/", async (req, res) => {
  try {
    const { userId, type, amount, category } = req.body;
    console.log("📥 Received Data:", req.body);

    const newEntry = new Entry({ userId, type, amount: Number(amount), category });
    const saved = await newEntry.save();

    console.log("✅ Entry saved:", saved);
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error saving entry:", error.message);
    res.status(500).json({ error: "Failed to save entry", message: error.message });
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const entries = await Entry.find({ userId });
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

// delete entry by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Entry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ msg: "Entry not found" });
    }

    res.json({ msg: "Entry deleted", deleted });
  } catch (error) {
    console.error("❌ Error deleting entry:", error.message);
    res.status(500).json({ error: "Failed to delete entry", message: error.message });
  }
});



module.exports = router;
