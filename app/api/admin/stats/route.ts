import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [totalUsers, totalCourses, totalEnrollments, totalLiveClasses, totalLessons] =
            await Promise.all([
                prisma.user.count(),
                prisma.course.count(),
                prisma.enrollment.count(),
                prisma.liveClass.count(),
                prisma.lesson.count(),
            ]);

        const studentCount = await prisma.user.count({ where: { role: "STUDENT" } });

        const recentEnrollments = await prisma.enrollment.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { name: true, email: true } },
                course: { select: { title: true } },
            },
        });

        const publishedCourses = await prisma.course.count({ where: { published: true } });

        // Calculate estimated revenue (sum of price × enrollment count per course)
        const courses = await prisma.course.findMany({
            include: { _count: { select: { enrollments: true } } },
        });
        const totalRevenue = courses.reduce(
            (sum, course) => sum + course.price * course._count.enrollments,
            0
        );

        return NextResponse.json({
            totalUsers,
            studentCount,
            totalCourses,
            publishedCourses,
            totalLessons,
            totalEnrollments,
            totalLiveClasses,
            totalRevenue,
            recentEnrollments,
        });
    } catch (error) {
        console.error("Stats API error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
