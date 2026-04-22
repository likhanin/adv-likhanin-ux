import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { DrawerProvider } from './store/drawer/DrawerProvider'
import { ModalProvider } from './store/modal/ModalProvider'
import { FinanceSessionProvider } from './store/financeSession/FinanceSessionProvider'
import { FeatureTogglesProvider } from './store/featureToggles/FeatureTogglesProvider'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FeatureTogglesProvider>
      <FinanceSessionProvider>
        <ModalProvider>
          <DrawerProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </DrawerProvider>
        </ModalProvider>
      </FinanceSessionProvider>
    </FeatureTogglesProvider>
  </StrictMode>,
)
