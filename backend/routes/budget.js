// for budget planning route
const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware);

// GET all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
});

// POST new budget
router.post("/", async (req, res) => {
  try {
    const { category, spent, budget, month } = req.body;
    const newBudget = new Budget({ category, spent, budget, month, userId: req.user.id });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ error: "Invalid budget data" });
  }
});

// PUT to update a budget
router.put("/:id", async (req, res) => {
  try {
    const updated = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update budget" });
  }
});

// DELETE a budget
router.delete("/:id", async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete budget" });
  }
});

module.exports = router;
