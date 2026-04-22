import { getAppCopy, useAppLocale } from '../../../../i18n/useAppLocale'
import './AppDrawer.css'

export function AppDrawer({ isVisible, isOpen, title, titleKey, children, onClose }) {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)
  const resolvedTitle = titleKey ? (appCopy.drawer.titles?.[titleKey] ?? title) : title

  if (!isVisible) {
    return null
  }

  return (
    <div className={`app-drawer${isOpen ? ' app-drawer--open' : ''}`} aria-hidden={!isOpen}>
      <button
        className="app-drawer__overlay"
        type="button"
        aria-label={appCopy.drawer.overlayCloseLabel}
        onClick={onClose}
      />
      <button className="app-drawer__close" type="button" aria-label={appCopy.common.close} onClick={onClose}>
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16.0001 17.8857L25.724 27.6096L27.6096 25.724L17.8857 16.0001L27.6096 6.27624L25.724 4.39062L16.0001 14.1145L6.27624 4.39062L4.39062 6.27624L14.1145 16.0001L4.39062 25.724L6.27624 27.6096L16.0001 17.8857Z" />
        </svg>
      </button>
      <section className="app-drawer__panel" role="dialog" aria-modal="true" aria-label={resolvedTitle}>
        <div className="app-drawer__content">
          <div className="app-drawer__header">
            <h2 className="app-drawer__title">{resolvedTitle}</h2>
          </div>

          <div className="app-drawer__body">{children}</div>
        </div>
      </section>
    </div>
  )
}
