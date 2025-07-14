# Crypto Dashboard

Приложение для отображения ТОП-50 самых капиталоемких криптовалют (по CoinMarketCap API).  
Актуально показывает:

- Тикер
- Название
- Текущую цену
- Изменение цены за 24 часа
- Капитализацию
- Объем торгов

---

## 📦 Стек технологий

### Backend

- Node.js
- TypeScript
- Express.js
- Axios (для HTTP-запросов к CoinMarketCap API)
- PostgreSQL
- Prisma ORM
- dotenv

### Frontend

- Vite
- React
- TypeScript
- Axios (для запросов к backend)
- Чистый CSS (без Tailwind)

---

## ⚙️ Установка и запуск Backend

### Шаг 1 — Установить зависимости

Перейти в папку backend:

```bash
cd backend
npm install
```
### Шаг 2 — Создать базу данных PostgreSQL

Создай базу данных в PostgreSQL:
```bash
CREATE DATABASE cryptodb;
```
```bash
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASS=liliy123
DB_NAME=cryptodb
```

### Шаг 4 — Создать таблицы в базе

Запусти миграцию Prisma:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Шаг 5 — Запустить Backend

```bash
npm run dev
```
Сервер стартует на http://localhost:3000


🚀 Установка и запуск Frontend
### Шаг 1 — Установить зависимости
Перейти в папку frontend:
```bash
cd crypto-dashboard
npm install
```

### Шаг 2 — Запустить Frontend

```bash
npm run dev
```
Приложение доступно по адресу:
```bash
http://localhost:5173
```

Как работает Frontend
Frontend подключается к backend:
```bash
http://localhost:3000/api/cryptos
```
и отображает таблицу ТОП-50 криптовалют.
На телефоне интерфейс адаптивен (строки разваливаются в блоки).

Есть кнопка Обновить, которая вызывает:
```bash
POST http://localhost:3000/api/fetch-cryptos
```
