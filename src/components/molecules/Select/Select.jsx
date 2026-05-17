import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '../../atoms/Icon/Icon'
import { InputLabel } from '../../internal/InputLabel/InputLabel'
import { InputMessage } from '../../internal/InputMessage/InputMessage'
import './Select.css'

const SELECT_SIZES = new Set(['s', 'm', 'l'])
const SELECT_ORIENTATIONS = new Set(['vertical', 'horizontal'])
const DEFAULT_PLACEHOLDER = 'Выберите значение'

function getState({ error, disabled, selectedOption }) {
  if (disabled) {
    return 'disabled'
  }

  if (error) {
    return 'error'
  }

  return selectedOption ? 'filled' : 'default'
}

function getEnabledOptionIndex(options, startIndex = 0, direction = 1) {
  if (!options.length) {
    return -1
  }

  for (let step = 0; step < options.length; step += 1) {
    const nextIndex = (startIndex + step * direction + options.length) % options.length

    if (!options[nextIndex]?.disabled) {
      return nextIndex
    }
  }

  return -1
}

function getSelectedOption(options, value) {
  return options.find((option) => option.value === value) ?? null
}

export function Select({
  options = [],
  value,
  defaultValue = '',
  placeholder = DEFAULT_PLACEHOLDER,
  disabled = false,
  open,
  defaultOpen = false,
  onChange,
  onOpenChange,
  label = '',
  hint = '',
  error = '',
  className = '',
  id,
  name,
  size = 'm',
  orientation = 'vertical',
  leftIconName = '',
}) {
  const generatedId = useId()
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)
  const resolvedId = id ?? `select-${generatedId}`
  const listboxId = `${resolvedId}-listbox`
  const messageId = `${resolvedId}-message`
  const isValueControlled = value !== undefined
  const isOpenControlled = open !== undefined
  const [innerValue, setInnerValue] = useState(defaultValue)
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const [dropdownPosition, setDropdownPosition] = useState(null)
  const currentValue = isValueControlled ? value : innerValue
  const isOpen = isOpenControlled ? open : innerOpen
  const selectedOption = getSelectedOption(options, currentValue)
  const selectedIndex = selectedOption ? options.findIndex((option) => option.value === selectedOption.value) : -1
  const [activeIndex, setActiveIndex] = useState(() => getEnabledOptionIndex(options, Math.max(selectedIndex, 0)))
  const normalizedSize = SELECT_SIZES.has(size) ? size : 'm'
  const normalizedOrientation = SELECT_ORIENTATIONS.has(orientation) ? orientation : 'vertical'
  const state = getState({ error, disabled, selectedOption })
  const hasMessage = Boolean(error || hint)
  const activeOption = activeIndex >= 0 ? options[activeIndex] : null
  const activeOptionId = isOpen && activeOption ? `${resolvedId}-option-${activeIndex}` : undefined

  const setOpenState = (nextOpen) => {
    if (disabled) {
      return
    }

    if (!nextOpen) {
      setDropdownPosition(null)
    }

    if (!isOpenControlled) {
      setInnerOpen(nextOpen)
    }

    onOpenChange?.(nextOpen)
  }

  const openSelect = () => {
    const nextActiveIndex = selectedIndex >= 0
      ? selectedIndex
      : getEnabledOptionIndex(options, 0)

    setActiveIndex(nextActiveIndex)
    setOpenState(true)
  }

  const closeSelect = () => {
    setOpenState(false)
  }

  const selectOption = (option) => {
    if (!option || option.disabled) {
      return
    }

    if (!isValueControlled) {
      setInnerValue(option.value)
    }

    onChange?.(option.value, option)
    closeSelect()
  }

  const moveActiveOption = (direction) => {
    const startIndex = activeIndex >= 0 ? activeIndex + direction : 0
    const nextIndex = getEnabledOptionIndex(options, startIndex, direction)

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (
        !rootRef.current?.contains(event.target) &&
        !dropdownRef.current?.contains(event.target)
      ) {
        if (!isOpenControlled) {
          setInnerOpen(false)
        }

        onOpenChange?.(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen, isOpenControlled, onOpenChange])

  useEffect(() => {
    if (!isOpen) {
      const frameId = window.requestAnimationFrame(() => {
        setDropdownPosition(null)
      })

      return () => {
        window.cancelAnimationFrame(frameId)
      }
    }

    const updatePosition = () => {
      const triggerElement = triggerRef.current

      if (!triggerElement || typeof window === 'undefined') {
        return
      }

      const triggerRect = triggerElement.getBoundingClientRect()
      const dropdownViewportGap = 16
      const dropdownOffset = 6
      const preferredMaxHeight = 248
      const minHeight = 96
      const spaceBelow = window.innerHeight - triggerRect.bottom - dropdownViewportGap - dropdownOffset
      const spaceAbove = triggerRect.top - dropdownViewportGap - dropdownOffset
      const shouldOpenAbove = spaceBelow < minHeight && spaceAbove > spaceBelow
      const availableHeight = shouldOpenAbove ? spaceAbove : spaceBelow
      const maxHeight = Math.min(preferredMaxHeight, Math.max(minHeight, availableHeight))
      const top = shouldOpenAbove
        ? Math.max(dropdownViewportGap, triggerRect.top - dropdownOffset - maxHeight)
        : triggerRect.bottom + dropdownOffset

      setDropdownPosition({
        left: triggerRect.left,
        maxHeight,
        top,
        width: triggerRect.width,
      })
    }

    const frameId = window.requestAnimationFrame(updatePosition)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen])

  const classes = [
    'select',
    `select--size-${normalizedSize}`,
    `select--orientation-${normalizedOrientation}`,
    `select--state-${state}`,
    isOpen && 'select--open',
    disabled && 'select--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const dropdownStyle = dropdownPosition
    ? {
        left: `${dropdownPosition.left}px`,
        top: `${dropdownPosition.top}px`,
        width: `${dropdownPosition.width}px`,
        maxHeight: `${dropdownPosition.maxHeight}px`,
      }
    : undefined
  const dropdown = isOpen && dropdownPosition ? (
    <div
      ref={dropdownRef}
      id={listboxId}
      className="select__dropdown"
      role="listbox"
      aria-labelledby={resolvedId}
      style={dropdownStyle}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          closeSelect()
        }
      }}
    >
      {options.map((option, index) => {
        const isSelected = option.value === selectedOption?.value
        const isActive = index === activeIndex

        return (
          <button
            key={option.value}
            id={`${resolvedId}-option-${index}`}
            className={[
              'select__option',
              isSelected && 'select__option--selected',
              isActive && 'select__option--active',
            ]
              .filter(Boolean)
              .join(' ')}
            type="button"
            role="option"
            disabled={option.disabled}
            aria-disabled={option.disabled || undefined}
            aria-selected={isSelected}
            onClick={() => selectOption(option)}
            onMouseEnter={() => {
              if (!option.disabled) {
                setActiveIndex(index)
              }
            }}
          >
            <span className="select__option-label">{option.label}</span>
            {option.description ? (
              <span className="select__option-description">{option.description}</span>
            ) : null}
          </button>
        )
      })}
    </div>
  ) : null

  return (
    <div ref={rootRef} className={classes}>
      <div className="select__label-zone">
        <InputLabel htmlFor={resolvedId} disabled={disabled}>
          {label}
        </InputLabel>
      </div>

      <div className="select__control-zone">
        <div className="select__anchor">
          <button
            ref={triggerRef}
            id={resolvedId}
            className="select__trigger"
            type="button"
            disabled={disabled}
            aria-controls={isOpen ? listboxId : undefined}
            aria-describedby={hasMessage ? messageId : undefined}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-invalid={error ? 'true' : undefined}
            aria-activedescendant={activeOptionId}
            onClick={() => {
              if (isOpen) {
                closeSelect()
                return
              }

              openSelect()
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                if (isOpen) {
                  event.preventDefault()
                  closeSelect()
                }

                return
              }

              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault()

                if (!isOpen) {
                  openSelect()
                  return
                }

                moveActiveOption(event.key === 'ArrowDown' ? 1 : -1)
                return
              }

              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()

                if (!isOpen) {
                  openSelect()
                  return
                }

                selectOption(activeOption)
              }
            }}
          >
            {leftIconName ? (
              <span className="select__lead-icon" aria-hidden="true">
                <Icon name={leftIconName} variant="plain" size={normalizedSize === 's' ? 's' : 'm'} />
              </span>
            ) : null}
            <span className={selectedOption ? 'select__value' : 'select__placeholder'}>
              {selectedOption?.label ?? placeholder}
            </span>
            <span className="select__icon" aria-hidden="true">
              <Icon name="chevronDown" variant="plain" size="m" />
            </span>
          </button>
          {dropdown && typeof document !== 'undefined' ? createPortal(dropdown, document.body) : null}
        </div>

        {name ? <input type="hidden" name={name} value={currentValue ?? ''} /> : null}
        <InputMessage id={messageId} hint={hint} error={error} disabled={disabled} />
      </div>
    </div>
  )
}
