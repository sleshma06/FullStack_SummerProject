import { formatCurrency } from '../utils/format'

const SIZE = 120
const STROKE = 15
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function CategoryBreakdown({ categories, totalSpent }) {
  let cumulative = 0

  return (
    <div className="breakdown-layout">
      <div className="donut-wrap">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="100%" role="img" aria-label="Spending by category">
          <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="var(--parchment)" strokeWidth={STROKE} />
            {categories.map((cat) => {
              const dash = (cat.percent / 100) * CIRCUMFERENCE
              const offset = -cumulative
              cumulative += dash
              return (
                <circle
                  key={cat.key}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke={cat.color}
                  strokeWidth={STROKE}
                  strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                  strokeDashoffset={offset}
                  style={{ transition: 'stroke-dasharray 700ms var(--ease), stroke-dashoffset 700ms var(--ease)' }}
                />
              )
            })}
          </g>
        </svg>
        <div className="donut-center">
          <span className="donut-center-value">{formatCurrency(totalSpent)}</span>
          <span className="donut-center-label">Total</span>
        </div>
      </div>

      <div className="category-list">
        {categories.map((cat) => (
          <div className="category-row" key={cat.key}>
            <span className="category-dot" style={{ background: cat.color }} />
            <span className="category-row-name">{cat.key}</span>
            <span className="category-row-track">
              <span className="category-row-fill" style={{ width: `${cat.percent}%`, background: cat.color }} />
            </span>
            <span className="category-row-amount">{formatCurrency(cat.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
