import { useEffect, useMemo, useRef, useState } from 'react'
import './Slider.css'

const SLIDER_VARIANTS = new Set(['default', 'overlay', 'inverse'])
const COMMIT_KEYS = new Set(['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp', 'Home', 'End'])

function getNumber(value, fallback) {
  const number = Number(value)

  return Number.isFinite(number) ? number : fallback
}

function getPrecision(value) {
  const [, fraction = ''] = String(value).split('.')

  return fraction.length
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function roundByStep(value, min, max, step) {
  const safeStep = step > 0 ? step : 1
  const precision = Math.max(getPrecision(safeStep), getPrecision(min))
  const steppedValue = Math.round((value - min) / safeStep) * safeStep + min
  const roundedValue = Number(steppedValue.toFixed(precision))

  return clamp(roundedValue, min, max)
}

function normalizeSliderValue(value, min, max, step) {
  return roundByStep(clamp(getNumber(value, min), min, max), min, max, step)
}

function getValuePercent(value, min, max) {
  if (max <= min) {
    return 0
  }

  return ((value - min) / (max - min)) * 100
}

export function Slider({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  variant = 'default',
  className = '',
  onChange,
  onChangeEnd,
  onCommit,
  ...props
}) {
  const normalizedMin = getNumber(min, 0)
  const normalizedMax = Math.max(getNumber(max, 100), normalizedMin)
  const normalizedStep = Math.max(getNumber(step, 1), 0.000001)
  const isControlled = value !== undefined
  const initialValue = useMemo(
    () => normalizeSliderValue(defaultValue ?? normalizedMin, normalizedMin, normalizedMax, normalizedStep),
    [defaultValue, normalizedMin, normalizedMax, normalizedStep],
  )
  const [innerValue, setInnerValue] = useState(initialValue)
  const [isDragging, setIsDragging] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const currentValue = normalizeSliderValue(
    isControlled ? value : innerValue,
    normalizedMin,
    normalizedMax,
    normalizedStep,
  )
  const currentValueRef = useRef(currentValue)
  const isDraggingRef = useRef(false)
  const normalizedVariant = SLIDER_VARIANTS.has(variant) ? variant : 'default'
  const valuePercent = getValuePercent(currentValue, normalizedMin, normalizedMax)

  useEffect(() => {
    currentValueRef.current = currentValue
  }, [currentValue])

  useEffect(() => {
    if (!isDragging) {
      return undefined
    }

    const handlePointerEnd = () => {
      if (!isDraggingRef.current) {
        return
      }

      isDraggingRef.current = false
      setIsDragging(false)
      onChangeEnd?.(currentValueRef.current)
      onCommit?.(currentValueRef.current)
    }

    window.addEventListener('pointerup', handlePointerEnd)
    window.addEventListener('pointercancel', handlePointerEnd)

    return () => {
      window.removeEventListener('pointerup', handlePointerEnd)
      window.removeEventListener('pointercancel', handlePointerEnd)
    }
  }, [isDragging, onChangeEnd, onCommit])

  const handleChange = (event) => {
    const nextValue = normalizeSliderValue(
      event.target.value,
      normalizedMin,
      normalizedMax,
      normalizedStep,
    )

    currentValueRef.current = nextValue

    if (!isControlled) {
      setInnerValue(nextValue)
    }

    onChange?.(nextValue, event)
  }

  const handlePointerDown = () => {
    if (!disabled) {
      isDraggingRef.current = true
      setIsDragging(true)
    }
  }

  const handlePointerEnd = () => {
    if (!isDraggingRef.current) {
      return
    }

    isDraggingRef.current = false
    setIsDragging(false)
    onChangeEnd?.(currentValueRef.current)
    onCommit?.(currentValueRef.current)
  }

  const handleKeyUp = (event) => {
    if (COMMIT_KEYS.has(event.key)) {
      onChangeEnd?.(currentValueRef.current)
      onCommit?.(currentValueRef.current)
    }
  }

  const classes = [
    'slider',
    `slider--variant-${normalizedVariant}`,
    isDragging && 'slider--dragging',
    isFocused && 'slider--focused',
    disabled && 'slider--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      style={{ '--slider-value-percent': `${valuePercent}%` }}
    >
      <div className="slider__track" aria-hidden="true">
        <span className="slider__filled" />
      </div>
      <span className="slider__thumb" aria-hidden="true" />
      <input
        {...props}
        aria-valuemax={normalizedMax}
        aria-valuemin={normalizedMin}
        aria-valuenow={currentValue}
        className="slider__native"
        disabled={disabled}
        max={normalizedMax}
        min={normalizedMin}
        step={normalizedStep}
        type="range"
        value={currentValue}
        onBlur={(event) => {
          setIsFocused(false)
          props.onBlur?.(event)
        }}
        onChange={handleChange}
        onFocus={(event) => {
          setIsFocused(true)
          props.onFocus?.(event)
        }}
        onKeyUp={(event) => {
          handleKeyUp(event)
          props.onKeyUp?.(event)
        }}
        onPointerDown={(event) => {
          handlePointerDown()
          props.onPointerDown?.(event)
        }}
        onPointerUp={(event) => {
          handlePointerEnd()
          props.onPointerUp?.(event)
        }}
      />
    </div>
  )
}
