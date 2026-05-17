import { Counter } from '../../../atoms/Counter/Counter'
import { Icon } from '../../../atoms/Icon/Icon'
import './TopActionIcon.css'

function getIconProps(icon) {
  if (icon === 'favorite' || icon === 'favorites') {
    return {
      name: 'favorites',
      type: 'interface',
      variant: 'filled',
      size: 'l',
    }
  }

  return {
    name: icon,
    variant: 'top',
  }
}

export function TopActionIcon({ icon, badge }) {
  const iconProps = getIconProps(icon)
  const isFavoritesIcon = iconProps.name === 'favorites'

  return (
    <span className={`top-action-icon${isFavoritesIcon ? ' top-action-icon--favorites' : ''}`}>
      <Icon {...iconProps} />
      {badge ? (
        <Counter size="xs" className="top-action-icon__badge">
          {badge}
        </Counter>
      ) : null}
    </span>
  )
}
