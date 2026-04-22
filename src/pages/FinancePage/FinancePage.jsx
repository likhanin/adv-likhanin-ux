import { useEffect, useRef, useState } from 'react'
import { Button } from '../../components/atoms/Button/Button'
import { Icon } from '../../components/atoms/Icon/Icon'
import { AppDropdown } from '../../components/molecules/Dropdown/AppDropdown/AppDropdown'
import { AppDataTable } from '../../components/organisms/Table/AppDataTable/AppDataTable'
import { RedesignContentShell } from '../../components/templates/RedesignContentShell/RedesignContentShell'
import { getAppCopy, getLocaleTag, useAppLocale } from '../../i18n/useAppLocale'
import { Text } from '../../components/atoms/Text/Text'
import { PostpayRequestModal } from '../../components/organisms/Finance/PostpayRequestModal/PostpayRequestModal'
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

function parseAmountValue(value) {
  return Number(String(value).replace(/[^\d]/g, '')) || 0
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
  const postpayTotalAmount = parseAmountValue(finance.newContent.postpayCard.amount)
  const isFinanceNewContentEnabled = useFeatureToggle('financeNewContent')
  const isFinanceNewContentV2Enabled = useFeatureToggle('financeNewContentV2')
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const isAnyFinanceNewContentEnabled =
    isFinanceNewContentEnabled || isFinanceNewContentV2Enabled
  const {
    agencyBalance,
    walletAmount,
    postpayReceivedAmount,
    payFromWallet,
    requestPostpay,
    returnPostpay,
    transferFunds,
  } = useFinanceSession()
  const clientNames = appCopy.finance.clientNames
  const [activeBalanceIndex, setActiveBalanceIndex] = useState(() => {
    const selectedIndex = finance.balances.findIndex((card) => card.selected)
    return selectedIndex >= 0 ? selectedIndex : 0
  })
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

  const hasRequestedPostpay = postpayReceivedAmount > 0
  const postpayRemainingAmount = Math.max(postpayTotalAmount - postpayReceivedAmount, 0)
  const postpayProgress = postpayTotalAmount > 0 ? (postpayReceivedAmount / postpayTotalAmount) * 100 : 0
  const agencyAmountLabel = formatCurrencyValue(agencyBalance)
  const walletAmountLabel = formatCurrencyValue(walletAmount)
  const postpayAmountLabel = formatCurrencyValue(hasRequestedPostpay ? postpayRemainingAmount : postpayTotalAmount)
  const postpayNote = hasRequestedPostpay
    ? appCopy.finance.postpayReceivedOfTotal(
        formatAmountValue(postpayReceivedAmount),
        formatAmountValue(postpayTotalAmount),
      )
    : finance.newContent.postpayCard.note
  const agencyCardNoteV2 =
    agencyProcessingAmount > 0
      ? `Из них в обработке ${formatCurrencyValue(agencyProcessingAmount)}`
      : 'Все платежи обработаны'
  const walletPaymentMinAmount = 5000
  const walletPaymentMaxAmount = Math.max(walletAmount + 1500000, 0)

  const handleReturnPostpay = () => {
    returnPostpay()
  }

  const handleAgencyTransferSubmit = (amount, selectedAccountId) => {
    transferFunds(amount)

    if (!isFinanceNewContentV2Enabled) {
      return
    }

    const transferAccountLabels = {
      lihanin: 'ИП Лиханин Максим Игоревич',
      'avito-tech': 'ООО "АВИТО ТЕХ"',
      'keh-ecommerce': 'ООО "КЕХ ЕКОММЕРЦ"',
    }
    const operationLabel = locale === 'en'
      ? `Transfer to ${transferAccountLabels[selectedAccountId] ?? 'account'}`
      : `Перевод на счет ${transferAccountLabels[selectedAccountId] ?? 'аккаунта'}`

    setAgencyProcessingAmount((currentAmount) => currentAmount + amount)
    setTransactions((currentTransactions) => [
      {
        id: `agency-transfer-${Date.now()}`,
        date: formatTransactionDate(new Date()),
        amountValue: amount,
        type: 'withdrawal',
        status: 'completed',
        client: '—',
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
      title: locale === 'en' ? 'Transfer funds' : 'Перевести средства',
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

  const handleWalletPaymentSubmit = (amount, selectedAccountId) => {
    payFromWallet(amount)

    if (!isFinanceNewContentV2Enabled) {
      return
    }

    const transferAccountLabels = {
      lihanin: 'ИП Лиханин Максим Игоревич',
      'avito-tech': 'ООО "АВИТО ТЕХ"',
      'keh-ecommerce': 'ООО "КЕХ ЕКОММЕРЦ"',
    }
    const operationLabel =
      locale === 'en'
        ? `Payment to ${transferAccountLabels[selectedAccountId] ?? 'account'}`
        : `Оплата на счет ${transferAccountLabels[selectedAccountId] ?? 'аккаунта'}`

    setTransactions((currentTransactions) => [
      {
        id: `wallet-payment-${Date.now()}`,
        date: formatTransactionDate(new Date()),
        amountValue: amount,
        type: 'withdrawal',
        status: 'completed',
        client: '—',
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
          onSubmit={handleWalletPaymentSubmit}
        />
      ),
      size: 's',
    })
  }

  const legacyBalances = finance.balances.map((card) =>
    card.label === finance.newContent.walletCard.title
      ? {
          ...card,
          amount: walletAmountLabel,
          note: finance.newContent.walletCard.note,
        }
      : card,
  )

  const appendTransactions = (count) => {
    const transactionTemplates = getTransactionTemplates(appCopy)
    const failedTransactionTemplate = getFailedTransactionTemplate(appCopy)

    setTransactions((currentTransactions) => {
      return appendGeneratedTransactions(currentTransactions, {
        count,
        clientNames,
        transactionTemplates,
        failedTransactionTemplate,
      })
    })
  }

  const handleLoadMore = () => {
    appendTransactions(5)
  }

  const filteredTransactions =
    activeOperationTab === 'all'
      ? transactions
      : transactions.filter((transaction) => transaction.bucket === activeOperationTab)

  useEffect(() => {
    if (!isAnyFinanceNewContentEnabled || !infiniteScrollSentinelRef.current) {
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
    isAnyFinanceNewContentEnabled,
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
    <AppDataTable
      className="finance-page__table"
      columns={[
        { key: 'date', label: finance.columns[0], width: '25%' },
        { key: 'amount', label: finance.columns[1], width: '13%' },
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
                <Text as="span" variant="s20">
                  {amount.label}
                </Text>
                {showFailedHint ? (
                  <span className="finance-page__amount-hint" tabIndex={0}>
                    <span className="finance-page__amount-hint-icon" aria-hidden="true">
                      !
                    </span>
                    <span className="finance-page__amount-tooltip" role="tooltip">
                      {finance.failedAmountHint}
                    </span>
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

  const legacyContent = (
    <>
      <section className="finance-page__summary">
        {legacyBalances.map((card, index) => {
          const isActive = index === activeBalanceIndex

          return (
            <button
              key={card.label}
              type="button"
              className={`finance-page__balance-card${isActive ? ' finance-page__balance-card--selected' : ' finance-page__balance-card--muted'}`}
              aria-pressed={isActive}
              onClick={() => setActiveBalanceIndex(index)}
            >
              <Text tone="soft" className="finance-page__balance-label">
                {card.label}
              </Text>
              <strong className="finance-page__balance-amount">{card.amount}</strong>
              <Text className="finance-page__balance-note">{card.note}</Text>
              {isActive ? (
                <span className="finance-page__balance-status" aria-hidden="true" />
              ) : (
                <span className="finance-page__balance-dot" aria-hidden="true" />
              )}
            </button>
          )
        })}
      </section>

      {renderDatePicker()}

      {renderTransactionsTable(transactions)}

      <div className="finance-page__load-more">
        <Button type="button" size="m" preset="default" priority="secondary" onClick={handleLoadMore}>
          {finance.loadMoreLabel}
        </Button>
      </div>
    </>
  )

  const summarySectionV1 = (
    <section className="finance-page__modern-summary">
      <article className="finance-page__modern-card finance-page__modern-card--agency">
        <div className="finance-page__modern-card-surface">
          <h2>{finance.newContent.agencyCard.title}</h2>
          <p className="finance-page__modern-description">{finance.newContent.agencyCard.description}</p>
          <strong className="finance-page__modern-amount">{agencyAmountLabel}</strong>
          <p className="finance-page__modern-note">{finance.newContent.agencyCard.note}</p>
          <Button
            type="button"
            size="m"
            preset="default"
            priority="secondary"
            fullWidth
            className="finance-page__modern-action"
            onClick={handleOpenTransferFundsModal}
          >
            {finance.newContent.agencyCard.actionLabel}
          </Button>
        </div>
      </article>

      <article className="finance-page__modern-wallet-shell">
        <div className="finance-page__modern-wallet-card">
          <h2>{finance.newContent.walletCard.title}</h2>
          <p className="finance-page__modern-description">{finance.newContent.walletCard.description}</p>
          <strong className="finance-page__modern-amount">{walletAmountLabel}</strong>
          <p className="finance-page__modern-note">{finance.newContent.walletCard.note}</p>
          <Button
            type="button"
            size="m"
            preset="default"
            priority="secondary"
            fullWidth
            className="finance-page__modern-action"
          >
            {finance.newContent.walletCard.actionLabel}
          </Button>
        </div>

        <div className="finance-page__modern-postpay-card">
          <h2>{finance.newContent.postpayCard.title}</h2>
          <p className="finance-page__modern-description">{finance.newContent.postpayCard.description}</p>
          <strong className="finance-page__modern-amount">{postpayAmountLabel}</strong>
          <div className="finance-page__modern-progress-block">
            <div
              className={`finance-page__modern-progress${hasRequestedPostpay ? ' finance-page__modern-progress--active' : ''}`}
              aria-hidden="true"
            >
              <span style={{ width: `${hasRequestedPostpay ? postpayProgress : finance.newContent.postpayCard.progress}%` }} />
            </div>
            <p className="finance-page__modern-note">{postpayNote}</p>
          </div>
          {hasRequestedPostpay ? (
            <div className="finance-page__modern-postpay-actions">
              <Button
                type="button"
                size="m"
                preset="default"
                priority="primary"
                fullWidth
                className="finance-page__modern-action"
                onClick={handleReturnPostpay}
              >
                {finance.newContent.postpayCard.returnLabel}
              </Button>
              <Button
                type="button"
                size="m"
                preset="overlay"
                priority="secondary"
                fullWidth
                className="finance-page__modern-action"
                onClick={() =>
                  openModal({
                    title: appCopy.finance.postpayRequestTitle,
                    content: (
                      <PostpayRequestModal
                        defaultAmount={Math.min(
                          finance.newContent.postpayCard.defaultRequestAmount,
                          postpayRemainingAmount,
                        )}
                        minAmount={finance.newContent.postpayCard.minRequestAmount}
                        maxAmount={postpayRemainingAmount}
                        onSubmit={(requestedAmount) => {
                          const normalizedAmount = Math.min(requestedAmount, postpayRemainingAmount)
                          requestPostpay(normalizedAmount)
                        }}
                      />
                    ),
                    size: 's',
                  })
                }
              >
                {finance.newContent.postpayCard.requestMoreLabel}
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              size="m"
              preset="overlay"
              priority="secondary"
              fullWidth
              className="finance-page__modern-action"
              onClick={() =>
                openModal({
                  title: appCopy.finance.postpayRequestTitle,
                  content: (
                    <PostpayRequestModal
                      defaultAmount={finance.newContent.postpayCard.defaultRequestAmount}
                      minAmount={finance.newContent.postpayCard.minRequestAmount}
                      maxAmount={postpayTotalAmount}
                      onSubmit={(requestedAmount) => {
                        const normalizedAmount = Math.min(requestedAmount, postpayTotalAmount)
                        requestPostpay(normalizedAmount)
                      }}
                    />
                  ),
                  size: 's',
                })
              }
            >
              {finance.newContent.postpayCard.actionLabel}
            </Button>
          )}
        </div>
      </article>
    </section>
  )

  const summarySectionV2 = (
    <section className="finance-page__modern-summary finance-page__modern-summary--v2">
      <div className="finance-page__modern-summary-cards-v2">
        <article className="finance-page__modern-summary-card-v2">
          <div className="finance-page__modern-summary-card-head-v2">
            <Text as="span" variant="m20">
              {finance.newContentV2.agencyCard.title}
            </Text>
            <Icon name="infoCircle" variant="plain" className="finance-page__modern-summary-icon-v2" />
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

        <article className="finance-page__modern-summary-card-v2">
          <div className="finance-page__modern-summary-card-head-v2">
            <Text as="span" variant="m20">
              {finance.newContentV2.walletCard.title}
            </Text>
            <Icon name="infoCircle" variant="plain" className="finance-page__modern-summary-icon-v2" />
          </div>
          <Text as="strong" variant="h2" className="finance-page__modern-summary-amount-v2">
            {walletAmountLabel}
          </Text>
          <Text as="p" variant="m20" className="finance-page__modern-summary-note-v2">
            {finance.newContentV2.walletCard.note}
          </Text>
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
        </article>
      </div>
    </section>
  )

  const summarySection = isFinanceNewContentV2Enabled ? summarySectionV2 : summarySectionV1

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

  const nextContent = (
    <>
      {summarySection}
      {operationsSection}
    </>
  )
  const redesignContent = (
    <RedesignContentShell
      title={finance.title}
      panels={[
        isFinanceNewContentV2Enabled
          ? {
              className: 'finance-page__redesign-panel-shell finance-page__redesign-panel-shell--summary-v2',
              content: (
                <div className="finance-page__redesign-panel finance-page__redesign-panel--summary">
                  {summarySection}
                </div>
              ),
            }
          : {
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

  const defaultContent = (
    <>
      <div className="finance-page__title">
        <h1>{finance.title}</h1>
      </div>
      {isAnyFinanceNewContentEnabled ? nextContent : legacyContent}
    </>
  )

  const redesignAwareContent =
    isRedesignEnabled && isAnyFinanceNewContentEnabled ? redesignContent : defaultContent

  return <CabinetShell content={redesignAwareContent} />
}
