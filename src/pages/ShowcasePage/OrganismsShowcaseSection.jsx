import { useLayoutEffect, useRef, useState } from 'react'
import { AdCard } from '../../components/organisms/Ads/AdCard/AdCard'
import { FeaturePromoCard } from '../../components/organisms/Feature/FeaturePromoCard/FeaturePromoCard'
import { FeatureTogglesPanel } from '../../components/organisms/FeatureToggles/FeatureTogglesPanel/FeatureTogglesPanel'
import { Header } from '../../components/organisms/Header/Header'
import { AppModal } from '../../components/organisms/Modal/AppModal/AppModal'
import { ProfileSidebar } from '../../components/organisms/Sidebar/ProfileSidebar/ProfileSidebar'
import { SidebarNavigation } from '../../components/organisms/Sidebar/SidebarNavigation/SidebarNavigation'
import { DesignSystemDataTable } from '../../components/organisms/Table/DesignSystemDataTable/DesignSystemDataTable'
import { Button } from '../../components/atoms/Button/Button'
import { WalletSummary } from '../../components/molecules/Profile/WalletSummary/WalletSummary'
import {
  showcaseBudgetWidgetMock,
  showcaseClientCardMock,
  showcaseFinanceSummaryMock,
  showcaseHeaderMock,
  showcaseSidebarMock,
} from './showcaseMocks'

const SOURCE_LABELS = {
  figma: 'Перенесли из Figma Avito Design Team',
  manual: 'Максим это делал руками',
}

const HEADER_TOKENS = ['text.primary', 'text.secondary', 'bg.elevation1', 'divider.default']
const MODAL_TOKENS = ['bg.backdrop', 'bg.elevation1', 'text.primary', 'text.secondary']
const MODAL_SIZE_STATES = [
  { size: 'xs', label: 'XS', panelWidth: 343, viewportWidth: 439, mobileOnly: true },
  { size: 's', label: 'S', panelWidth: 470, viewportWidth: 566 },
  { size: 'm', label: 'M', panelWidth: 630, viewportWidth: 726 },
  { size: 'l', label: 'L', panelWidth: 800, viewportWidth: 896 },
  { size: 'xl', label: 'XL', panelWidth: 904, viewportWidth: 1000 },
]
const TABLE_TOKENS = ['text.primary', 'text.secondary', 'border.subtle', 'bg.page']
const TABLE_COLUMNS = [
  { key: 'date', label: 'Дата', width: '24%' },
  { key: 'amount', label: 'Сумма', width: '16%', align: 'right' },
  { key: 'client', label: 'Клиент', width: '24%' },
  { key: 'operation', label: 'Операция', width: '36%' },
]
const TABLE_ROWS = [
  {
    id: 'table-row-1',
    date: '11 мая 2026',
    amount: '+24 000 ₽',
    client: 'ООО Ромашка',
    operation: 'Пополнение кошелька',
  },
  {
    id: 'table-row-2',
    date: '10 мая 2026',
    amount: '-8 500 ₽',
    client: 'ИП Смирнов',
    operation: 'Продвижение объявлений',
  },
  {
    id: 'table-row-3',
    date: '8 мая 2026',
    amount: '-3 200 ₽',
    client: 'ООО Вектор',
    operation: 'Возврат средств клиенту',
  },
]

