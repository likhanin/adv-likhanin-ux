import { createElement } from 'react'
import './Text.css'

export function Text({ as = 'p', tone = 'default', variant = 'm20', className = '', children }) {
  const classes = ['text', `text--${tone}`, `text--${String(variant).toLowerCase()}`, className]
    .filter(Boolean)
    .join(' ')

  return createElement(as, { className: classes }, children)
}
