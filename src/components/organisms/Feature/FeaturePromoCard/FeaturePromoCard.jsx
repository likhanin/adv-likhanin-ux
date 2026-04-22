import { Badge } from '../../../atoms/Badge/Badge'
import { Text } from '../../../atoms/Text/Text'
import './FeaturePromoCard.css'

export function FeaturePromoCard({ icon, title, description, badge }) {
  return (
    <article className="feature-promo-card">
      <div className="feature-promo-card__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="feature-promo-card__body">
        <h3>{title}</h3>
        <Text tone="soft">{description}</Text>
      </div>
      <Badge className="feature-promo-card__badge">{badge}</Badge>
    </article>
  )
}
