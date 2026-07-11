import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const updateCourseSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),
  price: z.number().nonnegative().optional(),
  thumbnail: z.string().url().optional().nullable(),
  published: z.boolean().optional(),
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
    const parsed = updateCourseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { title, description, price, thumbnail, published } = parsed.data;

    const course = await prisma.course.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(thumbnail !== undefined && { thumbnail }),
        ...(published !== undefined && { published }),
      },
    });

    console.log(
      JSON.stringify({
        event: "ADMIN_ACTION",
        action: `update_course:${id}`,
        actorId: session.user.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json(course);
  } catch (error) {
    console.error("Course PUT error:", error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
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
    await prisma.course.delete({ where: { id } });

    console.log(
      JSON.stringify({
        event: "ADMIN_ACTION",
        action: `delete_course:${id}`,
        actorId: session.user.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Course DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}

