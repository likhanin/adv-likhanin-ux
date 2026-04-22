import { StatusLabel } from '../../../atoms/StatusLabel/StatusLabel'
import { Text } from '../../../atoms/Text/Text'
import { AdActions } from '../../../molecules/Ads/AdActions/AdActions'
import { AdMeta } from '../../../molecules/Ads/AdMeta/AdMeta'
import { AdPreview } from '../../../molecules/Ads/AdPreview/AdPreview'
import { AdStats } from '../../../molecules/Ads/AdStats/AdStats'
import './AdCard.css'

export function AdCard({ ad }) {
  const isWarningState =
    ad.stateTone === 'warning' || ad.state.startsWith('Отклонено') || ad.state.startsWith('Rejected')

  return (
    <article className="ad-card-organism">
      <AdPreview tone={ad.tone} />

      <div className="ad-card-organism__main">
        <h3>{ad.title}</h3>
        <AdMeta price={ad.price} meta={ad.meta} location={ad.location} />
      </div>

      <div className="ad-card-organism__side">
        <StatusLabel tone={isWarningState ? 'warning' : 'default'}>
          {ad.state}
        </StatusLabel>
        <Text className="ad-card-organism__chat" tone="soft">
          {ad.chats}
        </Text>
        <AdActions primaryLabel={ad.action} moreLabel={ad.moreLabel} />
        <AdStats views={ad.views} contacts={ad.contacts} favorites={ad.favorites} />
      </div>
    </article>
  )
}
