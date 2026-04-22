import { useId } from 'react'
import { Icon } from '../Icon/Icon'
import '../FormField/FormField.css'

function getIconSize(size) {
  return size === 's' ? 's' : 'm'
}

export function InputField({
  value = '',
  onChange,
  size = 'm',
  preset = 'default',
  label = '',
  showLabel = Boolean(label),
  labelVariant = 'h4',
  hint = '',
  showHint = Boolean(hint),
  hintVariant = 'h6',
  error = '',
  placeholder = 'Введите главное...',
  leftIconName = '',
  postfix = '₽',
  showPostfix = true,
  clearLabel = 'Очистить поле',
  className = '',
  id,
  onClear,
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

        <input
          {...props}
          id={resolvedId}
          className="field-control__input"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
        />

        {showPostfix && postfix ? (
          <span className="field-control__trail field-control__postfix" aria-hidden="true">
            {postfix}
          </span>
        ) : null}

        {fieldState === 'filled' ? (
          <button
            className="field-control__trail field-control__action"
            type="button"
            aria-label={clearLabel}
            onClick={() => {
              onClear?.()
              onChange?.('')
            }}
          >
            <Icon name="close" variant="plain" size={iconSize} />
          </button>
        ) : null}
      </div>

      {shouldShowHint ? (
        <p className={`text text--default text--${String(hintVariant).toLowerCase()} field-control__hint`}>
          {error || hint}
        </p>
      ) : null}
    </div>
  )
}
