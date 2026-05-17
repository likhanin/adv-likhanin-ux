import { useEffect, useRef, useState } from 'react'
import redesignLogo from '../../../assets/ReLogo.svg'
import { getAppCopy, useAppLocale } from '../../../i18n/useAppLocale'
import { Avatar } from '../../atoms/Avatar/Avatar'
import { Icon } from '../../atoms/Icon/Icon'
import { Logo } from '../../atoms/Logo/Logo'
import { TopActionIcon } from '../../molecules/Navigation/TopActionIcon/TopActionIcon'
import './Header.css'

function HeaderTop({ links, primaryAction, secondaryAction, actionIcons = [], avatar, ariaLabel }) {
  return (
    <div className="header__top">
      <nav className="header__top-links" aria-label={ariaLabel}>
        {links.map((link) => (
          <a key={link.label} href="/" className="header__top-link">
            <span>{link.label}</span>
            {link.caret ? <Icon name="chevronDown" className="header__top-caret" /> : null}
          </a>
        ))}
      </nav>

      <div className="header__actions">
        <a className="header__action-link" href="/">
          {primaryAction}
        </a>
        <a className="header__action-link" href="/">
          <Icon name="document" className="header__action-icon" />
          {secondaryAction}
        </a>
        {actionIcons.map((item) => (
          <TopActionIcon key={`${item.icon}-${item.badge ?? 'plain'}`} icon={item.icon} badge={item.badge} />
        ))}
        <Avatar variant={avatar?.variant ?? 'cluster'} />
      </div>
    </div>
  )
}

function HeaderBottom({ links, ariaLabel }) {
  return (
    <div className="header__bottom">
      <Logo />
      <nav className="header__category-links" aria-label={ariaLabel}>
        {links.map((link) => (
          <a key={link.label} href="/" className="header__category-link">
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

function RedesignHeader() {
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

  return (
    <div className="header header--redesign">
      <div className="header__redesign-content">
        <img
          className="redesign-sidebar__brand-logo"
          src={redesignLogo}
          alt={`Avito ${appCopy.sidebar.redesign.title}`}
        />

        <div className="redesign-sidebar__role-switcher" ref={dropdownRef}>
          <button
            type="button"
            className="redesign-sidebar__role-button"
            onClick={() => setIsRoleMenuOpen((current) => !current)}
            aria-expanded={isRoleMenuOpen}
          >
            <span>{selectedRole}</span>
            <Icon
              name="chevronDown"
              className={
                isRoleMenuOpen
                  ? 'redesign-sidebar__role-caret redesign-sidebar__role-caret--open'
                  : 'redesign-sidebar__role-caret'
              }
            />
          </button>

          {isRoleMenuOpen ? (
            <div className="redesign-sidebar__role-menu">
              {appCopy.sidebar.redesign.roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`redesign-sidebar__role-option${
                    selectedRole === role ? ' redesign-sidebar__role-option--active' : ''
                  }`}
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
    </div>
  )
}

export function Header({
  variant = 'default',
  topLinks,
  categoryLinks,
  primaryAction,
  secondaryAction,
  actionIcons = [],
  avatar,
  topNavAriaLabel,
  categoriesAriaLabel,
}) {
  if (variant === 'redesign') {
    return <RedesignHeader />
  }

  return (
    <div className="header">
      <HeaderTop
        links={topLinks}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        actionIcons={actionIcons}
        avatar={avatar}
        ariaLabel={topNavAriaLabel}
      />
      <HeaderBottom links={categoryLinks} ariaLabel={categoriesAriaLabel} />
    </div>
  )
}
