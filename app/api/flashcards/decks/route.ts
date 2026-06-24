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

        const userId = session.user.id;

        const decks = await prisma.flashcardDeck.findMany({
            include: {
                flashcards: {
                    include: {
                        progress: {
                            where: { userId }
                        }
                    }
                },
                _count: {
                    select: { flashcards: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Map to include real progress counts
        const formattedDecks = decks.map(deck => {
            const total = deck.flashcards.length;
            const mastered = deck.flashcards.filter(c => 
                c.progress.length > 0 && c.progress[0].status === "MASTERED"
            ).length;

            return {
                id: deck.id,
                title: deck.title,
                description: deck.description,
                subject: deck.subject,
                imageUrl: deck.imageUrl,
                _count: { flashcards: total },
                progress: {
                    mastered,
                    total: total > 0 ? total : 1 // Avoid divide by 0
                }
            };
        });

        return NextResponse.json(formattedDecks);

    } catch (error) {
        console.error("Fetch Decks Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
