import { RedesignContentShell } from '../../components/templates/RedesignContentShell/RedesignContentShell'
import { useAppLocale } from '../../i18n/useAppLocale'
import { useFeatureToggle } from '../../store/featureToggles/useFeatureToggles'
import { CabinetShell } from '../CabinetShell/CabinetShell'
import './CabinetStagePage.css'

export function CabinetStagePage() {
  const locale = useAppLocale()
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const pageTitle = locale === 'en' ? 'Summary' : 'Сводка'

  const content = isRedesignEnabled ? (
    <RedesignContentShell title={pageTitle} />
  ) : (
    <div className="cabinet-stage-page__title">
      <h1>{pageTitle}</h1>
    </div>
  )

  return <CabinetShell content={content} />
}
