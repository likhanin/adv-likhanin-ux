import { useEffect, useState } from 'react'
import { Button } from '../../../atoms/Button/Button'
import { InputField } from '../../../atoms/InputField/InputField'
import { SelectField } from '../../../atoms/SelectField/SelectField'
import { useAppLocale } from '../../../../i18n/useAppLocale'
import { useModal } from '../../../../store/modal/useModal'
import { useFeatureToggle } from '../../../../store/featureToggles/useFeatureToggles'
import './TransferFundsModal.css'

const TRANSFER_ACCOUNTS = [
  {
    id: 'lihanin',
    label: 'ИП Лиханин Максим Игоревич',
    inn: '352829221502',
  },
  {
    id: 'avito-tech',
    label: 'ООО "АВИТО ТЕХ"',
    inn: '9710089440',
  },
  {
    id: 'keh-ecommerce',
    label: 'ООО "КЕХ ЕКОММЕРЦ"',
    inn: '7710668349',
  },
]

const MODAL_COPY = {
  ru: {
    accountLabel: 'Аккаунт для перевода',
    amountLabel: 'Сумма перевода',
    amountPlaceholder: 'Введите сумму',
    submitLabel: 'Перевести',
    successLabel: 'успешно переведены',
    closeLabel: 'Вернуться в кабинет',
    rangeHint: (minAmount, maxAmount) => `Можно перевести от ${minAmount} до ${maxAmount}`,
    rangeError: (minAmount, maxAmount) => `Введите сумму от ${minAmount} до ${maxAmount}`,
  },
  en: {
    accountLabel: 'Transfer account',
    amountLabel: 'Transfer amount',
    amountPlaceholder: 'Enter amount',
    submitLabel: 'Transfer',
    successLabel: 'successfully transferred',
    closeLabel: 'Back to cabinet',
    rangeHint: (minAmount, maxAmount) => `Allowed amount: from ${minAmount} to ${maxAmount}`,
    rangeError: (minAmount, maxAmount) => `Enter an amount from ${minAmount} to ${maxAmount}`,
  },
}

function formatAmountValue(value) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/\u00A0/g, ' ')
}

function parseAmountValue(value) {
  return Number(String(value).replace(/[^\d]/g, '')) || 0
}

function formatCurrencyValue(value) {
  return value > 0 ? formatAmountValue(value) : ''
}

