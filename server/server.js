import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import expenseRoutes from "./routes/expenses.js";
import budgetRoutes from "./routes/budget.js";
import { requireAuth } from "./middleware/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

// Public
app.use("/api/auth", authRoutes);

// Protected — every route below requires a valid JWT
app.use("/api/expenses", requireAuth, expenseRoutes);
app.use("/api/budget", requireAuth, budgetRoutes);

app.get("/", (req, res) => res.send("StudentSpend API is running"));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );
});
