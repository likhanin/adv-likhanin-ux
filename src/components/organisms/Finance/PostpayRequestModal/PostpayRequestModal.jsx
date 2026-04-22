import { useState } from 'react'
import { Button } from '../../../atoms/Button/Button'
import { InputField } from '../../../atoms/InputField/InputField'
import { getAppCopy, useAppLocale } from '../../../../i18n/useAppLocale'
import { useModal } from '../../../../store/modal/useModal'
import './PostpayRequestModal.css'

function formatAmountValue(value) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/\u00A0/g, ' ')
}

function parseAmountValue(value) {
  return Number(String(value).replace(/[^\d]/g, '')) || 0
}

function formatCurrencyValue(value) {
  return value > 0 ? formatAmountValue(value) : ''
}

export function PostpayRequestModal({ defaultAmount = 0, minAmount = 200000, maxAmount = 1500000, onSubmit }) {
  const locale = useAppLocale()
  const appCopy = getAppCopy(locale)
  const { closeModal } = useModal()
  const [amount, setAmount] = useState(formatCurrencyValue(defaultAmount))
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false)
  const parsedAmount = parseAmountValue(amount)
  const hasOutOfRangeError = parsedAmount > 0 && (parsedAmount < minAmount || parsedAmount > maxAmount)
  const isSubmitDisabled = parsedAmount < minAmount || parsedAmount > maxAmount
  const errorText =
    isSubmitAttempted && hasOutOfRangeError
      ? appCopy.finance.postpayModal.rangeError(formatAmountValue(minAmount), formatAmountValue(maxAmount))
      : ''
  const hintText = appCopy.finance.postpayModal.rangeHint(
    formatAmountValue(minAmount),
    formatAmountValue(maxAmount),
  )

  return (
    <div className="postpay-request-modal">
      <p className="postpay-request-modal__description">{appCopy.finance.postpayModal.description}</p>

      <InputField
        id="postpay-amount"
        className="postpay-request-modal__field-group"
        type="text"
        inputMode="numeric"
        value={amount}
        label={appCopy.finance.postpayModal.amountLabel}
        hint={hintText}
        error={errorText}
        clearLabel={appCopy.finance.postpayModal.clearAmountLabel}
        onChange={(nextValue) => {
          setIsSubmitAttempted(false)
          setAmount(formatCurrencyValue(parseAmountValue(nextValue)))
        }}
        onClear={() => {
          setIsSubmitAttempted(false)
          setAmount('')
        }}
      />

      <Button
        className="postpay-request-modal__submit"
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

          onSubmit?.(parsedAmount)
          closeModal()
        }}
      >
        {appCopy.finance.postpayModal.submitLabel}
      </Button>
    </div>
  )
}
