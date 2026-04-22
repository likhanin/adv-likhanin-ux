import { Button } from '../../../atoms/Button/Button'
import './KnowledgeBaseSection.css'

export function KnowledgeBaseSection({ section }) {
  const intro = Array.isArray(section.intro) ? section.intro : section.intro ? [section.intro] : []
  const outro = Array.isArray(section.outro) ? section.outro : section.outro ? [section.outro] : []

  return (
    <section className="knowledge-base-panel__section">
      {section.title ? <h4 className="knowledge-base-panel__section-title">{section.title}</h4> : null}

      {intro.length ? (
        <div className="knowledge-base-panel__paragraphs">
          {intro.map((paragraph) => (
            <p className="knowledge-base-panel__paragraph" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {section.kind === 'bullet-list' ? (
        <ul className="knowledge-base-panel__bullet-list">
          {section.items.map((item) => (
            <li key={item}>
              <span className="knowledge-base-panel__list-marker" aria-hidden="true">
                —
              </span>
              <span className="knowledge-base-panel__list-text">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.kind === 'step-list' ? (
        <ol className="knowledge-base-panel__step-list">
          {section.items.map((item, index) => (
            <li key={item}>
              <span className="knowledge-base-panel__list-marker" aria-hidden="true">
                {index + 1}.
              </span>
              <span className="knowledge-base-panel__list-text">{item}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {section.kind === 'paragraphs' ? (
        <div className="knowledge-base-panel__paragraphs">
          {section.items.map((paragraph) => (
            <p className="knowledge-base-panel__paragraph" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {section.kind === 'definition-list' ? (
        <div className="knowledge-base-panel__permissions">
          {section.items.map((item) => (
            <div className="knowledge-base-panel__permission" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ) : null}

      {outro.length ? (
        <div className="knowledge-base-panel__paragraphs">
          {outro.map((paragraph) => (
            <p className="knowledge-base-panel__paragraph" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {section.actionLabel ? (
        <Button type="button" size="m" priority="secondary" className="knowledge-base-panel__cta">
          {section.actionLabel}
        </Button>
      ) : null}
    </section>
  )
}
