import { Avatar } from '../../../atoms/Avatar/Avatar'
import { Icon } from '../../../atoms/Icon/Icon'
import { TopActionIcon } from '../../../molecules/Navigation/TopActionIcon/TopActionIcon'
import { useFeatureToggle } from '../../../../store/featureToggles/useFeatureToggles'
import './HeaderTopBar.css'

export function HeaderTopBar({
  links,
  primaryAction,
  secondaryAction,
  actionIcons = [],
  avatar = { variant: 'cluster' },
  ariaLabel,
}) {
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')

  if (isRedesignEnabled) {
    return null
  }

  return (
    <div className="header-top-bar">
      <nav className="header-top-bar__links" aria-label={ariaLabel}>
        {links.map((link) => (
          <a key={link.label} href="/" className="header-top-bar__link">
            <span>{link.label}</span>
            {link.caret ? <Icon name="chevronDown" className="header-top-bar__caret" /> : null}
          </a>
        ))}
      </nav>

      <div className="header-top-bar__actions">
        <a className="header-top-bar__action-link header-top-bar__post-link" href="/">
          <Icon name="plus" className="header-top-bar__action-icon" />
          {primaryAction}
        </a>
        <a className="header-top-bar__action-link" href="/">
          <Icon name="document" className="header-top-bar__action-icon" />
          {secondaryAction}
        </a>
        {actionIcons.map((item) => (
          <TopActionIcon key={`${item.icon}-${item.badge ?? 'plain'}`} icon={item.icon} badge={item.badge} />
        ))}
        <Avatar variant={avatar.variant} />
      </div>
    </div>
  )
}
