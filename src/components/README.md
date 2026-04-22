# Atomic Design Map

## Page

- `pages/CabinetStagePage`: конкретная страница кабинета перфагенства.

## Template

- `templates/CabinetLayout`: общий каркас страницы с шапкой, сайдбаром, контентной колонкой и плавающей кнопкой.

## Organisms

- `organisms/Header/HeaderTopBar`: верхняя строка с сервисными ссылками и действиями пользователя.
- `organisms/Header/HeaderMainNav`: логотип и главная навигация по категориям.
- `organisms/Sidebar/ProfileSidebar`: левая колонка кабинета.
- `organisms/Sidebar/SidebarNavigation`: меню разделов.
- `organisms/Promo/PromoBanner`: верхний промо-баннер.
- `organisms/Feature/FeaturePromoCard`: карточка "Скидки и акции".
- `organisms/Ads/AdsTabs`: переключатель вкладок объявлений.
- `organisms/Ads/AdsToolbar`: тулбар со множественным выбором и фильтром.
- `organisms/Ads/AdsList`: контейнер списка объявлений.
- `organisms/Ads/AdCard`: карточка объявления.
- `organisms/FloatingChat/FloatingChatButton`: плавающая кнопка сообщений.

## Molecules

- `molecules/Navigation/TopActionIcon`: иконка в хедере с необязательным бейджем.
- `molecules/Navigation/SidebarNavItem`: строка меню в левом сайдбаре.
- `molecules/Profile/ProfileSummary`: аватар, имя, рейтинг.
- `molecules/Profile/WalletSummary`: карточка кошелька.
- `molecules/Promo/PromoVisual`: графическая часть баннера.
- `molecules/Ads/AdMeta`: адрес и метро объявления.
- `molecules/Ads/AdActions`: набор действий карточки.
- `molecules/Ads/AdStats`: статистика карточки.
- `molecules/Ads/AdPreview`: превью объявления.

## Atoms

- `atoms/Button`: базовая кнопка.
- `atoms/Icon`: базовая SVG-иконка.
- `atoms/Badge`: маленький счетчик/маркер.
- `atoms/Avatar`: базовый аватар.
- `atoms/Logo`: логотип бренда.
- `atoms/Text`: типографический примитив.
- `atoms/Checkbox`: базовый чекбокс.
- `atoms/StatusLabel`: статус с цветовым тоном.
- `atoms/StatItem`: одно числовое значение статистики.

## Notes

- На текущем этапе создан только каркас структуры.
- Наполнение JSX, пропсов, стилей и вынос логики будем делать на следующем шаге.
