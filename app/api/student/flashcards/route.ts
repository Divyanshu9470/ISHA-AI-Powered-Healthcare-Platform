import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Fetch due flashcards
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const progressRecords = await prisma.flashcardProgress.findMany({
      where: {
        userId: session.user.id,
        nextReview: {
          lte: new Date(),
        },
      },
      include: {
        flashcard: true
      },
      orderBy: { nextReview: 'asc' },
    });

    return NextResponse.json(progressRecords.map(p => ({ ...p.flashcard, progress: p })));
  } catch (error) {
    console.error("SRS Fetch Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Update card progress (SRS logic)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cardId, quality } = await req.json(); // quality 0-5

    const progress = await prisma.flashcardProgress.findUnique({
      where: {
        userId_flashcardId: {
          userId: session.user.id,
          flashcardId: cardId
        }
      },
    });

    // SM-2 algorithm adaptation
    let interval = progress?.interval || 0;
    let repetitions = progress?.repetitions || 0;
    let easeFactor = progress?.easeFactor || 2.5;

    if (quality >= 3) {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
    } else {
      repetitions = 0;
      interval = 1;
    }

    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    const updatedProgress = await prisma.flashcardProgress.upsert({
      where: {
        userId_flashcardId: {
          userId: session.user.id,
          flashcardId: cardId
        }
      },
      update: {
        interval,
        repetitions,
        easeFactor,
        nextReview,
        lastReview: new Date(),
      },
      create: {
        userId: session.user.id,
        flashcardId: cardId,
        interval,
        repetitions,
        easeFactor,
        nextReview,
      }
    });

    return NextResponse.json(updatedProgress);
  } catch (error) {
    console.error("SRS Update Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
