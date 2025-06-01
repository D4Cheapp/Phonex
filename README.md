# Phonex - Система управления продажами и складом

## 📋 Общее описание

Phonex - это веб-приложение для управления продажами и складом электроники. Проект состоит из:
- **Backend**: NestJS приложение с REST API
- **Frontend**: Next.js приложение с React
- **База данных**: PostgreSQL

## 🚀 Быстрый старт

### Предварительные требования

- Docker и Docker Compose
- Node.js 23+ (для разработки без Docker)
- npm или yarn

### 1. Настройка переменных окружения

Создайте файл `.env` в корневой директории проекта:

```env
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_DB=Phonex
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
JWT_SALT=${JWT_SALT}
```

### 2. Сборка и запуск приложения

#### Вариант 1: Запуск с помощью Docker Compose (рекомендуется)

**Сборка бэкенда:**
```bash
docker build -t phonex-backend -f Backend/Dockerfile ./Backend
```

**Сборка фронтенда:**
```bash
docker build -t phonex-frontend -f Frontend/Dockerfile ./Frontend
```

**Запустить все сервисы:**
```bash
docker-compose --env-file .env up
```

**Остановка всех сервисов:**
```bash
docker-compose down
```

**Просмотр логов:**
```bash
docker-compose logs -f
```

#### Вариант 2: Ручная сборка и запуск

**Backend:**

```bash
cd Backend
npm install
npm run build
npm run start:prod
```

**Frontend:**

```bash
cd Frontend
npm install
npm run build
npm start
```

## 🌐 Доступ к приложению

После успешного запуска:
- **Frontend**: http://localhost:3000
- **Swagger документация**: http://localhost:4000/api/swagger
- **PostgreSQL**: localhost:5432

## 📁 Структура проекта

```
.
├── Backend/               # Backend приложение (NestJS)
│   ├── src/             # Исходный код
│   ├── Dockerfile        # Dockerfile для бэкенда
│   └── ...
│
├── Frontend/              # Frontend приложение (Next.js)
│   ├── src/             # Исходный код
│   ├── Dockerfile        # Dockerfile для фронтенда
│   └── ...
│
├── docker-compose.yml    # Конфигурация Docker Compose
├── .env                 # Переменные окружения
└── initial.sql          # SQL-скрипт для инициализации БД
```
