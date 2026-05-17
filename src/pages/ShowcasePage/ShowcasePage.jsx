import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/atoms/Button/Button'
import { Icon } from '../../components/atoms/Icon/Icon'
import { ToggleSwitch } from '../../components/atoms/ToggleSwitch/ToggleSwitch'
import { iconRegistry } from '../../design-system/icons/iconRegistry'
import { componentRegistry } from '../../design-system/showcase/componentRegistry'
import { colorTokenGroups, colorTokens } from '../../design-system/tokens/colors'
import { colorThemes } from '../../design-system/tokens/colorThemes'
import { cssColorVars } from '../../design-system/tokens/cssColorVars'
import { useFeatureToggles } from '../../store/featureToggles/useFeatureToggles'
import { OrganismsShowcaseSection, SourceBadge, TokenList } from './OrganismsShowcaseSection'
import { useCopyToClipboard } from './useCopyToClipboard'
import './ShowcasePage.css'

function toKebabCase(value) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

function getComponentNavItems(level) {
  return componentRegistry[level].map((item) => ({
    id: `${level.slice(0, -1)}-${toKebabCase(item.name)}`,
    label: item.name,
    componentLevel: level,
    componentName: item.name,
  }))
}

const NAV_GROUPS = [
  {
    label: 'Токены',
    items: [
      { id: 'colors', label: 'Цвета' },
      { id: 'typography', label: 'Типографика' },
      { id: 'spacing', label: 'Отступы' },
      { id: 'radius', label: 'Радиусы' },
      { id: 'shadows', label: 'Тени' },
    ],
  },
  {
    label: 'Атомы',
    items: getComponentNavItems('atoms'),
  },
  {
    label: 'Молекулы',
    items: getComponentNavItems('molecules'),
  },
  {
    label: 'Организмы',
    items: [
      { id: 'organism-header', label: 'Header', organismId: 'header' },
      { id: 'organism-sidebar', label: 'Sidebar', organismId: 'sidebar' },
      { id: 'organism-modal', label: 'Modal', organismId: 'modal' },
      { id: 'organism-table', label: 'Table', organismId: 'table' },
      {
        id: 'organism-feature-toggles-panel',
        label: 'FeatureTogglesPanel',
        organismId: 'feature-toggles-panel',
      },
      { id: 'organism-client-card', label: 'ClientCard', organismId: 'client-card' },
      { id: 'organism-budget-widget', label: 'BudgetWidget', organismId: 'budget-widget' },
      { id: 'organism-finance-summary', label: 'FinanceSummary', organismId: 'finance-summary' },
    ],
  },
]

const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items)

const TEXT_ICON_COLOR_EXAMPLES = [
  { label: 'Primary text + icon', className: 'showcase-icon-inherit-example--primary' },
  { label: 'Secondary text + icon', className: 'showcase-icon-inherit-example--secondary' },
  { label: 'Error text + icon', className: 'showcase-icon-inherit-example--error' },
  { label: 'Success text + icon', className: 'showcase-icon-inherit-example--success' },
  { label: 'Warning text + icon', className: 'showcase-icon-inherit-example--warning' },
]

const ICON_DISPLAY_NAMES = {
  'calendar-today': 'Calendar Today',
}

function getIconDisplayName(name) {
  return ICON_DISPLAY_NAMES[name] ?? name
}

const SOURCE_LABELS = {
  figma: 'Перенесли из Figma Avito Design Team',
  manual: 'Максим это делал руками',
}

