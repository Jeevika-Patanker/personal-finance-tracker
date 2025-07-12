// for financial Goals route
const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");
const authmiddleware = require("../middleware/auth");

router.use(authmiddleware);

// GET all goals
router.get("/", async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching goals." });
  }
});

// POST new goal
router.post("/", async (req, res) => {
  const { title, description, target, saved, date, category, priority } = req.body;

  try {
    const newGoal = new Goal({ userId: req.user.id, title, description, target, saved, date, category, priority });
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    res.status(400).json({ message: "Error saving goal", error: err.message });
  }
});

// PUT update a goal by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedGoal) return res.status(404).json({ message: "Goal not found" });
    res.json(updatedGoal);
  } catch (err) {
    res.status(400).json({ message: "Error updating goal", error: err.message });
  }
});



module.exports = router;
