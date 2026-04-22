import { useContext } from 'react'
import { DrawerContext } from './drawerContext'

export function useDrawer() {
  const context = useContext(DrawerContext)

  if (!context) {
    throw new Error('useDrawer must be used inside DrawerProvider')
  }

  return context
}
