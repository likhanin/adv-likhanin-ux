import { FeatureTogglesPanel } from '../../components/organisms/FeatureToggles/FeatureTogglesPanel/FeatureTogglesPanel'
import { useDrawer } from '../../store/drawer/useDrawer'
import { SiteFooter } from '../../components/organisms/Footer/SiteFooter/SiteFooter'
import { HeaderMainNav } from '../../components/organisms/Header/HeaderMainNav/HeaderMainNav'
import { HeaderTopBar } from '../../components/organisms/Header/HeaderTopBar/HeaderTopBar'
import { FloatingSupportDock } from '../../components/organisms/FloatingSupport/FloatingSupportDock/FloatingSupportDock'
import { ProfileSidebar } from '../../components/organisms/Sidebar/ProfileSidebar/ProfileSidebar'
import { RedesignSidebar } from '../../components/organisms/Sidebar/RedesignSidebar/RedesignSidebar'
import { SidebarNavigation } from '../../components/organisms/Sidebar/SidebarNavigation/SidebarNavigation'
import { CabinetLayout } from '../../components/templates/CabinetLayout/CabinetLayout'
import { getAppCopy, useAppLocale } from '../../i18n/useAppLocale'
import { useFinanceSession } from '../../store/financeSession/useFinanceSession'
import { useFeatureToggle } from '../../store/featureToggles/useFeatureToggles'
import { getCabinetStageContent } from '../CabinetStagePage/constants'

function formatAmountValue(value) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/\u00A0/g, ' ')
}

function formatCurrencyValue(value) {
  return `${formatAmountValue(value)} ₽`
}

export function CabinetShell({ content, sidebarWallet = null, sidebarPostpayDebt = null }) {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)
  const isFinanceNewContentEnabled = useFeatureToggle('financeNewContent')
  const isFinanceNewContentV2Enabled = useFeatureToggle('financeNewContentV2')
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const { walletAmount, postpayReceivedAmount, returnPostpay } = useFinanceSession()
  const { openDrawer } = useDrawer()
  const {
    header: headerContent,
    sidebar: sidebarContent,
    footer: footerContent,
    floatingChat,
  } = getCabinetStageContent(locale)
  const derivedSidebarNavigation = isFinanceNewContentV2Enabled
    ? sidebarContent.navigation.map((item) =>
        item.href === '/my-ads'
          ? {
              ...item,
              label: locale === 'en' ? 'Summary' : 'Сводка',
            }
          : item,
      )
    : sidebarContent.navigation
  const derivedSidebarWallet =
    isFinanceNewContentEnabled || isFinanceNewContentV2Enabled
      ? {
          ...sidebarContent.wallet,
          amount: formatCurrencyValue(walletAmount),
        }
      : sidebarContent.wallet
  const derivedSidebarPostpayDebt =
    isFinanceNewContentV2Enabled && walletAmount < 0
      ? {
          title: appCopy.finance.sidebarDebtTitle(formatCurrencyValue(Math.abs(walletAmount))),
          description: appCopy.finance.sidebarDebtDescription,
          actionLabel: appCopy.finance.sidebarDebtAction,
          onAction: () => {},
        }
      : isFinanceNewContentEnabled && postpayReceivedAmount > 0
      ? {
          title: appCopy.finance.sidebarDebtTitle(formatCurrencyValue(postpayReceivedAmount)),
          description: appCopy.finance.sidebarDebtDescription,
          actionLabel: appCopy.finance.sidebarDebtAction,
          onAction: returnPostpay,
        }
      : null

  const header = isRedesignEnabled ? null : (
    <>
      <HeaderTopBar
        links={headerContent.topLinks}
        primaryAction={headerContent.primaryAction}
        secondaryAction={headerContent.secondaryAction}
        actionIcons={headerContent.actionIcons}
        avatar={headerContent.avatar}
        ariaLabel={appCopy.header.topNavAriaLabel}
      />
      <HeaderMainNav links={headerContent.categoryLinks} ariaLabel={appCopy.header.categoriesAriaLabel} />
    </>
  )

  const sidebar = (
    isRedesignEnabled ? (
      <RedesignSidebar
        key={`redesign-sidebar-${locale}`}
        walletAmount={(sidebarWallet ?? derivedSidebarWallet).amount}
        userName={appCopy.sidebar.redesign.userName}
      />
    ) : (
      <>
        <ProfileSidebar
          profile={sidebarContent.profile}
          wallet={sidebarWallet ?? derivedSidebarWallet}
          postpayDebt={sidebarPostpayDebt ?? derivedSidebarPostpayDebt}
        />
        <SidebarNavigation items={derivedSidebarNavigation} ariaLabel={appCopy.sidebar.navAriaLabel} />
      </>
    )
  )

  const footer = (
    <SiteFooter
      links={footerContent.links}
      legalText={footerContent.legalText}
      featureTogglesLabel={footerContent.featureTogglesLabel}
      socialLinks={footerContent.socialLinks}
      linksAriaLabel={appCopy.footer.linksAriaLabel}
      socialsAriaLabel={appCopy.footer.socialsAriaLabel}
      onFeatureTogglesClick={() =>
        openDrawer({
          title: appCopy.drawer.featureTogglesTitle,
          titleKey: 'featureToggles',
          content: <FeatureTogglesPanel />,
        })
      }
    />
  )

  return (
    <CabinetLayout
      header={header}
      sidebar={sidebar}
      content={content}
      footer={footer}
      floating={<FloatingSupportDock chatLabel={floatingChat.label} chatCount={floatingChat.count} />}
    />
  )
}
