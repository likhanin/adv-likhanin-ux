import { StatItem } from '../../../atoms/StatItem/StatItem'
import './AdStats.css'

export function AdStats({ views, contacts = 0, favorites }) {
  return (
    <div className="ad-stats">
      <StatItem>◉ {views}</StatItem>
      <StatItem>◦ {contacts}</StatItem>
      <StatItem>♡ {favorites}</StatItem>
    </div>
  )
}
