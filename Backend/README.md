# Phonex Backend

Backend сервис для управления продажами и складом магазина электроники. Проект построен на NestJS с использованием TypeORM для работы с базой данных PostgreSQL.

## 🚀 Технологический стек

- **Фреймворк**: NestJS
- **База данных**: PostgreSQL
- **ORM**: TypeORM
- **Аутентификация**: JWT
- **Документация**: Swagger
- **Контейнеризация**: Docker

## 📦 Установка

1. Убедитесь, что у вас установлены:
   - Node.js (v23+)
   - PostgreSQL (v15+)
   - Docker

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Создайте файл `.env` в корневой директории на основе `.env.example`:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=phonex
   JWT_SECRET=your_jwt_secret
   ```

## ⚙️ Запуск

- **Разработка**:
  ```bash
  npm run start:dev
  ```

- **Продакшн**:
  ```bash
  npm run build
  npm run start:prod
  ```

- **Сборка и запуск в Docker**:
  ```bash
  docker build -t phonex-backend .
  ```

## 📚 API Документация

После запуска приложения откройте в браузере:
```
http://localhost:4000/api/swagger
```

## 🏗️ Структура проекта

```
src/
├── auth/               # Аутентификация и авторизация
├── constants/          # Константы приложения
├── files/              # Работа с файлами
├── product/            # Модуль товаров
├── products-category/  # Категории товаров
├── products-characteristic/ # Характеристики товаров
├── role/               # Роли пользователей
├── sale/               # Продажи
├── shop/               # Магазины
├── supplier/           # Поставщики
├── supply/            # Поставки
├── user/              # Пользователи
└── utils/             # Вспомогательные утилиты
```

