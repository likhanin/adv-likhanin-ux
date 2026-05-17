import aviLogo from '../../../../assets/avi-logo.png'
import { Icon } from '../../../atoms/Icon/Icon'
import { useFeatureToggle } from '../../../../store/featureToggles/useFeatureToggles'
import { FloatingChatButton } from '../../FloatingChat/FloatingChatButton/FloatingChatButton'
import './FloatingSupportDock.css'

export function FloatingSupportDock({ chatLabel, chatCount }) {
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const isKnowledgeBaseEnabled = useFeatureToggle('knowledgeBaseEnabled')

  return (
    <div className="floating-support-dock">
      {isKnowledgeBaseEnabled ? (
        <div
          className="floating-support-dock__help"
          aria-hidden="true"
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
        </div>
      ) : null}

      {!isRedesignEnabled ? <FloatingChatButton label={chatLabel} count={chatCount} /> : null}
    </div>
  )
}
