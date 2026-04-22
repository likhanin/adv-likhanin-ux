import './RedesignContentShell.css'

export function RedesignContentShell({ title, titleAside = null, panels = [null] }) {
  return (
    <div className="redesign-content-shell">
      <div className="redesign-content-shell__title">
        <h1>{title}</h1>
        {titleAside ? <div className="redesign-content-shell__title-aside">{titleAside}</div> : null}
      </div>

      <div className="redesign-content-shell__panels">
        {panels.map((panel, index) => {
          const panelConfig =
            panel && typeof panel === 'object' && 'content' in panel
              ? panel
              : { content: panel, className: '' }

          return (
            <section
              key={`panel-${index}`}
              className={['redesign-content-shell__panel', panelConfig.className].filter(Boolean).join(' ')}
            >
              {panelConfig.content}
            </section>
          )
        })}
      </div>
    </div>
  )
}
