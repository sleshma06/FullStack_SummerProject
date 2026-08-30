import {
  Utensils,
  Bus,
  BookOpen,
  ShoppingBag,
  Gamepad2,
  Home,
  HeartPulse,
  Package,
} from 'lucide-react'

// A single source of truth for every category: its icon, its emoji (used
// sparingly, e.g. the add-expense picker) and a colour drawn from the same
// earthy palette as the rest of the UI so the donut chart / badges never
// look like a random rainbow.
export const CATEGORIES = [
  { key: 'Food', emoji: '🍜', icon: Utensils, color: '#4B5A3E' },
  { key: 'Transport', emoji: '🚌', icon: Bus, color: '#B6913F' },
  { key: 'Education', emoji: '📚', icon: BookOpen, color: '#AD6B45' },
  { key: 'Shopping', emoji: '🛍️', icon: ShoppingBag, color: '#6E5A46' },
  { key: 'Entertainment', emoji: '🎮', icon: Gamepad2, color: '#7C8F63' },
  { key: 'Bills', emoji: '🏠', icon: Home, color: '#9C8F7C' },
  { key: 'Health', emoji: '❤️', icon: HeartPulse, color: '#A24A3B' },
  { key: 'Other', emoji: '📦', icon: Package, color: '#C9A66B' },
]

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]))

export function getCategory(key) {
  return CATEGORY_MAP[key] || CATEGORIES[CATEGORIES.length - 1]
}

// Turns a "#rrggbb" hex colour into an rgba() string — used for the soft
// tinted backgrounds behind category icons.
export function tint(hex, alpha = 0.16) {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
