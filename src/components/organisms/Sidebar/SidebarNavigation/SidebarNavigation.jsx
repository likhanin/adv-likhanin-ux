import { SidebarNavItem } from '../../../molecules/Navigation/SidebarNavItem/SidebarNavItem'
import './SidebarNavigation.css'

export function SidebarNavigation({ items, ariaLabel }) {
  return (
    <nav className="sidebar-navigation" aria-label={ariaLabel}>
      {items.map((item) => (
        <SidebarNavItem key={item.label} {...item} />
      ))}
    </nav>
  )
}
