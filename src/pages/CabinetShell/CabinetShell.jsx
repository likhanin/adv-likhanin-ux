import { FeatureTogglesPanel } from '../../components/organisms/FeatureToggles/FeatureTogglesPanel/FeatureTogglesPanel'
import { useDrawer } from '../../store/drawer/useDrawer'
import { SiteFooter } from '../../components/organisms/Footer/SiteFooter/SiteFooter'
import { Header } from '../../components/organisms/Header/Header'
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

const POSTPAY_LIMIT = 1500000
const ENABLED_SIDEBAR_HREFS = new Set(['/clients', '/finance'])

export function CabinetShell({ content, sidebarWallet = null, sidebarPostpayDebt = null }) {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const { walletAmount } = useFinanceSession()
  const { openDrawer } = useDrawer()
  const {
    header: headerContent,
    sidebar: sidebarContent,
    footer: footerContent,
    floatingChat,
  } = getCabinetStageContent(locale)
  const derivedSidebarNavigation = sidebarContent.navigation.map((item) =>
    item.href === '/my-ads'
      ? {
          ...item,
          label: locale === 'en' ? 'Summary' : 'Сводка',
          disabled: !ENABLED_SIDEBAR_HREFS.has(item.href),
        }
      : {
          ...item,
          disabled: !ENABLED_SIDEBAR_HREFS.has(item.href),
        },
  )
  const derivedSidebarWallet = {
    ...sidebarContent.wallet,
    amount: formatCurrencyValue(walletAmount),
  }
  const usedPostpayAmount = Math.min(Math.max(-walletAmount, 0), POSTPAY_LIMIT)
  const derivedSidebarPostpayDebt = {
    title: appCopy.finance.sidebarPostpayTitle,
    usageLabel: appCopy.finance.sidebarPostpayUsage(
      formatAmountValue(usedPostpayAmount),
      formatAmountValue(POSTPAY_LIMIT),
    ),
    dueLabel: appCopy.finance.sidebarDebtDescription,
    progress: POSTPAY_LIMIT > 0 ? (usedPostpayAmount / POSTPAY_LIMIT) * 100 : 0,
  }

  const header = (
    <Header
      variant={isRedesignEnabled ? 'redesign' : 'default'}
      topLinks={headerContent.topLinks}
      categoryLinks={headerContent.categoryLinks}
      primaryAction={headerContent.primaryAction}
      secondaryAction={headerContent.secondaryAction}
      actionIcons={headerContent.actionIcons}
      avatar={headerContent.avatar}
      topNavAriaLabel={appCopy.header.topNavAriaLabel}
      categoriesAriaLabel={appCopy.header.categoriesAriaLabel}
    />
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
      showcaseLabel={footerContent.showcaseLabel}
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
