import aviLogo from '../../../../assets/avi-logo.png'
import { Icon } from '../../../atoms/Icon/Icon'
import { getAppCopy, useAppLocale } from '../../../../i18n/useAppLocale'
import { useDrawer } from '../../../../store/drawer/useDrawer'
import { useFeatureToggle } from '../../../../store/featureToggles/useFeatureToggles'
import { FloatingChatButton } from '../../FloatingChat/FloatingChatButton/FloatingChatButton'
import { KnowledgeBasePanel } from '../../KnowledgeBase/KnowledgeBasePanel/KnowledgeBasePanel'
import './FloatingSupportDock.css'

export function FloatingSupportDock({ chatLabel, chatCount }) {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const { openDrawer } = useDrawer()

  return (
    <div className="floating-support-dock">
      <button
        className="floating-support-dock__help"
        type="button"
        aria-label={appCopy.knowledgeBase.openLabel}
        onClick={() =>
          openDrawer({
            title: appCopy.drawer.knowledgeBaseTitle,
            titleKey: 'knowledgeBase',
            content: <KnowledgeBasePanel />,
          })
        }
      >
        {isRedesignEnabled ? (
          <img
            className="floating-support-dock__help-image"
            src={aviLogo}
            width="54"
            height="46"
            alt=""
            aria-hidden="true"
          />
        ) : (
          <span className="floating-support-dock__help-icon-shell" aria-hidden="true">
            <Icon name="question" variant="plain" className="floating-support-dock__help-icon" />
          </span>
        )}
      </button>

      {!isRedesignEnabled ? <FloatingChatButton label={chatLabel} count={chatCount} /> : null}
    </div>
  )
}
