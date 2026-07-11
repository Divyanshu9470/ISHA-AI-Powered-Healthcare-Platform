import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const scoreSchema = z.object({
  score: z.number().int().min(0).max(10000),
  correctCount: z.number().int().min(0).max(1000),
  totalCount: z.number().int().min(0).max(1000),
  bestCombo: z.number().int().min(0).max(1000),
  gameType: z.enum(["blitz", "drug-match"]),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = scoreSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { score, correctCount, totalCount, bestCombo, gameType } = parsed.data;

    // Section 9: Detect and log unusual score submissions
    const isSuspicious = score > 5000 || correctCount > totalCount;
    if (isSuspicious) {
      console.warn(
        JSON.stringify({
          event: "SUSPICIOUS_SCORE",
          userId: session.user.id,
          score,
          correctCount,
          totalCount,
          bestCombo,
          gameType,
          timestamp: new Date().toISOString(),
        })
      );
    }

    return NextResponse.json({
      message: "Score submitted successfully!",
      result: {
        score,
        correctCount,
        totalCount,
        bestCombo,
        gameType,
        isSuspicious,
      },
    });
  } catch (error) {
    console.error("Score POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
