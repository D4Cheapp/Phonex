# Phonex - Система управления продажами и складом

## 📋 Общее описание

Phonex - это веб-приложение для управления продажами и складом электроники. Проект состоит из:

- **Backend**: NestJS приложение с REST API
- **Frontend**: Next.js приложение с React
- **База данных**: PostgreSQL

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+
- npm 9+ или yarn
- PostgreSQL 14+

### 1. Настройка базы данных

1. Установите и запустите PostgreSQL
2. Создайте новую базу данных:

   ```sql
   CREATE DATABASE phonex;
   ```

3. Импортируйте начальные данные:

   ```bash
   psql -U ваш_пользователь -d phonex -f initial.sql
   ```

### 2. Настройка переменных окружения

#### Backend (в папке Backend/.env)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=ваш_пользователь
DB_PASSWORD=ваш_пароль
DB_NAME=phonex
JWT_SECRET=ваш_секретный_ключ
PORT=4000
```

#### Frontend (в папке Frontend/.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 3. Установка зависимостей

#### Backend

```bash
cd Backend
npm install
```

#### Frontend

```bash
cd Frontend
npm install
```

### 4. Запуск приложения

#### Development режим

### Backend (Development)

```bash
cd Backend
npm run start:dev
```

### Frontend (Development)

```bash
cd Frontend
npm run dev
```

#### Production сборка

### Backend (Production)

```bash
cd Backend
npm run build
npm run start:prod
```

### Frontend (Production)

```bash
cd Frontend
npm run build
npm start
```

## 🌐 Доступ к приложению

После успешного запуска:

- **Frontend**: <http://localhost:3000>
- **API документация (Swagger)**: <http://localhost:4000/api/swagger>
- **API Endpoint**: <http://localhost:4000/api>

## 🛠️ Тестирование

### Запуск тестов Backend

```bash
cd Backend
npm test
```

### Запуск линтера

```bash
# Backend
cd Backend
npm run lint

# Frontend
cd Frontend
npm run lint
```

## 📁 Структура проекта

```text
.
├── Backend/               # Backend приложение (NestJS)
│   ├── src/              # Исходный код
│   │   ├── auth/         # Аутентификация
│   │   ├── products/     # Модуль товаров
│   │   ├── users/        # Модуль пользователей
│   │   └── ...
│   └── ...
│
├── Frontend/             # Frontend приложение (Next.js)
│   ├── public/          # Статические файлы
│   ├── src/
│   │   ├── components/  # React компоненты
│   │   ├── pages/       # Страницы Next.js
│   │   ├── styles/      # Стили
│   │   └── utils/       # Вспомогательные функции
│   └── ...
│
├── .gitignore           # Игнорируемые файлы Git
├── initial.sql          # SQL-скрипт для инициализации БД
└── README.md            # Этот файл
```

## 📝 Лицензия

Этот проект лицензирован в соответствии с [лицензией MIT](LICENSE).
