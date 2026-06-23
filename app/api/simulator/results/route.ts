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

    const { patientCase, score, status } = await req.json();

    if (!patientCase) {
      return NextResponse.json({ error: "Missing patient case" }, { status: 400 });
    }

    const simulatorSession = await prisma.simulatorSession.create({
      data: {
        userId: session.user.id,
        patientCase,
        score: score ? parseFloat(score) : null,
        status: status || "COMPLETED",
      },
    });

    return NextResponse.json({ message: "Session recorded successfully", simulatorSession }, { status: 201 });
  } catch (error) {
    console.error("Simulator recording error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
