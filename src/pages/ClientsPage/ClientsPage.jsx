import { useState } from 'react'
import { Button } from '../../components/atoms/Button/Button'
import { Icon } from '../../components/atoms/Icon/Icon'
import { Text } from '../../components/atoms/Text/Text'
import { Input } from '../../components/molecules/Input/Input'
import { Select } from '../../components/molecules/Select/Select'
import { ClientFundsReturnModal } from '../../components/organisms/Clients/ClientFundsReturnModal/ClientFundsReturnModal'
import { DesignSystemDataTable } from '../../components/organisms/Table/DesignSystemDataTable/DesignSystemDataTable'
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
      { key: 'client', label: 'Название и ID клиента', width: '208px' },
      { key: 'wallet', label: 'Кошелёк', width: '110px', align: 'right' },
      { key: 'actions', label: 'Операции', width: '238px' },
      { key: 'employees', label: 'Сотрудник', width: '160px' },
      { key: 'ads', label: 'Объявления', width: '110px', align: 'right' },
      { key: 'access', label: 'Права доступа', width: '150px' },
      { key: 'model', label: 'Модель рекламы и ID', width: '180px' },
      { key: 'subscription', label: 'Подписка', width: '120px' },
      { key: 'category', label: 'Категория', width: '130px' },
      { key: 'advance', label: 'Аванс', width: '110px', align: 'right' },
      { key: 'expenses', label: 'Расходы', width: '120px', align: 'right' },
      { key: 'views', label: 'Просмотры', width: '110px', align: 'right' },
      { key: 'contacts', label: 'Контакты', width: '110px', align: 'right' },
      { key: 'conversion', label: 'Конверсия', width: '110px', align: 'right' },
    ],
    inviteColumns: [
      { key: 'client', label: 'Название и ID клиента', width: '22%' },
      { key: 'inviteId', label: 'ID приглашения', width: '26%' },
      { key: 'model', label: 'Модель рекламы', width: '26%' },
      { key: 'createdAt', label: 'Время создания', width: '26%' },
    ],
    rows: [
      {
        id: 'north-light',
        clientName: 'ООО «Северное сияние»',
        clientId: 'ID 433 770 690',
        employees: ['Мария Смирнова'],
        ads: '24',
        access: 'Просмотр',
        clientBalance: 120000,
        agencyBalance: 100000,
        modelName: 'Рекламная',
        modelId: 'ID 874 321 001',
        category: 'Услуги',
        advance: 15000,
        expenses: 74000,
        views: 18420,
        contacts: 612,
        conversion: '3,3%',
      },
      {
        id: 'alpha-development',
        clientName: 'Альфа Девелопмент',
        clientId: 'ID 118 882 236',
        employees: ['Мария Смирнова'],
        ads: '24',
        access: 'Просмотр',
        clientBalance: 86000,
        agencyBalance: 64000,
        modelName: 'Рекламная',
        modelId: 'ID 874 321 001',
        category: 'Услуги',
        advance: 8000,
        expenses: 52600,
        views: 12680,
        contacts: 410,
        conversion: '3,2%',
      },
      {
        id: 'beta-tester-pro',
        clientName: 'Бета-тестер-про',
        clientId: 'ID 366 460 956',
        employees: ['Иван Петров'],
        ads: '6',
        access: 'Полный доступ',
        clientBalance: 45000,
        agencyBalance: 30000,
        modelName: 'Транзакционная',
        modelId: '',
        category: 'Товары',
        advance: 0,
        expenses: 31900,
        views: 8450,
        contacts: 276,
        conversion: '3,3%',
      },
      {
        id: 'alpha-two',
        clientName: 'Альфа 2...',
        clientId: 'ID 375 783 413',
        employees: ['Иван Петров'],
        ads: '6',
        access: 'Полный доступ',
        clientBalance: 24000,
        agencyBalance: 12000,
        modelName: 'Транзакционная',
        modelId: '',
        category: 'Товары',
        advance: 5000,
        expenses: 18750,
        views: 5920,
        contacts: 143,
        conversion: '2,4%',
      },
      {
        id: 'beta-two',
        clientName: 'Бета2',
        clientId: 'ID 702 184 509',
        employees: ['Иван Петров'],
        ads: '6',
        access: 'Полный доступ',
        clientBalance: 93000,
        agencyBalance: 70000,
        modelName: 'Транзакционная',
        modelId: '',
        category: 'Товары',
        advance: 12000,
        expenses: 68800,
        views: 15340,
        contacts: 589,
        conversion: '3,8%',
      },
    ],
    inviteRows: [
      {
        id: 'invite-ivanov-media',
        clientName: 'ИП Иванов Медиа',
        clientId: 'ID 346 234 666',
        inviteId: '1',
        status: 'Пока не подтвердил заявку',
        clientBalance: 0,
        agencyBalance: 0,
        modelName: 'Рекламная',
        createdAt: '20.10.2023 11:48',
      },
      {
        id: 'invite-rem-partner',
        clientName: 'РемШтангенциркуль Партнеры',
        clientId: 'ID 118 882 236',
        inviteId: '380',
        status: 'Пока не подтвердил заявку',
        clientBalance: 0,
        agencyBalance: 0,
        modelName: 'Рекламная',
        createdAt: '20.06.2024 11:59',
      },
      {
        id: 'invite-zyz-kids',
        clientName: 'ZYZ kids',
        clientId: 'ID 366 460 956',
        inviteId: '12076',
        status: 'Пока не подтвердил заявку',
        clientBalance: 0,
        agencyBalance: 0,
        modelName: 'Рекламная',
        createdAt: '29.08.2025 12:54',
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
      { key: 'client', label: 'Client name and ID', width: '208px' },
      { key: 'wallet', label: 'Wallet', width: '110px', align: 'right' },
      { key: 'actions', label: 'Actions', width: '238px' },
      { key: 'employees', label: 'Employee', width: '160px' },
      { key: 'ads', label: 'Ads', width: '110px', align: 'right' },
      { key: 'access', label: 'Access rights', width: '150px' },
      { key: 'model', label: 'Ad model and ID', width: '180px' },
      { key: 'subscription', label: 'Subscription', width: '120px' },
      { key: 'category', label: 'Category', width: '130px' },
      { key: 'advance', label: 'Advance', width: '110px', align: 'right' },
      { key: 'expenses', label: 'Expenses', width: '120px', align: 'right' },
      { key: 'views', label: 'Views', width: '110px', align: 'right' },
      { key: 'contacts', label: 'Contacts', width: '110px', align: 'right' },
      { key: 'conversion', label: 'Conversion', width: '110px', align: 'right' },
    ],
    inviteColumns: [
      { key: 'client', label: 'Client name and ID', width: '22%' },
      { key: 'inviteId', label: 'Invitation ID', width: '26%' },
      { key: 'model', label: 'Ad model', width: '26%' },
      { key: 'createdAt', label: 'Created at', width: '26%' },
    ],
    rows: [
      {
        id: 'north-light',
        clientName: 'North Light LLC',
        clientId: 'ID 433 770 690',
        employees: ['Maria Smirnova'],
        ads: '24',
        access: 'View only',
        clientBalance: 120000,
        agencyBalance: 100000,
        modelName: 'Advertising',
        modelId: 'ID 874 321 001',
        category: 'Services',
        advance: 15000,
        expenses: 74000,
        views: 18420,
        contacts: 612,
        conversion: '3.3%',
      },
      {
        id: 'alpha-development',
        clientName: 'Alpha Development',
        clientId: 'ID 118 882 236',
        employees: ['Maria Smirnova'],
        ads: '24',
        access: 'View only',
        clientBalance: 86000,
        agencyBalance: 64000,
        modelName: 'Advertising',
        modelId: 'ID 874 321 001',
        category: 'Services',
        advance: 8000,
        expenses: 52600,
        views: 12680,
        contacts: 410,
        conversion: '3.2%',
      },
      {
        id: 'beta-tester-pro',
        clientName: 'Beta Tester Pro',
        clientId: 'ID 366 460 956',
        employees: ['Ivan Petrov'],
        ads: '6',
        access: 'Full access',
        clientBalance: 45000,
        agencyBalance: 30000,
        modelName: 'Transactional',
        modelId: '',
        category: 'Goods',
        advance: 0,
        expenses: 31900,
        views: 8450,
        contacts: 276,
        conversion: '3.3%',
      },
      {
        id: 'alpha-two',
        clientName: 'Alpha 2...',
        clientId: 'ID 375 783 413',
        employees: ['Ivan Petrov'],
        ads: '6',
        access: 'Full access',
        clientBalance: 24000,
        agencyBalance: 12000,
        modelName: 'Transactional',
        modelId: '',
        category: 'Goods',
        advance: 5000,
        expenses: 18750,
        views: 5920,
        contacts: 143,
        conversion: '2.4%',
      },
      {
        id: 'beta-two',
        clientName: 'Beta2',
        clientId: 'ID 702 184 509',
        employees: ['Ivan Petrov'],
        ads: '6',
        access: 'Full access',
        clientBalance: 93000,
        agencyBalance: 70000,
        modelName: 'Transactional',
        modelId: '',
        category: 'Goods',
        advance: 12000,
        expenses: 68800,
        views: 15340,
        contacts: 589,
        conversion: '3.8%',
      },
    ],
    inviteRows: [
      {
        id: 'invite-ivanov-media',
        clientName: 'Ivanov Media',
        clientId: 'ID 346 234 666',
        inviteId: '1',
        status: 'Application not confirmed yet',
        clientBalance: 0,
        agencyBalance: 0,
        modelName: 'Advertising',
        createdAt: '20.10.2023 11:48',
      },
      {
        id: 'invite-rem-partner',
        clientName: 'RemGauge Partners',
        clientId: 'ID 118 882 236',
        inviteId: '380',
        status: 'Application not confirmed yet',
        clientBalance: 0,
        agencyBalance: 0,
        modelName: 'Advertising',
        createdAt: '20.06.2024 11:59',
      },
      {
        id: 'invite-zyz-kids',
        clientName: 'ZYZ kids',
        clientId: 'ID 366 460 956',
        inviteId: '12076',
        status: 'Application not confirmed yet',
        clientBalance: 0,
        agencyBalance: 0,
        modelName: 'Advertising',
        createdAt: '29.08.2025 12:54',
      },
    ],
  },
}

