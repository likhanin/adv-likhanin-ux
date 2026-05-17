import { createElement, useState } from 'react'
import { Avatar } from '../../components/atoms/Avatar/Avatar'
import { Badge } from '../../components/atoms/Badge/Badge'
import { Button } from '../../components/atoms/Button/Button'
import { Checkbox } from '../../components/atoms/Checkbox/Checkbox'
import { Counter } from '../../components/atoms/Counter/Counter'
import { Icon } from '../../components/atoms/Icon/Icon'
import { SectionLabel } from '../../components/atoms/SectionLabel/SectionLabel'
import { Slider } from '../../components/atoms/Slider/Slider'
import { StatItem } from '../../components/atoms/StatItem/StatItem'
import { StatusLabel } from '../../components/atoms/StatusLabel/StatusLabel'
import { Text } from '../../components/atoms/Text/Text'
import { ToggleSwitch } from '../../components/atoms/ToggleSwitch/ToggleSwitch'
import { Tooltip } from '../../components/atoms/Tooltip/Tooltip'
import { AppDropdown } from '../../components/molecules/Dropdown/AppDropdown/AppDropdown'
import { Input } from '../../components/molecules/Input/Input'
import { Select } from '../../components/molecules/Select/Select'
import { SidebarMenuLabel } from '../../components/molecules/Navigation/SidebarMenuLabel/SidebarMenuLabel'
import { TopActionIcon } from '../../components/molecules/Navigation/TopActionIcon/TopActionIcon'
import { AdsTabs } from '../../components/organisms/Ads/AdsTabs/AdsTabs'
import { iconRegistry } from '../icons/iconRegistry'

const selectOptions = [
  { value: 'analytics', label: 'Аналитика' },
  { value: 'clients', label: 'Клиенты' },
  { value: 'finance', label: 'Финансы' },
]

function StackPreview({ children }) {
  return createElement('div', { className: 'showcase-component-stack' }, children)
}

function PlaceholderPreview({ label }) {
  return createElement(
    'div',
    { className: 'showcase-component-placeholder' },
    createElement('span', null, label),
    createElement('p', null, 'Компонент пока не выделен в самостоятельный React-export.'),
  )
}

function ButtonPreview() {
  return createElement(StackPreview, null, [
    createElement(Button, { key: 'primary-s', type: 'button', size: 's', priority: 'primary' }, 'Text'),
    createElement(Button, { key: 'primary-m', type: 'button', size: 'm', priority: 'primary' }, 'Text'),
    createElement(Button, { key: 'secondary-m', type: 'button', size: 'm', priority: 'secondary' }, 'Text'),
  ])
}

function BadgePreview() {
  return createElement(StackPreview, null, [
    createElement(Badge, { key: 'default' }, 'Badge'),
    createElement(Badge, { key: 'small', size: 'small' }, 'Beta'),
  ])
}

function IconPreview() {
  const names = Object.keys(iconRegistry.text).slice(0, 3)

  return createElement(
    StackPreview,
    null,
    names.map((name) => createElement(Icon, { key: name, name })),
  )
}

function CounterPreview() {
  return createElement(StackPreview, null, [
    createElement(Counter, { key: 'xs' }, 2),
    createElement(Counter, { key: 's', size: 's' }, 12),
  ])
}

function SliderPreview() {
  const [controlledValue, setControlledValue] = useState(40)

  const setSafeControlledValue = (nextValue) => {
    const number = Number(String(nextValue).replace(/\D/g, ''))
    const normalizedValue = Number.isFinite(number) ? Math.min(Math.max(number, 0), 100) : 0

    setControlledValue(normalizedValue)
  }

  const section = (title, children, tone = 'default') =>
    createElement('section', { key: title, className: `showcase-slider-preview__section showcase-slider-preview__section--${tone}` }, [
      createElement('h4', { key: 'title' }, title),
      createElement('div', { key: 'items', className: 'showcase-slider-preview__items' }, children),
    ])

  const item = (label, sliderProps) =>
    createElement('label', { key: label, className: 'showcase-slider-preview__item' }, [
      createElement('span', { key: 'label' }, label),
      createElement(Slider, {
        key: 'slider',
        'aria-label': label,
        defaultValue: 50,
        max: 100,
        min: 0,
        ...sliderProps,
      }),
    ])

  return createElement('div', { className: 'showcase-slider-preview' }, [
    section('Variants', [
      item('Default', { variant: 'default' }),
      item('Overlay', { variant: 'overlay' }),
      item('Inverse', { variant: 'inverse' }),
    ]),
    section('States', [
      item('Disabled default', { disabled: true, defaultValue: 50 }),
      item('Disabled overlay', { disabled: true, variant: 'overlay', defaultValue: 50 }),
      item('Disabled inverse', { disabled: true, variant: 'inverse', defaultValue: 50 }),
    ]),
    section('Step example', [
      item('0–10, step 2', { defaultValue: 4, max: 10, min: 0, step: 2 }),
    ]),
    section('Controlled with Input', [
      createElement('div', { key: 'controlled', className: 'showcase-slider-preview__controlled' }, [
        createElement(Input, {
          key: 'input',
          label: 'Значение',
          max: 100,
          min: 0,
          postfix: '%',
          type: 'number',
          value: String(controlledValue),
          onChange: setSafeControlledValue,
        }),
        createElement(Slider, {
          key: 'slider',
          'aria-label': 'Controlled slider',
          max: 100,
          min: 0,
          step: 1,
          value: controlledValue,
          onChange: setControlledValue,
        }),
      ]),
    ], 'wide'),
  ])
}