const TYPOGRAPHY_STYLES = [
  { name: 'H05', variant: 'h05', size: '48px', lineHeight: '54px', weight: 800 },
  { name: 'H10', variant: 'h10', size: '32px', lineHeight: '36px', weight: 800 },
  { name: 'H20', variant: 'h20', size: '26px', lineHeight: '30px', weight: 800 },
  { name: 'H25', variant: 'h25', size: '24px', lineHeight: '28px', weight: 800 },
  { name: 'H30', variant: 'h30', size: '21px', lineHeight: '26px', weight: 800 },
  { name: 'XL10', variant: 'xl10', size: '21px', lineHeight: '26px', weight: 500 },
  { name: 'H40', variant: 'h40', size: '18px', lineHeight: '22px', weight: 800 },
  { name: 'L10', variant: 'l10', size: '18px', lineHeight: '24px', weight: 500 },
  { name: 'L20', variant: 'l20', size: '18px', lineHeight: '22px', weight: 500 },
  { name: 'H50', variant: 'h50', size: '16px', lineHeight: '20px', weight: 800 },
  { name: 'M10', variant: 'm10', size: '15px', lineHeight: '22px', weight: 500 },
  { name: 'M20', variant: 'm20', size: '15px', lineHeight: '20px', weight: 500 },
  { name: 'H60', variant: 'h60', size: '14px', lineHeight: '18px', weight: 800 },
  { name: 'H70', variant: 'h70', size: '13px', lineHeight: '16px', weight: 800 },
  { name: 'S10', variant: 's10', size: '13px', lineHeight: '18px', weight: 500 },
  { name: 'S20', variant: 's20', size: '13px', lineHeight: '16px', weight: 500 },
  { name: 'XS10', variant: 'xs10', size: '11px', lineHeight: '14px', weight: 500 },
  { name: 'XXS10', variant: 'xxs10', size: '9px', lineHeight: '14px', weight: 500 },
]

function isTokenLeaf(value) {
  return Boolean(value && typeof value === 'object' && 'description' in value && 'source' in value)
}

function pathToCssVariable(path) {
  return `--color-${path
    .join('-')
    .replace(/([a-z])([0-9])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()}`
}

function getNestedValue(object, path) {
  return path.reduce((current, key) => current?.[key], object)
}

function flattenTokens(groupName, value, path = [groupName]) {
  if (isTokenLeaf(value)) {
    const tokenName = path.join('.')

    return [
      {
        ...value,
        name: tokenName,
        path,
        cssVariable: pathToCssVariable(path),
        cssValue: getNestedValue(cssColorVars, path),
      },
    ]
  }

  return Object.entries(value).flatMap(([key, nestedValue]) =>
    flattenTokens(groupName, nestedValue, [...path, key]),
  )
}

function getComputedColorMap(tokens) {
  const rootStyles = getComputedStyle(document.documentElement)

  return Object.fromEntries(
    tokens.map((token) => [token.cssVariable, rootStyles.getPropertyValue(token.cssVariable).trim()]),
  )
}

function normalizeCssValue(cssValue) {
  const match = cssValue?.match(/var\((--color-[^)]+)\)/)

  return match?.[1] ?? null
}

function getTokenWarnings(token, computedColor) {
  const warnings = []
  const cssVariableFromUsage = normalizeCssValue(token.cssValue)
  const lightValue = colorThemes.light[token.name]
  const darkValue = colorThemes.dark[token.name]

  if (!cssVariableFromUsage) {
    warnings.push('Нет CSS variable в cssColorVars.')
  }

  if (cssVariableFromUsage && cssVariableFromUsage !== token.cssVariable) {
    warnings.push(`cssColorVars ссылается на ${cssVariableFromUsage}, ожидалось ${token.cssVariable}.`)
  }

  if (cssVariableFromUsage && !computedColor) {
    warnings.push('CSS variable есть, но computed value пустой.')
  }

  if (lightValue && !darkValue) {
    warnings.push('Токен есть в light theme, но отсутствует в dark theme.')
  }

  if (darkValue && !lightValue) {
    warnings.push('Токен есть в dark theme, но отсутствует в light theme.')
  }

  if (token.name.includes('constant') && lightValue && darkValue && lightValue !== darkValue) {
    warnings.push('Constant-токен меняется между light и dark.')
  }

  return warnings
}

function CopyableValue({ value, label }) {
  const { copiedValue, copy } = useCopyToClipboard()
  const isCopied = copiedValue === value

  return (
    <button
      className={`showcase-copyable-value${isCopied ? ' showcase-copyable-value--copied' : ''}`}
      type="button"
      aria-label={`Скопировать ${label}`}
      onClick={() => copy(value)}
    >
      <span>{value}</span>
      <span className="showcase-copyable-value__status">
        {isCopied ? <span>Copied!</span> : null}
        <Icon name={isCopied ? 'check' : 'copy'} size="s" variant="plain" />
      </span>
    </button>
  )
}

