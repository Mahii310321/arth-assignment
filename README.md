# Dashboard Assignment

Technical-round full-stack dashboard assignment built as a JavaScript monorepo.

## Structure

```txt
dashboard-assignment/
  frontend/
  backend/
  README.md
```

## Tech Stack

Frontend:

- React + Vite
- Tailwind CSS
- shadcn/ui-compatible component setup
- React Hook Form + Zod
- Axios

Backend:

- Node.js + Express
- CORS
- dotenv
- PostgreSQL + Prisma ORM
- JWT authentication
- bcrypt password hashing
- Zod validation
- express-rate-limit

## Phase 1 Setup

Install dependencies separately:

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

Create environment files:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Update `backend/.env` with your PostgreSQL `DATABASE_URL` and `JWT_SECRET`.
Update `frontend/.env` if your backend does not run on `http://localhost:4000`.

Start the backend and local PostgreSQL database together.

On this machine, use:

```bash
npm run docker:up
```

or:

```bash
docker-compose up --build
```

If your Docker installation supports the newer Compose plugin, this also works:

```bash
docker compose up --build
```

The backend container runs on `http://localhost:4000`, waits for Postgres, applies the Prisma schema with `prisma db push`, and seeds the demo data automatically.

Run both apps from the project root:

```bash
npm run dev
```

Or run them independently:

```bash
npm run dev:backend
npm run dev:frontend
```

Backend health endpoint:

```txt
GET http://localhost:4000/health
```

Run Prisma after configuring `DATABASE_URL`:

```bash
npm run prisma:generate --prefix backend
npm run prisma:migrate --prefix backend
npm run seed --prefix backend
```

Auth endpoints:

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Dashboard endpoints:

```txt
GET /api/dashboard
GET /api/transactions?page=1&limit=10
GET /api/export/transactions.csv
```

Postman collection:

```txt
docs/postman/dashboard-assignment.postman_collection.json
```

Import it into Postman after the backend is running. The collection uses `baseUrl=http://localhost:4000` and automatically stores the JWT token after register/login. Seeded demo credentials are `samantha@email.com` / `Password@123`. The seed also creates `user@gmail.com` / `Password@123` for convenience.

Frontend dev server:

```txt
http://localhost:5173
```

## Current Phase

Phase 7 is complete: CSV export is available from backend and frontend, transaction/spend hover tooltips were added, dashboard interactions have polished loading/error states, and responsive/dark-mode UI behavior has been refined.

## Future Phases

Tests, API documentation polish, accessibility review, and final README screenshots/assumptions will be implemented in later phases.
