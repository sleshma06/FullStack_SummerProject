export function formatCurrency(amount) {
  const n = Number(amount) || 0
  return `Rs. ${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
}

function startOfDay(d) {
  const copy = new Date(d)
  copy.setHours(0, 0, 0, 0)
  return copy
}

// Renders "Today", "Yesterday", or a short date like "27 Aug".
export function formatRelativeDate(dateStr) {
  const date = startOfDay(new Date(dateStr))
  const today = startOfDay(new Date())
  const diffDays = Math.round((today - date) / 86400000)

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
}

export function formatFullDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}
