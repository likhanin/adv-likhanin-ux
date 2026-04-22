import { Counter } from '../../../atoms/Counter/Counter'
import { Icon } from '../../../atoms/Icon/Icon'
import './TopActionIcon.css'

export function TopActionIcon({ icon, badge }) {
  return (
    <span className="top-action-icon">
      <Icon name={icon} variant="top" />
      {badge ? (
        <Counter size="xs" className="top-action-icon__badge">
          {badge}
        </Counter>
      ) : null}
    </span>
  )
}
