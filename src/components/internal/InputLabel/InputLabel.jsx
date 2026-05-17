import './InputLabel.css'

export function InputLabel({
  htmlFor,
  children,
  required = false,
  optional = false,
  disabled = false,
}) {
  if (!children) {
    return null
  }

  return (
    <label className={['input-label', disabled && 'input-label--disabled'].filter(Boolean).join(' ')} htmlFor={htmlFor}>
      <span className="input-label__text">{children}</span>
      {required ? <span className="input-label__required" aria-hidden="true">*</span> : null}
      {optional && !required ? <span className="input-label__optional">Необязательно</span> : null}
    </label>
  )
}
