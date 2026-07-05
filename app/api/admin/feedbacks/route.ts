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
        const feedbacks = await prisma.feedback.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(feedbacks);
    } catch (error) {
        console.error("Feedbacks GET error:", error);
        return NextResponse.json({ error: "Failed to fetch feedbacks" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing feedback ID" }, { status: 400 });
        }

        await prisma.feedback.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Feedback deleted successfully" });
    } catch (error) {
        console.error("Feedback DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete feedback" }, { status: 500 });
    }
}
