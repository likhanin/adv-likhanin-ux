import './Counter.css'

export function Counter({ children, size = 'xs', className = '' }) {
  const classes = ['counter', `counter--${size}`, className].filter(Boolean).join(' ')

  return <span className={classes}>{children}</span>
}
