import { Navigate, Route, Routes } from 'react-router-dom'
import { EmployeesPage } from './pages/EmployeesPage/EmployeesPage'
import { ClientsPage } from './pages/ClientsPage/ClientsPage'
import { FinancePage } from './pages/FinancePage/FinancePage'
import { CabinetStagePage } from './pages/CabinetStagePage/CabinetStagePage'
import { getCabinetRoutes } from './pages/CabinetStagePage/constants'
import { CabinetSectionPage } from './pages/CabinetSectionPage/CabinetSectionPage'
import { ShowcasePage } from './pages/ShowcasePage/ShowcasePage'
import { useAppLocale } from './i18n/useAppLocale'
import { useFeatureToggle } from './store/featureToggles/useFeatureToggles'

function App() {
  const locale = useAppLocale()
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const cabinetRoutes = getCabinetRoutes(locale)
  const defaultRoute = '/finance'

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={defaultRoute} replace />}
      />
      <Route
        path="/my-ads"
        element={
          isRedesignEnabled ? (
            <Navigate to="/overview" replace />
          ) : (
            <CabinetStagePage key={`cabinet-stage-${locale}`} />
          )
        }
      />
      <Route path="/finance" element={<FinancePage key={`finance-${locale}`} />} />
      <Route path="/clients" element={<ClientsPage key={`clients-${locale}`} />} />
      <Route path="/employees" element={<EmployeesPage key={`employees-${locale}`} />} />
      <Route path="/showcase" element={<ShowcasePage />} />
      {cabinetRoutes.map((route) => (
        route.path === '/employees' || route.path === '/clients' ? null : (
        <Route
          key={route.path}
          path={route.path}
          element={
            <CabinetSectionPage
              key={`${locale}-${route.path}`}
              path={route.path}
              title={route.title}
              description={route.description}
            />
          }
        />
        )
      ))}
      <Route path="*" element={<Navigate to={defaultRoute} replace />} />
    </Routes>
  )
}

export default App
