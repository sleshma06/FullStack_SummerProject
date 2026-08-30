import { MOCK_EXPENSES, DEFAULT_BUDGET } from '../data/mockExpenses'

// ---------------------------------------------------------------------------
// Mock "database" for the frontend-only prototype. Every function below
// returns a Promise so the rest of the app already reads like it's talking
// to a real API. Once the Express + MongoDB backend exists, swap each
// function body for a `fetch('/api/expenses...')` call — nothing outside
// this file needs to change.
//
//   GET    /api/expenses      -> getExpenses()
//   POST   /api/expenses      -> createExpense(data)
//   PUT    /api/expenses/:id  -> updateExpense(id, data)
//   DELETE /api/expenses/:id  -> deleteExpense(id)
// ---------------------------------------------------------------------------

let _expenses = MOCK_EXPENSES.map((e) => ({ ...e }))
let _nextId = Math.max(...MOCK_EXPENSES.map((e) => e.id)) + 1
let _budget = DEFAULT_BUDGET

const LATENCY = 260
const delay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), LATENCY))

export function getExpenses() {
  const sorted = [..._expenses].sort((a, b) => new Date(b.date) - new Date(a.date))
  return delay(sorted)
}

export function createExpense(data) {
  const record = { id: _nextId++, ...data }
  _expenses = [record, ..._expenses]
  return delay(record)
}

export function updateExpense(id, data) {
  _expenses = _expenses.map((e) => (e.id === id ? { ...e, ...data, id } : e))
  return delay(_expenses.find((e) => e.id === id))
}

export function deleteExpense(id) {
  _expenses = _expenses.filter((e) => e.id !== id)
  return delay(id)
}

export function getBudget() {
  return delay(_budget)
}

export function setBudget(amount) {
  _budget = amount
  return delay(_budget)
}
