# ProConnect MVP

A production-minded MVP for a professional networking platform (LinkedIn-style), built with:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB

## Features (MVP)

- User registration and login (JWT auth)
- Profile view and edit (name, bio, skills)
- Create text-only posts
- Like/unlike posts
- Feed with latest posts
- Responsive, clean UI using theme colors:
  - Background: `#E2E2E2`
  - Primary: `#0032E7`

## Project structure

```bash
.
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/
│   ├── .env.example
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
└── README.md
```

## Backend API

Base URL: `http://localhost:5000/api`

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protected)
- `GET /profile/me` (protected)
- `PUT /profile/me` (protected)
- `GET /profile/:userId` (protected)
- `GET /posts/feed` (protected)
- `POST /posts` (protected)
- `PATCH /posts/:postId/like` (protected)

## Environment variables

### `server/.env`

Use `server/.env.example` as template.

- `PORT=5000`
- `MONGODB_URI=mongodb://127.0.0.1:27017/networking_mvp`
- `JWT_SECRET=replace-with-strong-secret`
- `JWT_EXPIRES_IN=7d`
- `CLIENT_ORIGIN=http://localhost:5173`
- `NODE_ENV=development`

### `client/.env`

Use `client/.env.example` as template.

- `VITE_API_URL=http://localhost:5000/api`

## Setup instructions

### 1) Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend

Open a second terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.
