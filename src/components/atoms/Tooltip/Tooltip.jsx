import './Tooltip.css'

const ANCHORS = ['top', 'right', 'bottom', 'left']

export function Tooltip({
  children,
  title,
  size = 'm',
  tone = 'default',
  anchor = 'none',
  closable = false,
  closeLabel = 'Закрыть',
  onClose,
  className = '',
  ...props
}) {
  const normalizedSize = String(size).toLowerCase() === 's' ? 's' : 'm'
  const normalizedTone = tone === 'inverse' ? 'inverse' : 'default'
  const normalizedAnchor = ANCHORS.includes(anchor) ? anchor : 'none'
  const hasTitle = Boolean(title)
  const hasCloseButton = closable || typeof onClose === 'function'
  const classes = [
    'tooltip',
    `tooltip--size-${normalizedSize}`,
    `tooltip--${normalizedTone}`,
    normalizedAnchor !== 'none' && `tooltip--anchor-${normalizedAnchor}`,
    !hasTitle && 'tooltip--compact',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="tooltip" {...props}>
      {normalizedAnchor !== 'none' ? <span className="tooltip__dot" aria-hidden="true" /> : null}
      <div className="tooltip__content">
        {hasTitle ? <p className="tooltip__title">{title}</p> : null}
        <p className="tooltip__text">{children}</p>
      </div>
      {hasCloseButton ? (
        <button className="tooltip__close" type="button" aria-label={closeLabel} onClick={onClose}>
          <span aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}
