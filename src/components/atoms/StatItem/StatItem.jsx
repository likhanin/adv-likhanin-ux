import './StatItem.css'

export function StatItem({ children, className = '' }) {
  const classes = ['stat-item', className].filter(Boolean).join(' ')

  return <span className={classes}>{children}</span>
}
