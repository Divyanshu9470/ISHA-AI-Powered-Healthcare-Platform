import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// On Vercel, the serverless environment is read-only.
// We copy the seeded SQLite database file to /tmp/dev.db so that Prisma can read and write to it.
if (process.env.VERCEL || process.env.NODE_ENV === "production") {
  const dbName = "dev.db";
  const src = path.join(process.cwd(), "prisma", dbName);
  const dest = path.join("/tmp", dbName);

  try {
    if (!fs.existsSync(dest)) {
      console.log(`Copying database from ${src} to ${dest}`);
      fs.copyFileSync(src, dest);
      console.log("Database copied successfully.");
    }
    // Set the DATABASE_URL to point to the writable database in /tmp
    process.env.DATABASE_URL = `file:${dest}`;
  } catch (error) {
    console.error("Failed to copy database file:", error);
  }
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
