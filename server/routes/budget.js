import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let budget = await Budget.findOne();
    if (!budget) budget = await Budget.create({ amount: 15000 });
    res.json(budget.amount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const { amount } = req.body;
    let budget = await Budget.findOne();
    if (!budget) {
      budget = await Budget.create({ amount });
    } else {
      budget.amount = amount;
      await budget.save();
    }
    res.json(budget.amount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
