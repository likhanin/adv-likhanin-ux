import { useState } from 'react'
import { Button } from '../../../atoms/Button/Button'
import { Icon } from '../../../atoms/Icon/Icon'
import { Input } from '../../../molecules/Input/Input'
import { Select } from '../../../molecules/Select/Select'
import { useAppLocale } from '../../../../i18n/useAppLocale'
import { useModal } from '../../../../store/modal/useModal'
import './TransferFundsModal.css'

const TRANSFER_CLIENTS = {
  ru: [
    { id: 'alpha-group', label: 'Альфа Групп', inn: '7704123456' },
    { id: 'smart-market', label: 'СмартМаркет', inn: '7705123457' },
    { id: 'eco-dom', label: 'ЭкоДом', inn: '7706123458' },
    { id: 'nord-line', label: 'Норд Лайн', inn: '7707123459' },
    { id: 'techno-park', label: 'Технопарк', inn: '7708123460' },
    { id: 'beta-logistic', label: 'Бета Логистик', inn: '7709123461' },
    { id: 'green-city', label: 'Грин Сити', inn: '7710123462' },
    { id: 'market-plus', label: 'Маркет Плюс', inn: '7711123463' },
    { id: 'severnoe-siyanie', label: 'Северное сияние', inn: '7712123464' },
    { id: 'alfa-development', label: 'Альфа Девелопмент', inn: '7713123465' },
    { id: 'beta-tester-pro', label: 'Бета-тестер-про', inn: '7714123466' },
    { id: 'alfa-two', label: 'Альфа 2', inn: '7715123467' },
    { id: 'beta-two', label: 'Бета 2', inn: '7716123468' },
    { id: 'aurora-trade', label: 'Аврора Трейд', inn: '7717123469' },
    { id: 'vector-media', label: 'Вектор Медиа', inn: '7718123470' },
    { id: 'grand-stroy', label: 'Гранд Строй', inn: '7719123471' },
    { id: 'delta-service', label: 'Дельта Сервис', inn: '7720123472' },
    { id: 'orbit-snab', label: 'Орбит Снаб', inn: '7721123473' },
    { id: 'pixel-house', label: 'Пиксель Хаус', inn: '7722123474' },
    { id: 'sfera-logika', label: 'Сфера Логика', inn: '7723123475' },
    { id: 'forma-plus', label: 'Форма Плюс', inn: '7724123476' },
    { id: 'meridian-pro', label: 'Меридиан Про', inn: '7725123477' },
    { id: 'magnetika', label: 'Магнетика', inn: '7726123478' },
    { id: 'atlas-grupp', label: 'Атлас Групп', inn: '7727123479' },
    { id: 'zenit-opt', label: 'Зенит Опт', inn: '7728123480' },
    { id: 'prostor-market', label: 'Простор Маркет', inn: '7729123481' },
    { id: 'nova-tech', label: 'Нова Тех', inn: '7730123482' },
    { id: 'impuls-biznes', label: 'Импульс Бизнес', inn: '7731123483' },
    { id: 'domino-grupp', label: 'Домино Групп', inn: '7732123484' },
    { id: 'fokus-finans', label: 'Фокус Финанс', inn: '7733123485' },
    { id: 'union-market', label: 'Юнион Маркет', inn: '7734123486' },
    { id: 'lava-pro', label: 'Лава Про', inn: '7735123487' },
    { id: 'radius-snab', label: 'Радиус Снаб', inn: '7736123488' },
    { id: 'vertical-plus', label: 'Вертикаль Плюс', inn: '7737123489' },
    { id: 'formula-rost', label: 'Формула Роста', inn: '7738123490' },
    { id: 'city-impuls', label: 'Сити Импульс', inn: '7739123491' },
    { id: 'optimus-trade', label: 'Оптимус Трейд', inn: '7740123492' },
    { id: 'neon-point', label: 'Неон Поинт', inn: '7741123493' },
  ],
  en: [
    { id: 'alpha-group', label: 'Alpha Group', inn: '7704123456' },
    { id: 'smart-market', label: 'SmartMarket', inn: '7705123457' },
    { id: 'eco-dom', label: 'EcoDom', inn: '7706123458' },
    { id: 'nord-line', label: 'Nord Line', inn: '7707123459' },
    { id: 'techno-park', label: 'TechnoPark', inn: '7708123460' },
    { id: 'beta-logistic', label: 'Beta Logistic', inn: '7709123461' },
    { id: 'green-city', label: 'Green City', inn: '7710123462' },
    { id: 'market-plus', label: 'Market Plus', inn: '7711123463' },
    { id: 'severnoe-siyanie', label: 'Northern Lights', inn: '7712123464' },
    { id: 'alfa-development', label: 'Alpha Development', inn: '7713123465' },
    { id: 'beta-tester-pro', label: 'Beta Tester Pro', inn: '7714123466' },
    { id: 'alfa-two', label: 'Alpha 2', inn: '7715123467' },
    { id: 'beta-two', label: 'Beta 2', inn: '7716123468' },
    { id: 'aurora-trade', label: 'Aurora Trade', inn: '7717123469' },
    { id: 'vector-media', label: 'Vector Media', inn: '7718123470' },
    { id: 'grand-stroy', label: 'Grand Stroy', inn: '7719123471' },
    { id: 'delta-service', label: 'Delta Service', inn: '7720123472' },
    { id: 'orbit-snab', label: 'Orbit Supply', inn: '7721123473' },
    { id: 'pixel-house', label: 'Pixel House', inn: '7722123474' },
    { id: 'sfera-logika', label: 'Sphere Logic', inn: '7723123475' },
    { id: 'forma-plus', label: 'Forma Plus', inn: '7724123476' },
    { id: 'meridian-pro', label: 'Meridian Pro', inn: '7725123477' },
    { id: 'magnetika', label: 'Magnetica', inn: '7726123478' },
    { id: 'atlas-grupp', label: 'Atlas Group', inn: '7727123479' },
    { id: 'zenit-opt', label: 'Zenit Opt', inn: '7728123480' },
    { id: 'prostor-market', label: 'Prostor Market', inn: '7729123481' },
    { id: 'nova-tech', label: 'Nova Tech', inn: '7730123482' },
    { id: 'impuls-biznes', label: 'Impulse Business', inn: '7731123483' },
    { id: 'domino-grupp', label: 'Domino Group', inn: '7732123484' },
    { id: 'fokus-finans', label: 'Focus Finance', inn: '7733123485' },
    { id: 'union-market', label: 'Union Market', inn: '7734123486' },
    { id: 'lava-pro', label: 'Lava Pro', inn: '7735123487' },
    { id: 'radius-snab', label: 'Radius Supply', inn: '7736123488' },
    { id: 'vertical-plus', label: 'Vertical Plus', inn: '7737123489' },
    { id: 'formula-rost', label: 'Growth Formula', inn: '7738123490' },
    { id: 'city-impuls', label: 'City Impulse', inn: '7739123491' },
    { id: 'optimus-trade', label: 'Optimus Trade', inn: '7740123492' },
    { id: 'neon-point', label: 'Neon Point', inn: '7741123493' },
  ],
}

