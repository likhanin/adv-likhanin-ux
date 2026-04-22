import { useState } from 'react'
import { getAppCopy, useAppLocale } from '../../../../i18n/useAppLocale'
import { KnowledgeBaseArticle } from '../KnowledgeBaseArticle/KnowledgeBaseArticle'
import { KnowledgeBaseNav } from '../KnowledgeBaseNav/KnowledgeBaseNav'
import './KnowledgeBasePanel.css'

function getFirstArticleId(navigation) {
  return navigation.flatMap((group) => group.items).find((item) => item.articleId)?.articleId ?? null
}

export function KnowledgeBasePanel() {
  const locale = useAppLocale()
  const knowledgeBase = getAppCopy(locale).knowledgeBase
  const firstArticleId = getFirstArticleId(knowledgeBase.navigation)
  const [selectedArticleId, setSelectedArticleId] = useState(
    () => knowledgeBase.defaultArticleId ?? firstArticleId,
  )
  const fallbackArticleId = knowledgeBase.defaultArticleId ?? firstArticleId

  const currentArticle =
    knowledgeBase.articles[selectedArticleId] ??
    knowledgeBase.articles[fallbackArticleId]

  return (
    <section className="knowledge-base-panel">
      <div className="knowledge-base-panel__layout">
        <KnowledgeBaseNav
          knowledgeBase={knowledgeBase}
          selectedArticleId={selectedArticleId}
          onSelectArticle={setSelectedArticleId}
        />
        <KnowledgeBaseArticle
          article={currentArticle}
          shareLabel={knowledgeBase.shareLabel}
          previewDisabledLabel={knowledgeBase.previewDisabledLabel}
        />
      </div>
    </section>
  )
}
