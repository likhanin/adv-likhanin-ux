import { Counter } from '../../../atoms/Counter/Counter'
import { Icon } from '../../../atoms/Icon/Icon'
import './FloatingChatButton.css'

export function FloatingChatButton({ label, count }) {
  return (
    <button className="floating-chat-button" type="button">
      <span className="floating-chat-button__main">
        <span className="floating-chat-button__label">{label}</span>
        <Counter size="xs" className="floating-chat-button__badge">
          {count}
        </Counter>
      </span>
      <Icon name="chevronUp" variant="plain" className="floating-chat-button__icon" />
    </button>
  )
}
