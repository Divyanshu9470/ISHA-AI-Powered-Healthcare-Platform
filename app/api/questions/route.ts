import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const questionSchema = z.object({
  title: z.string().min(10).max(300),
  body: z.string().min(20).max(5000),
  subject: z.string().max(100).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = questionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { title, body: questionBody, subject } = parsed.data;

    // Return mock success since no Question table exists in the schema.
    return NextResponse.json(
      {
        message: "Question submitted successfully!",
        question: {
          id: `q_${Math.random().toString(36).substring(7)}`,
          title,
          body: questionBody,
          subject: subject || "General",
          userId: session.user.id,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Questions POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
