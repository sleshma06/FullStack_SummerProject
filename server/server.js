import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import expenseRoutes from "./routes/expenses.js";
import budgetRoutes from "./routes/budget.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);
app.use("/api/budget", budgetRoutes);

app.get("/", (req, res) => res.send("StudentSpend API is running"));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );
});
