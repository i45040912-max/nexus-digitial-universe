# NEXUS — Digital Universe

Cyberpunk-платформа на React, TypeScript и Vite с отдельным Express API и PostgreSQL. Включены регистрация, вход, JWT, профиль пользователя и защищённые CRUD API для проектов, задач и заметок.

## Стек
- Frontend: React, TypeScript, Vite, React Router.
- Backend: Node.js, Express, Zod, Helmet, CORS.
- Database: PostgreSQL + Prisma ORM.
- Auth: bcrypt password hashing, JWT access token (7 дней).

## Требования
Node.js 20+, npm и PostgreSQL (локальный или managed, например Neon).

## Локальная настройка
1. Установи зависимости:
   ```bash
   npm install
   ```
2. Скопируй `.env.example` в `.env`. Укажи PostgreSQL URL и `JWT_SECRET` длиной минимум 32 символа. Для локального запуска используй `CLIENT_ORIGIN=http://localhost:5173`.
3. Создай схему и Prisma Client:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Запусти сервер и frontend в отдельных терминалах:
   ```bash
   npm run dev:server
   npm run dev
   ```
   Или `npm run dev:all`.

Frontend: `http://localhost:5173`. Health check API: `http://localhost:4000/api/health`.

## Auth API
- `POST /api/auth/register` — `{ "name", "email", "password" }`
- `POST /api/auth/login` — `{ "email", "password" }`
- `GET /api/auth/me` — текущий пользователь, Bearer JWT.
- `PATCH /api/auth/me` — изменить имя пользователя.

Пароли хранятся только в виде bcrypt-хэша. `passwordHash` никогда не возвращается API.

## Данные пользователя
Все endpoint-ы требуют `Authorization: Bearer <token>`:
- `GET/POST /api/projects`, `PATCH/DELETE /api/projects/:id`
- `GET/POST /api/tasks`, `PATCH/DELETE /api/tasks/:id`
- `GET/POST /api/notes`, `PATCH/DELETE /api/notes/:id`

Каждый запрос ограничен владельцем, определённым по проверенному токену. API не доверяет owner ID, переданному клиентом.

## Production build
```bash
npm run build
npx prisma generate
npx prisma migrate deploy
```

## Деплой
### Frontend на Vercel
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable: `VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api`

### Backend на Render / Railway / другом Node-хостинге
- Build Command: `npm install && npx prisma generate`
- Start Command: `npm run start:server`
- Environment Variables: `DATABASE_URL`, `JWT_SECRET`, `CLIENT_ORIGIN` (URL фронтенда Vercel).
- Используй managed PostgreSQL и включи резервное копирование.

Перед production-релизом рекомендуется добавить rate limiting, email verification, reset-password flow, аудит событий и перейти с localStorage JWT на HttpOnly Secure cookies с защитой от CSRF/XSS.

## GitHub
```bash
git init
git add .
git commit -m "feat: add NEXUS auth and backend"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nexus-digital-universe.git
git push -u origin main
```

## Что пока демонстрационное
Страницы проектов, задач и заметок используют демонстрационный UI; серверные CRUD API готовы, но формы интерфейса для управления этими записями — следующий этап. Избранное пока сохраняется в localStorage браузера.
