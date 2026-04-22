import './CabinetLayout.css'

export function CabinetLayout({ header, sidebar, content, footer, floating }) {
  return (
    <div className="cabinet-layout">
      {header ? <header className="cabinet-layout__header">{header}</header> : null}

      <main className="cabinet-layout__main">
        <aside className="cabinet-layout__sidebar">{sidebar}</aside>
        <section className="cabinet-layout__content">{content}</section>
      </main>

      {footer ? <div className="cabinet-layout__footer">{footer}</div> : null}

      {floating}
    </div>
  )
}
