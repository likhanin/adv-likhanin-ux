import { Button } from '../../components/atoms/Button/Button'
import { Icon } from '../../components/atoms/Icon/Icon'
import { DesignSystemDataTable } from '../../components/organisms/Table/DesignSystemDataTable/DesignSystemDataTable'
import { RedesignContentShell } from '../../components/templates/RedesignContentShell/RedesignContentShell'
import { useAppLocale } from '../../i18n/useAppLocale'
import { useFeatureToggle } from '../../store/featureToggles/useFeatureToggles'
import { CabinetShell } from '../CabinetShell/CabinetShell'
import './EmployeesPage.css'

const EMPLOYEES_CONTENT = {
  ru: {
    title: 'Сотрудники',
    description: 'Здесь будет страница сотрудников кабинета.',
    inviteLabel: 'Пригласить сотрудников',
    activeEmployeesLabel: 'Активные сотрудники',
    activeEmployeesCount: '4',
    searchPlaceholder: 'Имя или ID',
    statusPlaceholder: 'Статус',
    columns: [
      { key: 'employee', label: 'Сотрудник ↑', width: '27%' },
      { key: 'avitoId', label: 'Avito ID', width: '21%' },
      { key: 'clients', label: 'Клиенты ↑↓', width: '10%', align: 'right' },
      { key: 'access', label: 'Права доступа', width: '23%' },
      { key: 'lastOnline', label: 'Был онлайн ↑↓', width: '19%' },
    ],
    rows: [
      {
        id: 'citripio',
        employee: 'Citripio',
        avitoId: '303 390 814',
        clients: '10',
        access: 'Полный доступ',
        lastOnline: '27 мар., в 14:35',
      },
      {
        id: 'bogdanova',
        employee: 'Богданова Евдокия Мак',
        avitoId: '110 128 31 04',
        clients: '1',
        access: 'Полный доступ',
        lastOnline: 'Больше месяца назад',
      },
      {
        id: 'evgenia',
        employee: 'Евгения',
        avitoId: '201 621 598',
        clients: '0',
        access: 'Просмотр',
        lastOnline: 'Больше месяца назад',
      },
      {
        id: 'radislav',
        employee: 'Радислав Георгиевич Я',
        avitoId: '110 127 26 65',
        clients: '0',
        access: 'Полный доступ',
        lastOnline: 'Больше месяца назад',
      },
    ],
  },
  en: {
    title: 'Employees',
    description: 'The employees page will appear here.',
    inviteLabel: 'Invite employees',
    activeEmployeesLabel: 'Active employees',
    activeEmployeesCount: '4',
    searchPlaceholder: 'Name or ID',
    statusPlaceholder: 'Status',
    columns: [
      { key: 'employee', label: 'Employee ↑', width: '27%' },
      { key: 'avitoId', label: 'Avito ID', width: '21%' },
      { key: 'clients', label: 'Clients ↑↓', width: '10%', align: 'right' },
      { key: 'access', label: 'Access rights', width: '23%' },
      { key: 'lastOnline', label: 'Last online ↑↓', width: '19%' },
    ],
    rows: [
      {
        id: 'citripio',
        employee: 'Citripio',
        avitoId: '303 390 814',
        clients: '10',
        access: 'Full access',
        lastOnline: 'Mar 27, 14:35',
      },
      {
        id: 'bogdanova',
        employee: 'Bogdanova Evdokiya Mak',
        avitoId: '110 128 31 04',
        clients: '1',
        access: 'Full access',
        lastOnline: 'More than a month ago',
      },
      {
        id: 'evgenia',
        employee: 'Evgeniya',
        avitoId: '201 621 598',
        clients: '0',
        access: 'View only',
        lastOnline: 'More than a month ago',
      },
      {
        id: 'radislav',
        employee: 'Radislav Georgievich Ya',
        avitoId: '110 127 26 65',
        clients: '0',
        access: 'Full access',
        lastOnline: 'More than a month ago',
      },
    ],
  },
}

export function EmployeesPage() {
  const locale = useAppLocale()
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const content = EMPLOYEES_CONTENT[locale] ?? EMPLOYEES_CONTENT.ru

  const redesignContent = (
    <RedesignContentShell
      title={content.title}
      titleAside={
        <Button type="button" size="m" preset="default" priority="primary">
          {content.inviteLabel}
        </Button>
      }
      panels={[
        <div className="employees-page__panel">
          <div className="employees-page__summary-card">
            <span className="employees-page__summary-label">{content.activeEmployeesLabel}</span>
            <strong className="employees-page__summary-value">{content.activeEmployeesCount}</strong>
          </div>

          <div className="employees-page__filters">
            <div className="employees-page__filter employees-page__filter--search">
              <Icon name="search" variant="plain" className="employees-page__filter-icon" />
              <span>{content.searchPlaceholder}</span>
            </div>
            <button type="button" className="employees-page__filter employees-page__filter--status">
              <span>{content.statusPlaceholder}</span>
              <Icon name="chevronDown" variant="plain" className="employees-page__filter-icon" />
            </button>
          </div>

          <DesignSystemDataTable
            className="employees-page__table"
            columns={content.columns}
            rows={content.rows}
            getRowKey={(row) => row.id}
          />
        </div>,
      ]}
    />
  )

  const legacyContent = (
    <>
      <div className="employees-page__legacy-title">
        <h1>{content.title}</h1>
      </div>

      <section className="employees-page__legacy-card">
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </section>
    </>
  )

  return <CabinetShell content={isRedesignEnabled ? redesignContent : legacyContent} />
}
