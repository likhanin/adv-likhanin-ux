import { useContext } from 'react'
import { FinanceSessionContext } from './financeSessionContext'

export function useFinanceSession() {
  const context = useContext(FinanceSessionContext)

  if (!context) {
    throw new Error('useFinanceSession must be used inside FinanceSessionProvider')
  }

  return context
}
