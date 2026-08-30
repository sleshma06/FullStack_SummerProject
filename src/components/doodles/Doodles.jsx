// Small, line-drawn "editorial" doodles. They all use currentColor for the
// linework (so they inherit whatever text colour their container sets) and
// a fixed champagne-gold for the one accent detail, so they read as one
// consistent illustration family wherever they show up.

const GOLD = '#C7A24A'

function Sparkle({ cx, cy, r = 7, color = GOLD }) {
  // Coerce to Number defensively: JSX string props (cx="14") mixed with the
  // `+` operator below would otherwise silently string-concatenate instead
  // of adding, producing a mangled path `d` attribute.
  cx = Number(cx)
  cy = Number(cy)
  r = Number(r)
  const o = r * 0.22
  return (
    <path
      d={`M${cx} ${cy - r} C${cx + o} ${cy - o} ${cx + o} ${cy - o} ${cx + r} ${cy}
          C${cx + o} ${cy + o} ${cx + o} ${cy + o} ${cx} ${cy + r}
          C${cx - o} ${cy + o} ${cx - o} ${cy + o} ${cx - r} ${cy}
          C${cx - o} ${cy - o} ${cx - o} ${cy - o} ${cx} ${cy - r} Z`}
      fill={color}
    />
  )
}

export function WalletDoodle({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="7" y="21" width="45" height="31" rx="9" stroke="currentColor" strokeWidth="2.4" />
      <path d="M7 29c9-1.4 27-1.4 45 0" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <rect x="34" y="30" width="18" height="13" rx="4.5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="43.5" cy="36.5" r="1.8" fill="currentColor" />
      <Sparkle cx={53} cy={14} r={6.5} />
    </svg>
  )
}

export function CoinDoodle({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="30" cy="36" r="16" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="30" cy="36" r="10.5" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <path d="M27 40.5V31.5M27 31.5c0-1.6 1.6-2.4 3.4-2.4s3.4.9 3.4 2.2c0 3-6.8 1.9-6.8 4.9 0 1.3 1.6 2.2 3.4 2.2s3.4-.8 3.4-2.4"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="48" cy="18" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <Sparkle cx={14} cy={16} r={5.5} />
    </svg>
  )
}

export function ReceiptDoodle({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path
        d="M18 8h28v46l-4.5-3-4.5 3-4.5-3-4.5 3-4.5-3-4.5 3-4.5-3-4.5 3-4.5-3.4V8h4.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M24 19h16M24 26h16M24 33h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M39 43l3.4 3.4L49 39" stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PiggyBankDoodle({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path
        d="M14 33c0-8.3 7.4-15 16.8-15 6.6 0 12.3 3.3 15.1 8.2 3.6.3 6.1 2 6.1 3.8s-2.2 3.2-5.4 3.6c-.4 4.2-2.8 7.9-6.6 10.3V49h-6v-3.1c-1 .1-2.1.2-3.1.2-1.4 0-2.7-.1-4-.4V49h-6v-4.6C19.4 41.9 14 38 14 33Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M22 24l-3.4-4.4M40 20l2.6-4.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <circle cx="37" cy="29" r="1.7" fill="currentColor" />
      <path d="M27 34h7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="14" cy="10" r="4.5" fill="none" stroke={GOLD} strokeWidth="2" />
    </svg>
  )
}

export function MoneyDoodle({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="9" y="26" width="38" height="23" rx="4" stroke="currentColor" strokeWidth="2.2" />
      <rect x="17" y="18" width="38" height="23" rx="4" fill="var(--bg, #FBF7EF)" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="36" cy="29.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M22 26.5v6M50 26.5v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <Sparkle cx={12} cy={14} r={5.5} />
    </svg>
  )
}

export function CardDoodle({ size = 48, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="8" y="16" width="48" height="32" rx="7" stroke="currentColor" strokeWidth="2.2" />
      <path d="M8 26h48" stroke="currentColor" strokeWidth="2.2" />
      <rect x="15" y="34" width="12" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.6" />
      <path d="M38 39h10" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" />
      <Sparkle cx={52} cy={12} r={5} />
    </svg>
  )
}

export function SparkleDoodle({ size = 24, className = '', color = GOLD }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <Sparkle cx={12} cy={12} r={10} color={color} />
    </svg>
  )
}
