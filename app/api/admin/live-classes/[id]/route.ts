import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const updateLiveClassSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  meetLink: z.string().url().optional(),
  scheduledAt: z.string().datetime().optional(),
  status: z.enum(["SCHEDULED", "LIVE", "COMPLETED"]).optional(),
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
    const parsed = updateLiveClassSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { title, meetLink, scheduledAt, status } = parsed.data;

    const liveClass = await prisma.liveClass.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(meetLink !== undefined && { meetLink }),
        ...(scheduledAt !== undefined && { scheduledAt: new Date(scheduledAt) }),
        ...(status !== undefined && { status }),
      },
    });

    console.log(
      JSON.stringify({
        event: "ADMIN_ACTION",
        action: `update_live_class:${id}`,
        actorId: session.user.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json(liveClass);
  } catch (error) {
    console.error("LiveClass PUT error:", error);
    return NextResponse.json({ error: "Failed to update live class" }, { status: 500 });
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
    await prisma.liveClass.delete({ where: { id } });

    console.log(
      JSON.stringify({
        event: "ADMIN_ACTION",
        action: `delete_live_class:${id}`,
        actorId: session.user.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LiveClass DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete live class" }, { status: 500 });
  }
}