function formatAmountValue(value) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/\u00A0/g, ' ')
}

function formatCurrencyValue(value) {
  return `${formatAmountValue(value)} ₽`
}

function getPrimaryEmployee(row) {
  return row.employees?.[0] ? [row.employees[0]] : []
}

function getSelectPlaceholder(options) {
  return options[0]?.label ?? ''
}

function getSelectableOptions(options) {
  return options.slice(1)
}

function createClientCell(locale, row) {
  const profileLabel = locale === 'en' ? 'To profile' : 'В профиль'

  return (
    <div className="clients-page__client">
      <div className="clients-page__client-text">
        <Text as="strong" variant="s20" className="clients-page__client-name">
          {row.clientName}
        </Text>
        <Text as="span" variant="s20" tone="soft" className="clients-page__client-id">
          {row.clientId}
        </Text>
      </div>
      <Button
        type="button"
        size="s"
        preset="default"
        priority="primary"
        className="clients-page__profile-button clients-page__row-hover-control"
      >
        {profileLabel}
      </Button>
    </div>
  )
}

function createInviteClientCell(row) {
  return (
    <div className="clients-page__invite-client">
      <Text as="strong" variant="h5" className="clients-page__invite-client-name">
        {row.clientName}
      </Text>
      <Text as="span" variant="s20" tone="soft" className="clients-page__invite-client-id">
        {row.clientId}
      </Text>
      <Text as="span" variant="s20" className="clients-page__invite-status">
        {row.status}
      </Text>
    </div>
  )
}

