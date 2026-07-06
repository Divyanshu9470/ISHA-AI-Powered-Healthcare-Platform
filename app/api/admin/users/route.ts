import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function isAdmin() {
    const session = await getServerSession(authOptions);
    return session?.user?.role === "ADMIN";
}

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { userId, role } = await req.json();

        if (!userId || !role) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { role },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Users PATCH error:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}
