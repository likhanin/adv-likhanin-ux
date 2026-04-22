import { useFeatureToggle } from '../store/featureToggles/useFeatureToggles'

function createKnowledgeBaseArticle({
  title,
  description,
  previewLabel,
  previewActionLabel,
  previewId = null,
  previewHidden = false,
  sections = [],
  note,
}) {
  return {
    title,
    description,
    previewLabel,
    previewActionLabel,
    previewId,
    previewHidden,
    sections,
    note,
  }
}

function createKnowledgeBaseDraftArticle(locale, title, options = {}) {
  const isEnglish = locale === 'en'

  return createKnowledgeBaseArticle({
    title,
    description: isEnglish
      ? 'This section is being prepared. The step-by-step guide and examples will appear here next.'
      : 'Этот раздел в подготовке. Здесь следующим шагом появятся инструкция, ограничения и примеры.',
    previewLabel: isEnglish ? `${title} preview` : `Превью раздела «${title}»`,
    previewActionLabel: isEnglish ? 'Open section' : 'Открыть раздел',
    previewId: options.previewId ?? null,
    sections: [
      {
        title: isEnglish ? 'What will be here' : 'Что будет в разделе',
        kind: 'bullet-list',
        items: isEnglish
          ? [
              'A short explanation of the scenario.',
              'A step-by-step instruction.',
              'Restrictions, caveats, and related materials.',
            ]
          : [
              'Короткое объяснение сценария.',
              'Пошаговая инструкция.',
              'Ограничения, нюансы и связанные материалы.',
            ],
      },
    ],
    note: isEnglish
      ? 'The content team is still assembling this material.'
      : 'Команда еще собирает материал для этого раздела.',
  })
}

export function useAppLocale() {
  return useFeatureToggle('englishLocale') ? 'en' : 'ru'
}

export function getLocaleTag(locale) {
  return locale === 'en' ? 'en-US' : 'ru-RU'
}

