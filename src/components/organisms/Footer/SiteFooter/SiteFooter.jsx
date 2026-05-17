import { Link } from 'react-router-dom'
import './SiteFooter.css'

function preventFooterLinkAction(event) {
  event.preventDefault()
}

export function SiteFooter({
  links = [],
  legalText,
  featureTogglesLabel,
  showcaseLabel,
  socialLinks = [],
  linksAriaLabel,
  socialsAriaLabel,
  onFeatureTogglesClick,
}) {
  return (
    <footer className="site-footer">
      <nav className="site-footer__links" aria-label={linksAriaLabel}>
        {links.map((link) => (
          <a key={link.label} aria-disabled="true" onClick={preventFooterLinkAction}>
            {link.label}
          </a>
        ))}
        <button className="site-footer__feature-link" type="button" onClick={onFeatureTogglesClick}>
          {featureTogglesLabel}
        </button>
        {showcaseLabel ? (
          <Link className="site-footer__feature-link" to="/showcase">
            {showcaseLabel}
          </Link>
        ) : null}
      </nav>

      <p className="site-footer__legal">{legalText}</p>

      <div className="site-footer__socials" aria-label={socialsAriaLabel}>
        {socialLinks.map((item) => (
          <a
            key={item.label}
            aria-disabled="true"
            aria-label={item.label}
            className="site-footer__social-link"
            onClick={preventFooterLinkAction}
          >
            <span>{item.shortLabel}</span>
          </a>
        ))}
      </div>
    </footer>
  )
}