function ColorCard({ token, computedColor }) {
  const source = token.source ?? 'manual'
  const sourceLabel = SOURCE_LABELS[source] ?? SOURCE_LABELS.manual
  const visibleValue = computedColor || token.global
  const previewColor = computedColor || token.global
  const warnings = token.warnings ?? []
  const shouldShowSource = source !== 'figma'

  return (
    <article className={`showcase-color-card${warnings.length ? ' showcase-color-card--warning' : ''}`}>
      {shouldShowSource ? (
        <span className={`showcase-color-card__source showcase-color-card__source--${source}`}>
          {sourceLabel}
        </span>
      ) : null}

      <div className="showcase-color-card__preview" style={{ background: previewColor }} />

      <div className="showcase-color-card__body">
        <div>
          <h3>{token.name}</h3>
          <code>{token.cssVariable}</code>
        </div>
        <dl className="showcase-color-card__meta">
          <div>
            <dt>CSS</dt>
            <dd>
              <CopyableValue value={token.cssVariable} label={`${token.name} CSS variable`} />
            </dd>
          </div>
          <div>
            <dt>HEX</dt>
            <dd>
              <CopyableValue value={visibleValue} label={`${token.name} HEX`} />
            </dd>
          </div>
          <div>
            <dt>Figma RU</dt>
            <dd>{token.ru}</dd>
          </div>
          <div>
            <dt>Global</dt>
            <dd>{token.global}</dd>
          </div>
        </dl>
        <p>{token.description}</p>
        {warnings.length ? (
          <div className="showcase-color-card__warnings">
            <strong>Warnings</strong>
            <ul>
              {warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  )
}

function ColorTokenGroup({ groupKey, title, description, tokens }) {
  const flatTokens = useMemo(() => flattenTokens(groupKey, tokens), [groupKey, tokens])
  const computedColors = getComputedColorMap(flatTokens)
  const tokensWithWarnings = flatTokens.map((token) => ({
    ...token,
    warnings: getTokenWarnings(
      token,
      computedColors[token.cssVariable],
    ),
  }))
  const warningsCount = tokensWithWarnings.reduce((count, token) => count + token.warnings.length, 0)

  return (
    <section className="showcase-token-group">
      <div className="showcase-token-group__header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {warningsCount ? <span>{warningsCount} warning</span> : null}
      </div>
      <div className="showcase-color-grid">
        {tokensWithWarnings.map((token) => (
          <ColorCard
            key={token.name}
            token={token}
            computedColor={computedColors[token.cssVariable]}
          />
        ))}
      </div>
    </section>
  )
}

function ColorsSection() {
  return (
    <div className="showcase-section">
      <div className="showcase-section__header">
        <p>Семантические цвета</p>
        <h1>Цвета</h1>
      </div>

      {Object.entries(colorTokenGroups).map(([groupKey, groupMeta]) => (
        <ColorTokenGroup
          key={groupKey}
          groupKey={groupKey}
          title={groupMeta.title}
          description={groupMeta.description}
          tokens={colorTokens[groupKey]}
        />
      ))}
    </div>
  )
}

function TypographySection() {
  return (
    <div className="showcase-section">
      <div className="showcase-section__header">
        <p>Текстовая шкала</p>
        <h1>Типографика</h1>
      </div>

      <section className="showcase-typography-panel">
        <div className="showcase-typography">
          {TYPOGRAPHY_STYLES.map((style) => (
            <article className="showcase-typography__row" key={style.name}>
              <div className="showcase-typography__meta">
                <strong>{style.name}</strong>
                <span>
                  {style.size} / {style.lineHeight}, {style.weight}
                </span>
                <code>.text--{style.variant}</code>
              </div>
              <p className={`text text--${style.variant} showcase-typography__sample`}>
                Авито помогает людям находить нужное быстро
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function IconsSection({ type = 'text', variant = 'outline' }) {
  if (type === 'interface') {
    const icons = iconRegistry.interface[variant] ?? {}
    const title = variant === 'filled' ? 'Icons_interface-Filled' : 'Icons_interface-Outline'

    return (
      <div className="showcase-section">
        <div className="showcase-section__header">
          <p>Атомы</p>
          <h1>{title}</h1>
          <p>Интерфейсные системные иконки проекта из iconRegistry.</p>
        </div>

        <div className="showcase-icon-categories">
          <section className="showcase-icon-category">
            <div className="showcase-icon-category__header">
              <div>
                <h2>Favorites</h2>
              </div>
              <span>{Object.keys(icons).length}</span>
            </div>

            {Object.keys(icons).length ? (
              <div className="showcase-icon-grid">
                {Object.keys(icons).map((name) => (
                  <article className="showcase-icon-card" key={name}>
                    <h3>{getIconDisplayName(name)}</h3>

                    <div className="showcase-icon-card__preview">
                      <svg
                        className="showcase-icon-card__preview-border"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" rx="24" />
                      </svg>
                      {['s', 'm', 'l', 'xl'].map((size) =>
                        icons[name][size] ? (
                          <div className="showcase-icon-card__size" key={size}>
                            <Icon type="interface" variant={variant} name={name} size={size} />
                            <span className="showcase-icon-card__size-label">{size}</span>
                          </div>
                        ) : null,
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="showcase-icon-empty">Пока нет импортированных иконок.</div>
            )}
          </section>
        </div>
      </div>
    )
  }

  const communicationIconNames = new Set([
    'ai',
    'ai-outline',
    'arrow-incoming-call',
    'arrow-outgoing-call',
    'assistant',
    'attach',
    'avi-chats',
    'bookmark',
    'bookmark-filled',
    'bot',
    'cable',
    'call',
    'chat',
    'chat-read',
    'chat-request-review',
    'chat-unread',
    'dislike',
    'dislike-filled',
    'forward',
    'incoming-call',
    'like',
    'like-filled',
    'mail',
    'message-delivered',
    'message-read',
    'microphone',
    'microphone-off',
    'missed-call',
    'mouthpiece',
    'news',
    'notifications',
    'notifications-off',
    'outgoing-call',
    'pushpin',
    'pushpin-filled',
    'pushpin-off',
    'pushpin-off-filled',
    'reply',
    'support',
    'wifi',
  ])
  const businessPaymentIconNames = new Set(['ruble', 'wallet', 'work'])
  const transportationIconNames = new Set(['diagram'])
  const otherIconNames = new Set(['statistics'])
  const categorizedIconNames = new Set([
    ...communicationIconNames,
    ...businessPaymentIconNames,
    ...transportationIconNames,
    ...otherIconNames,
  ])
  const commonActionIcons = Object.fromEntries(
    Object.entries(iconRegistry.text).filter(([name]) => !categorizedIconNames.has(name)),
  )
  const communicationIcons = Object.fromEntries(
    Object.entries(iconRegistry.text).filter(([name]) => communicationIconNames.has(name)),
  )
  const businessPaymentIcons = Object.fromEntries(
    Object.entries(iconRegistry.text).filter(([name]) => businessPaymentIconNames.has(name)),
  )
  const transportationIcons = Object.fromEntries(
    Object.entries(iconRegistry.text).filter(([name]) => transportationIconNames.has(name)),
  )
  const otherIcons = Object.fromEntries(
    Object.entries(iconRegistry.text).filter(([name]) => otherIconNames.has(name)),
  )
  const iconCategoryNames = [
    'Common actions',
    'Communication',
    'Content',
    'Camera & Video',
    'Maps',
    'Privacy & Security',
    'Business & Payments',
    'Transportation',
    'Real estate',
    'Other',
    'Core Services',
    'Brand Pages',
    'Badges',
    'Snippet',
  ]
  const iconGroups = iconCategoryNames.map((title, index) => ({
    id: toKebabCase(title),
    title,
    icons:
      index === 0
        ? commonActionIcons
        : title === 'Communication'
          ? communicationIcons
          : title === 'Business & Payments'
            ? businessPaymentIcons
            : title === 'Transportation'
              ? transportationIcons
              : title === 'Other'
                ? otherIcons
                : {},
    iconProps: { type: 'text' },
  }))

  return (
    <div className="showcase-section">
      <div className="showcase-section__header">
        <p>Атомы</p>
        <h1>Icons_Text</h1>
        <p>Текстовые системные иконки проекта из iconRegistry.</p>
      </div>

      <section className="showcase-icon-inherit-section">
        <div className="showcase-icon-category__header">
          <div>
            <h2>Text icons inherit color</h2>
            <p>Текстовые иконки наследуют цвет родительского текста через currentColor.</p>
          </div>
        </div>

        <div className="showcase-icon-inherit-grid">
          {TEXT_ICON_COLOR_EXAMPLES.map((example) => (
            <div
              className={`showcase-icon-inherit-example ${example.className}`}
              key={example.label}
            >
              <Icon type="text" name="info" size="m" />
              <span>{example.label}</span>
            </div>
          ))}
        </div>

        <div className="showcase-icon-inherit-grid showcase-icon-inherit-grid--context">
          <div className="showcase-icon-inherit-example">
            <Button leftIconName="search" priority="primary" type="button">
              Button with text icon
            </Button>
          </div>

          <div className="showcase-icon-inherit-sidebar-row">
            <Icon type="text" name="grade" size="m" />
            <span>Sidebar item with inherited icon color</span>
          </div>
        </div>
      </section>

      <div className="showcase-icon-categories">
        {iconGroups.map((group) => (
          <section className="showcase-icon-category" key={group.id}>
            <div className="showcase-icon-category__header">
              <div>
                <h2>{group.title}</h2>
              </div>
              <span>{Object.keys(group.icons).length}</span>
            </div>

            {Object.keys(group.icons).length ? (
              <div className="showcase-icon-grid">
                {Object.keys(group.icons).map((name) => (
                  <article className="showcase-icon-card" key={name}>
                    <h3>{getIconDisplayName(name)}</h3>

                    <div className="showcase-icon-card__preview">
                      <svg
                        className="showcase-icon-card__preview-border"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" rx="24" />
                      </svg>
                      {['s', 'm', 'h5'].map((size) =>
                        group.icons[name][size] ? (
                          <div className="showcase-icon-card__size" key={size}>
                            <Icon {...group.iconProps} name={name} size={size} />
                            <span className="showcase-icon-card__size-label">{size}</span>
                          </div>
                        ) : null,
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="showcase-icon-empty">Пока нет импортированных иконок.</div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

function ComponentDetailSection({ item, level }) {
  const Preview = item.component

  return (
    <div className="showcase-section">
      <div className="showcase-section__header">
        <p>{level === 'atoms' ? 'Атомы' : 'Молекулы'}</p>
        <h1>{item.name}</h1>
        {item.status === 'placeholder' ? <p>Компонент пока не выделен в самостоятельный React-export.</p> : null}
      </div>

      <div className="showcase-organism-sections">
        <section className="showcase-organism-section">
          <div className="showcase-organism-section__groups">
            <section className="showcase-organism-group">
              <div className="showcase-organism-group__states">
                <article className="showcase-organism-state">
                  <div className="showcase-organism-state__header">
                    <div>
                      <h2>
                        <span className="showcase-organism-state__title-prefix">{item.name}</span> / Default
                      </h2>
                    </div>
                    <SourceBadge source={item.source} />
                  </div>

                  <div className="showcase-organism-state__surface">
                    <div className="showcase-component-detail-preview">
                      <Preview />
                    </div>
                  </div>

                  <TokenList tokens={item.tokens} />
                </article>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}

const BUTTON_ROW_SIZES = ['s', 'm', 'l']

const BUTTON_BASIC_ROWS = [
  { label: 'Default', priority: 'secondary' },
  { label: 'Primary', priority: 'primary' },
]

const BUTTON_PRIORITY_ROWS = [
  { label: 'Default / Primary', priority: 'primary' },
  { label: 'Default / Secondary', priority: 'secondary' },
  { label: 'Accent / Primary', variant: 'accent', priority: 'primary' },
  { label: 'Accent / Secondary', variant: 'accent', priority: 'secondary' },
  { label: 'Pay / Primary', variant: 'pay', priority: 'primary' },
  { label: 'Pay / Secondary', variant: 'pay', priority: 'secondary' },
  { label: 'Success / Primary', variant: 'success', priority: 'primary' },
  { label: 'Success / Secondary', variant: 'success', priority: 'secondary' },
  { label: 'Danger / Primary', variant: 'danger', priority: 'primary' },
  { label: 'Danger / Secondary', variant: 'danger', priority: 'secondary' },
  { label: 'Ghost / Primary', variant: 'ghost', priority: 'primary' },
  { label: 'Assistant / Secondary', variant: 'assistant', priority: 'secondary' },
  { label: 'Overlay / Primary', preset: 'overlay', priority: 'primary' },
  { label: 'Overlay / Secondary', preset: 'overlay', priority: 'secondary' },
  { label: 'Inverse / Primary', preset: 'inverse', priority: 'primary', tone: 'dark' },
  { label: 'Inverse / Secondary', preset: 'inverse', priority: 'secondary', tone: 'dark' },
  { label: 'Inverse Constant / Primary', preset: 'inverseConstant', priority: 'primary', tone: 'dark' },
  { label: 'Inverse Constant / Secondary', preset: 'inverseConstant', priority: 'secondary', tone: 'dark' },
]

const BUTTON_STATE_ROWS = [
  { label: 'Disabled / Primary', priority: 'primary', disabled: true },
  { label: 'Disabled / Secondary', priority: 'secondary', disabled: true },
  { label: 'Round / Primary', priority: 'primary', round: true },
]

const BUTTON_ICON_ROWS = [
  {
    label: 'Left icon + text',
    buttonProps: {
      leftIconName: 'search',
    },
    children: 'Search',
  },
  {
    label: 'Text + right icon',
    buttonProps: {
      rightIconName: 'chevron-down',
    },
    children: 'Open',
  },
  {
    label: 'Left icon + text + right icon',
    buttonProps: {
      leftIconName: 'search',
      rightIconName: 'chevron-down',
    },
    children: 'Filter',
  },
  {
    label: 'Icon only',
    buttonProps: {
      iconOnly: true,
      leftIconName: 'search',
      'aria-label': 'Поиск',
    },
  },
]

function ButtonShowcaseRow({ row, sizes = BUTTON_ROW_SIZES }) {
  return (
    <div className={`showcase-button-row${row.tone === 'dark' ? ' showcase-button-row--dark' : ''}`}>
      <span className="showcase-button-row__label">{row.label}</span>
      <div className="showcase-button-row__items">
        {sizes.map((size) => (
          <Button
            disabled={row.disabled}
            key={size}
            preset={row.preset ?? 'default'}
            priority={row.priority ?? 'secondary'}
            round={row.round}
            size={size}
            type="button"
            variant={row.variant ?? 'default'}
            {...row.buttonProps}
          >
            {row.children ?? 'Text'}
          </Button>
        ))}
      </div>
    </div>
  )
}

function ButtonShowcaseGroup({ title, rows, sizes }) {
  return (
    <article className="showcase-organism-state">
      <div className="showcase-organism-state__header">
        <div>
          <h2>
            <span className="showcase-organism-state__title-prefix">Button</span> / {title}
          </h2>
        </div>
        <SourceBadge source="figma" />
      </div>

      <div className="showcase-organism-state__surface">
        <div className="showcase-button-matrix">
          {rows.map((row) => (
            <ButtonShowcaseRow key={row.label} row={row} sizes={sizes} />
          ))}
        </div>
      </div>
    </article>
  )
}

function ButtonDetailSection() {
  return (
    <div className="showcase-section">
      <div className="showcase-section__header">
        <p>Атомы</p>
        <h1>Button</h1>
        <p>Базовая кнопка проекта с приоритетами, размерами, состояниями и поддержкой иконок.</p>
      </div>

      <div className="showcase-organism-sections">
        <section className="showcase-organism-section">
          <div className="showcase-organism-section__groups">
            <section className="showcase-organism-group">
              <div className="showcase-organism-group__states">
                <ButtonShowcaseGroup title="Basic" rows={BUTTON_BASIC_ROWS} sizes={['m']} />
                <ButtonShowcaseGroup title="Priority / preset" rows={BUTTON_PRIORITY_ROWS} />
                <ButtonShowcaseGroup
                  title="Sizes"
                  rows={[{ label: 'S / M / L', priority: 'secondary' }]}
                />
                <ButtonShowcaseGroup title="States" rows={BUTTON_STATE_ROWS} sizes={['m']} />
                <ButtonShowcaseGroup title="Icons" rows={BUTTON_ICON_ROWS} sizes={['m']} />
                <TokenList
                  tokens={[
                    'components.button.bg.primary',
                    'components.button.bg.secondary',
                    'components.button.bg.accent.primary',
                    'components.button.bg.pay.primary',
                    'components.button.bg.success.primary',
                    'components.button.bg.danger.primary',
                    'text.primary',
                    'text.inverse.primary',
                  ]}
                />
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}

function PlaceholderSection({ label }) {
  return (
    <div className="showcase-placeholder">
      <p>Раздел витрины</p>
      <h1>{label}</h1>
      <span>Скоро появится</span>
    </div>
  )
}

export function ShowcasePage() {
  const [activeSection, setActiveSection] = useState('colors')
  const { featureToggles, setFeatureToggle } = useFeatureToggles()
  const activeNavItem =
    NAV_ITEMS.find((section) => section.id === activeSection) ?? NAV_ITEMS[0]
  const activeComponentItem =
    activeNavItem.componentLevel && activeNavItem.componentName
      ? componentRegistry[activeNavItem.componentLevel].find((item) => item.name === activeNavItem.componentName)
      : null
  const handleThemeChange = (value) => {
    if (value) {
      document.documentElement.dataset.theme = 'dark'
    } else {
      delete document.documentElement.dataset.theme
    }

    setFeatureToggle('darkTheme', value)
  }

  return (
    <main className="showcase-page">
      <aside className="showcase-sidebar" aria-label="Разделы витрины">
        <Link className="showcase-sidebar__back" to="/">
          <Icon name="chevronLeft" className="showcase-sidebar__back-icon" />
          <span>Назад в кабинет</span>
        </Link>
        <div className="showcase-sidebar__brand">
          <div className="showcase-sidebar__logo" aria-hidden="true">
            DS
          </div>
          <div className="showcase-sidebar__brand-copy">
            <h1>Витрина</h1>
            <p>Design System</p>
          </div>
          <label className="showcase-toolbar__control">
            <span>{featureToggles.darkTheme ? 'dark' : 'light'}</span>
            <ToggleSwitch
              checked={Boolean(featureToggles.darkTheme)}
              label="Переключить тему"
              onChange={handleThemeChange}
            />
          </label>
        </div>
        <nav className="showcase-sidebar__nav" aria-label="Навигация витрины">
          {NAV_GROUPS.map((group, groupIndex) => (
            <section className="showcase-sidebar__group" key={group.label}>
              {groupIndex > 0 ? <div className="showcase-sidebar__divider" /> : null}
              <h2>{group.label}</h2>
              <div className="showcase-sidebar__group-items">
                {group.items.map((section) => (
                  <button
                    className={`showcase-sidebar__nav-item${
                      activeSection === section.id ? ' showcase-sidebar__nav-item--active' : ''
                    }`}
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                  >
                    <span className="showcase-sidebar__nav-icon" aria-hidden="true" />
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </nav>
      </aside>

      <section className="showcase-content">
        <div className="showcase-main-content">
          {activeSection === 'colors' ? (
            <ColorsSection />
          ) : activeSection === 'typography' ? (
            <TypographySection />
          ) : activeComponentItem?.detailId === 'icons-text' ? (
            <IconsSection />
          ) : activeComponentItem?.detailId === 'icons-interface-outline' ? (
            <IconsSection type="interface" variant="outline" />
          ) : activeComponentItem?.detailId === 'icons-interface-filled' ? (
            <IconsSection type="interface" variant="filled" />
          ) : activeComponentItem?.detailId === 'button' ? (
            <ButtonDetailSection />
          ) : activeComponentItem ? (
            <ComponentDetailSection item={activeComponentItem} level={activeNavItem.componentLevel} />
          ) : activeNavItem.organismId ? (
            <OrganismsShowcaseSection activeOrganismId={activeNavItem.organismId} />
          ) : (
            <PlaceholderSection label={activeNavItem.label} />
          )}
        </div>
      </section>
    </main>
  )
}
