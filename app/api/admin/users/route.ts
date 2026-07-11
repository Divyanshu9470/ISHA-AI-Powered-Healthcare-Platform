import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const patchUserSchema = z.object({
  userId: z.string().cuid(),
  role: z.enum(["STUDENT", "ADMIN", "MENTOR"]),
});

async function getAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { authenticated: false, session: null };
  }
  return { authenticated: true, session, isAdmin: session.user.role === "ADMIN" };
}

export async function GET() {
  const authState = await getAdminSession();
  if (!authState.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!authState.isAdmin) {
    return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        country: true,
        state: true,
        university: true,
        rollNumber: true,
        role: true,
        createdAt: true,
        _count: { select: { enrollments: true } },
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Users GET error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const authState = await getAdminSession();
  if (!authState.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!authState.isAdmin) {
    return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const parsed = patchUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { userId, role } = parsed.data;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    // Section 9: Log admin role change action
    console.log(
      JSON.stringify({
        event: "ADMIN_ACTION",
        action: `user_role_change:${userId}->${role}`,
        actorId: authState.session?.user?.id,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json(user);
  } catch (error) {
    console.error("Users PATCH error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

