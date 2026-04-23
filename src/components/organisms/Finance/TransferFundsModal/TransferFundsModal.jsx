import { useEffect, useState } from 'react'
import { Button } from '../../../atoms/Button/Button'
import { InputField } from '../../../atoms/InputField/InputField'
import { SearchSelectField } from '../../../atoms/SearchSelectField/SearchSelectField'
import { useAppLocale } from '../../../../i18n/useAppLocale'
import { useModal } from '../../../../store/modal/useModal'
import { useFeatureToggle } from '../../../../store/featureToggles/useFeatureToggles'
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
    accountEmptyLabel: 'Клиенты не найдены',
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
    accountEmptyLabel: 'No clients found',
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
  submitLabel = null,
  successLabel = null,
  closeLabel = null,
  showAccountSelect = true,
  showAmountHint = true,
  onSubmit,
}) {
  const locale = useAppLocale()
  const isRedesignEnabled = useFeatureToggle('redesignEnabled')
  const { closeModal, updateModal } = useModal()
  const copy = MODAL_COPY[locale] ?? MODAL_COPY.ru
  const resolvedSubmitLabel = submitLabel ?? copy.submitLabel
  const resolvedSuccessLabel = successLabel ?? copy.successLabel
  const resolvedCloseLabel = closeLabel ?? copy.closeLabel
  const transferClients = TRANSFER_CLIENTS[locale] ?? TRANSFER_CLIENTS.ru
  const [selectedAccountId, setSelectedAccountId] = useState('')
  const [amount, setAmount] = useState('')
  const [submittedAmount, setSubmittedAmount] = useState(0)
  const [isSuccessState, setIsSuccessState] = useState(false)
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false)

  const parsedAmount = parseAmountValue(amount)
  const hasOutOfRangeError = parsedAmount > 0 && (parsedAmount < minAmount || parsedAmount > maxAmount)
  const hasAccountError = showAccountSelect && !selectedAccountId
  const hasAmountError = parsedAmount < minAmount || parsedAmount > maxAmount
  const minAmountLabel = `${formatCurrencyValue(minAmount)} ₽`
  const maxAmountLabel = `${formatCurrencyValue(maxAmount)} ₽`
  const hintText = copy.rangeHint(minAmountLabel, maxAmountLabel)
  const accountErrorText = isSubmitAttempted && hasAccountError ? copy.accountError : ''
  const errorText =
    isSubmitAttempted && hasOutOfRangeError ? copy.rangeError(minAmountLabel, maxAmountLabel) : ''
  const successHeading = `${formatCurrencyValue(submittedAmount)} ₽ ${resolvedSuccessLabel}`
  const selectedClient = transferClients.find((client) => client.id === selectedAccountId) ?? null
  const transferAccountOptions = transferClients.map((client) => ({
    value: client.id,
    label: client.label,
    description: `ИНН ${client.inn}`,
    searchText: `${client.label} ${client.inn}`,
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
          <SearchSelectField
            id="transfer-account"
            value={selectedAccountId}
            label={copy.accountLabel}
            options={transferAccountOptions}
            placeholder={copy.accountPlaceholder}
            emptyLabel={copy.accountEmptyLabel}
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
        <InputField
          id="transfer-amount"
          type="text"
          inputMode="numeric"
          size="m"
          value={amount}
          label={copy.amountLabel}
          hint={showAmountHint ? hintText : ''}
          showHint={showAmountHint}
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
          setSubmittedAmount(parsedAmount)
          setIsSuccessState(true)
        }}
      >
        {resolvedSubmitLabel}
      </Button>
    </div>
  )
}
