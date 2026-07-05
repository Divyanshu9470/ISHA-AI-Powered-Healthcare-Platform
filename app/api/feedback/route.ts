import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, type, message, rating, difficulty } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Feedback message is required" }, { status: 400 });
        }

        const feedback = await prisma.feedback.create({
            data: {
                name: name || "Anonymous",
                email: email || "anonymous@example.com",
                type: type || "SUGGESTION",
                message,
                rating: rating !== undefined ? parseInt(rating) : 5,
                difficulty: difficulty || "NONE",
            },
        });

        return NextResponse.json(feedback, { status: 201 });
    } catch (error) {
        console.error("Feedback submission error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
