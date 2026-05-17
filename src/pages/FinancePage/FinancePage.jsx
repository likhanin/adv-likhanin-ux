import { useEffect, useRef, useState } from 'react'
import { Button } from '../../components/atoms/Button/Button'
import { Icon } from '../../components/atoms/Icon/Icon'
import { Tooltip } from '../../components/atoms/Tooltip/Tooltip'
import { AppDropdown } from '../../components/molecules/Dropdown/AppDropdown/AppDropdown'
import { DesignSystemDataTable } from '../../components/organisms/Table/DesignSystemDataTable/DesignSystemDataTable'
import { RedesignContentShell } from '../../components/templates/RedesignContentShell/RedesignContentShell'
import { getAppCopy, getLocaleTag, useAppLocale } from '../../i18n/useAppLocale'
import { Text } from '../../components/atoms/Text/Text'
import { TransferFundsModal } from '../../components/organisms/Finance/TransferFundsModal/TransferFundsModal'
import { useFinanceSession } from '../../store/financeSession/useFinanceSession'
import { useFeatureToggle } from '../../store/featureToggles/useFeatureToggles'
import { useModal } from '../../store/modal/useModal'
import { CabinetShell } from '../CabinetShell/CabinetShell'
import { getCabinetStageContent } from '../CabinetStagePage/constants'
import './FinancePage.css'

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function parseIsoDate(value) {
  const [year, month, day] = value.split('-').map(Number)

  return new Date(year, month - 1, day)
}

function parseTransactionDate(value) {
  const [datePart, timePart] = value.split(', ')
  const [day, month, year] = datePart.split('.').map(Number)
  const [hours, minutes] = timePart.split(':').map(Number)

  return new Date(year, month - 1, day, hours, minutes)
}

