# StudentSpend

A frontend for a personal expense tracker built for university students —
log daily spending, hold a monthly budget, and see where the money actually
goes. Built with **React + Vite**, no backend required yet: everything runs
on an in-memory mock data layer that's shaped exactly like the REST API this
will eventually talk to.

This repo is the **frontend only**. It's built to plug into a
Node/Express + MongoDB backend later without touching any components.

---

## Tech stack

- React 18 + Vite
- React Router (client-side routing between pages)
- Lucide React (icons)
- Plain CSS with a small design-token system (`src/styles/variables.css`) —
  no Tailwind, no CSS-in-JS, no UI framework
- No Redux — state lives in two small React Contexts (see below)

## Getting started

```bash
npm install
npm run dev
```

The app runs at **http://localhost:5173**.

Other commands:

```bash
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

Requires Node.js 18+.

---

## What's implemented

- **Landing, Login, Signup** — no real auth yet (there's no backend), but
  the forms validate and the flow works end to end.
- **Dashboard** — greeting, four summary cards (total spent / monthly
  budget / remaining / daily average), an animated budget progress bar, a
  donut + bar spending breakdown by category, a spending insight card, and
  a recent-expenses list. Shows a designed empty state when there are no
  expenses.
- **Expenses** — full list with search, category filter, and sort; add,
  edit, and delete all work against the mock data layer and update the UI
  immediately.
- **Budget** — set/update the monthly budget, see spent vs. remaining, and
  get an encouraging or cautionary note depending on how much of the budget
  is used.
- **Profile** — name/email (local demo state), a preferred-currency
  picker, a genuinely working **dark theme toggle**, and logout.
- Responsive throughout: the desktop sidebar becomes a bottom nav bar on
  mobile, tables become stacked cards, and the two-panel auth layout
  collapses to a single column.
- Toast notifications, confirm-before-delete, loading skeletons, and small
  hand-drawn SVG doodle characters (wallet, coin, receipt, piggy bank,
  money, sparkle) used sparingly throughout.

## Folder structure

```text
src/
├── components/
│   ├── doodles/Doodles.jsx     # hand-drawn SVG illustrations (Wallet, Coin, Receipt, PiggyBank, Money, Sparkle)
│   ├── Layout.jsx              # sidebar/bottom-nav shell wrapping the logged-in pages
│   ├── Sidebar.jsx / MobileNav.jsx
│   ├── AuthLayout.jsx          # two-panel shell shared by Login/Signup
│   ├── SummaryCard.jsx, BudgetProgress.jsx, CategoryBreakdown.jsx,
│   │   SpendingInsight.jsx, ExpenseCard.jsx, ExpenseForm.jsx,
│   │   EmptyState.jsx, Toast.jsx, ConfirmDialog.jsx
├── pages/
│   ├── Landing.jsx, Login.jsx, Signup.jsx
│   └── Dashboard.jsx, Expenses.jsx, Budget.jsx, Profile.jsx
├── context/
│   ├── ExpenseContext.jsx      # expenses + budget state, shared across Dashboard/Expenses/Budget
│   └── ToastContext.jsx        # global toast notifications
├── services/
│   └── expenseService.js       # mock "API" — swap for real fetch calls later (see below)
├── data/
│   └── mockExpenses.js         # seed data
├── utils/
│   ├── categories.js           # the 8 category definitions (icon, color, emoji)
│   └── format.js                # currency + date formatting helpers
├── styles/
│   ├── variables.css           # design tokens (color, type, spacing) + dark theme override
│   ├── base.css, components.css, pages.css
├── App.jsx                     # routes + providers
└── main.jsx
```

## Connecting the real backend

All data access goes through `src/services/expenseService.js`. Right now
those functions read/write an in-memory array behind an artificial delay;
none of the components know or care about that. When the Express API is
ready, this is the only file that needs to change:

```js
// currently:
export function getExpenses() {
  return delay([...expenses])
}

// becomes:
export function getExpenses() {
  return fetch('/api/expenses').then((r) => r.json())
}
```

Target endpoints (already matched 1:1 by the mock functions):

```text
GET    /api/expenses         → getExpenses()
POST   /api/expenses         → createExpense(data)
PUT    /api/expenses/:id     → updateExpense(id, data)
DELETE /api/expenses/:id     → deleteExpense(id)
GET    /api/budget           → getBudget()
PUT    /api/budget           → setBudget(amount)
```

`ExpenseContext` is the only place that calls this service layer and holds
the resulting state, so once the functions above return real data instead
of mock data, the rest of the app needs no changes.

## Design notes

The palette and type system live entirely in `src/styles/variables.css` as
CSS custom properties — charcoal + warm ivory base, deep olive and
champagne-gold accents, a muted terracotta reserved for warnings. Headings
use **Fraunces** (an editorial serif, italic for accent words), body text
uses **Inter**, both loaded from Google Fonts in `index.html`.
