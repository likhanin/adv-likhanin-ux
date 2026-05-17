import { useMemo, useState } from 'react'
import { getCabinetStageContent } from '../../pages/CabinetStagePage/constants'
import { FinanceSessionContext } from './financeSessionContext'

function parseAmountValue(value) {
  return Number(String(value).replace(/[^\d]/g, '')) || 0
}

function createDefaultFinanceSession() {
  return {
    agencyBalance: 0,
    walletAmount: parseAmountValue(getCabinetStageContent('ru').finance.newContentV2.walletCard.amount),
  }
}

export function FinanceSessionProvider({ children }) {
  const initialSession = useMemo(() => createDefaultFinanceSession(), [])

  return (
    <FinanceSessionStateProvider initialSession={initialSession}>
      {children}
    </FinanceSessionStateProvider>
  )
}

function FinanceSessionStateProvider({ children, initialSession }) {
  const [financeSession, setFinanceSession] = useState(initialSession)

  const value = useMemo(
    () => ({
      ...financeSession,
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
