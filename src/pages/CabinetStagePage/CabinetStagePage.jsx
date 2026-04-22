import { AdsList } from '../../components/organisms/Ads/AdsList/AdsList'
import { AdsTabs } from '../../components/organisms/Ads/AdsTabs/AdsTabs'
import { AdsToolbar } from '../../components/organisms/Ads/AdsToolbar/AdsToolbar'
import { FeaturePromoCard } from '../../components/organisms/Feature/FeaturePromoCard/FeaturePromoCard'
import { PromoBanner } from '../../components/organisms/Promo/PromoBanner/PromoBanner'
import { RedesignContentShell } from '../../components/templates/RedesignContentShell/RedesignContentShell'
import { useAppLocale } from '../../i18n/useAppLocale'
import { useFeatureToggle } from '../../store/featureToggles/useFeatureToggles'
import { getCabinetStageContent } from './constants'
import { CabinetShell } from '../CabinetShell/CabinetShell'
import './CabinetStagePage.css'

export function CabinetStagePage() {
  const locale = useAppLocale()
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const isFinanceNewContentV2Enabled = useFeatureToggle('financeNewContentV2')
  const {
    content: pageContentData,
  } = getCabinetStageContent(locale)
  const pageTitle = isFinanceNewContentV2Enabled
    ? locale === 'en' ? 'Summary' : 'Сводка'
    : pageContentData.pageTitle

  const content = isRedesignEnabled ? (
    <RedesignContentShell title={pageTitle} />
  ) : (
    isFinanceNewContentV2Enabled ? (
      <div className="cabinet-stage-page__title">
        <h1>{pageTitle}</h1>
      </div>
    ) : (
      <>
        <PromoBanner
          title={pageContentData.promoBanner.title}
          description={pageContentData.promoBanner.description}
          actionLabel={pageContentData.promoBanner.actionLabel}
        />

        <div className="cabinet-stage-page__title">
          <h1>{pageTitle}</h1>
        </div>

        <FeaturePromoCard
          icon={pageContentData.featurePromo.icon}
          title={pageContentData.featurePromo.title}
          description={pageContentData.featurePromo.description}
          badge={pageContentData.featurePromo.badge}
        />
        <AdsTabs tabs={pageContentData.tabs} />
        <AdsToolbar
          checkboxLabel={pageContentData.toolbar.checkboxLabel}
          sortLabel={pageContentData.toolbar.sortLabel}
        />
        <AdsList ads={pageContentData.ads} />
      </>
    )
  )

  return <CabinetShell content={content} />
}
