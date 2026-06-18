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
```

Postman collection:

```txt
docs/postman/dashboard-assignment.postman_collection.json
```

Import it into Postman after the backend is running. The collection uses `baseUrl=http://localhost:4000` and automatically stores the JWT token after register/login. Seeded demo credentials are `samantha@email.com` / `Password@123`.

Frontend dev server:

```txt
http://localhost:5173
```

## Current Phase

Phase 5 is complete: Transaction and SpendCategory Prisma models, seed script, protected dashboard API, protected paginated transactions API, dashboard chart data, spend statistics, and Postman requests for dashboard testing.

## Future Phases

CSV export, full frontend/backend integration, and tests will be implemented in later phases.
