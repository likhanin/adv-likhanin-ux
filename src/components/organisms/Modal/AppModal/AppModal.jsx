import { Icon } from '../../../atoms/Icon/Icon'
import { getAppCopy, useAppLocale } from '../../../../i18n/useAppLocale'
import './AppModal.css'

function capitalizeTitle(value) {
  if (typeof value !== 'string' || !value) {
    return value
  }

  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function AppModal({
  isOpen,
  title,
  subtitle = '',
  children,
  onClose,
  size = 'xl',
  showCloseButton = true,
  showHeader = true,
  presentation = 'fixed',
}) {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)
  const normalizedTitle = capitalizeTitle(title)

  if (!isOpen) {
    return null
  }

  return (
    <div className={['app-modal', `app-modal--${presentation}`].filter(Boolean).join(' ')} aria-hidden={!isOpen}>
      <button
        className="app-modal__overlay"
        type="button"
        aria-label={appCopy.modal.overlayCloseLabel}
        onClick={onClose}
      />
      <section
        className={['app-modal__panel', `app-modal__panel--${size}`].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={normalizedTitle}
      >
        {showCloseButton ? (
          <button className="app-modal__close" type="button" aria-label={appCopy.common.close} onClick={onClose}>
            <Icon name="close" variant="plain" />
          </button>
        ) : null}

        {showHeader ? (
          <div className="app-modal__header">
            <h2 className="app-modal__title">{normalizedTitle}</h2>
            {subtitle ? <p className="app-modal__subtitle">{subtitle}</p> : null}
          </div>
        ) : null}

        <div className="app-modal__content">{children}</div>
      </section>
    </div>
  )
}
