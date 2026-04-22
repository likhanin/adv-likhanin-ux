import { useId } from 'react'
import { Icon } from '../Icon/Icon'
import '../FormField/FormField.css'

function getIconSize(size) {
  return size === 's' ? 's' : 'm'
}

export function SelectField({
  value = '',
  onChange,
  options = [],
  size = 'm',
  preset = 'default',
  label = '',
  showLabel = Boolean(label),
  labelVariant = 'h4',
  hint = '',
  showHint = Boolean(hint),
  hintVariant = 'h6',
  error = '',
  placeholder = 'Выберите из списка...',
  leftIconName = '',
  className = '',
  id,
  ...props
}) {
  const generatedId = useId()
  const resolvedId = id ?? generatedId
  const fieldState = error ? 'error' : value ? 'filled' : 'default'
  const iconSize = getIconSize(size)
  const shouldShowHint = showHint || Boolean(error)

  return (
    <div
      className={[
        'field-control',
        `field-control--size-${size}`,
        `field-control--${preset}`,
        `field-control--${fieldState}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showLabel ? (
        <label className={`text text--default text--${String(labelVariant).toLowerCase()} field-control__label`} htmlFor={resolvedId}>
          {label}
        </label>
      ) : null}

      <div className="field-control__shell">
        {leftIconName ? (
          <span className="field-control__lead" aria-hidden="true">
            <Icon name={leftIconName} variant="plain" size={iconSize} />
          </span>
        ) : null}

        <select
          {...props}
          id={resolvedId}
          className="field-control__select"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="field-control__trail" aria-hidden="true">
          <Icon name="chevronDown" variant="plain" size={iconSize} />
        </span>
      </div>

      {shouldShowHint ? (
        <p className={`text text--default text--${String(hintVariant).toLowerCase()} field-control__hint`}>
          {error || hint}
        </p>
      ) : null}
    </div>
  )
}
