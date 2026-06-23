import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const liveClasses = await prisma.liveClass.findMany({
            orderBy: { scheduledAt: "desc" },
        });
        return NextResponse.json(liveClasses);
    } catch (error) {
        console.error("LiveClasses GET error:", error);
        return NextResponse.json({ error: "Failed to fetch live classes" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, meetLink, scheduledAt } = body;

        if (!title || !meetLink || !scheduledAt) {
            return NextResponse.json(
                { error: "Title, meetLink, and scheduledAt are required" },
                { status: 400 }
            );
        }

        const liveClass = await prisma.liveClass.create({
            data: {
                title,
                meetLink,
                scheduledAt: new Date(scheduledAt),
            },
        });

        return NextResponse.json(liveClass, { status: 201 });
    } catch (error) {
        console.error("LiveClasses POST error:", error);
        return NextResponse.json({ error: "Failed to create live class" }, { status: 500 });
    }
}
