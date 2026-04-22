import { useState } from 'react'
import { Button } from '../../components/atoms/Button/Button'
import { Icon } from '../../components/atoms/Icon/Icon'
import { InputField } from '../../components/atoms/InputField/InputField'
import { SelectField } from '../../components/atoms/SelectField/SelectField'
import { Text } from '../../components/atoms/Text/Text'
import { ClientFundsReturnModal } from '../../components/organisms/Clients/ClientFundsReturnModal/ClientFundsReturnModal'
import { AppDataTable } from '../../components/organisms/Table/AppDataTable/AppDataTable'
import { TransferFundsModal } from '../../components/organisms/Finance/TransferFundsModal/TransferFundsModal'
import { RedesignContentShell } from '../../components/templates/RedesignContentShell/RedesignContentShell'
import { useAppLocale } from '../../i18n/useAppLocale'
import { useModal } from '../../store/modal/useModal'
import { useFinanceSession } from '../../store/financeSession/useFinanceSession'
import { useFeatureToggle } from '../../store/featureToggles/useFeatureToggles'
import { CabinetShell } from '../CabinetShell/CabinetShell'
import './ClientsPage.css'

const CLIENTS_CONTENT = {
  ru: {
    title: 'Клиенты',
    checkClientLabel: 'Проверить клиента',
    inviteClientLabel: 'Пригласить клиента',
    searchPlaceholder: 'Название или ID',
    dateOptions: [
      { value: 'august-2025', label: '01.08.2025 – 30.08.2025' },
      { value: 'july-2025', label: '01.07.2025 – 31.07.2025' },
    ],
    modelOptions: [
      { value: 'all', label: 'Модель' },
      { value: 'advertising', label: 'Рекламная' },
      { value: 'transactional', label: 'Транзакционная' },
    ],
    employeeOptions: [
      { value: 'all', label: 'Сотрудники' },
      { value: 'maria', label: 'Мария Смирнова' },
      { value: 'ivan', label: 'Иван Петров' },
    ],
    tabs: [
      { key: 'clients', label: 'Все клиенты' },
      { key: 'invites', label: 'Приглашения' },
    ],
    columns: [
      { key: 'client', label: 'Название и ID клиента', width: '200px' },
      { key: 'actions', label: 'Операции', width: '238px' },
      { key: 'employees', label: 'Сотрудник', width: '17%' },
      { key: 'ads', label: 'Объявления', width: '9%' },
      { key: 'access', label: 'Права доступа', width: '11%' },
      { key: 'model', label: 'Модель рекламы и ID', width: '17%' },
      { key: 'category', label: 'Категория', width: '8%' },
    ],
    rows: [
      {
        id: 'north-light',
        clientName: 'ООО «Северное сияние»',
        clientId: 'ID 223 456 789',
        employees: ['Мария Смирнова'],
        ads: '24',
        access: 'Просмотр',
        clientBalance: 120000,
        modelName: 'Рекламная',
        modelId: 'ID 874 321 001',
        category: 'Услуги',
      },
      {
        id: 'alpha-development',
        clientName: 'Альфа Девелопмент...',
        clientId: 'ID 223 456 789',
        employees: ['Мария Смирнова', 'Ещё 1'],
        ads: '24',
        access: 'Просмотр',
        clientBalance: 86000,
        modelName: 'Рекламная',
        modelId: 'ID 874 321 001',
        category: 'Услуги',
      },
      {
        id: 'beta-tester-pro',
        clientName: 'Бета-тестер-про',
        clientId: 'ID 223 456 789',
        employees: ['Иван Петров'],
        ads: '6',
        access: 'Полный доступ',
        clientBalance: 45000,
        modelName: 'Транзакционная',
        modelId: '',
        category: 'Товары',
      },
      {
        id: 'alpha-two',
        clientName: 'Альфа 2...',
        clientId: 'ID 223 456 789',
        employees: ['Иван Петров'],
        ads: '6',
        access: 'Полный доступ',
        clientBalance: 24000,
        modelName: 'Транзакционная',
        modelId: '',
        category: 'Товары',
      },
      {
        id: 'beta-two',
        clientName: 'Бета2',
        clientId: 'ID 223 456 789',
        employees: ['Мария Смирнова', 'Иван Петров'],
        ads: '6',
        access: 'Полный доступ',
        clientBalance: 93000,
        modelName: 'Транзакционная',
        modelId: '',
        category: 'Товары',
      },
    ],
    inviteRows: [
      {
        id: 'invite-north',
        clientName: 'ООО «Северное сияние»',
        clientId: 'ID 223 456 789',
        employees: ['Мария Смирнова'],
        ads: '—',
        access: 'Ожидает',
        clientBalance: 0,
        modelName: 'Рекламная',
        modelId: 'ID 874 321 001',
        category: 'Приглашение',
      },
    ],
  },
  en: {
    title: 'Clients',
    checkClientLabel: 'Check client',
    inviteClientLabel: 'Invite client',
    searchPlaceholder: 'Name or ID',
    dateOptions: [
      { value: 'august-2025', label: '08/01/2025 – 08/30/2025' },
      { value: 'july-2025', label: '07/01/2025 – 07/31/2025' },
    ],
    modelOptions: [
      { value: 'all', label: 'Model' },
      { value: 'advertising', label: 'Advertising' },
      { value: 'transactional', label: 'Transactional' },
    ],
    employeeOptions: [
      { value: 'all', label: 'Employees' },
      { value: 'maria', label: 'Maria Smirnova' },
      { value: 'ivan', label: 'Ivan Petrov' },
    ],
    tabs: [
      { key: 'clients', label: 'All clients' },
      { key: 'invites', label: 'Invitations' },
    ],
    columns: [
      { key: 'client', label: 'Client name and ID', width: '200px' },
      { key: 'actions', label: 'Actions', width: '238px' },
      { key: 'employees', label: 'Employee', width: '17%' },
      { key: 'ads', label: 'Ads', width: '9%' },
      { key: 'access', label: 'Access rights', width: '11%' },
      { key: 'model', label: 'Ad model and ID', width: '17%' },
      { key: 'category', label: 'Category', width: '8%' },
    ],
    rows: [
      {
        id: 'north-light',
        clientName: 'North Light LLC',
        clientId: 'ID 223 456 789',
        employees: ['Maria Smirnova'],
        ads: '24',
        access: 'View only',
        clientBalance: 120000,
        modelName: 'Advertising',
        modelId: 'ID 874 321 001',
        category: 'Services',
      },
      {
        id: 'alpha-development',
        clientName: 'Alpha Development...',
        clientId: 'ID 223 456 789',
        employees: ['Maria Smirnova', 'Plus 1'],
        ads: '24',
        access: 'View only',
        clientBalance: 86000,
        modelName: 'Advertising',
        modelId: 'ID 874 321 001',
        category: 'Services',
      },
      {
        id: 'beta-tester-pro',
        clientName: 'Beta Tester Pro',
        clientId: 'ID 223 456 789',
        employees: ['Ivan Petrov'],
        ads: '6',
        access: 'Full access',
        clientBalance: 45000,
        modelName: 'Transactional',
        modelId: '',
        category: 'Goods',
      },
      {
        id: 'alpha-two',
        clientName: 'Alpha 2...',
        clientId: 'ID 223 456 789',
        employees: ['Ivan Petrov'],
        ads: '6',
        access: 'Full access',
        clientBalance: 24000,
        modelName: 'Transactional',
        modelId: '',
        category: 'Goods',
      },
      {
        id: 'beta-two',
        clientName: 'Beta2',
        clientId: 'ID 223 456 789',
        employees: ['Maria Smirnova', 'Ivan Petrov'],
        ads: '6',
        access: 'Full access',
        clientBalance: 93000,
        modelName: 'Transactional',
        modelId: '',
        category: 'Goods',
      },
    ],
    inviteRows: [
      {
        id: 'invite-north',
        clientName: 'North Light LLC',
        clientId: 'ID 223 456 789',
        employees: ['Maria Smirnova'],
        ads: '—',
        access: 'Pending',
        clientBalance: 0,
        modelName: 'Advertising',
        modelId: 'ID 874 321 001',
        category: 'Invitation',
      },
    ],
  },
}

