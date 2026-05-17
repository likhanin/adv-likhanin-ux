import profileAvatar from '../../../assets/perfagency-avatar.svg'
import { getAppCopy, useAppLocale } from '../../../i18n/useAppLocale'
import './Avatar.css'

export function Avatar({ variant = 'single', className = '', src = profileAvatar, alt }) {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)
  const classes = ['avatar', `avatar--${variant}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      <img className="avatar__image" src={src} alt={alt ?? appCopy.avatar.alt} />
    </span>
  )
}
