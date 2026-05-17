import './InputMessage.css'

export function InputMessage({ id, hint = '', error = '', disabled = false }) {
  const message = error || hint

  if (!message) {
    return null
  }

  return (
    <p
      id={id}
      className={[
        'input-message',
        error && 'input-message--error',
        disabled && 'input-message--disabled',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {message}
    </p>
  )
}