function ShowcaseRuler({ children, measureSelector }) {
  const rulerRef = useRef(null)
  const targetRef = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0, x: 0, y: 0 })

  useLayoutEffect(() => {
    const target = targetRef.current
    const measuredNode = measureSelector ? target?.querySelector(measureSelector) : target?.firstElementChild

    if (!measuredNode) {
      return undefined
    }

    const updateSize = () => {
      const rect = measuredNode.getBoundingClientRect()
      const rulerRect = rulerRef.current?.getBoundingClientRect()

      setSize({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        x: Math.round(rulerRect ? rect.left - rulerRect.left : 0),
        y: Math.round(rulerRect ? rect.top - rulerRect.top : 0),
      })
    }

    updateSize()

    if (typeof ResizeObserver === 'undefined') {
      return undefined
    }

    const observer = new ResizeObserver(updateSize)
    observer.observe(measuredNode)

    return () => {
      observer.disconnect()
    }
  }, [children, measureSelector])

  const style = {
    '--showcase-ruler-width': `${size.width}px`,
    '--showcase-ruler-height': `${size.height}px`,
    '--showcase-ruler-x': `${size.x}px`,
    '--showcase-ruler-y': `${size.y}px`,
  }

  return (
    <div className="showcase-ruler" style={style} ref={rulerRef}>
      {size.width > 0 ? (
        <div className="showcase-ruler__line showcase-ruler__line--horizontal" aria-hidden="true">
          <span className="showcase-ruler__segment" />
          <span className="showcase-ruler__label">{size.width}</span>
          <span className="showcase-ruler__segment" />
        </div>
      ) : null}
      {size.height > 0 ? (
        <div className="showcase-ruler__line showcase-ruler__line--vertical" aria-hidden="true">
          <span className="showcase-ruler__segment" />
          <span className="showcase-ruler__label">{size.height}</span>
          <span className="showcase-ruler__segment" />
        </div>
      ) : null}
      <div className="showcase-ruler__target" ref={targetRef}>
        {children}
      </div>
    </div>
  )
}

export function SourceBadge({ source = 'manual' }) {
  if (source === 'figma') {
    return null
  }

  return (
    <span className={`showcase-source-badge showcase-source-badge--${source}`}>
      {SOURCE_LABELS[source] ?? SOURCE_LABELS.manual}
    </span>
  )
}

export function TokenList({ tokens = ['Скоро добавим список токенов'] }) {
  return (
    <div className="showcase-token-list">
      <span>Используемые токены</span>
      <ul>
        {tokens.map((token) => (
          <li key={token}>{token}</li>
        ))}
      </ul>
    </div>
  )
}

function StateTitle({ title }) {
  const parts = title.split(' / ')

  if (parts.length < 2) {
    return title
  }

  return (
    <>
      <span className="showcase-organism-state__title-prefix">{parts[0]}</span>
      {' / '}
      {parts.slice(1).join(' / ')}
    </>
  )
}

export function OrganismStatePreview({
  title,
  width,
  source = 'manual',
  hideSourceBadge = false,
  rulerMeasureSelector,
  surfaceClassName = '',
  description,
  tokens,
  children,
}) {
  return (
    <article className="showcase-organism-state">
      <div className="showcase-organism-state__header">
        <div>
          <h2>
            <StateTitle title={title} />
          </h2>
          {description ? <p>{description}</p> : null}
          {width ? <span className="showcase-organism-state__viewport-label">{width}px viewport</span> : null}
        </div>
        {hideSourceBadge ? null : <SourceBadge source={source} />}
      </div>

      <div className={['showcase-organism-state__surface', surfaceClassName].filter(Boolean).join(' ')}>
        <div
          className="showcase-organism-state__viewport"
          style={
            width
              ? {
                  '--showcase-preview-width': `${width}px`,
                  '--showcase-preview-stage-width': `${width + 116}px`,
                }
              : undefined
          }
        >
          <ShowcaseRuler measureSelector={rulerMeasureSelector}>{children}</ShowcaseRuler>
        </div>
      </div>

      <TokenList tokens={tokens} />
    </article>
  )
}

