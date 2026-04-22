import { Icon } from '../../../atoms/Icon/Icon'
import { Logo } from '../../../atoms/Logo/Logo'
import { useFeatureToggle } from '../../../../store/featureToggles/useFeatureToggles'
import './HeaderMainNav.css'

export function HeaderMainNav({ links, ariaLabel }) {
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')

  return (
    <div className="header-main-nav">
      <Logo />
      {!isRedesignEnabled ? (
        <nav className="header-main-nav__links" aria-label={ariaLabel}>
          {links.map((link) => (
            <a key={link.label} href="/" className="header-main-nav__link">
              <span>{link.label}</span>
              {link.caret ? <Icon name="chevronDown" className="header-main-nav__caret" /> : null}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  )
}
