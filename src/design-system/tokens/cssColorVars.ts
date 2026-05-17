import { Primitives } from './primitives'

const toKebabCase = (value: string) => value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

const primitiveCssVar = (path: string[]) => `var(--color-primitives-${path.map(toKebabCase).join('-')})`

const mapPrimitiveCssVars = (tokens: Record<string, Record<string, string>>, prefix: string[] = []) =>
  Object.fromEntries(
    Object.entries(tokens).map(([groupName, groupTokens]) => [
      groupName,
      Object.fromEntries(
        Object.keys(groupTokens).map((tokenName) => [
          tokenName,
          primitiveCssVar([...prefix, groupName, tokenName]),
        ]),
      ),
    ]),
  )

export const cssColorVars = {
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    success: 'var(--color-text-success)',
    error: 'var(--color-text-error)',
    warning: 'var(--color-text-warning)',
    constant: {
      primary: 'var(--color-text-constant-primary)',
    },
    inverse: {
      primary: 'var(--color-text-inverse-primary)',
      constant: {
        primary: 'var(--color-text-inverse-constant-primary)',
      },
    },
  },
  bg: {
    page: 'var(--color-bg-page)',
    default: 'var(--color-bg-default)',
    surface: 'var(--color-bg-surface)',
    accent: 'var(--color-bg-accent)',
    elevation1: 'var(--color-bg-elevation-1)',
    elevation2: 'var(--color-bg-elevation-2)',
    success: 'var(--color-bg-success)',
    error: 'var(--color-bg-error)',
    warning: 'var(--color-bg-warning)',
    inverse: {
      elevation1: 'var(--color-bg-inverse-elevation-1)',
      elevation2: 'var(--color-bg-inverse-elevation-2)',
      constant: {
        page: 'var(--color-bg-inverse-constant-page)',
        default: 'var(--color-bg-inverse-constant-default)',
        elevation1: 'var(--color-bg-inverse-constant-elevation-1)',
        elevation2: 'var(--color-bg-inverse-constant-elevation-2)',
      },
    },
  },
  backdrop: {
    fill: 'var(--color-backdrop-fill)',
  },
  foreground: {
    imageFill: 'var(--color-foreground-image-fill)',
  },
  border: {
    default: 'var(--color-border-default)',
    subtle: 'var(--color-border-subtle)',
  },
  divider: {
    default: 'var(--color-divider-default)',
  },
  components: {
    button: {
      primary: 'var(--color-components-button-primary)',
      primaryText: 'var(--color-components-button-primary-text)',
    },
    control: {
      bg: {
        default: 'var(--color-components-control-bg-default)',
        disabled: 'var(--color-components-control-bg-disabled)',
        overlay: {
          default: 'var(--color-components-control-bg-overlay-default)',
          disabled: 'var(--color-components-control-bg-overlay-disabled)',
        },
        inverse: {
          default: 'var(--color-components-control-bg-inverse-default)',
          disabled: 'var(--color-components-control-bg-inverse-disabled)',
        },
      },
    },
    slider: {
      defaultfilled: 'var(--color-components-slider-defaultfilled)',
    },
    bar: {
      defaultfilleddisabled: 'var(--color-components-bar-defaultfilleddisabled)',
      inverse: {
        defaultfilled: 'var(--color-components-bar-inverse-defaultfilled)',
        defaultfilleddisabled: 'var(--color-components-bar-inverse-defaultfilleddisabled)',
      },
    },
    badge: {
      error: 'var(--color-components-badge-error)',
    },
    progress: {
      warning: 'var(--color-components-progress-warning)',
    },
    promoVisual: {
      shirtStart: 'var(--color-components-promo-visual-shirt-start)',
      shirtMiddle: 'var(--color-components-promo-visual-shirt-middle)',
      shirtEnd: 'var(--color-components-promo-visual-shirt-end)',
      checkStart: 'var(--color-components-promo-visual-check-start)',
      checkEnd: 'var(--color-components-promo-visual-check-end)',
      checkText: 'var(--color-components-promo-visual-check-text)',
    },
    adsMeta: {
      locationStart: 'var(--color-components-ads-meta-location-start)',
      locationEnd: 'var(--color-components-ads-meta-location-end)',
    },
    adPreview: {
      defaultStart: 'var(--color-components-ad-preview-default-start)',
      defaultEnd: 'var(--color-components-ad-preview-default-end)',
      sheen: 'var(--color-components-ad-preview-sheen)',
      dot: 'var(--color-components-ad-preview-dot)',
      mintStart: 'var(--color-components-ad-preview-mint-start)',
      mintEnd: 'var(--color-components-ad-preview-mint-end)',
      sandStart: 'var(--color-components-ad-preview-sand-start)',
      sandEnd: 'var(--color-components-ad-preview-sand-end)',
      roseStart: 'var(--color-components-ad-preview-rose-start)',
      roseEnd: 'var(--color-components-ad-preview-rose-end)',
      skyStart: 'var(--color-components-ad-preview-sky-start)',
      skyEnd: 'var(--color-components-ad-preview-sky-end)',
    },
  },
  primitives: {
    ...mapPrimitiveCssVars(Primitives.light),
    alpha: mapPrimitiveCssVars(Primitives.alpha, ['alpha']),
  },
} as const
