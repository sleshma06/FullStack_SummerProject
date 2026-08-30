import { CoinDoodle } from './doodles/Doodles'

function buildMessage({ topCategory, budgetUsedPercent }) {
  if (!topCategory) return "Add a few expenses and I'll start spotting patterns for you."

  const lead =
    topCategory.percent >= 40
      ? `${topCategory.emoji} ${topCategory.key} alone is ${topCategory.percent}% of everything you've spent this month.`
      : `${topCategory.emoji} ${topCategory.key} is currently your biggest spending category this month.`

  if (budgetUsedPercent >= 85) {
    return `${lead} Easy there, big spender — your budget is almost gone.`
  }
  if (budgetUsedPercent < 40) {
    return `${lead} Budget's still looking comfortable — you're doing better than you think.`
  }
  return lead
}

export default function SpendingInsight({ topCategory, budgetUsedPercent }) {
  return (
    <div className="insight-card">
      <CoinDoodle size={52} className="insight-doodle" />
      <div>
        <div className="insight-eyebrow">Your spending insight</div>
        <p className="insight-text">{buildMessage({ topCategory, budgetUsedPercent })}</p>
      </div>
    </div>
  )
}
