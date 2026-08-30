import express from "express";
import Expense from "../models/Expense.js";
import { getNextSequence } from "../models/Counter.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;
    const id = await getNextSequence("expenseId");
    const expense = await Expense.create({
      id,
      title,
      amount,
      category,
      date,
      note: note || "",
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = await Expense.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Expense not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await Expense.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: "Expense not found" });
    res.json({ id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
