import { Button } from '../../../atoms/Button/Button'
import { Text } from '../../../atoms/Text/Text'
import { useAppLocale } from '../../../../i18n/useAppLocale'
import { useModal } from '../../../../store/modal/useModal'
import './ClientFundsReturnModal.css'

function formatAmountValue(value) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/\u00A0/g, ' ')
}

function formatCurrencyValue(value) {
  return `${formatAmountValue(value)} ₽`
}

export function ClientFundsReturnModal({ clientName, availableAmount = 0, onSubmit }) {
  const locale = useAppLocale()
  const { closeModal } = useModal()
  const isSubmitDisabled = availableAmount <= 0
  const description =
    locale === 'en'
      ? `${formatCurrencyValue(availableAmount)} is available on ${clientName}'s account.`
      : `На счету клиента ${clientName} сейчас ${formatCurrencyValue(availableAmount)}.`

  return (
    <div className="client-funds-return-modal">
      <Text as="p" variant="m20" className="client-funds-return-modal__description">
        {description}
      </Text>

      <div className="client-funds-return-modal__actions">
        <Button
          className="client-funds-return-modal__action"
          type="button"
          preset="default"
          priority="primary"
          fullWidth
          disabled={isSubmitDisabled}
          onClick={() => {
            if (isSubmitDisabled) {
              return
            }

            onSubmit?.(availableAmount)
            closeModal()
          }}
        >
          {locale === 'en' ? 'Return' : 'Вернуть'}
        </Button>

        <Button
          className="client-funds-return-modal__action"
          type="button"
          preset="default"
          priority="secondary"
          fullWidth
          onClick={closeModal}
        >
          {locale === 'en' ? 'Cancel' : 'Отмена'}
        </Button>
      </div>
    </div>
  )
}
