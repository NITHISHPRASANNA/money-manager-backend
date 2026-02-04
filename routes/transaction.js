const express = require("express");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

const router = express.Router();

// Add income or expense
router.post("/", auth, async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.userId
    });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all transactions
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit transaction (only within 12 hours)
router.put("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    const timeDiff =
      Date.now() - new Date(transaction.createdAt).getTime();

    if (timeDiff > 12 * 60 * 60 * 1000) {
      return res
        .status(403)
        .json({ message: "Editing time expired (12 hours limit)" });
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
