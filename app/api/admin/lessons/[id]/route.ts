import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, description, videoUrl } = body;

        const lesson = await prisma.lesson.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(videoUrl !== undefined && { videoUrl }),
            },
        });

        return NextResponse.json(lesson);
    } catch (error) {
        console.error("Lesson PUT error:", error);
        return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 });
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.lesson.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Lesson DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 });
    }
}
