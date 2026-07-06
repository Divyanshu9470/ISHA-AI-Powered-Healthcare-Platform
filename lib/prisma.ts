import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// On Vercel, the serverless environment is read-only.
// We copy the seeded SQLite database to /tmp so Prisma can read and write to it.
if (process.env.VERCEL || process.env.NODE_ENV === "production") {
  const dbName = "dev.db";
  const dest = path.join("/tmp", dbName);

  // Try multiple possible source locations
  const possibleSources = [
    path.join(process.cwd(), "prisma", dbName),
    path.join(process.cwd(), dbName),
    path.join("/var/task", "prisma", dbName),
    path.join("/var/task", dbName),
  ];

  try {
    // Always overwrite /tmp/dev.db to flush stale cache from previous deployments
    let copied = false;
    for (const src of possibleSources) {
      if (fs.existsSync(src)) {
        console.log(`Copying database from ${src} to ${dest}`);
        fs.copyFileSync(src, dest);
        console.log("Database copied successfully.");
        copied = true;
        break;
      }
    }
    if (!copied) {
      console.error("Could not find source database file in any expected location.");
      console.error("Tried:", possibleSources);
    }
    // Always point DATABASE_URL to the writable /tmp location
    process.env.DATABASE_URL = `file:${dest}`;
  } catch (error) {
    console.error("Failed to copy database file:", error);
  }
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