export function TransferFundsModal({
  minAmount = 5000,
  maxAmount = 0,
  submitLabel = null,
  successLabel = null,
  closeLabel = null,
  showAccountSelect = true,
  onSubmit,
}) {
  const locale = useAppLocale()
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const { closeModal, updateModal } = useModal()
  const copy = MODAL_COPY[locale] ?? MODAL_COPY.ru
  const resolvedSubmitLabel = submitLabel ?? copy.submitLabel
  const resolvedSuccessLabel = successLabel ?? copy.successLabel
  const resolvedCloseLabel = closeLabel ?? copy.closeLabel
  const [selectedAccountId, setSelectedAccountId] = useState(TRANSFER_ACCOUNTS[0]?.id ?? '')
  const [amount, setAmount] = useState('')
  const [submittedAmount, setSubmittedAmount] = useState(0)
  const [isSuccessState, setIsSuccessState] = useState(false)
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false)

  const parsedAmount = parseAmountValue(amount)
  const hasOutOfRangeError = parsedAmount > 0 && (parsedAmount < minAmount || parsedAmount > maxAmount)
  const isSubmitDisabled =
    (showAccountSelect && !selectedAccountId) || parsedAmount < minAmount || parsedAmount > maxAmount
  const minAmountLabel = `${formatCurrencyValue(minAmount)} ₽`
  const maxAmountLabel = `${formatCurrencyValue(maxAmount)} ₽`
  const hintText = copy.rangeHint(minAmountLabel, maxAmountLabel)
  const errorText = isSubmitAttempted && hasOutOfRangeError ? copy.rangeError(minAmountLabel, maxAmountLabel) : ''
  const successHeading = `${formatCurrencyValue(submittedAmount)} ₽ ${resolvedSuccessLabel}`
  const transferAccountOptions = TRANSFER_ACCOUNTS.map((account) => ({
    value: account.id,
    label: `${account.label} · ИНН ${account.inn}`,
  }))

  useEffect(() => {
    if (!isRedesignEnabled || !isSuccessState) {
      return
    }

    updateModal({
      showCloseButton: false,
      showHeader: false,
      panelClassName: 'app-modal__panel--transfer-success-redesign',
    })
  }, [isRedesignEnabled, isSuccessState, updateModal])

  if (isSuccessState) {
    if (isRedesignEnabled) {
      return (
        <div className="transfer-funds-modal transfer-funds-modal--success transfer-funds-modal--success-redesign">
          <div
            className="transfer-funds-modal__success-visual transfer-funds-modal__success-visual--floating"
            aria-hidden="true"
          >
            <div className="transfer-funds-modal__success-base" />
            <div className="transfer-funds-modal__success-coin transfer-funds-modal__success-coin--back">
              <span>₽</span>
            </div>
            <div className="transfer-funds-modal__success-coin transfer-funds-modal__success-coin--front">
              <span>₽</span>
            </div>
          </div>

          <div className="transfer-funds-modal__success-body">
            <h3 className="transfer-funds-modal__success-heading">{successHeading}</h3>

            <Button
              className="transfer-funds-modal__submit"
              type="button"
              size="m"
              preset="default"
              priority="primary"
              fullWidth
              onClick={closeModal}
            >
              {resolvedCloseLabel}
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="transfer-funds-modal transfer-funds-modal--success">
        <div className="transfer-funds-modal__success-visual" aria-hidden="true">
          <div className="transfer-funds-modal__success-base" />
          <div className="transfer-funds-modal__success-coin transfer-funds-modal__success-coin--back">
            <span>₽</span>
          </div>
          <div className="transfer-funds-modal__success-coin transfer-funds-modal__success-coin--front">
            <span>₽</span>
          </div>
        </div>

        <div className="transfer-funds-modal__success-copy">
          <strong className="transfer-funds-modal__success-amount">{formatCurrencyValue(submittedAmount)}</strong>
          <p className="transfer-funds-modal__success-title">{resolvedSuccessLabel}</p>
        </div>

        <Button
          className="transfer-funds-modal__submit"
          type="button"
          size="m"
          preset="default"
          priority="primary"
          fullWidth
          onClick={closeModal}
        >
          {resolvedCloseLabel}
        </Button>
      </div>
    )
  }

  return (
    <div className="transfer-funds-modal">
      {showAccountSelect ? (
        <div className="transfer-funds-modal__field">
          <SelectField
            id="transfer-account"
            value={selectedAccountId}
            label={copy.accountLabel}
            options={transferAccountOptions}
            onChange={setSelectedAccountId}
          />
        </div>
      ) : null}

      <div
        className={[
          'transfer-funds-modal__field',
          'transfer-funds-modal__field--amount',
          !showAccountSelect && 'transfer-funds-modal__field--amount-standalone',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <InputField
          id="transfer-amount"
          type="text"
          inputMode="numeric"
          value={amount}
          label={copy.amountLabel}
          hint={hintText}
          error={errorText}
          placeholder={copy.amountPlaceholder}
          onChange={(nextValue) => {
            setIsSubmitAttempted(false)
            setAmount(formatCurrencyValue(parseAmountValue(nextValue)))
          }}
          onClear={() => {
            setIsSubmitAttempted(false)
            setAmount('')
          }}
        />
      </div>

      <Button
        className="transfer-funds-modal__submit"
        type="button"
        preset="default"
        priority="primary"
        fullWidth
        disabled={isSubmitDisabled}
        onClick={() => {
          setIsSubmitAttempted(true)

          if (isSubmitDisabled) {
            return
          }

          onSubmit?.(parsedAmount, showAccountSelect ? selectedAccountId : null)
          setSubmittedAmount(parsedAmount)
          setIsSuccessState(true)
        }}
      >
        {resolvedSubmitLabel}
      </Button>
    </div>
  )
}
