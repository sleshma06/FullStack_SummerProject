import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  amount: { type: Number, required: true, default: 15000 },
});

export default mongoose.model("Budget", budgetSchema);
