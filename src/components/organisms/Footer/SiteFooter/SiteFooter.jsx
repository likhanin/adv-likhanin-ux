import './SiteFooter.css'

export function SiteFooter({
  links = [],
  legalText,
  featureTogglesLabel,
  socialLinks = [],
  linksAriaLabel,
  socialsAriaLabel,
  onFeatureTogglesClick,
}) {
  return (
    <footer className="site-footer">
      <nav className="site-footer__links" aria-label={linksAriaLabel}>
        {links.map((link) => (
          <a key={link.label} href={link.href ?? '/'}>
            {link.label}
          </a>
        ))}
        <button className="site-footer__feature-link" type="button" onClick={onFeatureTogglesClick}>
          {featureTogglesLabel}
        </button>
      </nav>

      <p className="site-footer__legal">{legalText}</p>

      <div className="site-footer__socials" aria-label={socialsAriaLabel}>
        {socialLinks.map((item) => (
          <a key={item.label} href={item.href ?? '/'} aria-label={item.label} className="site-footer__social-link">
            <span>{item.shortLabel}</span>
          </a>
        ))}
      </div>
    </footer>
  )
}
