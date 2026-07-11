import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().max(200).optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal("")),
  type: z.string().max(100).optional().nullable(),
  message: z.string().min(5).max(10000),
  rating: z.number().int().min(1).max(5).optional(),
  difficulty: z.string().max(100).optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { name, email, type, message, rating, difficulty } = parsed.data;


        const feedback = await prisma.feedback.create({
            data: {
                name: name || "Anonymous",
                email: email || "anonymous@example.com",
                type: type || "SUGGESTION",
                message,
                rating: rating ?? 5,
                difficulty: difficulty || "NONE",
            },
        });

        return NextResponse.json(feedback, { status: 201 });
    } catch (error) {
        console.error("Feedback submission error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
