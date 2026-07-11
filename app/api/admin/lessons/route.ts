import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const createLessonSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional().nullable(),
  videoUrl: z.string().url(),
  courseId: z.string().cuid(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = createLessonSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { title, description, videoUrl, courseId } = parsed.data;

    const lesson = await prisma.lesson.create({
      data: {
        title,
        description: description || null,
        videoUrl,
        courseId,
      },
    });

    // Section 9: Log admin action
    console.log(
      JSON.stringify({
        event: "ADMIN_ACTION",
        action: `create_lesson:${lesson.id}`,
        actorId: session.user.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error("Lesson POST error:", error);
    return NextResponse.json({ error: "Failed to create lesson" }, { status: 500 });
  }
}

