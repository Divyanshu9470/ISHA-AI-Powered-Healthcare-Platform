import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decks = await prisma.flashcardDeck.findMany({
            include: {
                _count: {
                    select: { flashcards: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(decks);

    } catch (error) {
        console.error("Fetch Decks Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
