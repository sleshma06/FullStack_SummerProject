import "dotenv/config";
import { connectDB } from "./config/db.js";
import Expense from "./models/Expense.js";
import Budget from "./models/Budget.js";
import { getNextSequence } from "./models/Counter.js";
import mongoose from "mongoose";

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

const seedData = [
  {
    title: "Chicken Momo",
    amount: 180,
    category: "Food",
    date: daysAgo(0),
    note: "Lunch with roommates",
  },
  {
    title: "Bus Fare",
    amount: 40,
    category: "Transport",
    date: daysAgo(0),
    note: "",
  },
  {
    title: "Cappuccino",
    amount: 150,
    category: "Food",
    date: daysAgo(0),
    note: "Coffee run",
  },
  {
    title: "Photocopy & Printing",
    amount: 50,
    category: "Education",
    date: daysAgo(1),
    note: "Assignment",
  },
  {
    title: "Movie Ticket",
    amount: 350,
    category: "Entertainment",
    date: daysAgo(1),
    note: "Weekend movie",
  },
];

async function seed() {
  await connectDB();
  await Expense.deleteMany({});
  await Budget.deleteMany({});
  for (const item of seedData) {
    const id = await getNextSequence("expenseId");
    await Expense.create({ id, ...item });
  }
  await Budget.create({ amount: 15000 });
  console.log("Seed complete");
  await mongoose.disconnect();
}

seed();
