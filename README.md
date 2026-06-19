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
- Server-Sent Events live dashboard stream
- Dark mode toggle
- Loading skeletons, hover states, and API error UI
- Dockerized frontend + backend + PostgreSQL
- Automated API and validation tests
- WCAG 2.1 accessibility review

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

Start the full app with Docker:

```bash
npm run docker:up
```

Open:

```txt
http://localhost:5173
```

Backend health check:

```txt
http://localhost:4000/health
```

Docker starts:

- frontend on `http://localhost:5173`
- backend on `http://localhost:4000`
- PostgreSQL on `localhost:5432`

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

When using Docker, `VITE_API_BASE_URL` is a build argument. The default is:

```txt
http://localhost:4000
```

That value is correct because the browser runs on your machine and calls the backend through the published host port.

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
GET /api/dashboard/stream?token=<token>
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

The collection covers health, register, login, invalid login, current user, dashboard, transaction pagination, CSV export, SSE stream, and logout.

## Automated Tests

Backend API tests use Node's built-in test runner and exercise the real Express app. They require a reachable PostgreSQL database and a valid `backend/.env` or Docker-provided `DATABASE_URL`.

```bash
npm run test:backend
```

Frontend validation tests cover login/register schema behavior:

```bash
npm run test:frontend
```

Run all tests:

```bash
npm test
```

## Real-Time Updates

The dashboard supports Server-Sent Events:

```txt
GET /api/dashboard/stream?token=<jwt>
```

The frontend opens this stream after login and updates dashboard data when `dashboard` events arrive.

## Accessibility

WCAG 2.1 review artifact:

```txt
docs/accessibility/WCAG-2.1-review.md
```

The UI includes labels, dialog semantics, alert regions, active nav state, reduced-motion support, skip link, and keyboard-friendly controls.

## Useful Scripts

Root:

```bash
npm run docker:up      # start frontend + backend + postgres
npm run docker:up:detached
npm run docker:down    # stop frontend + backend + postgres
npm run dev            # run backend and frontend locally
npm run dev:backend
npm run dev:frontend
npm test
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
- Frontend is also containerized and served by Nginx with React Router fallback.
- Demo data is seeded automatically by the backend Docker entrypoint.
- Docker starts the full app at `http://localhost:5173`.
- `.env` files are intentionally ignored. Use the included `.env.example` files for local setup.
- CSV export is implemented. PDF export is not included.
