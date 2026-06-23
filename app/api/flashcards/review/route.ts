import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { flashcardId, rating } = await req.json(); // rating: 'easy', 'medium', 'hard'

        const progress = await prisma.flashcardProgress.findUnique({
            where: {
                userId_flashcardId: {
                    userId: session.user.id,
                    flashcardId: flashcardId
                }
            }
        });

        let interval = progress?.interval || 0;
        let easeFactor = progress?.easeFactor || 2.5;
        let repetitions = progress?.repetitions || 0;
        let nextReview = new Date();

        if (rating === 'easy') {
            repetitions += 1;
            interval = repetitions === 1 ? 4 : Math.round(interval * easeFactor);
            easeFactor += 0.1;
        } else if (rating === 'medium') {
            repetitions += 1;
            interval = repetitions === 1 ? 1 : Math.round(interval * 1.6);
        } else {
            repetitions = 0;
            interval = 0; // Review immediately/tomorrow
            easeFactor = Math.max(1.3, easeFactor - 0.2);
        }

        nextReview.setDate(nextReview.getDate() + interval);

        await prisma.flashcardProgress.upsert({
            where: {
                userId_flashcardId: {
                    userId: session.user.id,
                    flashcardId: flashcardId
                }
            },
            update: {
                interval,
                easeFactor,
                repetitions,
                nextReview,
                lastReview: new Date(),
                status: interval > 30 ? "MASTERED" : "REVIEW"
            },
            create: {
                userId: session.user.id,
                flashcardId,
                interval,
                easeFactor,
                repetitions,
                nextReview,
                status: "LEARNING"
            }
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("SRS Update Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
