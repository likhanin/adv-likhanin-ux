import { Button } from '../../../atoms/Button/Button'
import { Icon } from '../../../atoms/Icon/Icon'
import { KnowledgeBasePreview } from '../../../molecules/KnowledgeBase/KnowledgeBasePreview/KnowledgeBasePreview'
import { KnowledgeBaseSection } from '../../../molecules/KnowledgeBase/KnowledgeBaseSection/KnowledgeBaseSection'
import './KnowledgeBaseArticle.css'

export function KnowledgeBaseArticle({ article, shareLabel, previewDisabledLabel }) {
  return (
    <article className="knowledge-base-panel__article">
      <div className="knowledge-base-panel__hero">
        {article.previewHidden ? null : (
          <KnowledgeBasePreview article={article} previewDisabledLabel={previewDisabledLabel} />
        )}

        <div className="knowledge-base-panel__article-head">
          <div>
            <h2 className="knowledge-base-panel__article-title">{article.title}</h2>
            {article.description ? (
              <p className="knowledge-base-panel__article-description">{article.description}</p>
            ) : null}
          </div>

          <Button type="button" size="s" priority="secondary" className="knowledge-base-panel__share">
            <Icon name="share" size="s" />
            <span>{shareLabel}</span>
          </Button>
        </div>
      </div>

      <div className="knowledge-base-panel__article-body">
        {article.sections.map((section, index) => (
          <KnowledgeBaseSection
            key={section.title ?? `${section.kind ?? 'section'}-${index}`}
            section={section}
          />
        ))}

        {article.note ? (
          <div className="knowledge-base-panel__note">
            <Icon name="warning" className="knowledge-base-panel__note-icon" />
            <p>{article.note}</p>
          </div>
        ) : null}
      </div>
    </article>
  )
}
