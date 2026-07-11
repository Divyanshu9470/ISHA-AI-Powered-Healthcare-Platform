import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const testScoreSchema = z.object({
  subject: z.string().min(1).max(200),
  score: z.number().nonnegative(),
  maxScore: z.number().positive(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = testScoreSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { subject, score, maxScore } = parsed.data;


    const testScore = await prisma.testScore.create({
      data: {
        userId: session.user.id,
        subject,
        score,
        maxScore,
      },
    });

    return NextResponse.json({ message: "Score recorded successfully", testScore }, { status: 201 });
  } catch (error) {
    console.error("Test submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
