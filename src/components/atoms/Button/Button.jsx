import { Icon } from '../Icon/Icon'
import './Button.css'

const buttonIconSizeMap = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'm',
  xl: 'l',
}

const buttonIconNameAliases = {
  'chevron-down': 'arrow-down-ios',
}

function normalizeButtonIconName(name) {
  return buttonIconNameAliases[name] ?? name
}

function ButtonIcon({ name, size, position }) {
  if (!name) {
    return null
  }

  return (
    <Icon
      className={`button__icon button__icon--${position}`}
      name={normalizeButtonIconName(name)}
      size={buttonIconSizeMap[size] ?? 'm'}
    />
  )
}

export function Button({
  children,
  variant = 'default',
  size = 'm',
  priority = 'secondary',
  preset = 'default',
  round = false,
  fullWidth = false,
  leftIconName = '',
  rightIconName = '',
  iconOnly = false,
  className = '',
  disabled = false,
  state = 'default',
  type = 'button',
  ...props
}) {
  const normalizedPreset =
    preset === 'inverseConstant' || preset === 'inverse/constant' || preset === 'inverse_constant'
      ? 'inverse-constant'
      : String(preset).toLowerCase()
  const normalizedVariant = String(variant).toLowerCase()
  const normalizedSize = String(size).toLowerCase()
  const normalizedPriority = String(priority).toLowerCase()
  const isDisabled = disabled === true || state === 'disabled'
  const isRound = round === true || round === 'true'
  const isIconOnly = iconOnly === true || iconOnly === 'true'

  if (import.meta.env.DEV && isIconOnly && !props['aria-label']) {
    console.warn('Button: iconOnly buttons require aria-label for accessibility.')
  }

  const classes = [
    'button',
    `button--${normalizedVariant}`,
    `button--size-${normalizedSize}`,
    `button--priority-${normalizedPriority}`,
    `button--preset-${normalizedPreset}`,
    isRound && 'button--round',
    fullWidth && 'button--full-width',
    isIconOnly && 'button--icon-only',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const iconOnlyName = leftIconName || rightIconName
  const shouldRenderChildren = !isIconOnly && children != null

  return (
    <button className={classes} disabled={isDisabled} type={type} {...props}>
      {isIconOnly ? (
        <ButtonIcon name={iconOnlyName} position="only" size={normalizedSize} />
      ) : (
        <>
          <ButtonIcon name={leftIconName} position="left" size={normalizedSize} />
          {shouldRenderChildren ? <span className="button__content">{children}</span> : null}
          <ButtonIcon name={rightIconName} position="right" size={normalizedSize} />
        </>
      )}
    </button>
  )
}