function formatTransactionDate(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}.${month}.${year}, ${hours}:${minutes}`
}

function formatAmountValue(value) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/\u00A0/g, ' ')
}

function formatCurrencyValue(value) {
  return `${formatAmountValue(value)} ₽`
}

function formatLongDate(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

function formatShortDate(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)

  return `${day}.${month}.${year}`
}

function getMonthTitle(date, localeTag) {
  const value = date.toLocaleString(localeTag, { month: 'long' })

  return value.charAt(0).toUpperCase() + value.slice(1)
}

function isSameDay(left, right) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

function isDateBetween(date, start, end) {
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()
  const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()

  return current > startTime && current < endTime
}

function buildCalendarMonth(baseDate, rangeStart, rangeEnd, nav, localeTag) {
  const monthStart = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1)
  const gridStart = new Date(monthStart)
  const weekdayIndex = (monthStart.getDay() + 6) % 7
  gridStart.setDate(monthStart.getDate() - weekdayIndex)

  const weeks = Array.from({ length: 6 }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const current = new Date(gridStart)
      current.setDate(gridStart.getDate() + weekIndex * 7 + dayIndex)

      return {
        label: String(current.getDate()),
        muted: current.getMonth() !== baseDate.getMonth(),
        rangeStart: isSameDay(current, rangeStart),
        rangeEnd: isSameDay(current, rangeEnd),
        inRange: isDateBetween(current, rangeStart, rangeEnd),
      }
    }),
  )

  return {
    title: getMonthTitle(baseDate, localeTag),
    year: String(baseDate.getFullYear()),
    nav,
    weeks,
  }
}

function getAmountPresentation(transaction) {
  const type = transaction.type ?? (transaction.amount?.trim().startsWith('+') ? 'deposit' : 'withdrawal')
  const status =
    transaction.status ??
    (transaction.amountTone === 'negative-soft' ? 'failed' : 'completed')
  const sign = type === 'deposit' ? '+' : '−'
  const parsedAmount = Number(String(transaction.amount).replace(/[^\d]/g, ''))
  const numericValue = transaction.amountValue ?? (Number.isNaN(parsedAmount) ? 0 : parsedAmount)

  let tone = 'withdrawal'

  if (status === 'failed') {
    tone = 'failed'
  } else if (type === 'deposit') {
    tone = 'deposit'
  }

  return {
    label: `${sign}${formatAmountValue(numericValue)} ₽`,
    tone,
  }
}

function createGeneratedTransaction(
  previousDate,
  index,
  { forceFailed = false, clientNames, transactionTemplates, failedTransactionTemplate },
) {
  const nextDate = new Date(previousDate)
  nextDate.setMinutes(nextDate.getMinutes() - randomInt(37, 185))

  const template = forceFailed ? failedTransactionTemplate : randomFrom(transactionTemplates)
  const clientName = template.clientRequired ? randomFrom(clientNames) : '—'
  const clientId = randomInt(4510000000, 4599999999)
  const amountValue =
    template.type === 'deposit'
      ? randomInt(15000, 180000)
      : randomInt(3500, 42000)

  return {
    id: `generated-${nextDate.getTime()}-${index}`,
    date: formatTransactionDate(nextDate),
    amountValue,
    type: template.type,
    status: template.status,
    client: clientName,
    operation: template.operation(clientId),
  }
}

function appendGeneratedTransactions(
  currentTransactions,
  { count, clientNames, transactionTemplates, failedTransactionTemplate },
) {
  const lastTransaction = currentTransactions[currentTransactions.length - 1]
  let cursorDate = parseTransactionDate(lastTransaction.date)
  const failedIndex = Math.random() < 0.35 ? randomInt(0, count - 1) : -1

  const nextTransactions = Array.from({ length: count }, (_, index) => {
    const transaction = createGeneratedTransaction(cursorDate, index, {
      forceFailed: index === failedIndex,
      clientNames,
      transactionTemplates,
      failedTransactionTemplate,
    })
    cursorDate = parseTransactionDate(transaction.date)

    return {
      ...transaction,
      bucket: transaction.type === 'deposit' ? 'wallet' : randomFrom(['agency', 'wallet']),
    }
  })

  return [...currentTransactions, ...nextTransactions]
}

function getTransactionTemplates(copy) {
  return [
    {
      type: 'withdrawal',
      status: 'completed',
      clientRequired: true,
      operation: (clientId) => copy.finance.chargeToClient(clientId),
    },
    {
      type: 'deposit',
      status: 'completed',
      clientRequired: false,
      operation: () => copy.finance.balanceTopUp,
    },
  ]
}

function getFailedTransactionTemplate(copy) {
  return {
    type: 'withdrawal',
    status: 'failed',
    clientRequired: true,
    operation: (clientId) => copy.finance.chargeToClient(clientId),
  }
}

export function FinancePage() {
  const locale = useAppLocale()
  const localeTag = getLocaleTag(locale)
  const appCopy = getAppCopy(locale)
  const { finance } = getCabinetStageContent(locale)
  const { openModal } = useModal()
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const {
    agencyBalance,
    walletAmount,
    payFromWallet,
    transferFunds,
    creditWallet,
  } = useFinanceSession()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [activePresetIndex, setActivePresetIndex] = useState(() => {
    const selectedIndex = finance.datePicker.presets.findIndex((preset) => preset.active)
    return selectedIndex >= 0 ? selectedIndex : 0
  })
  const [activeOperationTab, setActiveOperationTab] = useState(() => finance.newContent.operationTabs[0]?.key ?? 'all')
  const [transactions, setTransactions] = useState(() =>
    finance.transactions.map((transaction, index) => ({
      ...transaction,
      id: `initial-${index}-${transaction.date}`,
    })),
  )
  const infiniteScrollSentinelRef = useRef(null)
  const isAutoLoadingRef = useRef(false)
  const agencyProcessingTimeoutRef = useRef(null)
  const [agencyProcessingAmount, setAgencyProcessingAmount] = useState(0)
  const selectedPreset = finance.datePicker.presets[activePresetIndex] ?? finance.datePicker.presets[0]
  const selectedStartDate = parseIsoDate(selectedPreset.start)
  const selectedEndDate = parseIsoDate(selectedPreset.end)
  const periodLabel = `${formatLongDate(selectedStartDate)} — ${formatLongDate(selectedEndDate)}`
  const startDateLabel = formatShortDate(selectedStartDate)
  const endDateLabel = formatShortDate(selectedEndDate)
  const calendarEndMonth = new Date(selectedEndDate.getFullYear(), selectedEndDate.getMonth(), 1)
  const calendarStartMonth = new Date(calendarEndMonth.getFullYear(), calendarEndMonth.getMonth() - 1, 1)
  const calendarMonths = [
    buildCalendarMonth(calendarStartMonth, selectedStartDate, selectedEndDate, 'prev', localeTag),
    buildCalendarMonth(calendarEndMonth, selectedStartDate, selectedEndDate, 'next', localeTag),
  ]

  const agencyAmountLabel = formatCurrencyValue(agencyBalance)
  const walletAmountLabel = formatCurrencyValue(walletAmount)
  const agencyCardNoteV2 =
    agencyProcessingAmount > 0
      ? `Из них в обработке ${formatCurrencyValue(agencyProcessingAmount)}`
      : 'Все платежи обработаны'
  const walletPaymentMinAmount = 5000
  const walletPaymentMaxAmount = Math.max(walletAmount + 1500000, 0)

  const handleAgencyTransferSubmit = (amount, selectedClient) => {
    transferFunds(amount)

    const operationLabel =
      locale === 'en'
        ? `Transfer to ${selectedClient?.label ?? 'client'}`
        : `Перевод клиенту ${selectedClient?.label ?? 'клиенту'}`
    const clientLabel = selectedClient?.label ?? '—'

    setAgencyProcessingAmount((currentAmount) => currentAmount + amount)
    setTransactions((currentTransactions) => [
      {
        id: `agency-transfer-${Date.now()}`,
        date: formatTransactionDate(new Date()),
        amountValue: amount,
        type: 'withdrawal',
        status: 'completed',
        client: clientLabel,
        operation: operationLabel,
        bucket: 'agency',
      },
      ...currentTransactions,
    ])

    if (agencyProcessingTimeoutRef.current) {
      window.clearTimeout(agencyProcessingTimeoutRef.current)
    }

    agencyProcessingTimeoutRef.current = window.setTimeout(() => {
      setAgencyProcessingAmount(0)
      agencyProcessingTimeoutRef.current = null
    }, 5000)
  }

  const handleOpenTransferFundsModal = () => {
    openModal({
      title: locale === 'en' ? 'Transfer money' : 'Перевести деньги',
      content: (
        <TransferFundsModal
          minAmount={5000}
          maxAmount={agencyBalance}
          onSubmit={handleAgencyTransferSubmit}
        />
      ),
      size: 's',
    })
  }

  const handleWalletTopUpSubmit = (amount) => {
    creditWallet(amount)

    setTransactions((currentTransactions) => [
      {
        id: `wallet-top-up-${Date.now()}`,
        date: formatTransactionDate(new Date()),
        amountValue: amount,
        type: 'deposit',
        status: 'completed',
        client: '—',
        operation: locale === 'en' ? 'Wallet top up' : 'Пополнение кошелька',
        bucket: 'wallet',
      },
      ...currentTransactions,
    ])
  }

  const handleOpenWalletTopUpModal = () => {
    openModal({
      title: locale === 'en' ? 'Top up wallet' : 'Пополнить кошелёк',
      content: (
        <TransferFundsModal
          minAmount={5000}
          maxAmount={100000000}
          amountLabel={locale === 'en' ? 'Amount' : 'Сумма'}
          submitLabel={locale === 'en' ? 'Top up' : 'Пополнить'}
          successLabel={locale === 'en' ? 'successfully credited' : 'успешно зачислены'}
          closeLabel={locale === 'en' ? 'Back to cabinet' : 'Вернуться в кабинет'}
          showAccountSelect={false}
          showAmountHint={false}
          onSubmit={handleWalletTopUpSubmit}
        />
      ),
      size: 's',
    })
  }

  const handleWalletPaymentSubmit = (amount, selectedClient) => {
    payFromWallet(amount)

    const operationLabel =
      locale === 'en'
        ? `Payment for ${selectedClient?.label ?? 'client'}`
        : `Оплата клиента ${selectedClient?.label ?? 'клиента'}`
    const clientLabel = selectedClient?.label ?? '—'

    setTransactions((currentTransactions) => [
      {
        id: `wallet-payment-${Date.now()}`,
        date: formatTransactionDate(new Date()),
        amountValue: amount,
        type: 'withdrawal',
        status: 'completed',
        client: clientLabel,
        operation: operationLabel,
        bucket: 'wallet',
      },
      ...currentTransactions,
    ])
  }

  const handleOpenWalletPaymentModal = () => {
    openModal({
      title: locale === 'en' ? 'pay services' : 'оплатить услуги',
      content: (
        <TransferFundsModal
          minAmount={walletPaymentMinAmount}
          maxAmount={walletPaymentMaxAmount}
          submitLabel={locale === 'en' ? 'Pay' : 'Оплатить'}
          successLabel={locale === 'en' ? 'successfully paid' : 'успешно оплачены'}
          closeLabel={locale === 'en' ? 'Back to cabinet' : 'Вернуться в кабинет'}
          postpayWarningBalance={walletAmount}
          postpayWarningText={({ amountLabel, isFullAmount }) =>
            isFullAmount
              ? 'Вся сумма будет использована из постоплаты'
              : `${amountLabel} будет использовано из постоплаты`
          }
          onSubmit={handleWalletPaymentSubmit}
        />
      ),
      size: 's',
    })
  }

  const filteredTransactions =
    activeOperationTab === 'all'
      ? transactions
      : transactions.filter((transaction) => transaction.bucket === activeOperationTab)

  useEffect(() => {
    if (!infiniteScrollSentinelRef.current) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (!entry?.isIntersecting || isAutoLoadingRef.current) {
          return
        }

        isAutoLoadingRef.current = true
        const financeCopy = getAppCopy(locale)
        const transactionTemplates = getTransactionTemplates(financeCopy)
        const failedTransactionTemplate = getFailedTransactionTemplate(financeCopy)
        setTransactions((currentTransactions) =>
          appendGeneratedTransactions(currentTransactions, {
            count: 10,
            clientNames: financeCopy.finance.clientNames,
            transactionTemplates,
            failedTransactionTemplate,
          }),
        )
        window.setTimeout(() => {
          isAutoLoadingRef.current = false
        }, 120)
      },
      {
        root: null,
        rootMargin: '0px 0px 320px 0px',
        threshold: 0,
      },
    )

    observer.observe(infiniteScrollSentinelRef.current)

    return () => {
      observer.disconnect()
    }
  }, [
    activeOperationTab,
    locale,
  ])

  useEffect(() => {
    return () => {
      if (agencyProcessingTimeoutRef.current) {
        window.clearTimeout(agencyProcessingTimeoutRef.current)
      }
    }
  }, [])

  const renderTransactionsTable = (items) => (
    <DesignSystemDataTable
      className="finance-page__table"
      size="m"
      columns={[
        { key: 'date', label: finance.columns[0], width: '25%' },
        { key: 'amount', label: finance.columns[1], width: '13%', align: 'right' },
        { key: 'client', label: finance.columns[2], width: '20%' },
        { key: 'operation', label: finance.columns[3], width: '42%' },
      ]}
      rows={items.map((transaction) => {
        const amount = getAmountPresentation(transaction)
        const showFailedHint = amount.tone === 'failed'

        return {
          id: transaction.id,
          date: transaction.date,
          amount: (
            <span className={`finance-page__amount finance-page__amount--${amount.tone}`}>
              <span className="finance-page__amount-content">
                <Text as="span" variant="m20">
                  {amount.label}
                </Text>
                {showFailedHint ? (
                  <span className="finance-page__amount-hint" tabIndex={0}>
                    <span className="finance-page__amount-hint-icon" aria-hidden="true">
                      !
                    </span>
                    <Tooltip className="finance-page__amount-tooltip" size="s" anchor="bottom">
                      {finance.failedAmountHint}
                    </Tooltip>
                  </span>
                ) : null}
              </span>
            </span>
          ),
          client: transaction.client,
          operation: transaction.operation,
        }
      })}
      getRowKey={(row) => row.id}
    />
  )

  const renderDatePicker = (className = '') => (
    <div className={['finance-page__date-picker', className].filter(Boolean).join(' ')}>
      <AppDropdown
        isOpen={isDatePickerOpen}
        onToggle={() => setIsDatePickerOpen((value) => !value)}
        trigger={periodLabel}
        startIconName="calendar"
        triggerClassName="finance-page__filter"
        triggerMainClassName="finance-page__filter-main"
        triggerIconClassName="finance-page__filter-icon"
        triggerChevronClassName="finance-page__filter-chevron"
        panelClassName="finance-page__date-picker-dropdown"
        panelRole="dialog"
        panelAriaLabel={appCopy.finance.datePickerDialogLabel}
      >
          <div className="finance-page__date-picker-sidebar">
            {finance.datePicker.presets.map((preset, index) => (
              <button
                key={preset.label}
                className={`finance-page__date-picker-preset${index === activePresetIndex ? ' finance-page__date-picker-preset--active' : ''}`}
                type="button"
                onClick={() => setActivePresetIndex(index)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="finance-page__date-picker-calendars">
            {calendarMonths.map((month) => (
              <section key={`${month.title}-${month.year}`} className="finance-page__calendar-month">
                <div className="finance-page__calendar-header">
                  {month.nav === 'prev' ? (
                    <button
                      className="finance-page__calendar-nav"
                      type="button"
                      aria-label={appCopy.finance.previousMonthLabel}
                    >
                      <Icon name="chevronLeft" variant="plain" />
                    </button>
                  ) : (
                    <span className="finance-page__calendar-nav-placeholder" aria-hidden="true" />
                  )}

                  <h3>
                    <span>{month.title}</span> <span>{month.year}</span>
                  </h3>

                  {month.nav === 'next' ? (
                    <button
                      className="finance-page__calendar-nav"
                      type="button"
                      aria-label={appCopy.finance.nextMonthLabel}
                    >
                      <Icon name="chevronRight" variant="plain" />
                    </button>
                  ) : (
                    <span className="finance-page__calendar-nav-placeholder" aria-hidden="true" />
                  )}
                </div>

                <div className="finance-page__calendar-weekdays">
                  {finance.datePicker.weekdays.map((day) => (
                    <span key={`${month.title}-${day}`}>{day}</span>
                  ))}
                </div>

                <div className="finance-page__calendar-grid">
                  {month.weeks.flat().map((day, index) => (
                    <span
                      key={`${month.title}-${day.label}-${index}`}
                      className={[
                        'finance-page__calendar-day',
                        day.muted ? 'finance-page__calendar-day--muted' : '',
                        day.inRange ? 'finance-page__calendar-day--in-range' : '',
                        day.rangeStart ? 'finance-page__calendar-day--range-start' : '',
                        day.rangeEnd ? 'finance-page__calendar-day--range-end' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {day.label}
                    </span>
                  ))}
                </div>
              </section>
            ))}

            <div className="finance-page__date-picker-footer">
              <button className="finance-page__date-picker-meta finance-page__date-picker-meta--timezone" type="button">
                <span>{finance.datePicker.timezoneLabel}</span>
                <Icon name="chevronDown" variant="plain" className="finance-page__date-picker-meta-icon" />
              </button>
              <button className="finance-page__date-picker-meta" type="button">
                {startDateLabel}
              </button>
              <button className="finance-page__date-picker-meta" type="button">
                {endDateLabel}
              </button>
              <button
                className="finance-page__date-picker-apply"
                type="button"
                onClick={() => setIsDatePickerOpen(false)}
              >
                {finance.datePicker.applyLabel}
              </button>
            </div>
          </div>
      </AppDropdown>
    </div>
  )

  const summarySection = (
    <section className="finance-page__modern-summary finance-page__modern-summary--v2">
      <div className="finance-page__modern-summary-cards-v2">
        <article className="finance-page__modern-summary-card-v2">
          <div className="finance-page__modern-summary-card-head-v2">
            <Text as="span" variant="m20">
              {finance.newContentV2.walletCard.title}
            </Text>
            <span className="finance-page__modern-summary-tooltip-trigger-v2" tabIndex={0}>
              <Icon name="question-outline" variant="plain" className="finance-page__modern-summary-icon-v2" />
              <Tooltip className="finance-page__modern-summary-tooltip-v2" size="s" anchor="bottom">
                Деньги, которыми вы оплачиваете рекламу и услуги Авито
              </Tooltip>
            </span>
          </div>
          <Text as="strong" variant="h2" className="finance-page__modern-summary-amount-v2">
            {walletAmountLabel}
          </Text>
          <Text as="p" variant="m20" className="finance-page__modern-summary-note-v2">
            {finance.newContentV2.walletCard.note}
          </Text>
          <div className="finance-page__modern-summary-actions-v2">
            <Button
              type="button"
              size="m"
              preset="overlay"
              priority="primary"
              fullWidth
              className="finance-page__modern-summary-action-v2"
              onClick={handleOpenWalletTopUpModal}
            >
              {finance.newContentV2.walletCard.topUpLabel}
            </Button>
            <Button
              type="button"
              size="m"
              preset="overlay"
              priority="primary"
              fullWidth
              className="finance-page__modern-summary-action-v2"
              onClick={handleOpenWalletPaymentModal}
            >
              {finance.newContentV2.walletCard.actionLabel}
            </Button>
          </div>
        </article>

        <article className="finance-page__modern-summary-card-v2">
          <div className="finance-page__modern-summary-card-head-v2">
            <Text as="span" variant="m20">
              {finance.newContentV2.agencyCard.title}
            </Text>
            <span className="finance-page__modern-summary-tooltip-trigger-v2" tabIndex={0}>
              <Icon name="question-outline" variant="plain" className="finance-page__modern-summary-icon-v2" />
              <Tooltip className="finance-page__modern-summary-tooltip-v2" size="s" anchor="bottom">
                Деньги, которые можно распределить между клиентами.
              </Tooltip>
            </span>
          </div>
          <Text as="strong" variant="h2" className="finance-page__modern-summary-amount-v2">
            {agencyAmountLabel}
          </Text>
          <Text as="p" variant="m20" className="finance-page__modern-summary-note-v2">
            {agencyCardNoteV2}
          </Text>
          <Button
            type="button"
            size="m"
            preset="overlay"
            priority="primary"
            fullWidth
            className="finance-page__modern-summary-action-v2"
            onClick={handleOpenTransferFundsModal}
          >
            {finance.newContentV2.agencyCard.actionLabel}
          </Button>
        </article>
      </div>
    </section>
  )

  const operationsSection = (
    <section className="finance-page__modern-operations">
      <div className="finance-page__modern-operations-head">
        <div>
          <h2 className="finance-page__modern-section-title">{appCopy.finance.operationsTitle}</h2>
          <div
            className="finance-page__modern-tabs"
            role="tablist"
            aria-label={appCopy.finance.operationsFilterAriaLabel}
          >
            {finance.newContent.operationTabs.map((tab) => (
              <button
                key={tab.key}
                className={`finance-page__modern-tab${activeOperationTab === tab.key ? ' finance-page__modern-tab--active' : ''}`}
                type="button"
                role="tab"
                aria-selected={activeOperationTab === tab.key}
                onClick={() => setActiveOperationTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {renderDatePicker('finance-page__date-picker--inline')}
      </div>

      {renderTransactionsTable(filteredTransactions)}
      <div ref={infiniteScrollSentinelRef} className="finance-page__infinite-scroll-sentinel" aria-hidden="true" />
    </section>
  )

  const pageContent = (
    <>
      <div className="finance-page__title">
        <h1>{finance.title}</h1>
      </div>
      {summarySection}
      {operationsSection}
    </>
  )
  const redesignContent = (
    <RedesignContentShell
      title={finance.title}
      panels={[
        {
          className: 'finance-page__redesign-panel-shell finance-page__redesign-panel-shell--summary-v2',
          content: (
            <div className="finance-page__redesign-panel finance-page__redesign-panel--summary">
              {summarySection}
            </div>
          ),
        },
        {
          content: (
            <div className="finance-page__redesign-panel finance-page__redesign-panel--operations">
              {operationsSection}
            </div>
          ),
        },
      ]}
    />
  )

  const redesignAwareContent = isRedesignEnabled ? redesignContent : pageContent

  return <CabinetShell content={redesignAwareContent} />
}
