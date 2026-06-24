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

    // Calculate real predicted rank relative to other student users
    const allStudents = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: {
        testScores: true
      }
    });

    const studentAverages = allStudents.map(student => {
      const avg = student.testScores.length > 0
        ? student.testScores.reduce((acc, curr) => acc + (curr.score / curr.maxScore), 0) / student.testScores.length * 100
        : 0;
      return { userId: student.id, avg, hasTests: student.testScores.length > 0 };
    });

    // Sort: students with tests first, ordered by avg score desc.
    // If a student has no tests, they go to the bottom.
    studentAverages.sort((a, b) => {
      if (a.hasTests && !b.hasTests) return -1;
      if (!a.hasTests && b.hasTests) return 1;
      return b.avg - a.avg;
    });

    const userRankIndex = studentAverages.findIndex(s => s.userId === userId);
    const hasTests = studentAverages[userRankIndex]?.hasTests;
    const predictedRank = hasTests ? `#${userRankIndex + 1}` : "N/A";

    // Calculate real performance trajectory (chronological order)
    const testScoresAsc = await prisma.testScore.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
      take: 10
    });

    const performanceTrajectory = testScoresAsc.map((score, index) => ({
      name: score.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: Math.round((score.score / score.maxScore) * 100)
    }));

    // Calculate real weakness radar
    const standardSubjects = ["Anatomy", "Pathology", "Pharmacology", "Physiology", "Biochemistry", "Microbiology"];
    const subjectScoresMap: { [key: string]: { total: number, count: number } } = {};
    
    // Fetch all test scores of the user
    const allUserScores = await prisma.testScore.findMany({
      where: { userId }
    });

    allUserScores.forEach(score => {
      const percentage = (score.score / score.maxScore) * 100;
      const sub = score.subject;
      if (!subjectScoresMap[sub]) {
        subjectScoresMap[sub] = { total: 0, count: 0 };
      }
      subjectScoresMap[sub].total += percentage;
      subjectScoresMap[sub].count += 1;
    });

    const subjectRadarData = standardSubjects.map(subject => {
      const stats = subjectScoresMap[subject];
      return {
        subject,
        A: stats ? Math.round(stats.total / stats.count) : 0,
        fullMark: 100
      };
    });

    // Calculate weakest subjects and dynamic study plan
    const scoredSubjects = standardSubjects.map(sub => ({
      subject: sub,
      avg: subjectScoresMap[sub] ? (subjectScoresMap[sub].total / subjectScoresMap[sub].count) : 0,
      hasScore: !!subjectScoresMap[sub]
    }));

    let weakestSubjects: string[] = [];
    if (allUserScores.length > 0) {
      // Sort by average score ascending (lowest score means weakest)
      const sortedScored = [...scoredSubjects].sort((a, b) => a.avg - b.avg);
      weakestSubjects = sortedScored.slice(0, 2).map(s => s.subject);
    } else {
      weakestSubjects = ["Biochemistry", "Pathology"];
    }

    const planItems = [
      { time: "09:00 AM", title: `${weakestSubjects[0]}: Core Review`, duration: "2 Hours", type: "Video + Notes" },
      { time: "11:30 AM", title: `${weakestSubjects[1]}: Practice Test`, duration: "1.5 Hours", type: "Mock Test" },
      { time: "02:00 PM", title: `${weakestSubjects[0]} Revision`, duration: "1 Hour", type: "Flashcards" }
    ];

    return NextResponse.json({
      totalEnrollments: enrollments,
      totalSimulatorSessions: simulatorSessions,
      averageTestScore: avgScore.toFixed(1),
      predictedRank,
      performanceTrajectory,
      subjectRadarData,
      weakestSubjects,
      planItems,
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
