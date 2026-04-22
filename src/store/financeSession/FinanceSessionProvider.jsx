import { useMemo, useState } from 'react'
import { getCabinetStageContent } from '../../pages/CabinetStagePage/constants'
import { useFeatureToggle } from '../featureToggles/useFeatureToggles'
import { FinanceSessionContext } from './financeSessionContext'

function parseAmountValue(value) {
  return Number(String(value).replace(/[^\d]/g, '')) || 0
}

function createDefaultFinanceSession({ isFinanceNewContentV2Enabled }) {
  return {
    agencyBalance: parseAmountValue(getCabinetStageContent('ru').finance.newContent.agencyCard.amount),
    walletAmount: isFinanceNewContentV2Enabled
      ? parseAmountValue(getCabinetStageContent('ru').finance.newContentV2.walletCard.amount)
      : parseAmountValue(getCabinetStageContent('ru').finance.newContent.walletCard.amount),
    postpayReceivedAmount: 0,
  }
}

export function FinanceSessionProvider({ children }) {
  const isFinanceNewContentEnabled = useFeatureToggle('financeNewContent')
  const isFinanceNewContentV2Enabled = useFeatureToggle('financeNewContentV2')
  const initialSession = useMemo(
    () => createDefaultFinanceSession({ isFinanceNewContentV2Enabled }),
    [isFinanceNewContentV2Enabled],
  )

  return (
    <FinanceSessionStateProvider
      key={
        isFinanceNewContentV2Enabled
          ? 'finance-v2-on'
          : isFinanceNewContentEnabled
            ? 'finance-on'
            : 'finance-off'
      }
      initialSession={initialSession}
    >
      {children}
    </FinanceSessionStateProvider>
  )
}

function FinanceSessionStateProvider({ children, initialSession }) {
  const [financeSession, setFinanceSession] = useState(initialSession)

  const value = useMemo(
    () => ({
      ...financeSession,
      requestPostpay(amount) {
        setFinanceSession((currentSession) => ({
          ...currentSession,
          walletAmount: currentSession.walletAmount + amount,
          postpayReceivedAmount: currentSession.postpayReceivedAmount + amount,
        }))
      },
      returnPostpay() {
        setFinanceSession((currentSession) => ({
          ...currentSession,
          walletAmount: currentSession.walletAmount - currentSession.postpayReceivedAmount,
          postpayReceivedAmount: 0,
        }))
      },
      transferFunds(amount) {
        setFinanceSession((currentSession) => ({
          ...currentSession,
          agencyBalance: Math.max(currentSession.agencyBalance - amount, 0),
        }))
      },
      payFromWallet(amount) {
        setFinanceSession((currentSession) => ({
          ...currentSession,
          walletAmount: Math.max(currentSession.walletAmount - amount, -1500000),
        }))
      },
      creditWallet(amount) {
        setFinanceSession((currentSession) => ({
          ...currentSession,
          walletAmount: currentSession.walletAmount + amount,
        }))
      },
      resetFinanceSession() {
        setFinanceSession(initialSession)
      },
    }),
    [financeSession, initialSession],
  )

  return <FinanceSessionContext.Provider value={value}>{children}</FinanceSessionContext.Provider>
}
