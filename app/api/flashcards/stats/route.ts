import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        // 1. Fetch user's flashcard progress records
        const progresses = await prisma.flashcardProgress.findMany({
            where: { userId },
            select: { lastReview: true, status: true }
        });

        // 2. Calculate Daily Streak
        const reviewDates = Array.from(
            new Set(
                progresses
                    .filter(p => p.lastReview !== null)
                    .map(p => p.lastReview!.toISOString().split('T')[0])
            )
        ).sort();

        let streak = 0;
        if (reviewDates.length > 0) {
            const todayStr = new Date().toISOString().split('T')[0];
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            let checkDate: Date | null = null;
            if (reviewDates.includes(todayStr)) {
                checkDate = new Date();
            } else if (reviewDates.includes(yesterdayStr)) {
                checkDate = yesterday;
            }

            if (checkDate) {
                while (true) {
                    const dateStr = checkDate.toISOString().split('T')[0];
                    if (reviewDates.includes(dateStr)) {
                        streak++;
                        checkDate.setDate(checkDate.getDate() - 1);
                    } else {
                        break;
                    }
                }
            }
        }

        // 3. Calculate Retention
        const totalReviewed = progresses.length;
        const mastered = progresses.filter(p => p.status === "MASTERED").length;
        const retention = totalReviewed > 0 ? Math.round((mastered / totalReviewed) * 100) : 0;

        // 4. Calculate Rank
        const allStudents = await prisma.user.findMany({
            where: { role: "STUDENT" },
            include: {
                flashcardProgress: {
                    where: { status: "MASTERED" }
                }
            }
        });

        const studentRankings = allStudents.map(student => ({
            userId: student.id,
            masteredCount: student.flashcardProgress.length
        }));

        // Sort descending by mastered count
        studentRankings.sort((a, b) => b.masteredCount - a.masteredCount);
        const rankIndex = studentRankings.findIndex(r => r.userId === userId);
        const rank = rankIndex !== -1 ? `#${rankIndex + 1}` : "N/A";

        return NextResponse.json({
            streak,
            retention,
            rank
        });

    } catch (error) {
        console.error("Flashcard Stats Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
