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

    // Fetch stats in parallel
    const [testScores, enrollments, simulatorSessions] = await Promise.all([
      prisma.testScore.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 10
      }),
      prisma.enrollment.count({
        where: { userId }
      }),
      prisma.simulatorSession.count({
        where: { userId }
      })
    ]);

    // Calculate average score
    const avgScore = testScores.length > 0 
      ? testScores.reduce((acc, curr) => acc + (curr.score / curr.maxScore), 0) / testScores.length * 100
      : 0;

    return NextResponse.json({
      totalEnrollments: enrollments,
      totalSimulatorSessions: simulatorSessions,
      averageTestScore: avgScore.toFixed(1),
      recentActivity: testScores.map(score => ({
        type: 'TEST',
        subject: score.subject,
        score: score.score,
        maxScore: score.maxScore,
        date: score.date
      }))
    });
  } catch (error) {
    console.error("Student stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
