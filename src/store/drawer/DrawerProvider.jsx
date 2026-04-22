import { useEffect, useMemo, useRef, useState } from 'react'
import { AppDrawer } from '../../components/organisms/Drawer/AppDrawer/AppDrawer'
import { DrawerContext } from './drawerContext'

const DRAWER_ANIMATION_DURATION_MS = 450

const DEFAULT_DRAWER_STATE = {
  isVisible: false,
  isOpen: false,
  title: '',
  titleKey: '',
  content: null,
}

export function DrawerProvider({ children }) {
  const [drawerState, setDrawerState] = useState(DEFAULT_DRAWER_STATE)
  const animationFrameRef = useRef(0)
  const closeTimeoutRef = useRef(0)

  useEffect(() => {
    if (!drawerState.isVisible) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDrawerState((currentState) => ({
          ...currentState,
          isOpen: false,
        }))
      }
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [drawerState.isVisible])

  useEffect(() => {
    if (drawerState.isOpen || !drawerState.isVisible) {
      return undefined
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setDrawerState((currentState) => {
        if (currentState.isOpen) {
          return currentState
        }

        return DEFAULT_DRAWER_STATE
      })
    }, DRAWER_ANIMATION_DURATION_MS)

    return () => {
      window.clearTimeout(closeTimeoutRef.current)
    }
  }, [drawerState.isOpen, drawerState.isVisible])

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(animationFrameRef.current)
      window.clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  const value = useMemo(
    () => ({
      openDrawer({ title, titleKey, content }) {
        window.cancelAnimationFrame(animationFrameRef.current)
        window.clearTimeout(closeTimeoutRef.current)

        setDrawerState({
          isVisible: true,
          isOpen: false,
          title,
          titleKey,
          content,
        })

        animationFrameRef.current = window.requestAnimationFrame(() => {
          setDrawerState((currentState) => ({
            ...currentState,
            isVisible: true,
            isOpen: true,
            title,
            titleKey,
            content,
          }))
        })
      },
      closeDrawer() {
        window.cancelAnimationFrame(animationFrameRef.current)
        window.clearTimeout(closeTimeoutRef.current)

        setDrawerState((currentState) => ({
          ...currentState,
          isOpen: false,
        }))
      },
      drawerState,
    }),
    [drawerState],
  )

  return (
    <DrawerContext.Provider value={value}>
      {children}
      <AppDrawer
        isVisible={drawerState.isVisible}
        isOpen={drawerState.isOpen}
        title={drawerState.title}
        titleKey={drawerState.titleKey}
        onClose={value.closeDrawer}
      >
        {drawerState.content}
      </AppDrawer>
    </DrawerContext.Provider>
  )
}
