import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subject, score, maxScore } = await req.json();

    if (!subject || score === undefined || !maxScore) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const testScore = await prisma.testScore.create({
      data: {
        userId: session.user.id,
        subject,
        score: parseFloat(score),
        maxScore: parseFloat(maxScore),
      },
    });

    return NextResponse.json({ message: "Score recorded successfully", testScore }, { status: 201 });
  } catch (error) {
    console.error("Test submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
