const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");
const auth = require("../middleware/auth");


// GET /api/reports/summary
router.get("/summary", auth, async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user.id });

    const totalIncome = entries
      .filter(e => e.type === "income")
      .reduce((sum, e) => sum + e.amount, 0);

    const totalExpenses = entries
      .filter(e => e.type === "expense")
      .reduce((sum, e) => sum + e.amount, 0);

    res.json({
      totalIncome,
      totalExpenses,
      netAmount: totalIncome - totalExpenses,
      totalTransactions: entries.length,
    });
  } catch (error) {
    console.error("❌ Error in summary:", error);
    res.status(500).json({ msg: "Summary fetch failed" });
  }
});

// GET /api/reports?type=income&category=Food&startDate=...&endDate=...
router.get("/", auth, async (req, res) => {
  const { type, category, startDate, endDate } = req.query;

  const query = { userId: req.user.id };
  // if (userId) query.userId = userId;
  if (type) query.type = type;
  if (category) query.category = category;
  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  try {
    const entries = await Entry.find(query).sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    console.error("❌ Error fetching report:", error);
    res.status(500).json({ msg: "Report fetch failed" });
  }
});

module.exports = router;
