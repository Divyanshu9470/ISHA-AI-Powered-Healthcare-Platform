import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const courses = await prisma.course.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: { select: { lessons: true, enrollments: true } },
                lessons: {
                    orderBy: { createdAt: "asc" },
                    select: { id: true, title: true, videoUrl: true, createdAt: true },
                },
            },
        });
        return NextResponse.json(courses);
    } catch (error) {
        console.error("Courses GET error:", error);
        return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description, price, thumbnail, published } = body;

        if (!title || !description || price === undefined) {
            return NextResponse.json(
                { error: "Title, description, and price are required" },
                { status: 400 }
            );
        }

        const course = await prisma.course.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                thumbnail: thumbnail || null,
                published: published ?? false,
            },
        });

        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        console.error("Courses POST error:", error);
        return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
    }
}
