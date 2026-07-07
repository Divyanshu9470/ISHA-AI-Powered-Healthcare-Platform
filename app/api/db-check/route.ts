import { NextResponse } from "next/server";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || "";
  const dbProvider = process.env.DATABASE_PROVIDER || "";
  
  // Mask password in connection string for security
  let maskedUrl = dbUrl;
  if (dbUrl.includes("@")) {
    const parts = dbUrl.split("@");
    const prefix = parts[0].split(":");
    if (prefix.length > 2) {
      prefix[2] = "****";
    }
    maskedUrl = prefix.join(":") + "@" + parts[1];
  }

  return NextResponse.json({
    hasUrl: !!dbUrl,
    provider: dbProvider,
    maskedUrl: maskedUrl,
    nodeEnv: process.env.NODE_ENV,
    isVercel: !!process.env.VERCEL,
  });
}