function TextPreview() {
  return createElement(Text, { variant: 'h4' }, 'Авито помогает людям находить нужное')
}

function InputPreview() {
  const noop = () => {}
  const propsRows = [
    ['size', 's | m | l', 'Размер control.'],
    ['orientation', 'vertical | horizontal', 'Layout label/control/message.'],
    ['label', 'string', 'Подпись поля.'],
    ['hint', 'string', 'Подсказка под control.'],
    ['error', 'string', 'Текст ошибки, заменяет hint.'],
    ['disabled', 'boolean', 'Отключенное состояние.'],
    ['readOnly', 'boolean', 'Состояние только для чтения.'],
    ['clearable', 'boolean', 'Показывает кнопку очистки для заполненного поля.'],
    ['prefix', 'string', 'Текст перед значением.'],
    ['postfix', 'string', 'Текст после значения.'],
    ['leftIconName', 'string', 'Иконка слева из текущего Icon registry.'],
    ['rightIconName', 'string', 'Иконка справа из текущего Icon registry.'],
  ]
  const usedTokens = [
    'text.primary',
    'text.secondary',
    'text.error',
    'bg.default',
  ]
  const missingTokens = [
    'components.control.bg.default',
    'components.control.text.primary',
    'components.control.text.secondary',
    'components.control.text.error',
    'components.control.border.error',
    'components.control.border.focus',
    'components.control.bg.disabled',
    'components.control.radius.s',
    'components.control.radius.m',
    'components.control.radius.l',
  ]

  const section = (title, children, className = '') =>
    createElement('section', { key: title, className: ['showcase-input-preview__section', className].filter(Boolean).join(' ') }, [
      createElement('h4', { key: 'title' }, title),
      createElement('div', { key: 'items', className: 'showcase-input-preview__items' }, children),
    ])

  const documentation = createElement('section', { key: 'documentation', className: 'showcase-input-preview__docs' }, [
    createElement('div', { key: 'meta', className: 'showcase-input-preview__meta-grid' }, [
      createElement('div', { key: 'component' }, [
        createElement('span', { key: 'label' }, 'Компонент'),
        createElement('strong', { key: 'value' }, 'Input'),
      ]),
      createElement('div', { key: 'level' }, [
        createElement('span', { key: 'label' }, 'Уровень'),
        createElement('strong', { key: 'value' }, 'Molecule'),
      ]),
      createElement('div', { key: 'source' }, [
        createElement('span', { key: 'label' }, 'Source'),
        createElement('strong', { key: 'value' }, 'Перенесли из Figma Avito Design Team'),
      ]),
      createElement('div', { key: 'api' }, [
        createElement('span', { key: 'label' }, 'Public API'),
        createElement('strong', { key: 'value' }, 'Один компонент Input'),
      ]),
      createElement('div', { key: 'parts' }, [
        createElement('span', { key: 'label' }, 'Internal parts'),
        createElement('strong', { key: 'value' }, 'InputControl, InputLabel, InputMessage'),
      ]),
    ]),
    createElement(
      'p',
      { key: 'description', className: 'showcase-input-preview__description' },
      'Input — единый публичный компонент для текстового ввода. Вертикальный и горизонтальный варианты реализованы через orientation, а не через отдельные компоненты. InputControl, InputLabel и InputMessage являются внутренними частями и не отображаются как отдельные компоненты дизайн-системы.',
    ),
    createElement('div', { key: 'props', className: 'showcase-input-preview__docs-section' }, [
      createElement('h4', { key: 'title' }, 'Props'),
      createElement('table', { key: 'table', className: 'showcase-input-preview__props-table' }, [
        createElement('thead', { key: 'head' }, createElement('tr', null, [
          createElement('th', { key: 'prop' }, 'Prop'),
          createElement('th', { key: 'type' }, 'Type'),
          createElement('th', { key: 'note' }, 'Назначение'),
        ])),
        createElement('tbody', { key: 'body' }, propsRows.map(([prop, type, note]) =>
          createElement('tr', { key: prop }, [
            createElement('td', { key: 'prop' }, prop),
            createElement('td', { key: 'type' }, type),
            createElement('td', { key: 'note' }, note),
          ]),
        )),
      ]),
    ]),
    createElement('div', { key: 'tokens', className: 'showcase-input-preview__docs-columns' }, [
      createElement('div', { key: 'used', className: 'showcase-input-preview__docs-section' }, [
        createElement('h4', { key: 'title' }, 'Используемые токены'),
        createElement('ul', { key: 'list' }, usedTokens.map((token) => createElement('li', { key: token }, token))),
      ]),
      createElement('div', { key: 'missing', className: 'showcase-input-preview__docs-section' }, [
        createElement('h4', { key: 'title' }, 'Кандидаты на input-specific токены'),
        createElement('ul', { key: 'list' }, missingTokens.map((token) => createElement('li', { key: token }, token))),
      ]),
    ]),
    createElement(
      'p',
      { key: 'figma', className: 'showcase-input-preview__sync-note' },
      'Сверено с Figma: базовые размеры control, padding, radius, vertical/horizontal composition, label/message typography.',
    ),
  ])

  return createElement('div', { className: 'showcase-input-preview' }, [
    documentation,
    section('Figma sync states', [
      createElement(Input, {
        key: 'figma-empty',
        label: 'Заголовок',
        hint: 'Подсказка',
        placeholder: 'Сумма',
        prefix: 'от',
        postfix: '₽',
        leftIconName: 'search',
        onChange: noop,
      }),
      createElement(Input, {
        key: 'figma-focus',
        label: 'Заголовок',
        hint: 'Подсказка',
        placeholder: 'Сумма',
        prefix: 'от',
        postfix: '₽',
        leftIconName: 'search',
        autoFocus: true,
        onChange: noop,
      }),
      createElement(Input, {
        key: 'figma-filled',
        label: 'Заголовок',
        hint: 'Подсказка',
        value: '10 000',
        prefix: 'от',
        postfix: '₽',
        leftIconName: 'search',
        clearable: true,
        onChange: noop,
        onClear: noop,
      }),
      createElement(Input, {
        key: 'figma-error',
        label: 'Заголовок',
        value: '10 000',
        error: 'Ошибка',
        prefix: 'от',
        postfix: '₽',
        leftIconName: 'search',
        clearable: true,
        onChange: noop,
        onClear: noop,
      }),
    ]),
    section('Basic', [
      createElement(Input, { key: 'default', placeholder: 'Default', onChange: noop }),
      createElement(Input, { key: 'filled', label: 'Email', value: 'name@company.ru', onChange: noop }),
      createElement(Input, { key: 'placeholder', label: 'Email', placeholder: 'Введите email', onChange: noop }),
      createElement(Input, {
        key: 'hint',
        label: 'Рабочая почта',
        hint: 'Только доменная почта компании',
        placeholder: 'name@company.ru',
        onChange: noop,
      }),
    ]),
    section('States', [
      createElement(Input, {
        key: 'error',
        label: 'Email',
        value: 'mail',
        error: 'Введите корректный email',
        onChange: noop,
      }),
      createElement(Input, {
        key: 'disabled',
        label: 'Disabled',
        value: 'Недоступно',
        disabled: true,
        onChange: noop,
      }),
      createElement(Input, {
        key: 'readonly',
        label: 'Readonly',
        value: 'Только чтение',
        readOnly: true,
        onChange: noop,
      }),
      createElement(Input, {
        key: 'clearable',
        label: 'Clearable',
        value: 'Можно очистить',
        clearable: true,
        onChange: noop,
        onClear: noop,
      }),
    ]),
    section('Affixes', [
      createElement(Input, {
        key: 'prefix',
        label: 'Prefix',
        value: '15 000',
        prefix: 'от',
        onChange: noop,
      }),
      createElement(Input, {
        key: 'postfix',
        label: 'Postfix',
        value: '15 000',
        postfix: '₽',
        onChange: noop,
      }),
      createElement(Input, {
        key: 'both',
        label: 'Prefix + postfix',
        value: '15 000',
        prefix: 'от',
        postfix: '₽',
        leftIconName: 'ruble',
        onChange: noop,
      }),
    ]),
    section('Layout', [
      createElement(Input, {
        key: 'vertical',
        label: 'Вертикальный',
        hint: 'Label, control, message',
        placeholder: 'Vertical',
        orientation: 'vertical',
        onChange: noop,
      }),
      createElement(Input, {
        key: 'horizontal',
        label: 'Телефон',
        hint: 'Horizontal orientation',
        placeholder: '+7',
        orientation: 'horizontal',
        onChange: noop,
      }),
    ], 'showcase-input-preview__section--wide'),
    section('Sizes', [
      createElement(Input, { key: 's', size: 's', label: 'S', value: 'Small', onChange: noop }),
      createElement(Input, { key: 'm', size: 'm', label: 'M', value: 'Medium', onChange: noop }),
      createElement(Input, { key: 'l', size: 'l', label: 'L', value: 'Large', onChange: noop }),
    ], 'showcase-input-preview__section--sizes'),
  ])
}

