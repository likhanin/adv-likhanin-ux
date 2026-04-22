import { ToggleSwitch } from '../../../atoms/ToggleSwitch/ToggleSwitch'
import { getAppCopy, useAppLocale } from '../../../../i18n/useAppLocale'
import { DEFAULT_FEATURE_TOGGLES } from '../../../../store/featureToggles/defaultFeatureToggles'
import { useFeatureToggles } from '../../../../store/featureToggles/useFeatureToggles'
import './FeatureTogglesPanel.css'

export function FeatureTogglesPanel() {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)
  const { featureToggles, setFeatureToggle, resetFeatureToggles } = useFeatureToggles()
  const toggleNames = Object.keys(DEFAULT_FEATURE_TOGGLES)

  return (
    <section className="feature-toggles-panel">
      <div className="feature-toggles-panel__header">
        <p>{appCopy.featureToggles.description}</p>
        <button type="button" onClick={resetFeatureToggles}>
          {appCopy.featureToggles.resetLabel}
        </button>
      </div>

      <div className="feature-toggles-panel__list">
        {toggleNames.map((name) => {
          const checked = Boolean(featureToggles[name])
          const isLockedByRedesign = name === 'financeNewContent' && featureToggles.redesignEnabled

          return (
            <div key={name} className="feature-toggles-panel__item">
              <div className="feature-toggles-panel__meta">
                <strong>{appCopy.featureToggles.labels[name] ?? name}</strong>
                <p>{appCopy.featureToggles.descriptions?.[name] ?? name}</p>
              </div>
              <div className="feature-toggles-panel__control">
                <span>{checked ? 'true' : 'false'}</span>
                <ToggleSwitch
                  checked={checked}
                  disabled={isLockedByRedesign}
                  label={`${appCopy.featureToggles.toggleLabel} ${name}`}
                  onChange={(value) => setFeatureToggle(name, value)}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
