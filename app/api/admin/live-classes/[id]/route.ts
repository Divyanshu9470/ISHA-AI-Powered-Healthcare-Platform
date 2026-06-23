import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, meetLink, scheduledAt, status } = body;

        const liveClass = await prisma.liveClass.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(meetLink !== undefined && { meetLink }),
                ...(scheduledAt !== undefined && { scheduledAt: new Date(scheduledAt) }),
                ...(status !== undefined && { status }),
            },
        });

        return NextResponse.json(liveClass);
    } catch (error) {
        console.error("LiveClass PUT error:", error);
        return NextResponse.json({ error: "Failed to update live class" }, { status: 500 });
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.liveClass.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("LiveClass DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete live class" }, { status: 500 });
    }
}
