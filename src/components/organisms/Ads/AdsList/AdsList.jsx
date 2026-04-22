import { AdCard } from '../AdCard/AdCard'
import './AdsList.css'

export function AdsList({ ads }) {
  return (
    <div className="ads-list-organism">
      {ads.map((ad) => (
        <AdCard key={ad.title} ad={ad} />
      ))}
    </div>
  )
}
