import { Icon } from '../../../atoms/Icon/Icon'
import './AppDropdown.css'

export function AppDropdown({
  isOpen = false,
  onToggle,
  trigger,
  startIconName = '',
  triggerClassName = '',
  triggerMainClassName = '',
  triggerIconClassName = '',
  triggerChevronClassName = '',
  panelClassName = '',
  panelRole = 'dialog',
  panelAriaLabel,
  children,
}) {
  return (
    <>
      <button
        className={['app-dropdown__trigger', triggerClassName].filter(Boolean).join(' ')}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup={panelRole}
        onClick={onToggle}
      >
        <span className={['app-dropdown__trigger-main', triggerMainClassName].filter(Boolean).join(' ')}>
          {startIconName ? <Icon name={startIconName} variant="plain" className={triggerIconClassName} /> : null}
          <span>{trigger}</span>
        </span>
        <Icon
          name={isOpen ? 'chevronUp' : 'chevronDown'}
          variant="plain"
          className={['app-dropdown__trigger-chevron', triggerChevronClassName].filter(Boolean).join(' ')}
        />
      </button>

      {isOpen ? (
        <div
          className={['app-dropdown__panel', panelClassName].filter(Boolean).join(' ')}
          role={panelRole}
          aria-label={panelAriaLabel}
        >
          {children}
        </div>
      ) : null}
    </>
  )
}
