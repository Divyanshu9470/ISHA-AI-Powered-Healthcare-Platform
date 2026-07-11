#!/bin/bash
# This script runs during Vercel build.
# If DATABASE_URL is a PostgreSQL URL, swap the Prisma schema and run migrations.

if [[ "$DATABASE_URL" == postgres* ]] || [[ "$DATABASE_URL" == postgresql* ]]; then
  echo "[build] PostgreSQL detected — using production schema"
  cp prisma/schema.postgresql.prisma prisma/schema.prisma
  npx prisma generate
  npx prisma migrate deploy || npx prisma db push --accept-data-loss
  npx prisma db seed || echo "[build] Seed skipped (data may already exist)"
else
  echo "[build] SQLite detected — using local schema"
  npx prisma generate
fi

next build
