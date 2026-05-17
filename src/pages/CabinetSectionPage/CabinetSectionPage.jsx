import { RedesignContentShell } from '../../components/templates/RedesignContentShell/RedesignContentShell'
import { CabinetShell } from '../CabinetShell/CabinetShell'
import { useFeatureToggle } from '../../store/featureToggles/useFeatureToggles'
import './CabinetSectionPage.css'

export function CabinetSectionPage({ title, description }) {
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const content = isRedesignEnabled ? (
    <RedesignContentShell
      title={title}
      panels={[
        {
          content: <p>{description}</p>,
        },
      ]}
    />
  ) : (
    <>
      <div className="cabinet-section-page__title">
        <h1>{title}</h1>
      </div>

      <section className="cabinet-section-page__card">
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
    </>
  )

  return <CabinetShell content={content} />
}
