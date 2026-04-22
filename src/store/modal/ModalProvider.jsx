import { useEffect, useMemo, useState } from 'react'
import { AppModal } from '../../components/organisms/Modal/AppModal/AppModal'
import { ModalContext } from './modalContext'

const DEFAULT_MODAL_STATE = {
  isOpen: false,
  title: '',
  subtitle: '',
  content: null,
  size: 'xl',
  showCloseButton: true,
  showHeader: true,
  panelClassName: '',
}

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState(DEFAULT_MODAL_STATE)

  useEffect(() => {
    if (!modalState.isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setModalState(DEFAULT_MODAL_STATE)
      }
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalState.isOpen])

  const value = useMemo(
    () => ({
      openModal({
        title,
        subtitle = '',
        content,
        size = 'xl',
        showCloseButton = true,
        showHeader = true,
        panelClassName = '',
      }) {
        setModalState({
          isOpen: true,
          title,
          subtitle,
          content,
          size,
          showCloseButton,
          showHeader,
          panelClassName,
        })
      },
      updateModal(nextState) {
        setModalState((currentState) => ({
          ...currentState,
          ...nextState,
        }))
      },
      closeModal() {
        setModalState(DEFAULT_MODAL_STATE)
      },
      modalState,
    }),
    [modalState],
  )

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AppModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        subtitle={modalState.subtitle}
        size={modalState.size}
        showCloseButton={modalState.showCloseButton}
        showHeader={modalState.showHeader}
        panelClassName={modalState.panelClassName}
        onClose={value.closeModal}
      >
        {modalState.content}
      </AppModal>
    </ModalContext.Provider>
  )
}
