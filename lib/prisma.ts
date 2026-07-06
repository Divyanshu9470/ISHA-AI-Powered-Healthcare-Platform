import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// ─── VERCEL SQLITE FALLBACK ─────────────────────────────────────────────────
// Only used if DATABASE_PROVIDER is "sqlite" (i.e. not yet migrated to Postgres)
if (
  (process.env.VERCEL || process.env.NODE_ENV === "production") &&
  process.env.DATABASE_PROVIDER === "sqlite"
) {
  const dbName = "dev.db";
  const dest = path.join("/tmp", dbName);

  const possibleSources = [
    path.join(process.cwd(), "prisma", dbName),
    path.join(process.cwd(), dbName),
    path.join("/var/task", "prisma", dbName),
    path.join("/var/task", dbName),
  ];

  try {
    let copied = false;
    for (const src of possibleSources) {
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`[DB] Copied ${src} → ${dest}`);
        copied = true;
        break;
      }
    }
    if (!copied) {
      console.error("[DB] Could not find source database. Tried:", possibleSources);
    }
    process.env.DATABASE_URL = `file:${dest}`;
    process.env.DIRECT_DATABASE_URL = `file:${dest}`;
  } catch (error) {
    console.error("[DB] Failed to copy database file:", error);
  }
}

// ─── PRISMA CLIENT ────────────────────────────────────────────────────────────
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
