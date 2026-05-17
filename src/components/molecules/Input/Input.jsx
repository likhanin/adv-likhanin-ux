import { useId, useState } from 'react'
import { InputControl } from '../../internal/InputControl/InputControl'
import { InputLabel } from '../../internal/InputLabel/InputLabel'
import { InputMessage } from '../../internal/InputMessage/InputMessage'
import './Input.css'

const INPUT_SIZES = new Set(['s', 'm', 'l'])
const INPUT_ORIENTATIONS = new Set(['vertical', 'horizontal'])
const DEFAULT_INPUT_PLACEHOLDER = 'Введите значение'

function getState({ error, disabled, readOnly, currentValue }) {
  if (disabled) {
    return 'disabled'
  }

  if (error) {
    return 'error'
  }

  if (readOnly) {
    return 'readonly'
  }

  return String(currentValue ?? '').length > 0 ? 'filled' : 'default'
}

export function Input({
  id,
  name,
  value,
  defaultValue = '',
  type = 'text',
  size = 'm',
  label = '',
  hint = '',
  error = '',
  required = false,
  optional = false,
  placeholder = DEFAULT_INPUT_PLACEHOLDER,
  orientation = 'vertical',
  disabled = false,
  readOnly = false,
  clearable = false,
  leftIconName = '',
  rightIconName = '',
  prefix = '',
  postfix = '',
  className = '',
  onChange,
  onClear,
  ...props
}) {
  const generatedId = useId()
  const resolvedId = id ?? `input-${generatedId}`
  const messageId = `${resolvedId}-message`
  const isControlled = value !== undefined
  const [innerValue, setInnerValue] = useState(defaultValue)
  const currentValue = isControlled ? value : innerValue
  const normalizedSize = INPUT_SIZES.has(size) ? size : 'm'
  const normalizedOrientation = INPUT_ORIENTATIONS.has(orientation) ? orientation : 'vertical'
  const resolvedPlaceholder = postfix === '₽' ? '0' : placeholder
  const hasMessage = Boolean(error || hint)
  const state = getState({ error, disabled, readOnly, currentValue })

  const handleChange = (nextValue, event) => {
    if (!isControlled) {
      setInnerValue(nextValue)
    }

    onChange?.(nextValue, event)
  }

  const handleClear = () => {
    if (!isControlled) {
      setInnerValue('')
    }

    onClear?.()
    onChange?.('')
  }

  return (
    <div
      className={[
        'input',
        `input--size-${normalizedSize}`,
        `input--orientation-${normalizedOrientation}`,
        `input--state-${state}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="input__label-zone">
        <InputLabel
          htmlFor={resolvedId}
          required={required}
          optional={optional}
          disabled={disabled}
        >
          {label}
        </InputLabel>
      </div>

      <div className="input__control-zone">
        <InputControl
          {...props}
          id={resolvedId}
          name={name}
          value={currentValue}
          type={type}
          size={normalizedSize}
          state={state}
          placeholder={resolvedPlaceholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          clearable={clearable}
          leftIconName={leftIconName}
          rightIconName={rightIconName}
          prefix={prefix}
          postfix={postfix}
          ariaDescribedBy={hasMessage ? messageId : undefined}
          ariaInvalid={error ? 'true' : undefined}
          onChange={handleChange}
          onClear={handleClear}
        />
        <InputMessage id={messageId} hint={hint} error={error} disabled={disabled} />
      </div>
    </div>
  )
}
