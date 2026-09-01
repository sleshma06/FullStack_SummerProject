import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import {
  getExpenses,
  createExpense as apiCreateExpense,
  updateExpense as apiUpdateExpense,
  deleteExpense as apiDeleteExpense,
  getBudget,
  setBudget as apiSetBudget,
} from '../services/expenseService'
import { CATEGORIES } from '../utils/categories'
import { useToast } from './ToastContext'
import { useAuth } from './AuthContext'

const ExpenseContext = createContext(null)

export function ExpenseProvider({ children }) {
  const { showToast } = useToast()
  const { token, loading: authLoading } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [budget, setBudgetState] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    if (authLoading) return () => { cancelled = true }

    // This provider mounts before login, so defer protected API calls until the
    // token exists and reload when login changes it.
    if (!token) {
      setExpenses([])
      setBudgetState(0)
      setError(null)
      setLoading(false)
      return () => { cancelled = true }
    }

    setLoading(true)
    Promise.all([getExpenses(), getBudget()])
      .then(([expenseList, budgetValue]) => {
        if (cancelled) return
        setExpenses(expenseList)
        setBudgetState(budgetValue)
        setError(null)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load your expenses. Please try again.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [token, authLoading])

  const addExpense = useCallback(
    async (data) => {
      try {
        const record = await apiCreateExpense(data)
        setExpenses((prev) => [record, ...prev])
        showToast('Expense added successfully ✨', 'success')
        return record
      } catch {
        showToast("Couldn't add that expense — try again.", 'error')
        throw new Error('add-failed')
      }
    },
    [showToast]
  )

  const editExpense = useCallback(
    async (id, data) => {
      try {
        const record = await apiUpdateExpense(id, data)
        setExpenses((prev) => prev.map((e) => (e.id === id ? record : e)))
        showToast('Expense updated successfully.', 'success')
        return record
      } catch {
        showToast("Couldn't update that expense — try again.", 'error')
        throw new Error('update-failed')
      }
    },
    [showToast]
  )

  const removeExpense = useCallback(
    async (id) => {
      try {
        await apiDeleteExpense(id)
        setExpenses((prev) => prev.filter((e) => e.id !== id))
        showToast('Expense deleted.', 'info')
      } catch {
        showToast("Couldn't delete that expense — try again.", 'error')
      }
    },
    [showToast]
  )

  const updateBudget = useCallback(
    async (amount) => {
      try {
        const value = await apiSetBudget(amount)
        setBudgetState(value)
        showToast('Budget updated ✨', 'success')
      } catch {
        showToast("Couldn't update your budget — try again.", 'error')
      }
    },
    [showToast]
  )

  const derived = useMemo(() => {
    const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)
    const remaining = budget - totalSpent
    const budgetUsedPercent = budget > 0 ? Math.min(100, Math.round((totalSpent / budget) * 100)) : 0
    const dayOfMonth = Math.max(1, new Date().getDate())
    const dailyAverage = Math.round(totalSpent / dayOfMonth)

    const totalsByCategory = {}
    for (const e of expenses) {
      totalsByCategory[e.category] = (totalsByCategory[e.category] || 0) + Number(e.amount || 0)
    }

    const categoryTotals = CATEGORIES.map((c) => ({
      ...c,
      amount: totalsByCategory[c.key] || 0,
      percent: totalSpent > 0 ? Math.round(((totalsByCategory[c.key] || 0) / totalSpent) * 100) : 0,
    }))
      .filter((c) => c.amount > 0)
      .sort((a, b) => b.amount - a.amount)

    const topCategory = categoryTotals[0] || null

    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date))

    return {
      totalSpent,
      remaining,
      budgetUsedPercent,
      dailyAverage,
      categoryTotals,
      topCategory,
      sortedExpenses,
    }
  }, [expenses, budget])

  const value = {
    expenses: derived.sortedExpenses,
    loading,
    error,
    budget,
    ...derived,
    addExpense,
    editExpense,
    removeExpense,
    updateBudget,
  }

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export function useExpenses() {
  const ctx = useContext(ExpenseContext)
  if (!ctx) throw new Error('useExpenses must be used within an ExpenseProvider')
  return ctx
}
