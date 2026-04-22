import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_FEATURE_TOGGLES } from './defaultFeatureToggles'
import { FeatureTogglesContext } from './featureTogglesContext'

function resolveFeatureToggles(featureToggles) {
  return {
    ...featureToggles,
    financeNewContent:
      !featureToggles.financeNewContentV2 &&
      (featureToggles.redesignEnabled || featureToggles.financeNewContent),
  }
}

function applyExclusiveFinanceContent(name, value, current) {
  const next = {
    ...current,
    [name]: value,
  }

  if (name === 'financeNewContent' && value) {
    next.financeNewContentV2 = false
  }

  if (name === 'financeNewContentV2' && value) {
    next.financeNewContent = false
  }

  return next
}

export function FeatureTogglesProvider({ children, initialToggles = {} }) {
  const [rawFeatureToggles, setRawFeatureToggles] = useState({
    ...DEFAULT_FEATURE_TOGGLES,
    ...initialToggles,
  })
  const featureToggles = useMemo(
    () => resolveFeatureToggles(rawFeatureToggles),
    [rawFeatureToggles],
  )

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
        setRawFeatureToggles((current) => applyExclusiveFinanceContent(name, value, current))
      },
      toggleFeature(name) {
        setRawFeatureToggles((current) =>
          applyExclusiveFinanceContent(name, !current[name], current),
        )
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
