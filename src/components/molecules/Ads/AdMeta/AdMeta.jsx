import { Text } from '../../../atoms/Text/Text'
import './AdMeta.css'

export function AdMeta({ price, meta, location }) {
  return (
    <div className="ad-meta-block">
      <Text className="ad-meta-block__price" tone="strong">
        {price}
      </Text>
      <Text className="ad-meta-block__meta" tone="soft">
        {meta}
      </Text>
      <Text className="ad-meta-block__location" tone="soft">
        {location}
      </Text>
    </div>
  )
}