function SelectPreview() {
  const [controlledValue, setControlledValue] = useState('clients')
  const noop = () => {}
  const section = (title, children) =>
    createElement('section', { key: title, className: 'showcase-input-preview__section' }, [
      createElement('h4', { key: 'title' }, title),
      createElement('div', { key: 'items', className: 'showcase-input-preview__items' }, children),
    ])

  return createElement('div', { className: 'showcase-input-preview' }, [
    section('Default', [
      createElement(Select, {
        key: 'placeholder',
        placeholder: 'Выберите раздел',
        options: selectOptions,
        onChange: noop,
      }),
      createElement(Select, {
        key: 'selected',
        value: 'analytics',
        options: selectOptions,
        onChange: noop,
      }),
    ]),
    section('Fieldset', [
      createElement(Select, {
        key: 'label',
        label: 'Раздел',
        placeholder: 'Выберите раздел',
        options: selectOptions,
        onChange: noop,
      }),
      createElement(Select, {
        key: 'hint',
        label: 'Раздел',
        hint: 'Можно выбрать один раздел',
        defaultValue: 'finance',
        options: selectOptions,
        onChange: noop,
      }),
    ]),
    section('States', [
      createElement(Select, {
        key: 'open',
        label: 'Open state',
        value: 'clients',
        open: true,
        options: [
          selectOptions[0],
          selectOptions[1],
          { ...selectOptions[2], disabled: true },
        ],
        onChange: noop,
        onOpenChange: noop,
      }),
      createElement(Select, {
        key: 'disabled',
        label: 'Disabled',
        value: 'analytics',
        disabled: true,
        options: selectOptions,
        onChange: noop,
      }),
      createElement(Select, {
        key: 'disabled-option',
        label: 'Disabled option',
        placeholder: 'Выберите раздел',
        options: [
          selectOptions[0],
          { ...selectOptions[1], disabled: true },
          selectOptions[2],
        ],
        onChange: noop,
      }),
      createElement(Select, {
        key: 'error',
        label: 'Ошибка',
        error: 'Выберите значение',
        options: selectOptions,
        onChange: noop,
      }),
    ]),
    section('Controlled', [
      createElement(Select, {
        key: 'controlled',
        label: 'Раздел',
        value: controlledValue,
        options: selectOptions,
        onChange: setControlledValue,
      }),
    ]),
  ])
}

