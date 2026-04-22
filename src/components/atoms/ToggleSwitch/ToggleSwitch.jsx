import './ToggleSwitch.css'

export function ToggleSwitch({ checked = false, onChange, label, disabled = false }) {
  return (
    <button
      className={`toggle-switch${checked ? ' toggle-switch--checked' : ''}${disabled ? ' toggle-switch--disabled' : ''}`}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={label}
      onClick={() => {
        if (!disabled) {
          onChange?.(!checked)
        }
      }}
    >
      <span className="toggle-switch__track">
        <span className="toggle-switch__thumb" />
      </span>
    </button>
  )
}
