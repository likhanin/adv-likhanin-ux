export const showcaseHeaderMock = {
  topLinks: [
    { label: 'Для бизнеса' },
    { label: 'Карьера в Авито' },
    { label: 'Помощь' },
    { label: 'Каталоги', caret: true },
    { label: '#яПомогаю' },
  ],
  categoryLinks: [
    { label: 'Авто' },
    { label: 'Недвижимость' },
    { label: 'Работа' },
    { label: 'Услуги' },
    { label: 'Ещё' },
  ],
  primaryAction: '+ Разместить объявление',
  secondaryAction: 'Мои объявления',
  actionIcons: [
    { icon: 'favorite' },
    { icon: 'bell' },
    { icon: 'chat' },
    { icon: 'cart' },
  ],
  avatar: { variant: 'cluster' },
}

export const showcaseSidebarMock = {
  profile: {
    title: 'ООО Ромашка',
    rating: '4,9',
    reviews: '124 отзыва',
  },
  wallet: {
    label: 'Баланс',
    amount: '120 000 ₽',
    note: 'Доступно для продвижения',
    action: 'Пополнить',
  },
  postpayDebt: {
    title: 'Постоплата',
    usageLabel: 'Использовано 45 000 из 300 000 ₽',
    dueLabel: 'Погасить до 20 мая',
    progress: 15,
  },
  navigation: [
    { href: '/overview', icon: 'stats', label: 'Сводка', active: true },
    { href: '/finance', icon: 'ruble', label: 'Финансы' },
    { href: '/clients', icon: 'star', label: 'Клиенты' },
    { href: '/employees', icon: 'team', label: 'Сотрудники' },
  ],
  redesign: {
    walletAmount: '120 000 ₽',
    userName: 'Максим',
  },
}

export const showcaseClientCardMock = {
  title: 'ООО Ромашка',
  price: 'Бюджет 120 000 ₽',
  meta: 'Активный клиент',
  location: 'Москва',
  state: 'Активен',
  stateTone: 'default',
  action: 'Открыть',
  tone: 'sky',
  views: 1240,
  favorites: 82,
  contacts: 36,
  chats: '6 новых сообщений',
  moreLabel: 'Ещё',
}

export const showcaseBudgetWidgetMock = {
  label: 'Бюджет кампании',
  amount: '120 000 ₽',
  note: 'План на май',
  action: 'Настроить',
}

export const showcaseFinanceSummaryMock = {
  icon: '₽',
  title: 'Финансовая сводка',
  description: 'Баланс, постоплата и расходы за выбранный период.',
  badge: 'май',
}
