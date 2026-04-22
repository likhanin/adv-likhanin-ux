import shareIcon from '../../../../assets/icons/share-s.svg'
import warningIcon from '../../../../assets/icons/Warning-m.svg'
import { Button } from '../../../atoms/Button/Button'
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
            <img src={shareIcon} alt="" aria-hidden="true" />
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
            <img className="knowledge-base-panel__note-icon" src={warningIcon} alt="" aria-hidden="true" />
            <p>{article.note}</p>
          </div>
        ) : null}
      </div>
    </article>
  )
}
