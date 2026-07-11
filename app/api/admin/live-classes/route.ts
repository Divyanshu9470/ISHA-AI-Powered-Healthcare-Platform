import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const createLiveClassSchema = z.object({
  title: z.string().min(1).max(200),
  meetLink: z.string().url(),
  scheduledAt: z.string().datetime(),
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

    const liveClasses = await prisma.liveClass.findMany({
      orderBy: { scheduledAt: "desc" },
    });
    return NextResponse.json(liveClasses);
  } catch (error) {
    console.error("LiveClasses GET error:", error);
    return NextResponse.json({ error: "Failed to fetch live classes" }, { status: 500 });
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
    const parsed = createLiveClassSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { title, meetLink, scheduledAt } = parsed.data;

    const liveClass = await prisma.liveClass.create({
      data: {
        title,
        meetLink,
        scheduledAt: new Date(scheduledAt),
      },
    });

    console.log(
      JSON.stringify({
        event: "ADMIN_ACTION",
        action: `create_live_class:${liveClass.id}`,
        actorId: session.user.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json(liveClass, { status: 201 });
  } catch (error) {
    console.error("LiveClasses POST error:", error);
    return NextResponse.json({ error: "Failed to create live class" }, { status: 500 });
  }
}