const MODAL_COPY = {
  ru: {
    accountLabel: 'Клиент',
    accountPlaceholder: 'Название или ИНН',
    accountError: 'Выберите клиента из списка',
    amountLabel: 'Сумма перевода',
    amountPlaceholder: 'Введите сумму',
    submitLabel: 'Перевести',
    successLabel: 'успешно переведены',
    closeLabel: 'Вернуться в кабинет',
    rangeHint: (minAmount, maxAmount) => `Можно перевести от ${minAmount} до ${maxAmount}`,
    rangeError: (minAmount, maxAmount) => `Введите сумму от ${minAmount} до ${maxAmount}`,
  },
  en: {
    accountLabel: 'Client',
    accountPlaceholder: 'Name or TIN',
    accountError: 'Select a client from the list',
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
  amountLabel = null,
  submitLabel = null,
  showAccountSelect = true,
  showAmountHint = true,
  postpayWarningBalance = null,
  postpayWarningText = '',
  onSubmit,
}) {
  const locale = useAppLocale()
  const { closeModal } = useModal()
  const copy = MODAL_COPY[locale] ?? MODAL_COPY.ru
  const resolvedAmountLabel = amountLabel ?? copy.amountLabel
  const resolvedSubmitLabel = submitLabel ?? copy.submitLabel
  const transferClients = TRANSFER_CLIENTS[locale] ?? TRANSFER_CLIENTS.ru
  const [selectedAccountId, setSelectedAccountId] = useState('')
  const [amount, setAmount] = useState('')
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false)

  const parsedAmount = parseAmountValue(amount)
  const hasAccountError = showAccountSelect && !selectedAccountId
  const hasAmountError = parsedAmount < minAmount || parsedAmount > maxAmount
  const isPostpayWarningEnabled = postpayWarningText && Number.isFinite(postpayWarningBalance)
  const shouldUseFullPostpayAmount = isPostpayWarningEnabled && postpayWarningBalance <= 0
  const rawPostpayWarningAmount = isPostpayWarningEnabled
    ? Math.max(parsedAmount - Math.max(postpayWarningBalance, 0), 0)
    : 0
  const availablePostpayWarningAmount = isPostpayWarningEnabled
    ? Math.max(maxAmount - Math.max(postpayWarningBalance, 0), 0)
    : 0
  const postpayWarningAmount = Math.min(rawPostpayWarningAmount, availablePostpayWarningAmount)
  const postpayWarningAmountLabel = `${formatAmountValue(postpayWarningAmount)} ₽`
  const shouldShowPostpayWarning =
    isPostpayWarningEnabled && (shouldUseFullPostpayAmount || rawPostpayWarningAmount > 0)
  const resolvedPostpayWarningText =
    typeof postpayWarningText === 'function'
      ? postpayWarningText({
          amount: postpayWarningAmount,
          amountLabel: postpayWarningAmountLabel,
          isFullAmount: shouldUseFullPostpayAmount,
        })
      : postpayWarningText
  const minAmountLabel = `${formatCurrencyValue(minAmount)} ₽`
  const maxAmountLabel = `${formatCurrencyValue(maxAmount)} ₽`
  const hintText = copy.rangeHint(minAmountLabel, maxAmountLabel)
  const accountErrorText = isSubmitAttempted && hasAccountError ? copy.accountError : ''
  const errorText =
    (isSubmitAttempted && hasAmountError) || (isPostpayWarningEnabled && parsedAmount > maxAmount)
      ? copy.rangeError(minAmountLabel, maxAmountLabel)
      : ''
  const selectedClient = transferClients.find((client) => client.id === selectedAccountId) ?? null
  const transferAccountOptions = transferClients.map((client) => ({
    value: client.id,
    label: client.label,
    description: `ИНН ${client.inn}`,
  }))

  return (
    <div className="transfer-funds-modal">
      {showAccountSelect ? (
        <div className="transfer-funds-modal__field">
          <Select
            id="transfer-account"
            value={selectedAccountId}
            label={copy.accountLabel}
            options={transferAccountOptions}
            placeholder={copy.accountPlaceholder}
            error={accountErrorText}
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
        <Input
          id="transfer-amount"
          type="text"
          inputMode="numeric"
          size="m"
          value={amount}
          label={resolvedAmountLabel}
          hint={showAmountHint ? hintText : ''}
          error={errorText}
          placeholder={copy.amountPlaceholder}
          postfix="₽"
          clearable
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

      {shouldShowPostpayWarning ? (
        <div className="transfer-funds-modal__postpay-alert" role="status" aria-live="polite">
          <Icon
            name="exclamation-mark-outline"
            variant="plain"
            size="m"
            className="transfer-funds-modal__postpay-alert-icon"
          />
          <span className="transfer-funds-modal__postpay-alert-text">{resolvedPostpayWarningText}</span>
        </div>
      ) : null}

      <Button
        className="transfer-funds-modal__submit"
        type="button"
        size="m"
        preset="default"
        priority="primary"
        fullWidth
        onClick={() => {
          setIsSubmitAttempted(true)

          if (hasAccountError || hasAmountError) {
            return
          }

          onSubmit?.(parsedAmount, showAccountSelect ? selectedClient : null)
          closeModal()
        }}
      >
        {resolvedSubmitLabel}
      </Button>
    </div>
  )
}
