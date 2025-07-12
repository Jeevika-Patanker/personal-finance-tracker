const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// PUT update user profile
router.put('/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
});

module.exports = router;
