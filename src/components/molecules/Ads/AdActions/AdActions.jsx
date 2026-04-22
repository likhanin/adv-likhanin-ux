import { Button } from '../../../atoms/Button/Button'
import { getAppCopy, useAppLocale } from '../../../../i18n/useAppLocale'
import './AdActions.css'

export function AdActions({ primaryLabel, moreLabel }) {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)

  return (
    <div className="ad-actions">
      <Button variant="card" size="m" preset="default" priority="secondary" type="button">
        {primaryLabel}
      </Button>
      <Button
        variant="icon"
        className="icon-button"
        size="m"
        preset="default"
        priority="secondary"
        type="button"
        aria-label={moreLabel ?? appCopy.ads.moreLabel}
      >
        •••
      </Button>
    </div>
  )
}
