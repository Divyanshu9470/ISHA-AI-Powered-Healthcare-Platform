import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    try {
        const enrollments = await prisma.enrollment.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { id: true, name: true, email: true } },
                course: { select: { id: true, title: true, price: true } },
            },
        });

        // Fetch transactions to match payment methods
        const transactions = await prisma.transaction.findMany({
            where: { status: "SUCCESS" }
        });

        const formatted = enrollments.map(e => {
            const tx = transactions.find(t => t.userId === e.user.id && t.courseId === e.course.id);
            return {
                ...e,
                paymentMethod: tx?.paymentMethod || "MANUAL"
            };
        });

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Enrollments GET error:", error);
        return NextResponse.json({ error: "Failed to fetch enrollments" }, { status: 500 });
    }
}

