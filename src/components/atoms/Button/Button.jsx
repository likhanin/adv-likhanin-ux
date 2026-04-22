import './Button.css'

export function Button({
  children,
  variant = 'default',
  size = 'm',
  priority = 'secondary',
  preset = 'default',
  fullWidth = false,
  className = '',
  ...props
}) {
  const classes = [
    'button',
    `button--${variant}`,
    `button--size-${size}`,
    `button--priority-${priority}`,
    `button--preset-${preset}`,
    fullWidth && 'button--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
