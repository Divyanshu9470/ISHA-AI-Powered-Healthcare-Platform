import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const updateLessonSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  videoUrl: z.string().url().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const parsed = updateLessonSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { title, description, videoUrl } = parsed.data;

    const lesson = await prisma.lesson.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(videoUrl !== undefined && { videoUrl }),
      },
    });

    console.log(
      JSON.stringify({
        event: "ADMIN_ACTION",
        action: `update_lesson:${id}`,
        actorId: session.user.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Lesson PUT error:", error);
    return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { id } = await params;
    await prisma.lesson.delete({ where: { id } });

    console.log(
      JSON.stringify({
        event: "ADMIN_ACTION",
        action: `delete_lesson:${id}`,
        actorId: session.user.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lesson DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 });
  }
}

