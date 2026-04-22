import './Badge.css'

export function Badge({ children, size = 'default', className = '' }) {
  const classes = ['badge', size === 'small' ? 'badge--small' : '', className]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{children}</span>
}
