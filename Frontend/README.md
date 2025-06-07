# Phonex Frontend

Фронтенд приложение для системы управления продажами и складом магазина электроники. Построено на Next.js с использованием TypeScript и React.

## 🚀 Технологический стек

- **Фреймворк**: Next.js 14+
- **Язык**: TypeScript
- **UI библиотека**: React 18+
- **Управление состоянием**: React Query
- **Стилизация**: CSS Modules / Styled Components
- **Формы**: React Hook Form
- **Валидация**: Zod
- **Маршрутизация**: Next.js App Router

## 📦 Предварительные требования

- Node.js 18+
- npm 9+ или yarn
- Backend сервис (должен быть запущен на порту 4000)

## 🛠️ Установка

1. Установите зависимости:

   ```bash
   npm install
   ```

2. Настройте переменные окружения:
   Создайте файл `.env.local` в корневой директории фронтенда:

   ```env
   # Базовый URL API
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   ```

## 🚀 Запуск

### Разработка

```bash
# Запуск в режиме разработки
npm run dev
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

### Продакшн

```bash
# Сборка проекта
npm run build

# Запуск в продакшн режиме
npm start
```

## 🧪 Тестирование

```bash
# Запуск тестов
npm test

# Запуск тестов в режиме watch
npm test -- --watch

# Запуск тестов с покрытием
npm run test:coverage
```

## 🔍 Линтинг и форматирование

```bash
# Проверка стиля кода
npm run lint

# Автоматическое исправление стиля
npm run lint:fix

# Форматирование кода
npm run format
```

## 🏗️ Структура проекта

```text
.
├── public/                 # Статические файлы
│   ├── images/            # Изображения
│   └── favicon.ico        # Иконка сайта
│
├── src/
│   ├── app/               # Страницы приложения (App Router)
│   │   ├── (auth)/       # Авторизация
│   │   ├── dashboard/     # Основная панель
│   │   ├── products/      # Страницы товаров
│   │   └── ...
│   │
│   ├── components/        # Переиспользуемые компоненты
│   │   ├── ui/           # Базовые UI компоненты
│   │   ├── layout/       # Компоненты макета
│   │   └── ...
│   │
│   ├── hooks/            # Кастомные React хуки
│   ├── lib/              # Вспомогательные библиотеки
│   ├── services/         # API клиенты и сервисы
│   ├── stores/           # Глобальное состояние (если используется)
│   ├── styles/           # Глобальные стили
│   └── types/            # Глобальные типы TypeScript
│
├── .eslintrc.json      # Конфигурация ESLint
├── .prettierrc         # Конфигурация Prettier
├── next.config.js      # Конфигурация Next.js
└── tsconfig.json       # Конфигурация TypeScript
```

## 🎨 Стилизация

Проект использует CSS Modules для изоляции стилей. Каждый компонент имеет свой файл стилей с расширением `.module.css`.

Пример структуры компонента:

```
components/
  Button/
    Button.tsx
    Button.module.css
    Button.test.tsx
    index.ts
```

## 🛠️ Доступные скрипты

- `dev` - Запуск в режиме разработки
- `build` - Сборка для продакшена
- `start` - Запуск продакшн сборки
- `lint` - Проверка стиля кода
- `lint:fix` - Исправление стиля кода
- `format` - Форматирование кода
- `test` - Запуск тестов
- `test:watch` - Запуск тестов в режиме watch
- `test:coverage` - Запуск тестов с покрытием

## 🤝 Вклад в проект

1. Создайте форк репозитория
2. Создайте ветку для вашей фичи (`git checkout -b feature/amazing-feature`)
3. Сделайте коммит ваших изменений (`git commit -m 'Add some amazing feature'`)
4. Запушьте изменения в форк (`git push origin feature/amazing-feature`)
5. Создайте Pull Request

## 📝 Лицензия

Этот проект лицензирован в соответствии с [лицензией MIT](../LICENSE).
