import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  note: { type: String, default: "" },
});

export default mongoose.model("Expense", expenseSchema);
