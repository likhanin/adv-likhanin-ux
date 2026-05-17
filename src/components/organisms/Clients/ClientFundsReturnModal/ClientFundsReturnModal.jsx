import { useState } from 'react'
import { Button } from '../../../atoms/Button/Button'
import { Slider } from '../../../atoms/Slider'
import { Text } from '../../../atoms/Text/Text'
import { Input } from '../../../molecules/Input/Input'
import { useAppLocale } from '../../../../i18n/useAppLocale'
import { useModal } from '../../../../store/modal/useModal'
import './ClientFundsReturnModal.css'

function formatAmountValue(value) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/\u00A0/g, ' ')
}

function formatCurrencyValue(value) {
  return `${formatAmountValue(value)} ₽`
}

function parseAmountValue(value) {
  if (String(value).includes('-')) {
    return 0
  }

  return Number(String(value).replace(/[^\d]/g, '')) || 0
}

function formatInputAmount(value) {
  return value > 0 ? formatAmountValue(value) : ''
}

function clampAmount(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function ClientFundsReturnModal({
  availableAmount = 0,
  returnableAmount = availableAmount,
  clientOwnAmount = Math.max(availableAmount - returnableAmount, 0),
  currentReturnAmount = returnableAmount,
  onSubmit,
}) {
  const locale = useAppLocale()
  const { closeModal } = useModal()
  const safeAvailableAmount = Math.max(availableAmount, 0)
  const availableAgencyAmount = Math.min(Math.max(returnableAmount, 0), safeAvailableAmount)
  const safeClientOwnAmount = Math.max(clientOwnAmount, 0)
  const initialAmount = clampAmount(currentReturnAmount, 0, availableAgencyAmount)
  const [amount, setAmount] = useState(initialAmount)
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false)
  const isAmountInvalid = amount <= 0 || amount > availableAgencyAmount
  const isSubmitDisabled = availableAgencyAmount <= 0 || isAmountInvalid
  const amountError =
    isSubmitAttempted && isAmountInvalid
      ? locale === 'en'
        ? `Enter an amount from 1 ₽ to ${formatCurrencyValue(availableAgencyAmount)}`
        : `Введите сумму от 1 ₽ до ${formatCurrencyValue(availableAgencyAmount)}`
      : ''

  const setClampedAmount = (nextAmount) => {
    setAmount(clampAmount(nextAmount, 0, availableAgencyAmount))
  }

  return (
    <div className="client-funds-return-modal">
      <div className="client-funds-return-modal__summary" aria-label={locale === 'en' ? 'Balance details' : 'Детализация баланса'}>
        <div className="client-funds-return-modal__summary-item">
          <Text as="span" variant="m20" tone="soft">
            {locale === 'en' ? (
              <>
                Available
                <br />
                to return
              </>
            ) : (
              <>
                Доступно
                <br />
                для возврата
              </>
            )}
          </Text>
          <Text as="strong" variant="h4" className="client-funds-return-modal__summary-value">
            {formatCurrencyValue(availableAgencyAmount)}
          </Text>
        </div>
        <div className="client-funds-return-modal__summary-item client-funds-return-modal__summary-item--secondary">
          <Text as="span" variant="m20" tone="soft">
            {locale === 'en' ? (
              <>
                Client
                <br />
                funds
              </>
            ) : (
              <>
                Деньги
                <br />
                клиента
              </>
            )}
          </Text>
          <Text as="strong" variant="h4" tone="soft" className="client-funds-return-modal__summary-value">
            {formatCurrencyValue(safeClientOwnAmount)}
          </Text>
        </div>
      </div>

      <div className="client-funds-return-modal__amount-control">
        <Input
          id="client-return-amount"
          label={locale === 'en' ? 'Amount' : 'Сумма'}
          value={formatInputAmount(amount)}
          size="m"
          inputMode="numeric"
          postfix="₽"
          error={amountError}
          disabled={availableAgencyAmount <= 0}
          onChange={(nextValue) => setClampedAmount(parseAmountValue(nextValue))}
        />

        <Slider
          aria-label={locale === 'en' ? 'Return amount' : 'Сумма возврата'}
          className="client-funds-return-modal__slider"
          value={amount}
          min={0}
          max={availableAgencyAmount}
          step={1}
          disabled={availableAgencyAmount <= 0}
          onChange={setClampedAmount}
        />
      </div>

      <div className="client-funds-return-modal__actions">
        <Button
          className="client-funds-return-modal__action"
          type="button"
          preset="default"
          priority="primary"
          disabled={isSubmitDisabled}
          onClick={() => {
            setIsSubmitAttempted(true)

            if (isSubmitDisabled) {
              return
            }

            onSubmit?.(amount)
            closeModal()
          }}
        >
          {locale === 'en' ? `Return ${formatCurrencyValue(amount)}` : `Вернуть ${formatCurrencyValue(amount)}`}
        </Button>

        <Button
          className="client-funds-return-modal__action"
          type="button"
          preset="default"
          priority="secondary"
          onClick={closeModal}
        >
          {locale === 'en' ? 'Cancel' : 'Отмена'}
        </Button>
      </div>
    </div>
  )
}
