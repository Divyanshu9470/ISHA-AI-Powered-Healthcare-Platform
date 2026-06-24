import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ deckId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { deckId } = await params;

        const deck = await prisma.flashcardDeck.findUnique({
            where: { id: deckId },
            include: {
                flashcards: true
            }
        });

        if (!deck) {
            return NextResponse.json({ error: "Deck not found" }, { status: 404 });
        }

        return NextResponse.json(deck);
    } catch (error) {
        console.error("Fetch Deck Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
