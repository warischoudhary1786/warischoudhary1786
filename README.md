# ProConnect MVP

A production-minded MVP for a professional networking platform (LinkedIn-style).

## Current status

✅ Backend foundation completed (Node.js + Express + MongoDB)

⏳ Frontend implementation (React + Vite) will be added in the next step.

## Backend tech stack

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Zod request validation
- Helmet, CORS, rate limiting, and centralized error handling

## Backend folder structure

```bash
server/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
    app.js
    server.js
  .env.example
  package.json
```

## Implemented API routes

Base URL: `http://localhost:5000/api`

### Health
- `GET /health`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protected)

### Profile
- `GET /profile/me` (protected)
- `PUT /profile/me` (protected)
- `GET /profile/:userId` (protected)

### Posts
- `GET /posts/feed` (protected)
- `POST /posts` (protected)
- `PATCH /posts/:postId/like` (protected)

## Setup instructions (backend)

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Update env values in `.env`.
4. Start dev server:
   ```bash
   npm run dev
   ```

## Environment variables

`server/.env.example`

- `PORT` - server port (default: `5000`)
- `MONGODB_URI` - Mongo connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRES_IN` - token expiry (example: `7d`)
- `CLIENT_ORIGIN` - frontend origin for CORS
- `NODE_ENV` - environment (`development`, `production`, `test`)

---

Next: Frontend setup with React (Vite), responsive UI, feed and profile pages, and color theme:
- Background: `#E2E2E2`
- Primary: `#0032E7`