export function getAppCopy(locale = 'ru') {
  if (locale === 'en') {
    return {
      common: {
        close: 'Close',
      },
      header: {
        topNavAriaLabel: 'Top menu',
        categoriesAriaLabel: 'Categories',
      },
      sidebar: {
        navAriaLabel: 'Cabinet sections',
        redesign: {
          title: 'Cabinet',
          cabinetGroupLabel: 'Cabinet',
          toolsGroupLabel: 'Tools',
          roles: ['Employee', 'Overlord'],
          userName: 'Maxim',
          financeBadge: 'New',
          items: {
            overview: 'Overview',
            messages: 'Messages',
            finance: 'Finance',
            employees: 'Employees',
            clients: 'Clients',
          demandAnalytics: 'Demand analytics',
          statistics: 'Statistics',
          proSubscription: 'Pro subscription',
          documents: 'Documents',
        },
      },
      },
      footer: {
        linksAriaLabel: 'Footer links',
        socialsAriaLabel: 'Social media',
      },
      drawer: {
        featureTogglesTitle: 'Feature toggles',
        knowledgeBaseTitle: 'Knowledge base',
        overlayCloseLabel: 'Close drawer',
        titles: {
          featureToggles: 'Feature toggles',
          knowledgeBase: 'Knowledge base',
        },
      },
      modal: {
        overlayCloseLabel: 'Close modal window',
      },
      featureToggles: {
        description: 'Switch features for local scenario checks.',
        resetLabel: 'Reset',
        toggleLabel: 'Toggle',
        labels: {
          financeNewContent: 'Finance with postpay 1',
          financeNewContentV2: 'Finance with postpay 2',
          darkTheme: 'Dark theme',
          englishLocale: 'English localization',
          redesignEnabled: 'Switch to redesign',
        },
        descriptions: {
          financeNewContent:
            'Enables postpay inside the wallet and adds the third account: postpay limit.',
          financeNewContentV2:
            'Enables postpay with a negative wallet balance and keeps postpay progress separate from the wallet.',
          darkTheme: 'Enables the black theme on the production design.',
          englishLocale: 'Changes the language across the entire project and in other feature toggles.',
          redesignEnabled: 'Switches the whole project to the block redesign with a grey background.',
        },
      },
      finance: {
        clientNames: [
          'Alpha Group',
          'SmartMarket',
          'EcoDom',
          'Nord Line',
          'TechnoPark',
          'Beta Logistic',
          'Green City',
          'Market Plus',
        ],
        chargeToClient: (clientId) => `Charge to client ID${clientId}`,
        balanceTopUp: 'Balance top up',
        postpayReceivedOfTotal: (received, total) => `Received ${received} of ${total} ₽`,
        postpayRequestTitle: 'Postpay request',
        operationsTitle: 'Operations',
        operationsFilterAriaLabel: 'Operations filter',
        datePickerDialogLabel: 'Select period',
        previousMonthLabel: 'Previous month',
        nextMonthLabel: 'Next month',
      postpayModal: {
        description: 'Choose the amount and repayment period.',
        amountLabel: 'Amount',
        clearAmountLabel: 'Clear amount',
        submitLabel: 'Request',
        rangeHint: (minAmount, maxAmount) => `${minAmount} ₽ to ${maxAmount} ₽`,
        rangeError: (minAmount, maxAmount) => `Enter an amount from ${minAmount} ₽ to ${maxAmount} ₽`,
      },
        sidebarDebtTitle: (amount) => `Debt ${amount}`,
        sidebarDebtDescription: 'Return it by April 15, 2026',
        sidebarDebtAction: 'Return',
      },
      avatar: {
        alt: 'Profile avatar',
      },
      knowledgeBase: {
        openLabel: 'Open knowledge base',
        shareLabel: 'Share',
        previewDisabledLabel: 'Preview unavailable',
        navIntroLabel: 'First steps in the cabinet',
        navIntroArticleId: 'first-steps',
        defaultArticleId: 'add-employee',
        navigation: [
          {
            title: 'Agency',
            items: [{ label: 'Add employee', articleId: 'add-employee' }],
          },
          {
            title: 'Working with clients',
            items: [
              { label: 'Client verification', articleId: 'client-verification' },
              { label: 'Add client', articleId: 'add-client' },
              { label: 'Client collaboration models', articleId: 'client-collaboration-models' },
              { label: 'Assign client', articleId: 'unassign-client' },
              { label: 'Client list', articleId: 'clients-list' },
              { label: 'Agency commission', articleId: 'agency-commission' },
            ],
          },
          {
            title: 'Core tools',
            items: [
              { label: 'Finance', articleId: 'finance' },
              { label: 'Demand analytics', articleId: 'demand-analytics' },
              { label: 'API', articleId: 'api' },
            ],
          },
        ],
        articles: {
          'add-employee': createKnowledgeBaseArticle({
            title: 'Add employee',
            description:
              'Invite teammates, edit access rights, and distribute work across client accounts.',
            previewLabel: 'Employees screen preview',
            previewActionLabel: 'Invite employee',
            previewId: 'add-employee',
            sections: [
              {
                title: 'Which profile can be added',
                kind: 'bullet-list',
                items: [
                  'Without an active subscription and personal manager',
                  'Not registered as a company',
                  'Without employees',
                  'Not registered to agency requisites',
                  'Not an employee of a different profile type',
                ],
              },
              {
                title: 'How to add',
                kind: 'step-list',
                items: [
                  'Open “Employees” and click “Invite employee”.',
                  'Copy the invitation link and send it to the teammate.',
                  'After they accept, configure access rights and choose which clients they can work with.',
                ],
                actionLabel: 'Invite employee',
              },
              {
                title: 'Access rights',
                kind: 'definition-list',
                items: [
                  {
                    title: 'View client profiles',
                    description:
                      'Works well for support specialists. Employees can review client profiles but cannot edit them.',
                  },
                  {
                    title: 'Full access',
                    description: 'Best for teammates who directly manage client work.',
                  },
                ],
              },
            ],
            note:
              'This tab is available only to the profile owner with the “Basic” subscription. You can add employees only when the agency balance is at least 600 RUB.',
          }),
          'first-steps': createKnowledgeBaseDraftArticle('en', 'First steps in the cabinet', {
            previewId: 'first-steps',
          }),
          'client-verification': createKnowledgeBaseDraftArticle('en', 'Client verification', {
            previewId: 'client-verification',
          }),
          'add-client': createKnowledgeBaseDraftArticle('en', 'Add client', {
            previewId: 'add-client',
          }),
          'client-collaboration-models': createKnowledgeBaseDraftArticle(
            'en',
            'Client collaboration models',
          ),
          'unassign-client': createKnowledgeBaseDraftArticle('en', 'Assign client'),
          'clients-list': createKnowledgeBaseDraftArticle('en', 'Client list', {
            previewId: 'clients-list',
          }),
          'agency-commission': createKnowledgeBaseDraftArticle('en', 'Agency commission'),
          finance: createKnowledgeBaseDraftArticle('en', 'Finance', { previewId: 'finance' }),
          'demand-analytics': createKnowledgeBaseDraftArticle('en', 'Demand analytics', {
            previewId: 'demand-analytics',
          }),
          api: createKnowledgeBaseDraftArticle('en', 'API'),
        },
      },
      ads: {
        moreLabel: 'More',
      },
    }
  }

  return {
    common: {
      close: 'Закрыть',
    },
    header: {
      topNavAriaLabel: 'Верхнее меню',
      categoriesAriaLabel: 'Категории',
    },
    sidebar: {
      navAriaLabel: 'Разделы кабинета',
      redesign: {
        title: 'Кабинет',
        cabinetGroupLabel: 'Кабинет',
        toolsGroupLabel: 'Инструменты',
        roles: ['Сотрудник', 'Владыка'],
        userName: 'Максим',
        financeBadge: 'Новое',
        items: {
          overview: 'Обзор',
          messages: 'Сообщения',
          finance: 'Финансы',
          employees: 'Сотрудники',
          clients: 'Клиенты',
          demandAnalytics: 'Аналитика спроса',
          statistics: 'Статистика',
          proSubscription: 'Подписка Pro',
          documents: 'Документы',
        },
      },
    },
    footer: {
      linksAriaLabel: 'Ссылки в футере',
      socialsAriaLabel: 'Социальные сети',
    },
    drawer: {
      featureTogglesTitle: 'Фича тогглы',
      knowledgeBaseTitle: 'База знаний',
      overlayCloseLabel: 'Закрыть drawer',
      titles: {
        featureToggles: 'Фича тогглы',
        knowledgeBase: 'База знаний',
      },
    },
    modal: {
      overlayCloseLabel: 'Закрыть модальное окно',
    },
    featureToggles: {
      description: 'Переключай фичи для локальной проверки сценариев.',
      resetLabel: 'Сбросить',
      toggleLabel: 'Переключить',
      labels: {
        financeNewContent: 'Финансы с постоплатой 1',
        financeNewContentV2: 'Финансы с постоплатой 2',
        darkTheme: 'Черная тема',
        englishLocale: 'Локализация на английский',
        redesignEnabled: 'Переключиться на редизайн',
      },
      descriptions: {
        financeNewContent:
          'Включает постоплату внутри кошелька, добавляет третий счет — лимит постоплаты.',
        financeNewContentV2:
          'Включает постоплату с уходом в минус. Прогресс постоплаты отдельно от кошелька.',
        darkTheme: 'Включает черную тему на продовом дизайне.',
        englishLocale: 'Меняет язык во всем проекте и в других фичатогглах.',
        redesignEnabled: 'Весь проект переходит на блочку с серым фоном.',
      },
    },
    finance: {
      clientNames: [
        '«Альфа Групп»',
        '«СмартМаркет»',
        '«ЭкоДом»',
        '«Норд Лайн»',
        '«Технопарк»',
        '«Бета Логистик»',
        '«Грин Сити»',
        '«Маркет Плюс»',
      ],
      chargeToClient: (clientId) => `Списание на клиента ID${clientId}`,
      balanceTopUp: 'Пополнение баланса',
      postpayReceivedOfTotal: (received, total) => `Получено ${received} из ${total} ₽`,
      postpayRequestTitle: 'Запрос постоплаты',
      operationsTitle: 'Операции',
      operationsFilterAriaLabel: 'Фильтр операций',
      datePickerDialogLabel: 'Выбор периода',
      previousMonthLabel: 'Предыдущий месяц',
      nextMonthLabel: 'Следующий месяц',
      postpayModal: {
        description: 'Выберите сумму и период погашения.',
        amountLabel: 'Сумма',
        clearAmountLabel: 'Очистить сумму',
        submitLabel: 'Запросить',
        rangeHint: (minAmount, maxAmount) => `от ${minAmount} ₽ до ${maxAmount} ₽`,
        rangeError: (minAmount, maxAmount) => `Введите сумму от ${minAmount} ₽ до ${maxAmount} ₽`,
      },
      sidebarDebtTitle: (amount) => `Задолженность ${amount}`,
      sidebarDebtDescription: 'Верните до 15 апреля 2026',
      sidebarDebtAction: 'Вернуть',
    },
    avatar: {
      alt: 'Аватар профиля',
    },
    knowledgeBase: {
      openLabel: 'Открыть базу знаний',
      shareLabel: 'Поделиться',
      previewDisabledLabel: 'Превью недоступно',
      navIntroLabel: 'Первые шаги в кабинете',
      navIntroArticleId: 'first-steps',
      defaultArticleId: 'add-employee',
      navigation: [
        {
          title: 'Агентство',
          items: [{ label: 'Добавление сотрудника', articleId: 'add-employee' }],
        },
        {
          title: 'Работа с клиентами',
          items: [
            { label: 'Проверка клиента', articleId: 'client-verification' },
            { label: 'Добавление клиента', articleId: 'add-client' },
            { label: 'Модели работы с клиентами', articleId: 'client-collaboration-models' },
            { label: 'Открепление клиента', articleId: 'unassign-client' },
            { label: 'Список клиентов', articleId: 'clients-list' },
            { label: 'Комиссия агентства', articleId: 'agency-commission' },
          ],
        },
        {
          title: 'Главные инструменты',
          items: [
            { label: 'Финансы', articleId: 'finance' },
            { label: 'Аналитика спроса', articleId: 'demand-analytics' },
            { label: 'API', articleId: 'api' },
          ],
        },
      ],
      articles: {
        'add-employee': createKnowledgeBaseArticle({
          title: 'Добавление сотрудника',
          description:
            'Подключайте коллег, редактируйте права доступа и распределяйте работу по клиентам.',
          previewLabel: 'Превью экрана сотрудников',
          previewActionLabel: 'Пригласить сотрудника',
          previewId: 'add-employee',
          sections: [
            {
              title: 'Какой профиль можно добавить',
              kind: 'bullet-list',
              items: [
                'Без активного тарифа и персонального менеджера',
                'Не зарегистрированный как компания',
                'Без сотрудников',
                'Не зарегистрированный на реквизиты агентства',
                'Не сотрудник другого профиля',
              ],
            },
            {
              title: 'Как добавить',
              kind: 'step-list',
              items: [
                'Откройте «Сотрудники» и выберите «Пригласить сотрудника».',
                'Скопируйте ссылку-приглашение и отправьте сотруднику.',
                'После принятия приглашения настройте права доступа и выберите, с какими клиентами будет работать сотрудник.',
              ],
              actionLabel: 'Пригласить сотрудника',
            },
            {
              title: 'Права доступа',
              kind: 'definition-list',
              items: [
                {
                  title: 'Просмотр профилей клиентов',
                  description:
                    'Подойдёт для сотрудников службы заботы. Сотрудники не смогут вносить изменения.',
                },
                {
                  title: 'Полный доступ',
                  description: 'Подойдёт для сотрудников, которые ведут клиентов.',
                },
              ],
            },
          ],
          note:
            'Вкладка доступна только владельцу профиля с «Базовой» подпиской. Добавлять сотрудников можно, если на балансе агентского кабинета не меньше 600 ₽.',
        }),
        'first-steps': createKnowledgeBaseArticle({
          title: 'Первые шаги в кабинете',
          description: '',
          previewLabel: 'Превью первых шагов в кабинете',
          previewActionLabel: 'Начать',
          previewId: 'first-steps',
          sections: [
            {
              title: 'Для старта работы:',
              kind: 'step-list',
              items: [
                'Проверьте, целевой ли клиент, чтобы понимать, будет ли начисляться комиссия',
                'Добавьте клиента в кабинет: выберите модель работы и дождитесь подтверждения',
                'Подключите сотрудников и настройте доступ к клиентам',
              ],
              actionLabel: 'Начать',
            },
            {
              title: 'Поможем разобраться с основными действиями в кабинете',
              kind: 'bullet-list',
              items: [
                'Выберите нужную задачу слева — откроется пошаговая инструкция.',
                'База знаний всегда доступна в нижнем правом углу.',
              ],
            },
          ],
        }),
        'client-verification': createKnowledgeBaseArticle({
          title: 'Проверка клиента',
          description:
            'Проверка покажет, получите ли вы комиссию за траты клиента на Авито. Выплата комиссии зависит от статуса клиента.',
          previewLabel: 'Превью проверки клиента',
          previewActionLabel: 'Проверить клиента',
          previewId: 'client-verification',
          sections: [
            {
              title: 'Целевые',
              kind: 'paragraphs',
              items: [
                'Клиенты, у которых не было значительных трат на Авито до подключения к агентству. Подробнее об условиях выплаты комиссии можно узнать в соглашении о премировании или у менеджера',
              ],
            },
            {
              title: 'Нецелевые',
              kind: 'paragraphs',
              items: [
                'Клиенты, которые уже активно пользовались платными услугами Авито до подключения к агентству. Такого клиента можно добавить в кабинет, но комиссия за их траты обычно не начисляется.',
                'Подробнее о комиссии — в разделе «Комиссия агентства».',
              ],
            },
            {
              title: 'Как проверить',
              kind: 'step-list',
              items: [
                'Откройте «Клиенты» → «Проверить клиента»',
                'Введите ИНН клиента (можно до 100 ИНН через запятую)',
                'Нажмите «Отправить»',
                'Результат придёт на почту, указанную при регистрации кабинета',
              ],
              actionLabel: 'Проверить клиента',
            },
            {
              title: 'Важно',
              kind: 'paragraphs',
              items: [
                'Лучше отправлять приглашение клиенту сразу после проверки — статус клиента зависит от вертикали и действует ограниченное время. Если клиент долго не принимает приглашение, статус может измениться.',
              ],
            },
          ],
          note:
            'Статус клиента обычно сохраняется: до 14 дней после проверки и до 7 дней после отправки приглашения.',
        }),
        'add-client': createKnowledgeBaseArticle({
          title: 'Добавление клиента',
          description:
            'Добавьте клиента, чтобы получить доступ к его профилю и управлять объявлениями и продвижением.',
          previewLabel: 'Превью добавления клиента',
          previewActionLabel: 'Добавить клиента',
          previewId: 'add-client',
          sections: [
            {
              title: 'Как проверить',
              kind: 'step-list',
              items: [
                'Откройте раздел «Клиенты» → «Добавить клиента»',
                'Введите Авито ID клиента: он должен быть верифицирован как ИП или юрлицо',
                'Выберите модель работы: оплата на агентстве или оплата на клиенте',
                'Отправьте приглашение. Оно придёт клиенту в личном кабинете на Авито и на почту, привязанную к профилю',
                'Доступ к профилю откроется, когда клиент подтвердит приглашение',
              ],
              actionLabel: 'Добавить клиента',
            },
            {
              title: 'Если не получается добавить',
              kind: 'bullet-list',
              items: [
                'ИНН профиля клиента не верифицирован. Клиенту нужно пройти верификацию профиля как юрлицо.',
                'Клиент уже работает с агентством. Чтобы подключиться к вам, клиенту нужно сначала открепиться от текущего агентства.',
                'У клиента уже есть открытая заявка на приглашение. На этот или один из связанных профилей клиента уже отправлено приглашение — дождитесь ответа.',
                'Аккаунт клиента удалён. Такого клиента подключить не получится.',
              ],
            },
          ],
        }),
        'client-collaboration-models': createKnowledgeBaseArticle({
          title: 'Модели работы с клиентами',
          description: 'В агентском кабинете доступны две модели работы с клиентами.',
          previewHidden: true,
          sections: [
            {
              title: 'Оплата на агентстве',
              intro: 'Агентство работает через отдельный агентский профиль клиента.',
              kind: 'bullet-list',
              items: [
                'Реквизиты в профиле — агентства',
                'Агентство оплачивает продвижение и услуги',
                'Закрывающие документы формируются на агентство',
                'У агентства полный доступ к управлению профилем',
              ],
            },
            {
              title: 'Оплата на клиенте',
              intro: 'Агентство получает доступ к профилю клиента.',
              kind: 'bullet-list',
              items: [
                'Реквизиты в профиле — клиента',
                'Клиент сам пополняет кошелёк',
                'Документы формируются на клиента',
                'Клиент может ограничить доступ агентства',
              ],
            },
          ],
        }),
        'unassign-client': createKnowledgeBaseArticle({
          title: 'Открепление клиента',
          description:
            'Клиент может открепиться от агентства самостоятельно или по запросу агентства — порядок зависит от модели работы.',
          previewHidden: true,
          sections: [
            {
              title: 'Открепление при оплате на агентстве',
              kind: 'paragraphs',
              items: [
                'Чтобы открепить такого клиента, обратитесь в поддержку Авито. Перед откреплением рекомендуется вывести деньги, на которые агентство пополняло профиль клиента. После открепления реквизиты профиля сменятся с агентских на реквизиты клиента.',
              ],
            },
            {
              title: 'Открепление при оплате на клиенте',
              kind: 'step-list',
              items: [
                'Дождитесь заявки на открепление в клиентском профиле',
                'Откройте уведомление о заявке на почте или в агентском кабинете',
                'Подтвердите открепление сразу или дождитесь автоматического отключения — заявка выполнится в течение 2 рабочих дней',
              ],
              outro:
                'В это время вы можете связаться с клиентом и уточнить причину отключения. Пока заявка активна, агентство не может переходить в профиль клиента.',
            },
          ],
          note: 'После открепления агентство потеряет доступ к профилю клиента.',
        }),
        'clients-list': createKnowledgeBaseArticle({
          title: 'Список клиентов',
          description:
            'Здесь отображаются все клиенты агентства, их статус и основная статистика. Отсюда можно перейти в профиль клиента.',
          previewLabel: 'Превью списка клиентов',
          previewActionLabel: 'Перейти в список клиентов',
          previewId: 'clients-list',
          sections: [
            {
              title: 'Что можно сделать',
              kind: 'bullet-list',
              items: [
                'Найти клиента по Авито ID',
                'Посмотреть статус приглашения клиента',
                'Перейти в профиль клиента после подтверждения приглашения',
                'Посмотреть краткую статистику по клиенту',
              ],
              actionLabel: 'Перейти в список клиентов',
            },
            {
              title: 'Важно',
              kind: 'paragraphs',
              items: [
                'В списке отображаются основные параметры клиента: статус подключения, модель работы, баланс кошелька, авансы, расходы и краткая статистика.',
                'В разделе «Клиенты» можно настроить, какие параметры показывать: расходы, контакты, категорию, подписку, конверсию, просмотры и так далее.',
                'Детальную информацию можно посмотреть в профиле клиента.',
              ],
            },
          ],
        }),
        'agency-commission': createKnowledgeBaseArticle({
          title: 'Комиссия агентства',
          description:
            'Агентство может получать комиссию за расходы клиентов на платные услуги Авито.',
          previewHidden: true,
          sections: [
            {
              title: 'Целевые',
              kind: 'paragraphs',
              items: [
                'Если клиент не пользовался платными услугами до подключения к агентству и начинает их использовать после подключения, агентство может получать комиссию с его расходов.',
              ],
            },
            {
              title: 'Нецелевые',
              kind: 'paragraphs',
              items: [
                'Если клиент уже пользовался платными услугами до подключения к агентству, комиссия может начисляться только с роста его расходов на рекламу.',
                'Такой рост расходов называется аплифтом.',
              ],
            },
            {
              title: 'Аплифт',
              kind: 'paragraphs',
              items: [
                'Разница между текущими расходами клиента на платные услуги и его прежними расходами до подключения к агентству.',
              ],
            },
            {
              kind: 'paragraphs',
              items: [
                'Условия определения целевого клиента и расчёта комиссии зависят от вертикали.',
                'Подробные правила указаны в соглашении о премировании. Если у вас остались вопросы, обратитесь к своему менеджеру.',
              ],
            },
          ],
        }),
        finance: createKnowledgeBaseArticle({
          title: 'Финансы',
          description: 'В разделе показаны два баланса: баланс агентства и кошелёк.',
          previewLabel: 'Превью финансов',
          previewActionLabel: 'Перейти в финансы',
          previewId: 'finance',
          sections: [
            {
              title: 'Баланс агентства',
              kind: 'paragraphs',
              items: [
                'Деньги для распределения между клиентами.',
                'Пополнить можно только банковским платежом со счёта юрлица.',
                'Зачисление занимает до 3 рабочих дней.',
              ],
            },
            {
              title: 'Кошелёк',
              kind: 'paragraphs',
              items: ['Деньги для оплаты услуг продвижения в агентском профиле.'],
              actionLabel: 'Перейти в финансы',
            },
            {
              title: 'Отличия',
              kind: 'paragraphs',
              items: [
                'Баланс агентства — для работы с клиентами.',
                'Кошелёк — для оплаты услуг в самом кабинете.',
              ],
            },
          ],
        }),
        'demand-analytics': createKnowledgeBaseArticle({
          title: 'Аналитика спроса',
          description: 'Оценивайте спрос и потенциал категории перед запуском клиента.',
          previewLabel: 'Превью аналитики спроса',
          previewActionLabel: 'Перейти в аналитику спроса',
          previewId: 'demand-analytics',
          sections: [
            {
              title: 'Как пользоваться',
              kind: 'step-list',
              items: [
                'Откройте раздел «Аналитика спроса»',
                'Выберите категорию и регион и укажите период',
                'Изучите показатели спроса и динамику — данные можно выгрузить',
              ],
              actionLabel: 'Перейти в аналитику спроса',
            },
          ],
          note:
            'Показатели помогают оценить потенциал, но не гарантируют результат продвижения. Для разных регионов и категорий спрос может существенно отличаться.',
        }),
        api: createKnowledgeBaseArticle({
          title: 'API',
          description:
            'Для работы с агентским кабинетом доступно публичное API. Оно позволяет автоматизировать работу с клиентами и статистикой.',
          previewHidden: true,
          sections: [
            {
              title: 'Что можно делать через API',
              kind: 'bullet-list',
              items: [
                'Переводить средства клиентам (для модели «оплата на агентстве»)',
                'Работать со списком клиентов: проверять клиента на целевого и отправлять приглашения',
                'Получать статус приглашений и верификации клиентов',
                'Просматривать статистику клиентов',
              ],
            },
          ],
          note:
            'Чтобы подключить API и получить документацию, обратитесь к своему менеджеру.',
        }),
      },
    },
    ads: {
      moreLabel: 'Ещё',
    },
  }
}
