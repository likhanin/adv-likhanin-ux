import './AdsTabs.css'

export function AdsTabs({ tabs }) {
  return (
    <div className="ads-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`ads-tabs__tab${tab.active ? ' ads-tabs__tab--active' : ''}`}
          type="button"
        >
          {tab.label} <span>{tab.count}</span>
        </button>
      ))}
    </div>
  )
}
