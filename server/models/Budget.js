import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  amount: { type: Number, required: true, default: 15000 },
});

export default mongoose.model("Budget", budgetSchema);
