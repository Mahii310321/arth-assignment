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

Phase 3 is complete: responsive dashboard UI, mock login/register modal, form validation, loading/error states, persistent mock login state, dynamic user display after login, logout, and dark mode toggle.

## Future Phases

Backend authentication, PostgreSQL, Prisma, dashboard APIs, CSV export, full API integration, and tests will be implemented in later phases.
