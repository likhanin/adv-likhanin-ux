import { useRef } from 'react'
import { Icon } from '../../atoms/Icon/Icon'
import './InputControl.css'

function getIconSize(size) {
  return size === 's' ? 's' : 'm'
}

export function InputControl({
  id,
  name,
  value,
  defaultValue,
  type = 'text',
  size = 'm',
  state = 'default',
  placeholder = 'Введите значение',
  disabled = false,
  readOnly = false,
  required = false,
  clearable = false,
  leftIconName = '',
  rightIconName = '',
  prefix = '',
  postfix = '',
  ariaDescribedBy,
  ariaInvalid,
  onChange,
  onClear,
  style,
  ...props
}) {
  const inputRef = useRef(null)
  const isFilled = value !== undefined ? String(value).length > 0 : String(defaultValue ?? '').length > 0
  const inputWidthSource = isFilled ? (value ?? defaultValue) : placeholder
  const inputWidth = `${Math.max(String(inputWidthSource ?? '').length, 1)}ch`
  const shouldShowClear = clearable && isFilled && !disabled && !readOnly
  const iconSize = getIconSize(size)
  const classes = [
    'input-control',
    `input-control--size-${size}`,
    `input-control--state-${state}`,
    shouldShowClear && 'input-control--clearable',
    prefix && 'input-control--has-prefix',
    postfix && 'input-control--has-postfix',
    disabled && 'input-control--disabled',
    readOnly && 'input-control--readonly',
  ]
    .filter(Boolean)
    .join(' ')
  const handleControlMouseDown = (event) => {
    if (disabled || event.target.closest('button')) {
      return
    }

    if (event.target !== inputRef.current) {
      event.preventDefault()
      inputRef.current?.focus()
    }
  }

  return (
    <div className={classes} onMouseDown={handleControlMouseDown}>
      {leftIconName ? (
        <span className="input-control__slot input-control__slot--left" aria-hidden="true">
          <Icon name={leftIconName} variant="plain" size={iconSize} />
        </span>
      ) : null}

      {prefix ? <span className="input-control__affix input-control__affix--prefix">{prefix}</span> : null}

      <input
        {...props}
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        className="input-control__input"
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-required={required || undefined}
        aria-describedby={ariaDescribedBy || undefined}
        aria-invalid={ariaInvalid || undefined}
        style={{
          ...style,
          '--input-control-input-width': inputWidth,
        }}
        onChange={(event) => onChange?.(event.target.value, event)}
      />

      {postfix ? <span className="input-control__affix input-control__affix--postfix">{postfix}</span> : null}

      {shouldShowClear ? (
        <button
          className="input-control__action"
          type="button"
          aria-label="Очистить поле"
          onClick={() => onClear?.()}
        >
          <Icon name="close" variant="plain" size={iconSize} />
        </button>
      ) : rightIconName ? (
        <span className="input-control__slot input-control__slot--right" aria-hidden="true">
          <Icon name={rightIconName} variant="plain" size={iconSize} />
        </span>
      ) : null}
    </div>
  )
}
