import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const answerSchema = z.object({
  body: z.string().min(10).max(5000),
});

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Section 4: Verify role is MENTOR or ADMIN before processing
    if (session.user.role !== "MENTOR" && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Mentors and Admins only" }, { status: 403 });
    }

    const { id: questionId } = await params;

    const body = await req.json();
    const parsed = answerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { body: answerBody } = parsed.data;

    return NextResponse.json(
      {
        message: "Answer posted successfully!",
        answer: {
          id: `ans_${Math.random().toString(36).substring(7)}`,
          questionId,
          body: answerBody,
          userId: session.user.id,
          role: session.user.role,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Answers POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
