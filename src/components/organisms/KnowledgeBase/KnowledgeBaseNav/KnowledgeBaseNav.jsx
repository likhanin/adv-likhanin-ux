import './KnowledgeBaseNav.css'

export function KnowledgeBaseNav({ knowledgeBase, selectedArticleId, onSelectArticle }) {
  return (
    <aside className="knowledge-base-panel__nav" aria-label={knowledgeBase.openLabel}>
      <button
        className={`knowledge-base-panel__nav-item${
          selectedArticleId === knowledgeBase.navIntroArticleId ? ' knowledge-base-panel__nav-item--active' : ''
        }`}
        type="button"
        onClick={() => onSelectArticle(knowledgeBase.navIntroArticleId)}
      >
        {knowledgeBase.navIntroLabel}
      </button>

      {knowledgeBase.navigation.map((group) => (
        <section className="knowledge-base-panel__nav-group" key={group.title}>
          <h3 className="knowledge-base-panel__nav-title">{group.title}</h3>
          <ul className="knowledge-base-panel__nav-list">
            {group.items.map((item) => (
              <li key={item.label}>
                <button
                  className={`knowledge-base-panel__nav-item${
                    item.articleId === selectedArticleId ? ' knowledge-base-panel__nav-item--active' : ''
                  }`}
                  type="button"
                  onClick={() => onSelectArticle(item.articleId)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </aside>
  )
}
