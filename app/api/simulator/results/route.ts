import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const resultSchema = z.object({
  patientCase: z.string().min(1).max(200),
  score: z.number().nonnegative().optional().nullable(),
  status: z.enum(["COMPLETED", "FAILED", "IN_PROGRESS"]).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = resultSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { patientCase, score, status } = parsed.data;


    const simulatorSession = await prisma.simulatorSession.create({
      data: {
        userId: session.user.id,
        patientCase,
        score: score ?? null,
        status: status || "COMPLETED",
      },
    });

    return NextResponse.json({ message: "Session recorded successfully", simulatorSession }, { status: 201 });
  } catch (error) {
    console.error("Simulator recording error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
