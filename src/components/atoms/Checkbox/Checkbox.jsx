import './Checkbox.css'

export function Checkbox({ label, className = '', ...props }) {
  const classes = ['checkbox', className].filter(Boolean).join(' ')

  return (
    <label className={classes}>
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  )
}
