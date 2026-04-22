import './StatusLabel.css'

export function StatusLabel({ children, tone = 'default', className = '' }) {
  const classes = ['status-label', `status-label--${tone}`, className].filter(Boolean).join(' ')

  return <p className={classes}>{children}</p>
}
