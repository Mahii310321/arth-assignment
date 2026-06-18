#!/bin/sh
set -e

echo "Waiting for database..."

npx prisma db push --skip-generate

npm run seed
npm start
