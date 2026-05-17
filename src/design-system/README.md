# Design system

## Цветовая система

Семантическая цветовая система является единственным источником цветов проекта.

Токены лежат в `tokens/colors.ts`. В них сохраняется вложенность из Figma, а у конечных значений есть `ru`, `global` и `description`.

Палитра `Primitives` лежит отдельно в `tokens/primitives.ts` и экспортируется через `tokens/colors.ts`. Это базовая палитра, она не заменяет semantic colors и не должна использоваться как автоматическая подмена существующих токенов.

Темы лежат в `tokens/colorThemes.ts`: `light` и `dark` используют плоские ключи вроде `text.primary` и `bg.elevation1`. Токены с `constant` должны иметь одинаковые значения в обеих темах.

Для `Primitives` в `tokens/colorThemes.ts` есть отдельный export `primitiveColorThemes`, чтобы не смешивать базовую палитру с semantic themes.

CSS variables лежат в `styles/colors.css` и применяются глобально через `:root`, `[data-theme='light']` и `[data-theme='dark']`.

Переключение темы:

1. Открыть панель фича-тогглов.
2. Для проверки темной версии включить `darkTheme`.

Использование в CSS:

```css
.example {
  background: var(--color-bg-elevation-1);
  color: var(--color-text-primary);
  border-color: var(--color-divider-default);
}
```

При добавлении нового токена нужно обновить все четыре слоя: `colors.ts`, `colorThemes.ts`, `cssColorVars.ts` и `styles/colors.css`. CSS-имя собирается из пути токена в kebab-case: `bg/elevation1` -> `--color-bg-elevation-1`, `foreground/imageFill` -> `--color-foreground-image-fill`.

Для витрины у leaf-токена должен быть `source`: `figma` для перенесенных из Figma токенов или `manual` для локальных ручных добавлений.
