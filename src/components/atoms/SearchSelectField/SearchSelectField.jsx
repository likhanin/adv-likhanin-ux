import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Icon } from '../Icon/Icon'
import '../FormField/FormField.css'
import './SearchSelectField.css'

function getIconSize(size) {
  return size === 's' ? 's' : 'm'
}

export function SearchSelectField({
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
  hintVariant = 's10',
  error = '',
  placeholder = 'Начните вводить...',
  emptyLabel = 'Ничего не найдено',
  className = '',
  id,
}) {
  const generatedId = useId()
  const resolvedId = id ?? generatedId
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value) ?? null
  const fieldState = error ? 'error' : query ? 'filled' : 'default'
  const iconSize = getIconSize(size)
  const shouldShowHint = showHint || Boolean(error)

  useEffect(() => {
    if (!selectedOption) {
      return
    }

    setQuery(selectedOption.label)
  }, [selectedOption])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)

    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
    }
  }, [isOpen])

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return options
    }

    return options.filter((option) =>
      [option.label, option.description, option.searchText]
        .filter(Boolean)
        .some((part) => String(part).toLowerCase().includes(normalizedQuery)),
    )
  }, [options, query])

  return (
    <div
      ref={rootRef}
      className={[
        'field-control',
        'search-select-field',
        `field-control--size-${size}`,
        `field-control--${preset}`,
        `field-control--${fieldState}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showLabel ? (
        <label
          className={`text text--default text--${String(labelVariant).toLowerCase()} field-control__label`}
          htmlFor={resolvedId}
        >
          {label}
        </label>
      ) : null}

      <div className="field-control__shell">
        <input
          ref={inputRef}
          id={resolvedId}
          className="field-control__input"
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            const nextQuery = event.target.value
            setQuery(nextQuery)
            setIsOpen(true)

            if (value) {
              onChange?.('')
            }
          }}
        />

        {query ? (
          <button
            className="field-control__action"
            type="button"
            aria-label="Clear search field"
            onClick={() => {
              setQuery('')
              setIsOpen(true)
              onChange?.('')
              inputRef.current?.focus()
            }}
          >
            <Icon name="close" variant="plain" size={iconSize} />
          </button>
        ) : (
          <span className="field-control__trail" aria-hidden="true">
            <Icon name="chevronDown" variant="plain" size={iconSize} />
          </span>
        )}
      </div>

      {isOpen ? (
        <div className="search-select-field__panel" role="listbox" aria-label={label || placeholder}>
          {filteredOptions.length ? (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                className="search-select-field__option"
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault()
                }}
                onClick={() => {
                  setQuery(option.label)
                  setIsOpen(false)
                  onChange?.(option.value)
                }}
              >
                <span className="search-select-field__option-label">{option.label}</span>
                {option.description ? (
                  <span className="search-select-field__option-description">{option.description}</span>
                ) : null}
              </button>
            ))
          ) : (
            <div className="search-select-field__empty">{emptyLabel}</div>
          )}
        </div>
      ) : null}

      {shouldShowHint ? (
        <p className={`text text--default text--${String(hintVariant).toLowerCase()} field-control__hint`}>
          {error || hint}
        </p>
      ) : null}
    </div>
  )
}
