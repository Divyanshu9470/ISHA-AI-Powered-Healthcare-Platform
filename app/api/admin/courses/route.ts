import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const createCourseSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000),
  price: z.number().nonnegative(),
  thumbnail: z.string().url().optional().nullable(),
  published: z.boolean().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { lessons: true, enrollments: true } },
        lessons: {
          orderBy: { createdAt: "asc" },
          select: { id: true, title: true, videoUrl: true, createdAt: true },
        },
      },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Courses GET error:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

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
    const parsed = createCourseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { title, description, price, thumbnail, published } = parsed.data;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        thumbnail: thumbnail || null,
        published: published ?? false,
      },
    });

    console.log(
      JSON.stringify({
        event: "ADMIN_ACTION",
        action: `create_course:${course.id}`,
        actorId: session.user.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Courses POST error:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}

