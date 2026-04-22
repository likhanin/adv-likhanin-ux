import './AdPreview.css'

export function AdPreview({ tone }) {
  return (
    <div className={`ad-preview ad-preview--${tone}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}
