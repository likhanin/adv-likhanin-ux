import { Icon } from '../../../atoms/Icon/Icon'
import { Text } from '../../../atoms/Text/Text'
import './SidebarMenuLabel.css'

export function SidebarMenuLabel({ icon, label }) {
  return (
    <span className="sidebar-menu-label">
      <span className="sidebar-menu-label__icon-slot">
        <Icon name={icon} variant="sidebar" className="sidebar-menu-label__icon" />
      </span>
      <Text as="span" variant="m20" className="sidebar-menu-label__text">
        {label}
      </Text>
    </span>
  )
}
