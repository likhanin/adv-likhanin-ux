import { Icon } from '../../../atoms/Icon/Icon'
import { getAppCopy, useAppLocale } from '../../../../i18n/useAppLocale'
import './AppModal.css'

export function AppModal({
  isOpen,
  title,
  subtitle = '',
  children,
  onClose,
  size = 'xl',
  showCloseButton = true,
  showHeader = true,
  panelClassName = '',
}) {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)

  if (!isOpen) {
    return null
  }

  return (
    <div className="app-modal" aria-hidden={!isOpen}>
      <button
        className="app-modal__overlay"
        type="button"
        aria-label={appCopy.modal.overlayCloseLabel}
        onClick={onClose}
      />
      <section
        className={['app-modal__panel', `app-modal__panel--${size}`, panelClassName].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {showCloseButton ? (
          <button className="app-modal__close" type="button" aria-label={appCopy.common.close} onClick={onClose}>
            <Icon name="close" variant="plain" />
          </button>
        ) : null}

        {showHeader ? (
          <div className="app-modal__header">
            <h2 className="app-modal__title">{title}</h2>
            {subtitle ? <p className="app-modal__subtitle">{subtitle}</p> : null}
          </div>
        ) : null}

        <div className="app-modal__content">{children}</div>
      </section>
    </div>
  )
}
