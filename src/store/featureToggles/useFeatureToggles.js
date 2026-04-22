import { useContext } from 'react'
import { FeatureTogglesContext } from './featureTogglesContext'

export function useFeatureToggles() {
  const context = useContext(FeatureTogglesContext)

  if (!context) {
    throw new Error('useFeatureToggles must be used inside FeatureTogglesProvider')
  }

  return context
}

export function useFeatureToggle(name) {
  const { featureToggles } = useFeatureToggles()

  return Boolean(featureToggles[name])
}