export function OrganismSection({ source = 'manual', groups = [] }) {
  return (
    <section className="showcase-organism-section">
      <div className="showcase-organism-section__groups">
        {groups.map((group) => (
          <section className="showcase-organism-group" key={group.title}>
            <div className="showcase-organism-group__states">
              {group.states.map((state) => (
                <OrganismStatePreview
                  key={state.title}
                  title={state.title}
                  width={state.width}
                  source={state.source ?? source}
                  hideSourceBadge={state.hideSourceBadge}
                  rulerMeasureSelector={state.rulerMeasureSelector}
                  surfaceClassName={state.surfaceClassName}
                  description={state.description}
                  tokens={state.tokens}
                >
                  {state.preview}
                </OrganismStatePreview>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

function SidebarPreview() {
  return (
    <div className="showcase-sidebar-preview">
      <ProfileSidebar
        profile={showcaseSidebarMock.profile}
        wallet={showcaseSidebarMock.wallet}
        postpayDebt={showcaseSidebarMock.postpayDebt}
      />
      <SidebarNavigation items={showcaseSidebarMock.navigation} ariaLabel="Навигация витрины" />
    </div>
  )
}

function ModalPreview({ size }) {
  return (
    <AppModal
      isOpen
      title={`Modal ${size.toUpperCase()}`}
      subtitle="Модальное окно поверх затемнения с заголовком, текстом и действиями."
      size={size}
      presentation="preview"
      onClose={() => {}}
    >
      <div className="showcase-modal-preview">
        <p>
          Проверьте параметры перед продолжением. Это реальный компонент AppModal, показанный во встроенном
          preview-режиме.
        </p>
        <div className="showcase-modal-preview__actions">
          <Button type="button" priority="primary">
            Подтвердить
          </Button>
          <Button type="button">Отмена</Button>
        </div>
      </div>
    </AppModal>
  )
}

function TablePreview({ size }) {
  return (
    <DesignSystemDataTable
      columns={TABLE_COLUMNS}
      rows={TABLE_ROWS}
      getRowKey={(row) => row.id}
      size={size}
      density="m"
      divider
    />
  )
}

const organismSections = [
  {
    id: 'header',
    title: 'Header',
    source: 'manual',
    description:
      'Актуальный Header проекта, собранный по Figma и отрендеренный тем же production-компонентом, что используется в кабинете.',
    groups: [
      {
        title: 'Default',
        states: [
          {
            title: 'Header / Default',
            width: 1440,
            source: 'figma',
            tokens: HEADER_TOKENS,
            preview: (
              <div className="showcase-header-preview">
                <Header
                  topLinks={showcaseHeaderMock.topLinks}
                  categoryLinks={showcaseHeaderMock.categoryLinks}
                  primaryAction={showcaseHeaderMock.primaryAction}
                  secondaryAction={showcaseHeaderMock.secondaryAction}
                  actionIcons={showcaseHeaderMock.actionIcons}
                  avatar={showcaseHeaderMock.avatar}
                  topNavAriaLabel="Верхнее меню витрины"
                  categoriesAriaLabel="Главное меню витрины"
                />
              </div>
            ),
          },
          {
            title: 'Header / Redesign',
            width: 1440,
            tokens: ['bg.transparent', 'text.primary', 'bg.elevation1'],
            preview: (
              <div className="showcase-header-preview showcase-header-preview--redesign">
                <Header variant="redesign" />
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    id: 'sidebar',
    title: 'Sidebar',
    source: 'manual',
    description: 'Профиль, кошелёк и навигация боковой панели.',
    groups: [
      {
        title: 'Default',
        states: [
          {
            title: 'Sidebar / Default',
            width: 320,
            tokens: ['bg.elevation1', 'bg.default', 'text.primary', 'accent.primary'],
            preview: <SidebarPreview />,
          },
        ],
      },
    ],
  },
  {
    id: 'modal',
    title: 'Modal',
    source: 'manual',
    description: 'Модальное окно проекта с overlay, панелью, заголовком, закрытием и контентом.',
    groups: [
      {
        title: 'Sizes',
        states: MODAL_SIZE_STATES.map(({ size, label, panelWidth, viewportWidth, mobileOnly }) => ({
          title: `Modal / ${label}`,
          width: viewportWidth,
          description: `Panel max-width ${panelWidth}px${mobileOnly ? ', mobile only' : ''}`,
          hideSourceBadge: true,
          rulerMeasureSelector: '.app-modal__panel',
          surfaceClassName: 'showcase-organism-state__surface--modal',
          tokens: MODAL_TOKENS,
          preview: <ModalPreview size={size} />,
        })),
      },
    ],
  },
  {
    id: 'table',
    title: 'Table',
    source: 'manual',
    description: 'Дизайн-системная таблица данных с сохраненными размерами.',
    groups: [
      {
        title: 'Sizes',
        states: [
          {
            title: 'Table / S',
            width: 860,
            tokens: TABLE_TOKENS,
            preview: <TablePreview size="s" />,
          },
          {
            title: 'Table / M',
            width: 860,
            tokens: TABLE_TOKENS,
            preview: <TablePreview size="m" />,
          },
          {
            title: 'Table / L',
            width: 860,
            tokens: TABLE_TOKENS,
            preview: <TablePreview size="l" />,
          },
        ],
      },
    ],
  },
  {
    id: 'feature-toggles-panel',
    title: 'FeatureTogglesPanel',
    source: 'manual',
    description: 'Панель управления локальными фича-тогглами.',
    groups: [
      {
        title: 'Default',
        states: [
          {
            title: 'FeatureTogglesPanel / Default',
            width: 560,
            tokens: ['bg.elevation1', 'text.primary', 'divider.default'],
            preview: <FeatureTogglesPanel />,
          },
        ],
      },
    ],
  },
  {
    id: 'client-card',
    title: 'ClientCard',
    source: 'manual',
    description: 'Мок клиентской карточки на базе существующего карточного организма.',
    groups: [
      {
        title: 'Default',
        states: [
          {
            title: 'ClientCard / Default',
            width: 760,
            tokens: ['bg.elevation1', 'text.primary', 'text.secondary', 'bg.default'],
            preview: <AdCard ad={showcaseClientCardMock} />,
          },
        ],
      },
    ],
  },
  {
    id: 'budget-widget',
    title: 'BudgetWidget',
    source: 'manual',
    description: 'Виджет бюджета на базе кошелька профиля.',
    groups: [
      {
        title: 'Default',
        states: [
          {
            title: 'BudgetWidget / Default',
            width: 460,
            tokens: ['bg.elevation1', 'text.primary', 'text.secondary', 'accent.primary'],
            preview: <WalletSummary {...showcaseBudgetWidgetMock} />,
          },
        ],
      },
    ],
  },
  {
    id: 'finance-summary',
    title: 'FinanceSummary',
    source: 'manual',
    description: 'Компактная финансовая сводка для проверки карточных поверхностей.',
    groups: [
      {
        title: 'Default',
        states: [
          {
            title: 'FinanceSummary / Default',
            width: 520,
            tokens: ['bg.elevation1', 'text.primary', 'text.secondary', 'bg.default'],
            preview: <FeaturePromoCard {...showcaseFinanceSummaryMock} />,
          },
        ],
      },
    ],
  },
]

export function OrganismsShowcaseSection({ activeOrganismId = 'header' }) {
  const visibleSections =
    activeOrganismId === 'all'
      ? organismSections
      : organismSections.filter((organism) => organism.id === activeOrganismId)
  const activeOrganism = activeOrganismId === 'all' ? null : visibleSections[0]
  const headerTitle = activeOrganism?.title ?? 'Организмы'
  const headerDescription = activeOrganism?.description ?? 'Реальные UI-блоки'

  return (
    <div className="showcase-section">
      <div className="showcase-section__header">
        <h1>{headerTitle}</h1>
        <p>{headerDescription}</p>
      </div>

      <div className="showcase-organism-sections">
        {visibleSections.map((organism) => (
          <OrganismSection key={organism.id} {...organism} />
        ))}
      </div>
    </div>
  )
}