function createWalletCell(balance) {
  return (
    <Text as="span" variant="s20" className="clients-page__wallet">
      {formatCurrencyValue(balance)}
    </Text>
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
        <Icon name="arrow-down" variant="plain" className="clients-page__action-icon" />
        {returnLabel}
      </Button>
    </div>
  )
}

function createEmployeesCell(locale, row) {
  const employees = getPrimaryEmployee(row)

  return (
    <div className="clients-page__employees">
      <div className="clients-page__employees-list">
        {employees.map((employee) => (
          <Text
            key={`${row.id}-${employee}`}
            as="span"
            variant="s20"
            className="clients-page__employee"
          >
            {employee}
          </Text>
        ))}
      </div>
      <Button
        type="button"
        size="s"
        preset="overlay"
        priority="secondary"
        iconOnly
        leftIconName="arrow-forward"
        aria-label={locale === 'en' ? 'Assign employee' : 'Назначить сотрудника'}
        className="clients-page__employee-action clients-page__row-hover-control"
        onMouseDown={(event) => {
          event.preventDefault()
        }}
      />
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
  return rows.map((row) => {
    const clientBalance = clientBalances[row.id] ?? row.clientBalance ?? 0

    return {
      id: row.id,
      client: createClientCell(locale, row),
      wallet: createWalletCell(clientBalance),
      actions: createActionCell(locale, () => onTopUp(row), () => onReturn(row)),
      employees: createEmployeesCell(locale, row),
      ads: row.ads,
      access: row.access,
      model: createModelCell(row),
      subscription: row.subscription ?? (locale === 'en' ? 'Basic' : 'Базовая'),
      category: row.category,
      advance: formatCurrencyValue(row.advance ?? 0),
      expenses: formatCurrencyValue(row.expenses ?? 0),
      views: formatAmountValue(row.views ?? 0),
      contacts: formatAmountValue(row.contacts ?? 0),
      conversion: row.conversion ?? '0%',
      clientBalance,
    }
  })
}

function mapInviteRows(rows) {
  return rows.map((row) => ({
    id: row.id,
    client: createInviteClientCell(row),
    inviteId: row.inviteId,
    model: row.modelName,
    createdAt: row.createdAt,
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
  const initialAgencyBalanceState = Object.fromEntries(
    [...content.rows, ...content.inviteRows].map((row) => [
      row.id,
      Math.min(row.agencyBalance ?? row.clientBalance ?? 0, row.clientBalance ?? 0),
    ]),
  )
  const [searchValue, setSearchValue] = useState('')
  const [selectedDate, setSelectedDate] = useState(content.dateOptions[0]?.value ?? '')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [activeTab, setActiveTab] = useState(content.tabs[0]?.key ?? 'clients')
  const [clientBalances, setClientBalances] = useState(initialBalanceState)
  const [clientAgencyBalances, setClientAgencyBalances] = useState(initialAgencyBalanceState)

  const handleOpenTopUpModal = (row) => {
    openModal({
      title: locale === 'en' ? 'Transfer money' : 'Перевести деньги',
      subtitle:
        locale === 'en' ? `You are transferring to ${row.clientName}` : `Вы переводите ${row.clientName}`,
      content: (
        <TransferFundsModal
          minAmount={5000}
          maxAmount={Math.max(walletAmount + 1500000, 5000)}
          showAccountSelect={false}
          successLabel={locale === 'en' ? 'successfully paid' : 'успешно оплачены'}
          postpayWarningBalance={walletAmount}
          postpayWarningText={({ amountLabel, isFullAmount }) =>
            isFullAmount
              ? 'Вся сумма будет использована из постоплаты'
              : `${amountLabel} будет использовано из постоплаты`
          }
          onSubmit={(amount) => {
            payFromWallet(amount)
            setClientBalances((currentBalances) => ({
              ...currentBalances,
              [row.id]: (currentBalances[row.id] ?? row.clientBalance ?? 0) + amount,
            }))
            setClientAgencyBalances((currentBalances) => ({
              ...currentBalances,
              [row.id]: (currentBalances[row.id] ?? row.agencyBalance ?? 0) + amount,
            }))
          }}
        />
      ),
      size: 's',
    })
  }

  const handleOpenReturnModal = (row) => {
    const availableAmount = clientBalances[row.id] ?? row.clientBalance ?? 0
    const returnableAmount = Math.min(
      clientAgencyBalances[row.id] ?? row.agencyBalance ?? 0,
      availableAmount,
    )
    const clientOwnAmount = Math.max(availableAmount - returnableAmount, 0)

    openModal({
      title: locale === 'en' ? 'Return money' : 'Возврат денег',
      subtitle:
        locale === 'en'
          ? (
              <>
                There is {formatCurrencyValue(availableAmount)} on {row.clientName}&apos;s wallet
              </>
            )
          : (
              <>
                На кошельке клиента {row.clientName}
                <br />
                {formatCurrencyValue(availableAmount)}
              </>
            ),
      content: (
        <ClientFundsReturnModal
          availableAmount={availableAmount}
          returnableAmount={returnableAmount}
          clientOwnAmount={clientOwnAmount}
          currentReturnAmount={returnableAmount}
          onSubmit={(amount) => {
            creditWallet(amount)
            setClientBalances((currentBalances) => ({
              ...currentBalances,
              [row.id]: Math.max((currentBalances[row.id] ?? row.clientBalance ?? 0) - amount, 0),
            }))
            setClientAgencyBalances((currentBalances) => ({
              ...currentBalances,
              [row.id]: Math.max((currentBalances[row.id] ?? row.agencyBalance ?? 0) - amount, 0),
            }))
          }}
        />
      ),
      size: 's',
    })
  }

  const isInvitesTab = activeTab === 'invites'
  const tableColumns = isInvitesTab ? content.inviteColumns : content.columns
  const tableRows = isInvitesTab
    ? mapInviteRows(content.inviteRows)
    : mapRows(
        locale,
        content.rows,
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
        <Input
          value={searchValue}
          onChange={setSearchValue}
          onClear={() => setSearchValue('')}
          size="s"
          clearable
          leftIconName="search"
          placeholder={content.searchPlaceholder}
          className="clients-page__filter clients-page__filter--search"
        />
        <Select
          value={selectedDate}
          onChange={setSelectedDate}
          options={content.dateOptions}
          size="s"
          leftIconName="calendar"
          className="clients-page__filter clients-page__filter--date"
        />
        <Select
          value={selectedModel}
          onChange={setSelectedModel}
          options={getSelectableOptions(content.modelOptions)}
          placeholder={getSelectPlaceholder(content.modelOptions)}
          size="s"
          className="clients-page__filter clients-page__filter--model"
        />
        <Select
          value={selectedEmployee}
          onChange={setSelectedEmployee}
          options={getSelectableOptions(content.employeeOptions)}
          placeholder={getSelectPlaceholder(content.employeeOptions)}
          size="s"
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
        <DesignSystemDataTable
          className={[
            'clients-page__table',
            isInvitesTab && 'clients-page__table--invites',
          ]
            .filter(Boolean)
            .join(' ')}
          columns={tableColumns}
          rows={tableRows}
          getRowKey={(row) => row.id}
          size={isInvitesTab ? 'm' : 's'}
          density={isInvitesTab ? 'l' : 'm'}
          stickyFirstColumn={!isInvitesTab}
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
