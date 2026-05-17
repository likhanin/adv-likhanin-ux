import { iconRegistry } from './iconRegistry'
import { iconSizes } from './iconSizes'
import './Icon.css'

const legacyNameAliases = {
  arrowUp: 'arrow-up',
  bell: 'notifications',
  bonus: 'exclamation-mark-filled',
  calendar: 'calendar-today',
  calendarToday: 'calendar-today',
  'Calendar Today': 'calendar-today',
  chart: 'share',
  check: 'done',
  chevronDown: 'arrow-down-ios',
  chevronLeft: 'chevron-left',
  chevronRight: 'chevron-right',
  chevronUp: 'arrow-up-ios',
  copy: 'share',
  document: 'news',
  favorite: 'grade',
  grid: 'expand-more',
  infoCircle: 'info',
  location: 'info',
  menu: 'expand-more',
  plus: 'done',
  question: 'info',
  settings: 'expand-more',
  shield: 'exclamation-mark-outline',
  star: 'grade',
  stats: 'share',
  team: 'info',
  undo: 'arrow-back-ios',
  warning: 'exclamation-mark-filled',
}

const legacyVariantAliases = new Set(['plain', 'sidebar', 'top'])

const semanticColorVars = {
  'text.primary': 'var(--color-text-primary)',
  'text.secondary': 'var(--color-text-secondary)',
  'text.error': 'var(--color-text-error)',
  'text.success': 'var(--color-text-success)',
  'text.warning': 'var(--color-text-warning)',
  'text.inverse.primary': 'var(--color-text-inverse-primary)',
  'text.constant.primary': 'var(--color-text-constant-primary)',
}

function normalizeName(name) {
  return legacyNameAliases[name] ?? name
}

function resolveIcon({ name, type, variant, size }) {
  const normalizedName = normalizeName(name)

  if (type === 'interface') {
    return iconRegistry.interface[variant]?.[normalizedName]?.[size] ?? iconRegistry.text.info[size] ?? iconRegistry.text.info.m
  }

  return iconRegistry.text[normalizedName]?.[size] ?? iconRegistry.text.info[size] ?? iconRegistry.text.info.m
}

function getSvgSize(svg, iconHeight) {
  const widthMatch = svg?.match(/\swidth="([0-9.]+)"/)
  const heightMatch = svg?.match(/\sheight="([0-9.]+)"/)
  const originalWidth = Number(widthMatch?.[1])
  const originalHeight = Number(heightMatch?.[1])

  if (!originalWidth || !originalHeight) {
    return {
      width: iconHeight,
      height: iconHeight,
    }
  }

  return {
    width: (originalWidth / originalHeight) * iconHeight,
    height: iconHeight,
  }
}

export function Icon({
  name,
  type = 'text',
  variant,
  size = 'm',
  className = '',
  color,
  style,
  title,
  ...props
}) {
  const normalizedVariant = legacyVariantAliases.has(variant) ? undefined : variant
  const normalizedType = type === 'interface' ? 'interface' : 'text'
  const normalizedSize = iconSizes[size] ? size : 'm'
  const svg = resolveIcon({
    name,
    type: normalizedType,
    variant: normalizedVariant,
    size: normalizedSize,
  })
  const svgSize = getSvgSize(svg, iconSizes[normalizedSize])
  const classes = [
    'icon',
    `icon--${normalizedType}`,
    normalizedVariant && `icon--${normalizedVariant}`,
    `icon--size-${normalizedSize}`,
    variant && legacyVariantAliases.has(variant) && `icon--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const semanticColor = semanticColorVars[color]

  return (
    <span
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      className={classes}
      role={title ? 'img' : undefined}
      style={{
        ...style,
        '--icon-height': `${svgSize.height}px`,
        '--icon-width': `${svgSize.width}px`,
        ...(semanticColor ? { color: semanticColor } : {}),
      }}
      {...props}
    >
      <span className="icon__svg" dangerouslySetInnerHTML={{ __html: svg ?? '' }} />
    </span>
  )
}
