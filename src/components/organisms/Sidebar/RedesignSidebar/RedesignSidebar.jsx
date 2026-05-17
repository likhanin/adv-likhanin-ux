import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar } from '../../../atoms/Avatar/Avatar'
import { Badge } from '../../../atoms/Badge/Badge'
import { SectionLabel } from '../../../atoms/SectionLabel/SectionLabel'
import { Text } from '../../../atoms/Text/Text'
import { SidebarMenuLabel } from '../../../molecules/Navigation/SidebarMenuLabel/SidebarMenuLabel'
import { getAppCopy, useAppLocale } from '../../../../i18n/useAppLocale'
import './RedesignSidebar.css'

const ENABLED_SIDEBAR_HREFS = new Set(['/clients', '/finance'])

function RedesignSidebarItem({ href, icon, label, badge = null, disabled = false }) {
  const content = (
    <>
      <SidebarMenuLabel icon={icon} label={label} />
      {badge ? <Badge>{badge}</Badge> : null}
    </>
  )

  if (disabled) {
    return (
      <span className="redesign-sidebar__nav-item redesign-sidebar__nav-item--disabled" aria-disabled="true">
        {content}
      </span>
    )
  }

  return (
    <NavLink
      to={href}
      end
      className={({ isActive }) =>
        `redesign-sidebar__nav-item${isActive ? ' redesign-sidebar__nav-item--active' : ''}`
      }
    >
      {content}
    </NavLink>
  )
}

export function RedesignSidebar({ walletAmount, userName }) {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)

  const cabinetItems = useMemo(
    () => [
      { href: '/overview', icon: 'stats', label: appCopy.sidebar.redesign.items.overview },
      { href: '/messages', icon: 'chat', label: appCopy.sidebar.redesign.items.messages },
      {
        href: '/finance',
        icon: 'ruble',
        label: appCopy.sidebar.redesign.items.finance,
      },
      { href: '/employees', icon: 'work', label: appCopy.sidebar.redesign.items.employees },
      { href: '/clients', icon: 'star', label: appCopy.sidebar.redesign.items.clients },
    ],
    [appCopy.sidebar.redesign],
  )

  const toolItems = useMemo(
    () => [
      {
        href: '/demand-analytics',
        icon: 'statistics',
        label: appCopy.sidebar.redesign.items.demandAnalytics,
      },
      { href: '/statistics', icon: 'diagram', label: appCopy.sidebar.redesign.items.statistics },
      {
        href: '/pro-subscription',
        icon: 'shield',
        label: appCopy.sidebar.redesign.items.proSubscription,
      },
      { href: '/documents', icon: 'document', label: appCopy.sidebar.redesign.items.documents },
    ],
    [appCopy.sidebar.redesign],
  )

  return (
    <aside className="redesign-sidebar">
      <div className="redesign-sidebar__groups">
        <section className="redesign-sidebar__group">
          <SectionLabel>{appCopy.sidebar.redesign.cabinetGroupLabel}</SectionLabel>
          <nav className="redesign-sidebar__nav" aria-label={appCopy.sidebar.navAriaLabel}>
            {cabinetItems.map((item) => (
              <RedesignSidebarItem
                key={item.href}
                {...item}
                disabled={!ENABLED_SIDEBAR_HREFS.has(item.href)}
              />
            ))}
          </nav>
        </section>

        <section className="redesign-sidebar__group">
          <SectionLabel>{appCopy.sidebar.redesign.toolsGroupLabel}</SectionLabel>
          <nav className="redesign-sidebar__nav" aria-label={appCopy.sidebar.navAriaLabel}>
            {toolItems.map((item) => (
              <RedesignSidebarItem
                key={item.href}
                {...item}
                disabled={!ENABLED_SIDEBAR_HREFS.has(item.href)}
              />
            ))}
          </nav>
        </section>
      </div>

      <div className="redesign-sidebar__user-card">
        <Avatar variant="single" className="redesign-sidebar__user-avatar" />
        <div className="redesign-sidebar__user-copy">
          <Text as="strong" variant="m10" className="redesign-sidebar__user-name">
            {userName}
          </Text>
          <Text as="span" tone="soft" variant="s10" className="redesign-sidebar__user-balance">
            {walletAmount}
          </Text>
        </div>
      </div>
    </aside>
  )
}
