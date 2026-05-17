import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { Badge } from '../../../atoms/Badge/Badge'
import { Counter } from '../../../atoms/Counter/Counter'
import { Icon } from '../../../atoms/Icon/Icon'
import './SidebarNavItem.css'

export function SidebarNavItem({ href = '/', icon, label, badge, caret = false, aliases = [], disabled = false }) {
  const location = useLocation()
  const isAliasActive = aliases.some((alias) =>
    matchPath({ path: alias, end: true }, location.pathname),
  )
  const isNumericBadge = typeof badge === 'number' || /^\d+$/.test(String(badge ?? ''))
  const content = (
    <>
      <span className="sidebar-nav-item__main">
        <Icon name={icon} variant="sidebar" />
        <span>{label}</span>
      </span>
      <span className="sidebar-nav-item__side">
        {badge ? (
          isNumericBadge ? (
            <Counter size="s">{badge}</Counter>
          ) : (
            <Badge>{badge}</Badge>
          )
        ) : null}
        {caret ? <span className="sidebar-nav-item__caret">›</span> : null}
      </span>
    </>
  )

  if (disabled) {
    return (
      <span className="sidebar-nav-item sidebar-nav-item--disabled" aria-disabled="true">
        {content}
      </span>
    )
  }

  return (
    <NavLink
      to={href}
      end
      className={({ isActive }) =>
        `sidebar-nav-item${isActive || isAliasActive ? ' sidebar-nav-item--active' : ''}`
      }
      aria-current={isAliasActive ? 'page' : undefined}
    >
      {content}
    </NavLink>
  )
}