function createClientCell(row) {
  return (
    <div className="clients-page__client">
      <Text as="strong" variant="s20" className="clients-page__client-name">
        {row.clientName}
      </Text>
      <Text as="span" variant="s20" tone="soft" className="clients-page__client-id">
        {row.clientId}
      </Text>
    </div>
  )
}

function createActionCell(locale, onTopUp, onReturn) {
  const topUpLabel = locale === 'en' ? 'Top up' : 'Пополнить'
  const returnLabel = locale === 'en' ? 'Return' : 'Вернуть'

  return (
    <div className="clients-page__actions">
      <Button
        type="button"
        size="s"
        preset="default"
        priority="secondary"
        className="clients-page__action-button"
        onClick={onTopUp}
      >
        <Icon name="arrowUp" variant="plain" className="clients-page__action-icon" />
        {topUpLabel}
      </Button>
      <Button
        type="button"
        size="s"
        preset="default"
        priority="secondary"
        className="clients-page__action-button"
        onClick={onReturn}
      >
        <Icon name="undo" variant="plain" className="clients-page__action-icon" />
        {returnLabel}
      </Button>
    </div>
  )
}

function createEmployeesCell(row) {
  return (
    <div className="clients-page__employees">
      {row.employees.map((employee) => (
        <Text
          key={`${row.id}-${employee}`}
          as="span"
          variant="s20"
          tone={employee.startsWith('Ещё') || employee.startsWith('Plus') ? 'soft' : 'default'}
          className={[
            'clients-page__employee',
            employee.startsWith('Ещё') || employee.startsWith('Plus') ? 'clients-page__employee--link' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {employee}
        </Text>
      ))}
    </div>
  )
}

function createModelCell(row) {
  return (
    <div className="clients-page__model">
      <Text as="span" variant="s20" className="clients-page__model-name">
        {row.modelName}
      </Text>
      {row.modelId ? (
        <Text as="span" variant="s20" tone="soft" className="clients-page__model-id">
          {row.modelId}
        </Text>
      ) : null}
    </div>
  )
}

function mapRows(locale, rows, clientBalances, onTopUp, onReturn) {
  return rows.map((row) => ({
    id: row.id,
    client: createClientCell(row),
    actions: createActionCell(locale, () => onTopUp(row), () => onReturn(row)),
    employees: createEmployeesCell(row),
    ads: row.ads,
    access: row.access,
    model: createModelCell(row),
    category: row.category,
    clientBalance: clientBalances[row.id] ?? row.clientBalance ?? 0,
  }))
}

export function ClientsPage() {
  const locale = useAppLocale()
  const { openModal } = useModal()
  const { walletAmount, payFromWallet, creditWallet } = useFinanceSession()
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const content = CLIENTS_CONTENT[locale] ?? CLIENTS_CONTENT.ru
  const initialBalanceState = Object.fromEntries(
    [...content.rows, ...content.inviteRows].map((row) => [row.id, row.clientBalance ?? 0]),
  )
  const [searchValue, setSearchValue] = useState('')
  const [selectedDate, setSelectedDate] = useState(content.dateOptions[0]?.value ?? '')
  const [selectedModel, setSelectedModel] = useState(content.modelOptions[0]?.value ?? '')
  const [selectedEmployee, setSelectedEmployee] = useState(content.employeeOptions[0]?.value ?? '')
  const [activeTab, setActiveTab] = useState(content.tabs[0]?.key ?? 'clients')
  const [clientBalances, setClientBalances] = useState(initialBalanceState)

  const handleOpenTopUpModal = (row) => {
    openModal({
      title: locale === 'en' ? 'Transfer funds' : 'Перевести средства',
      subtitle:
        locale === 'en' ? `You are transferring to ${row.clientName}` : `Вы переводите ${row.clientName}`,
      content: (
        <TransferFundsModal
          minAmount={5000}
          maxAmount={Math.max(walletAmount + 1500000, 5000)}
          showAccountSelect={false}
          successLabel={locale === 'en' ? 'successfully paid' : 'успешно оплачены'}
          onSubmit={(amount) => {
            payFromWallet(amount)
            setClientBalances((currentBalances) => ({
              ...currentBalances,
              [row.id]: (currentBalances[row.id] ?? row.clientBalance ?? 0) + amount,
            }))
          }}
        />
      ),
      size: 's',
    })
  }

  const handleOpenReturnModal = (row) => {
    const availableAmount = clientBalances[row.id] ?? row.clientBalance ?? 0

    openModal({
      title: locale === 'en' ? 'Return funds' : 'Вернуть средства',
      content: (
        <ClientFundsReturnModal
          clientName={row.clientName}
          availableAmount={availableAmount}
          onSubmit={(amount) => {
            creditWallet(amount)
            setClientBalances((currentBalances) => ({
              ...currentBalances,
              [row.id]: Math.max((currentBalances[row.id] ?? row.clientBalance ?? 0) - amount, 0),
            }))
          }}
        />
      ),
      size: 's',
    })
  }

  const tableRows = mapRows(
    locale,
    activeTab === 'invites' ? content.inviteRows : content.rows,
    clientBalances,
    handleOpenTopUpModal,
    handleOpenReturnModal,
  )

  const titleAside = (
    <div className="clients-page__title-actions">
      <Button type="button" size="s" preset="default" priority="secondary" className="clients-page__title-button">
        {content.checkClientLabel}
      </Button>
      <Button type="button" size="s" preset="default" priority="primary" className="clients-page__title-button">
        {content.inviteClientLabel}
      </Button>
    </div>
  )

  const panelContent = (
    <div className="clients-page">
      <div className="clients-page__filters">
        <InputField
          value={searchValue}
          onChange={setSearchValue}
          onClear={() => setSearchValue('')}
          size="s"
          showLabel={false}
          showHint={false}
          showPostfix={false}
          leftIconName="search"
          placeholder={content.searchPlaceholder}
          className="clients-page__filter clients-page__filter--search"
        />
        <SelectField
          value={selectedDate}
          onChange={setSelectedDate}
          options={content.dateOptions}
          size="s"
          showLabel={false}
          showHint={false}
          leftIconName="calendar"
          className="clients-page__filter clients-page__filter--date"
        />
        <SelectField
          value={selectedModel}
          onChange={setSelectedModel}
          options={content.modelOptions}
          size="s"
          showLabel={false}
          showHint={false}
          className="clients-page__filter clients-page__filter--model"
        />
        <SelectField
          value={selectedEmployee}
          onChange={setSelectedEmployee}
          options={content.employeeOptions}
          size="s"
          showLabel={false}
          showHint={false}
          className="clients-page__filter clients-page__filter--employee"
        />
      </div>

      <div className="clients-page__toolbar">
        <div className="clients-page__tabs" role="tablist" aria-label={content.title}>
          {content.tabs.map((tab) => (
            <Button
              key={tab.key}
              type="button"
              size="s"
              preset="default"
              priority="secondary"
              className={`clients-page__tab${activeTab === tab.key ? ' clients-page__tab--active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <Button
          type="button"
          variant="icon"
          size="s"
          preset="default"
          priority="secondary"
          className="clients-page__settings-button"
          aria-label={locale === 'en' ? 'Table settings' : 'Настройки таблицы'}
        >
          <Icon name="settings" variant="plain" className="clients-page__settings-icon" />
        </Button>
      </div>

      <div className="clients-page__table-wrap">
        <AppDataTable
          className="clients-page__table"
          columns={content.columns}
          rows={tableRows}
          getRowKey={(row) => row.id}
        />
      </div>
    </div>
  )

  const redesignContent = (
    <RedesignContentShell
      title={content.title}
      titleAside={titleAside}
      panels={[
        {
          className: 'clients-page__panel-shell',
          content: panelContent,
        },
      ]}
    />
  )

  const legacyContent = (
    <div className="clients-page__legacy-layout">
      <div className="clients-page__legacy-title">
        <h1>{content.title}</h1>
        {titleAside}
      </div>
      {panelContent}
    </div>
  )

  return <CabinetShell content={isRedesignEnabled ? redesignContent : legacyContent} />
}
