import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description, videoUrl, courseId } = body;

        if (!title || !videoUrl || !courseId) {
            return NextResponse.json(
                { error: "Title, videoUrl, and courseId are required" },
                { status: 400 }
            );
        }

        const lesson = await prisma.lesson.create({
            data: {
                title,
                description: description || null,
                videoUrl,
                courseId,
            },
        });

        return NextResponse.json(lesson, { status: 201 });
    } catch (error) {
        console.error("Lesson POST error:", error);
        return NextResponse.json({ error: "Failed to create lesson" }, { status: 500 });
    }
}
