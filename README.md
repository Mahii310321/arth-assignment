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
- Axios

Backend:

- Node.js + Express
- CORS
- dotenv

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

Frontend dev server:

```txt
http://localhost:5173
```

## Current Phase

Phase 1 is complete: monorepo setup, React/Vite frontend, Tailwind CSS, shadcn/ui-compatible base, Express backend, health endpoint, frontend health check, and environment examples.

## Future Phases

PostgreSQL, Prisma, authentication, dashboard APIs, CSV export, dark mode, and tests will be implemented in later phases.
