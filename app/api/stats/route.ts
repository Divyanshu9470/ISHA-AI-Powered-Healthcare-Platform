import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const studentCount = await prisma.user.count({ where: { role: "STUDENT" } });
    const lessonCount = await prisma.lesson.count();
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
    
    // Calculate a realistic success rate from test scores
    const allScores = await prisma.testScore.findMany();
    const successRate = allScores.length > 0
      ? Math.round(allScores.filter(s => (s.score / s.maxScore) >= 0.5).length / allScores.length * 100)
      : 95; 

    return NextResponse.json({
      activeStudents: studentCount,
      videoLectures: lessonCount,
      expertMentors: adminCount,
      successRate: successRate
    });
  } catch (error) {
    console.error("Error in stats route:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
