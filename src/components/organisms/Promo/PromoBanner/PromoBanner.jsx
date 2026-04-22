import { Button } from '../../../atoms/Button/Button'
import { Text } from '../../../atoms/Text/Text'
import { PromoVisual } from '../../../molecules/Promo/PromoVisual/PromoVisual'
import './PromoBanner.css'

export function PromoBanner({ title, description, actionLabel }) {
  return (
    <div className="promo-banner-organism">
      <PromoVisual />
      <div className="promo-banner-organism__copy">
        <strong>{title}</strong>
        <Text tone="soft">{description}</Text>
      </div>
      <Button type="button" size="m" preset="overlay" priority="primary">
        {actionLabel}
      </Button>
    </div>
  )
}
