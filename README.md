# Dashboard Assignment

Full-stack dashboard assignment built with React, Express, Prisma, PostgreSQL, JWT auth, Docker, and a Postman collection.

## Features

- Figma-style responsive dashboard UI
- Login/register modal with frontend and backend validation
- Strong password validation
- JWT authentication with persistent login
- Logout with token/session invalidation
- User-specific dashboard API data
- Paginated transactions with `Load More`
- Dynamic spend statistics chart from API data
- CSV export for transactions
- Dark mode toggle
- Loading skeletons, hover states, and API error UI
- Dockerized backend + PostgreSQL

## Project Structure

```txt
dashboard-assignment/
  backend/     Express + Prisma API
  frontend/    React + Vite dashboard
  docs/        Postman collection
  docker-compose.yml
```

## Requirements

- Node.js 20+ recommended
- npm
- Docker Desktop or compatible Docker runtime
- `docker-compose` or `docker compose`

## Quick Start

Install dependencies:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

Start PostgreSQL and backend with Docker:

```bash
npm run docker:up
```

In another terminal, start the frontend:

```bash
npm run dev:frontend
```

Open:

```txt
http://localhost:5173
```

Backend health check:

```txt
http://localhost:4000/health
```

The backend container automatically:

- waits for PostgreSQL
- runs `prisma db push`
- seeds demo data
- starts the API on port `4000`

## Demo Login

```txt
Email: samantha@email.com
Password: Password@123
```

Additional seeded user:

```txt
Email: user@gmail.com
Password: Password@123
```

## Environment Variables

The repo includes examples only. Real `.env` files are ignored by git.

For normal Docker usage, no env file is required because `docker-compose.yml` includes local defaults. To customize Docker values:

```bash
cp .env.example .env
```

For running the backend directly on your machine:

```bash
cp backend/.env.example backend/.env
```

For frontend API URL customization:

```bash
cp frontend/.env.example frontend/.env
```

### What is `JWT_SECRET`?

`JWT_SECRET` is not a user token. It is the private server-side signing secret used by the backend to create and verify JWT tokens when users log in.

Users receive a JWT token after login. The backend uses `JWT_SECRET` to sign that token and later verify that it is valid.

For local development, the included example secret is fine. For production, replace it with a long random string and never commit it.

Example:

```txt
JWT_SECRET=dashboard-assignment-local-jwt-secret-change-for-production
```

## Local Development Without Docker Backend

If you want to run the backend directly on your machine, first make sure PostgreSQL is running locally and `backend/.env` has:

```txt
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dashboard_assignment?schema=public"
```

Then run:

```bash
npm run prisma:generate --prefix backend
npm run prisma:migrate --prefix backend
npm run seed --prefix backend
npm run dev:backend
```

Run frontend:

```bash
npm run dev:frontend
```

## API Endpoints

Auth:

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Dashboard:

```txt
GET /api/dashboard
GET /api/transactions?page=1&limit=10
GET /api/export/transactions.csv
```

Authenticated endpoints require:

```txt
Authorization: Bearer <token>
```

## Postman

Import:

```txt
docs/postman/dashboard-assignment.postman_collection.json
```

The collection uses:

```txt
baseUrl=http://localhost:4000
```

It stores the JWT after register/login and reuses it for authenticated requests.

## Useful Scripts

Root:

```bash
npm run docker:up      # start backend + postgres
npm run docker:down    # stop backend + postgres
npm run dev            # run backend and frontend locally
npm run dev:backend
npm run dev:frontend
```

Frontend:

```bash
npm run build --prefix frontend
```

Backend checks:

```bash
node --check backend/src/server.js
```

## Notes for Reviewers

- Backend and database are reproducible through Docker Compose.
- Demo data is seeded automatically by the backend Docker entrypoint.
- Frontend runs separately with Vite on `http://localhost:5173`.
- `.env` files are intentionally ignored. Use the included `.env.example` files for local setup.
- CSV export is implemented. PDF export and automated tests are not included yet.
