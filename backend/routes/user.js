// For usre id route
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/user/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
