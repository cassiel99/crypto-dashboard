# Используем официальный Node.js образ
FROM node:20

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код
COPY . .

# Сборка Prisma
RUN npx prisma generate

# Выполняем миграции БД во время запуска контейнера
CMD ["npx", "prisma", "migrate", "deploy"] && npm run dev
