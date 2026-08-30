import { useEffect, useRef, useState } from 'react'
import { formatCurrency } from '../utils/format'

function useCountUp(target, duration = 700) {
  const [value, setValue] = useState(0)
  const frame = useRef(null)

  useEffect(() => {
    const start = performance.now()
    const from = 0
    const to = Number(target) || 0

    function tick(now) {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return value
}

export default function SummaryCard({ label, value, icon: Icon, accent = 'ink', delta, warn = false }) {
  const animated = useCountUp(value)

  return (
    <div className="card card-hover summary-card" data-accent={accent}>
      <div className="summary-card-top">
        <span className="summary-label">{label}</span>
        {Icon && (
          <span className="summary-icon">
            <Icon />
          </span>
        )}
      </div>
      <div>
        <div className="summary-value">{formatCurrency(animated)}</div>
        {delta && <div className={`summary-delta${warn ? ' warn' : ''}`}>{delta}</div>}
      </div>
    </div>
  )
}
