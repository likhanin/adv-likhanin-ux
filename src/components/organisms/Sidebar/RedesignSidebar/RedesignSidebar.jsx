import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import redesignLogo from '../../../../assets/ReLogo.svg'
import { Avatar } from '../../../atoms/Avatar/Avatar'
import { Badge } from '../../../atoms/Badge/Badge'
import { Icon } from '../../../atoms/Icon/Icon'
import { SectionLabel } from '../../../atoms/SectionLabel/SectionLabel'
import { Text } from '../../../atoms/Text/Text'
import { SidebarMenuLabel } from '../../../molecules/Navigation/SidebarMenuLabel/SidebarMenuLabel'
import { getAppCopy, useAppLocale } from '../../../../i18n/useAppLocale'
import './RedesignSidebar.css'

function RedesignSidebarItem({ href, icon, label, badge = null }) {
  return (
    <NavLink
      to={href}
      end
      className={({ isActive }) =>
        `redesign-sidebar__nav-item${isActive ? ' redesign-sidebar__nav-item--active' : ''}`
      }
    >
      <SidebarMenuLabel icon={icon} label={label} />
      {badge ? <Badge>{badge}</Badge> : null}
    </NavLink>
  )
}

export function RedesignSidebar({ walletAmount, userName }) {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)
  const dropdownRef = useRef(null)
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(appCopy.sidebar.redesign.roles[0])

  useEffect(() => {
    if (!isRoleMenuOpen) {
      return undefined
    }

    function handlePointerDown(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsRoleMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [isRoleMenuOpen])

  const cabinetItems = useMemo(
    () => [
      { href: '/overview', icon: 'stats', label: appCopy.sidebar.redesign.items.overview },
      { href: '/messages', icon: 'chat', label: appCopy.sidebar.redesign.items.messages },
      {
        href: '/finance',
        icon: 'wallet',
        label: appCopy.sidebar.redesign.items.finance,
        badge: appCopy.sidebar.redesign.financeBadge,
      },
      { href: '/employees', icon: 'team', label: appCopy.sidebar.redesign.items.employees },
      { href: '/clients', icon: 'star', label: appCopy.sidebar.redesign.items.clients },
    ],
    [appCopy.sidebar.redesign],
  )

  const toolItems = useMemo(
    () => [
      {
        href: '/demand-analytics',
        icon: 'chart',
        label: appCopy.sidebar.redesign.items.demandAnalytics,
      },
      { href: '/statistics', icon: 'stats', label: appCopy.sidebar.redesign.items.statistics },
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
      <div className="redesign-sidebar__top">
        <div className="redesign-sidebar__brand">
          <img className="redesign-sidebar__brand-logo" src={redesignLogo} alt={`Avito ${appCopy.sidebar.redesign.title}`} />
        </div>

        <div className="redesign-sidebar__role-switcher" ref={dropdownRef}>
          <button
            type="button"
            className="redesign-sidebar__role-button"
            onClick={() => setIsRoleMenuOpen((current) => !current)}
            aria-expanded={isRoleMenuOpen}
          >
            <span>{selectedRole}</span>
            <Icon name="chevronDown" className={isRoleMenuOpen ? 'redesign-sidebar__role-caret redesign-sidebar__role-caret--open' : 'redesign-sidebar__role-caret'} />
          </button>

          {isRoleMenuOpen ? (
            <div className="redesign-sidebar__role-menu">
              {appCopy.sidebar.redesign.roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`redesign-sidebar__role-option${selectedRole === role ? ' redesign-sidebar__role-option--active' : ''}`}
                  onClick={() => {
                    setSelectedRole(role)
                    setIsRoleMenuOpen(false)
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="redesign-sidebar__groups">
        <section className="redesign-sidebar__group">
          <SectionLabel>{appCopy.sidebar.redesign.cabinetGroupLabel}</SectionLabel>
          <nav className="redesign-sidebar__nav" aria-label={appCopy.sidebar.navAriaLabel}>
            {cabinetItems.map((item) => (
              <RedesignSidebarItem key={item.href} {...item} />
            ))}
          </nav>
        </section>

        <section className="redesign-sidebar__group">
          <SectionLabel>{appCopy.sidebar.redesign.toolsGroupLabel}</SectionLabel>
          <nav className="redesign-sidebar__nav" aria-label={appCopy.sidebar.navAriaLabel}>
            {toolItems.map((item) => (
              <RedesignSidebarItem key={item.href} {...item} />
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
