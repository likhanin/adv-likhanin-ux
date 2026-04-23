import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_FEATURE_TOGGLES } from './defaultFeatureToggles'
import { FeatureTogglesContext } from './featureTogglesContext'

export function FeatureTogglesProvider({ children, initialToggles = {} }) {
  const [rawFeatureToggles, setRawFeatureToggles] = useState({
    ...DEFAULT_FEATURE_TOGGLES,
    ...initialToggles,
  })
  const featureToggles = useMemo(() => rawFeatureToggles, [rawFeatureToggles])

  useEffect(() => {
    const root = document.documentElement

    if (featureToggles.darkTheme) {
      root.dataset.theme = 'dark'
    } else {
      delete root.dataset.theme
    }

    root.lang = featureToggles.englishLocale ? 'en' : 'ru'
    root.dataset.redesign = featureToggles.redesignEnabled ? 'true' : 'false'
  }, [featureToggles.darkTheme, featureToggles.englishLocale, featureToggles.redesignEnabled])

  const value = useMemo(
    () => ({
      featureToggles,
      setFeatureToggle(name, value) {
        setRawFeatureToggles((current) => ({
          ...current,
          [name]: value,
        }))
      },
      toggleFeature(name) {
        setRawFeatureToggles((current) => ({
          ...current,
          [name]: !current[name],
        }))
      },
      resetFeatureToggles() {
        setRawFeatureToggles({
          ...DEFAULT_FEATURE_TOGGLES,
          ...initialToggles,
        })
      },
    }),
    [featureToggles, initialToggles],
  )

  return <FeatureTogglesContext.Provider value={value}>{children}</FeatureTogglesContext.Provider>
}