function TooltipPreview() {
  return createElement(Tooltip, { title: 'Подсказка', anchor: 'top' }, 'Короткий поясняющий текст')
}

function DropdownPreview() {
  return createElement(
    AppDropdown,
    {
      isOpen: true,
      trigger: 'Период',
      startIconName: 'calendar',
      panelAriaLabel: 'Пример dropdown',
      onToggle: () => {},
    },
    createElement('div', { className: 'showcase-component-dropdown-preview' }, '7 дней'),
  )
}

function TabsPreview() {
  return createElement(AdsTabs, {
    tabs: [
      { label: 'Активные', count: 8, active: true },
      { label: 'Черновики', count: 3 },
      { label: 'Архив', count: 12 },
    ],
  })
}

export const componentRegistry = {
  atoms: [
    {
      name: 'Button',
      detailId: 'button',
      component: ButtonPreview,
      source: 'figma',
      tokens: ['components.button.bg.primary', 'components.button.bg.secondary', 'text.primary'],
    },
    {
      name: 'Badge',
      component: BadgePreview,
      source: 'figma',
      tokens: ['components.badge.error', 'text.inverse.primary'],
    },
    {
      name: 'Checkbox',
      component: () => createElement(Checkbox, { label: 'Выбрано', defaultChecked: true }),
      source: 'manual',
      tokens: ['components.button.primary', 'text.primary'],
    },
    {
      name: 'ToggleSwitch',
      component: () => createElement(ToggleSwitch, { checked: true, label: 'Включено' }),
      source: 'manual',
      tokens: ['components.button.primary', 'border.default'],
    },
    {
      name: 'Icons_Text',
      detailId: 'icons-text',
      component: IconPreview,
      source: 'figma',
      tokens: ['text.primary', 'text.secondary'],
    },
    {
      name: 'Icons_interface-Outline',
      detailId: 'icons-interface-outline',
      component: IconPreview,
      source: 'figma',
      tokens: ['text.primary', 'text.secondary'],
    },
    {
      name: 'Icons_interface-Filled',
      detailId: 'icons-interface-filled',
      component: IconPreview,
      source: 'figma',
      tokens: ['text.primary', 'text.secondary'],
    },
    {
      name: 'Avatar',
      component: () => createElement(Avatar, { variant: 'single', alt: 'Пользователь' }),
      source: 'manual',
      tokens: ['bg.default'],
    },
    {
      name: 'Counter',
      component: CounterPreview,
      source: 'manual',
      tokens: ['components.badge.error', 'text.inverse.primary'],
    },
    {
      name: 'Slider',
      component: SliderPreview,
      source: 'figma',
      tokens: [
        'components.control.bg.default',
        'components.control.bg.overlay.default',
        'components.control.bg.inverse.default',
        'components.slider.defaultfilled',
        'components.bar.defaultfilleddisabled',
        'components.bar.inverse.defaultfilled',
        'components.bar.inverse.defaultfilleddisabled',
      ],
    },
    {
      name: 'StatusLabel',
      component: () => createElement(StatusLabel, { tone: 'warning' }, 'Требует внимания'),
      source: 'manual',
      tokens: ['text.primary', 'text.warning'],
    },
    {
      name: 'StatItem',
      component: () => createElement(StatItem, null, '124 просмотра'),
      source: 'manual',
      tokens: ['text.secondary'],
    },
    {
      name: 'Text',
      component: TextPreview,
      source: 'manual',
      tokens: ['text.primary'],
    },
    {
      name: 'SectionLabel',
      component: () => createElement(SectionLabel, null, 'Раздел'),
      source: 'manual',
      tokens: ['text.secondary'],
    },
  ],
  molecules: [
    {
      name: 'Input',
      component: InputPreview,
      source: 'manual',
      tokens: ['text.primary', 'text.secondary', 'text.error', 'bg.elevation1', 'bg.default', 'border.default'],
    },
    {
      name: 'FormField',
      component: () => createElement(PlaceholderPreview, { label: 'FormField' }),
      source: 'manual',
      status: 'placeholder',
      tokens: ['text.primary', 'text.secondary', 'bg.default', 'border.subtle'],
    },
    {
      name: 'Select',
      // Select is molecule because it combines label, trigger, dropdown, hint and validation state.
      component: SelectPreview,
      source: 'manual',
      tokens: ['text.primary', 'text.secondary', 'text.error', 'bg.default', 'bg.elevation1'],
    },
    {
      name: 'Dropdown',
      component: DropdownPreview,
      source: 'manual',
      tokens: ['text.primary', 'text.secondary', 'bg.elevation1', 'border.subtle'],
    },
    {
      name: 'Tooltip',
      // Tooltip is kept as molecule: it owns title/body/anchor/close composition and positioning UI.
      component: TooltipPreview,
      source: 'manual',
      tokens: ['text.primary', 'text.secondary', 'bg.elevation1'],
    },
    {
      name: 'Tabs',
      // AdsTabs lives in organisms folder, but the exported UI is a small tab switcher, so it is practical molecule in the registry.
      component: TabsPreview,
      source: 'manual',
      tokens: ['text.primary', 'text.secondary'],
    },
    {
      name: 'SidebarMenuLabel',
      component: () => createElement(SidebarMenuLabel, { icon: 'ruble', label: 'Финансы' }),
      source: 'manual',
      tokens: ['text.primary'],
    },
    {
      name: 'TopActionIcon',
      component: () => createElement(TopActionIcon, { icon: 'bell', badge: 2 }),
      source: 'manual',
      tokens: ['text.primary', 'components.badge.error'],
    },
  ],
} as const
