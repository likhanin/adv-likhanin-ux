export const colorTokenGroups = {
  text: {
    title: 'Text',
    description: 'Цвет текста',
  },
  bg: {
    title: 'Background',
    description: 'Цвета фона в разных состояниях',
  },
  backdrop: {
    title: 'Backdrop',
    description: 'Цвет затемнения под Modal, BottomSheet и другими overlay-слоями',
  },
  foreground: {
    title: 'Foreground',
    description:
      'Затемнение поверх изображений, чтобы текст или контент не терялся на изображениях',
  },
  border: {
    title: 'Border',
    description: 'Цвет обводки',
  },
  divider: {
    title: 'Divider',
    description: 'Цвет разделителя',
  },
  components: {
    title: 'Components',
    description: 'Цвета компонентов',
  },
} as const

export const colorTokens = {
  text: {
    primary: {
      ru: '#000000',
      global: '#000000',
      source: 'figma',
      description:
        'Цвет для заголовков, наборного текста и иконок на Page, Modal, Banner, Toast и Tooltip.',
    },
    secondary: {
      ru: '#757575',
      global: '#757575',
      source: 'figma',
      description: 'Цвет для второстепенного текста, подписей, метаданных и менее активных иконок.',
    },
    success: {
      ru: '#00a34c',
      global: '#00a34c',
      source: 'figma',
      description: 'Цвет успешных статусов, положительных значений и подтверждающих сообщений.',
    },
    error: {
      ru: '#ff4053',
      global: '#ff4053',
      source: 'figma',
      description: 'Цвет ошибок, отрицательных значений и критичных состояний.',
    },
    warning: {
      ru: '#fca400',
      global: '#fca400',
      source: 'figma',
      description: 'Цвет предупреждений и состояний, требующих внимания.',
    },
    constant: {
      primary: {
        ru: '#000000',
        global: '#000000',
        source: 'figma',
        description: 'Постоянный основной цвет текста, который не меняется между темами.',
      },
    },
    inverse: {
      primary: {
        ru: '#ffffff',
        global: '#ffffff',
        source: 'figma',
        description: 'Основной текст и иконки на инверсных контрастных поверхностях.',
      },
      constant: {
        primary: {
          ru: '#ffffff',
          global: '#ffffff',
          source: 'figma',
          description: 'Постоянный инверсный текст для темных постоянных поверхностей.',
        },
      },
    },
  },
  bg: {
    page: {
      ru: '#ffffff',
      global: '#ffffff',
      source: 'figma',
      description: 'Цвет фона для всей страницы.',
    },
    default: {
      ru: '#f2f1f0',
      global: '#f2f1f0',
      source: 'figma',
      description: 'Базовая нейтральная подложка для блоков и второстепенных поверхностей.',
    },
    surface: {
      ru: '#f5f5f5',
      global: '#f5f5f5',
      source: 'figma',
      description: 'Серый фон страниц, витрин и демонстрационных поверхностей.',
    },
    accent: {
      ru: '#f1f6ff',
      global: '#f1f6ff',
      source: 'figma',
      description: 'Мягкая акцентная подложка для промо и выделенных блоков.',
    },
    elevation1: {
      ru: '#ffffff',
      global: '#ffffff',
      source: 'figma',
      description: 'Цвет поверхности первого уровня: Modal, BottomSheet, карточки и панели.',
    },
    elevation2: {
      ru: '#f7f7f5',
      global: '#f7f7f5',
      source: 'figma',
      description: 'Цвет поверхности второго уровня для вложенных блоков и контента на elevation1.',
    },
    success: {
      ru: '#e8f7ee',
      global: '#e8f7ee',
      source: 'figma',
      description: 'Фон для успешных состояний и мягких success-индикаторов.',
    },
    error: {
      ru: '#fff0f1',
      global: '#fff0f1',
      source: 'figma',
      description: 'Фон для ошибок, предупреждений об ошибке и мягких danger-индикаторов.',
    },
    warning: {
      ru: '#ffecc9',
      global: '#ffecc9',
      source: 'figma',
      description: 'Фон для предупреждений и мягких warning-индикаторов.',
    },
    inverse: {
      elevation1: {
        ru: '#111318',
        global: '#111318',
        source: 'figma',
        description: 'Инверсная поверхность первого уровня, меняется относительно текущей темы.',
      },
      elevation2: {
        ru: '#1c1f26',
        global: '#1c1f26',
        source: 'figma',
        description: 'Инверсная поверхность второго уровня, меняется относительно текущей темы.',
      },
      constant: {
        page: {
          ru: '#000000',
          global: '#000000',
          source: 'figma',
          description: 'Постоянный темный фон страницы, который не меняется между темами.',
        },
        default: {
          ru: '#141414',
          global: '#141414',
          source: 'figma',
          description: 'Постоянная темная базовая поверхность.',
        },
        elevation1: {
          ru: '#1c1c1c',
          global: '#1c1c1c',
          source: 'figma',
          description: 'Постоянная темная поверхность первого уровня.',
        },
        elevation2: {
          ru: '#242424',
          global: '#242424',
          source: 'figma',
          description: 'Постоянная темная поверхность второго уровня.',
        },
      },
    },
  },
  backdrop: {
    fill: {
      ru: 'rgba(0, 0, 0, 0.56)',
      global: 'rgba(0, 0, 0, 0.56)',
      source: 'figma',
      description: 'Подложка для модальных окон, дроверов и затемнения под оверлеями.',
    },
  },
  foreground: {
    imageFill: {
      ru: 'rgba(0, 0, 0, 0.32)',
      global: 'rgba(0, 0, 0, 0.32)',
      source: 'figma',
      description: 'Оверлей поверх изображений или контента для повышения читаемости.',
    },
  },
  border: {
    default: {
      ru: '#ebeae8',
      global: '#ebeae8',
      source: 'figma',
      description: 'Основная обводка интерактивных элементов, карточек, полей и панелей.',
    },
    subtle: {
      ru: 'rgba(18, 24, 38, 0.08)',
      global: 'rgba(18, 24, 38, 0.08)',
      source: 'figma',
      description: 'Тонкая полупрозрачная обводка для легких поверхностей.',
    },
  },
  divider: {
    default: {
      ru: '#ebeae8',
      global: '#ebeae8',
      source: 'figma',
      description: 'Разделители, тонкие границы таблиц и второстепенных блоков.',
    },
  },
  components: {
    button: {
      primary: {
        ru: '#1f6fff',
        global: '#1f6fff',
        source: 'figma',
        description: 'Основной цвет заливки primary-кнопок и ключевых действий.',
      },
      primaryText: {
        ru: '#ffffff',
        global: '#ffffff',
        source: 'figma',
        description: 'Цвет текста и иконок на primary-кнопках.',
      },
    },
    control: {
      bg: {
        default: {
          ru: '#f2f1f0',
          global: '#f2f1f0',
          source: 'figma',
          description: 'Фон трека Slider в default-варианте.',
        },
        disabled: {
          ru: '#f2f1f0',
          global: '#f2f1f0',
          source: 'figma',
          description: 'Фон трека Slider в disabled-состоянии.',
        },
        overlay: {
          default: {
            ru: '#ffffff',
            global: '#ffffff',
            source: 'figma',
            description: 'Фон трека Slider в overlay-варианте.',
          },
          disabled: {
            ru: '#ffffff',
            global: '#ffffff',
            source: 'figma',
            description: 'Фон трека Slider в overlay disabled-состоянии.',
          },
        },
        inverse: {
          default: {
            ru: '#262624',
            global: '#262624',
            source: 'figma',
            description: 'Фон трека Slider в inverse-варианте.',
          },
          disabled: {
            ru: '#262624',
            global: '#262624',
            source: 'figma',
            description: 'Фон трека Slider в inverse disabled-состоянии.',
          },
        },
      },
    },
    slider: {
      defaultfilled: {
        ru: '#000000',
        global: '#000000',
        source: 'figma',
        description: 'Активная заполненная часть Slider в default и overlay вариантах.',
      },
    },
    bar: {
      defaultfilleddisabled: {
        ru: '#adaca8',
        global: '#adaca8',
        source: 'figma',
        description: 'Заполненная часть Slider в disabled-состоянии default и overlay вариантов.',
      },
      inverse: {
        defaultfilled: {
          ru: '#ffffff',
          global: '#ffffff',
          source: 'figma',
          description: 'Активная заполненная часть Slider в inverse-варианте.',
        },
        defaultfilleddisabled: {
          ru: '#878683',
          global: '#878683',
          source: 'figma',
          description: 'Заполненная часть Slider в disabled-состоянии inverse-варианта.',
        },
      },
    },
    badge: {
      error: {
        ru: '#ff4a63',
        global: '#ff4a63',
        source: 'manual',
        description: 'Фон бейджа ошибки или счётчика с критичным состоянием.',
      },
    },
    progress: {
      warning: {
        ru: '#fca400',
        global: '#fca400',
        source: 'manual',
        description: 'Заливка warning-прогресса и индикаторов с предупреждающим состоянием.',
      },
    },
    transferFundsVisual: {
      bgGlow: {
        ru: 'rgba(192, 125, 255, 0.28)',
        global: 'rgba(192, 125, 255, 0.28)',
        source: 'manual',
        description: 'Свечение фона success-иллюстрации перевода средств.',
      },
      bgStart: {
        ru: 'rgba(233, 220, 255, 0.92)',
        global: 'rgba(233, 220, 255, 0.92)',
        source: 'manual',
        description: 'Начальный цвет фона success-иллюстрации перевода средств.',
      },
      bgEnd: {
        ru: 'rgba(243, 238, 252, 0.96)',
        global: 'rgba(243, 238, 252, 0.96)',
        source: 'manual',
        description: 'Конечный цвет фона success-иллюстрации перевода средств.',
      },
      baseStart: {
        ru: '#b27cff',
        global: '#b27cff',
        source: 'manual',
        description: 'Начальный цвет основания монеты в success-иллюстрации перевода средств.',
      },
      baseEnd: {
        ru: '#8e4dff',
        global: '#8e4dff',
        source: 'manual',
        description: 'Конечный цвет основания монеты в success-иллюстрации перевода средств.',
      },
      highlightStrong: {
        ru: 'rgba(255, 255, 255, 0.72)',
        global: 'rgba(255, 255, 255, 0.72)',
        source: 'manual',
        description: 'Яркий блик монеты в success-иллюстрации перевода средств.',
      },
      highlight: {
        ru: 'rgba(255, 255, 255, 0.18)',
        global: 'rgba(255, 255, 255, 0.18)',
        source: 'manual',
        description: 'Мягкий блик монеты и основания в success-иллюстрации перевода средств.',
      },
      highlightBorder: {
        ru: 'rgba(255, 255, 255, 0.22)',
        global: 'rgba(255, 255, 255, 0.22)',
        source: 'manual',
        description: 'Внутренняя светлая обводка монеты в success-иллюстрации перевода средств.',
      },
      coinText: {
        ru: '#8a41ff',
        global: '#8a41ff',
        source: 'manual',
        description: 'Цвет символа на монете в success-иллюстрации перевода средств.',
      },
      coinStart: {
        ru: 'rgba(226, 188, 255, 0.98)',
        global: 'rgba(226, 188, 255, 0.98)',
        source: 'manual',
        description: 'Начальный цвет монеты в success-иллюстрации перевода средств.',
      },
      coinEnd: {
        ru: 'rgba(196, 131, 255, 0.96)',
        global: 'rgba(196, 131, 255, 0.96)',
        source: 'manual',
        description: 'Конечный цвет монеты в success-иллюстрации перевода средств.',
      },
      coinBorder: {
        ru: 'rgba(138, 65, 255, 0.2)',
        global: 'rgba(138, 65, 255, 0.2)',
        source: 'manual',
        description: 'Обводка монеты в success-иллюстрации перевода средств.',
      },
    },
    promoVisual: {
      shirtStart: {
        ru: '#ffd4dc',
        global: '#ffd4dc',
        source: 'manual',
        description: 'Начальный цвет декоративной футболки в промо-визуале.',
      },
      shirtMiddle: {
        ru: '#f6f1ff',
        global: '#f6f1ff',
        source: 'manual',
        description: 'Средний цвет декоративной футболки в промо-визуале.',
      },
      shirtEnd: {
        ru: '#d2f2ff',
        global: '#d2f2ff',
        source: 'manual',
        description: 'Конечный цвет декоративной футболки в промо-визуале.',
      },
      checkStart: {
        ru: '#d7f5ff',
        global: '#d7f5ff',
        source: 'manual',
        description: 'Начальный цвет бейджа с галочкой в промо-визуале.',
      },
      checkEnd: {
        ru: '#b5e0ff',
        global: '#b5e0ff',
        source: 'manual',
        description: 'Конечный цвет бейджа с галочкой в промо-визуале.',
      },
      checkText: {
        ru: '#1274b4',
        global: '#1274b4',
        source: 'manual',
        description: 'Цвет галочки в промо-визуале.',
      },
    },
    adsMeta: {
      locationStart: {
        ru: '#2891ff',
        global: '#2891ff',
        source: 'manual',
        description: 'Начальный цвет маркера геолокации в метаданных объявления.',
      },
      locationEnd: {
        ru: '#135de6',
        global: '#135de6',
        source: 'manual',
        description: 'Конечный цвет маркера геолокации в метаданных объявления.',
      },
    },
    adPreview: {
      defaultStart: {
        ru: '#ece7e1',
        global: '#ece7e1',
        source: 'manual',
        description: 'Начальный цвет дефолтного превью объявления.',
      },
      defaultEnd: {
        ru: '#ddd7d0',
        global: '#ddd7d0',
        source: 'manual',
        description: 'Конечный цвет дефолтного превью объявления.',
      },
      sheen: {
        ru: 'rgba(255, 255, 255, 0.48)',
        global: 'rgba(255, 255, 255, 0.48)',
        source: 'manual',
        description: 'Блик поверх превью объявления.',
      },
      dot: {
        ru: 'rgba(255, 255, 255, 0.74)',
        global: 'rgba(255, 255, 255, 0.74)',
        source: 'manual',
        description: 'Светлая точка декоративного превью объявления.',
      },
      mintStart: {
        ru: '#f1eee9',
        global: '#f1eee9',
        source: 'manual',
        description: 'Начальный цвет mint-варианта превью объявления.',
      },
      mintEnd: {
        ru: '#ddd8d1',
        global: '#ddd8d1',
        source: 'manual',
        description: 'Конечный цвет mint-варианта превью объявления.',
      },
      sandStart: {
        ru: '#f2efeb',
        global: '#f2efeb',
        source: 'manual',
        description: 'Начальный цвет sand-варианта превью объявления.',
      },
      sandEnd: {
        ru: '#ddd8d0',
        global: '#ddd8d0',
        source: 'manual',
        description: 'Конечный цвет sand-варианта превью объявления.',
      },
      roseStart: {
        ru: '#f4ebeb',
        global: '#f4ebeb',
        source: 'manual',
        description: 'Начальный цвет rose-варианта превью объявления.',
      },
      roseEnd: {
        ru: '#ded8d7',
        global: '#ded8d7',
        source: 'manual',
        description: 'Конечный цвет rose-варианта превью объявления.',
      },
      skyStart: {
        ru: '#eff4f7',
        global: '#eff4f7',
        source: 'manual',
        description: 'Начальный цвет sky-варианта превью объявления.',
      },
      skyEnd: {
        ru: '#dbe1e8',
        global: '#dbe1e8',
        source: 'manual',
        description: 'Конечный цвет sky-варианта превью объявления.',
      },
    },
  },
} as const

export type ColorTokens = typeof colorTokens
export type ColorTokenGroups = typeof colorTokenGroups

export { Primitives } from './primitives'
export type { PrimitiveTokens } from './primitives'
