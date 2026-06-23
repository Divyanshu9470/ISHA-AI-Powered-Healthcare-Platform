import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, description, price, thumbnail, published } = body;

        const course = await prisma.course.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(price !== undefined && { price: parseFloat(price) }),
                ...(thumbnail !== undefined && { thumbnail }),
                ...(published !== undefined && { published }),
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.error("Course PUT error:", error);
        return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.course.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Course DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
    }
}
