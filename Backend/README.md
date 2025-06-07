# Phonex Backend

Backend сервис для управления продажами и складом магазина электроники. Проект построен на NestJS с использованием TypeORM для работы с базой данных PostgreSQL.

## 🚀 Технологический стек

- **Фреймворк**: NestJS
- **Язык**: TypeScript
- **База данных**: PostgreSQL
- **ORM**: TypeORM
- **Аутентификация**: JWT
- **Документация**: Swagger
- **Валидация**: class-validator, class-transformer

## 📦 Предварительные требования

- Node.js 18+
- PostgreSQL 14+
- npm 9+ или yarn

## 🛠️ Установка

1. Установите зависимости:

   ```bash
   npm install
   ```

2. Настройте базу данных:
   - Создайте новую базу данных PostgreSQL
   - Выполните SQL-скрипт из корневой директории проекта `initial.sql`

3. Настройте переменные окружения:
   Создайте файл `.env` в корневой директории бэкенда:

   ```env
   # Настройки базы данных
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=ваш_пользователь
   DB_PASSWORD=ваш_пароль
   DB_NAME=phonex

   # JWT
   JWT_SECRET=ваш_секретный_ключ
   JWT_EXPIRES_IN=1d

   # Настройки приложения
   PORT=4000
   ```

## 🚀 Запуск

### Разработка

```bash
# Запуск в режиме разработки с hot-reload
npm run start:dev

# Слежение за кодом
npm run start:watch
```

### Продакшн

```bash
# Сборка проекта
npm run build

# Запуск в продакшн режиме
npm run start:prod
```

## 🧪 Тестирование

```bash
# Запуск тестов
npm test

# Запуск тестов с покрытием
npm run test:cov

# Запуск e2e тестов
npm run test:e2e
```

## 🔍 Линтинг

```bash
# Проверка стиля кода
npm run lint

# Автоматическое исправление стиля
npm run lint:fix
```

## 📚 API Документация

После запуска приложения откройте в браузере:
<http://localhost:4000/api/swagger>

## 🏗️ Структура проекта

```text
src/
├── app.module.ts          # Корневой модуль приложения
├── main.ts                # Точка входа
│
├── auth/                 # Аутентификация и авторизация
│   ├── dto/              # Data Transfer Objects
│   ├── guards/           # Guard'ы доступа
│   ├── strategies/       # Стратегии аутентификации
│   └── auth.module.ts    # Модуль аутентификации
│
├── product/             # Модуль товаров
│   ├── dto/
│   ├── entities/        # Сущности базы данных
│   └── product.module.ts
│
├── users/               # Модуль пользователей
│   ├── dto/
│   ├── entities/
│   └── users.module.ts
│
├── shared/              # Общие модули и утилиты
│   ├── database/        # Настройки базы данных
│   ├── decorators/      # Кастомные декораторы
│   └── filters/         # Exception фильтры
│
└── utils/              # Вспомогательные утилиты
```

## 🔄 Миграции

```bash
# Создание новой миграции
npm run migration:generate src/database/migrations/ИмяМиграции

# Запуск миграций
npm run migration:run

# Откат миграций
npm run migration:revert
```

## 🤝 Вклад в проект

1. Создайте форк репозитория
2. Создайте ветку для вашей фичи (`git checkout -b feature/amazing-feature`)
3. Сделайте коммит ваших изменений (`git commit -m 'Add some amazing feature'`)
4. Запушьте изменения в форк (`git push origin feature/amazing-feature`)
5. Создайте Pull Request

## 📝 Лицензия

Этот проект лицензирован в соответствии с [лицензией MIT](../LICENSE).
