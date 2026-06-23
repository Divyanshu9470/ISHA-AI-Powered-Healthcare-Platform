import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { text, title, subject } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "No text provided" }, { status: 400 });
        }

        const prompt = `
            You are a medical education expert. Generate a set of high-yield medical flashcards from the provided text.
            Each flashcard should follow this structure:
            1. Question: Clear and concise.
            2. Answer: Direct and accurate.
            3. Explanation: A brief clinical pearl or explanation for deeper understanding.

            Text: """${text}"""

            Format the output as a JSON array of objects:
            [{ "question": "...", "answer": "...", "explanation": "..." }]
            Limit to 10 high-quality cards. Respond ONLY with the JSON array.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();
        
        // Clean the response text (remove markdown code blocks if present)
        const jsonMatch = responseText.match(/\[.*\]/s);
        const cardsJson = jsonMatch ? jsonMatch[0] : responseText;
        const generatedCards = JSON.parse(cardsJson);

        // Create the deck and cards in the database
        const deck = await prisma.flashcardDeck.create({
            data: {
                title: title || "AI Generated Deck",
                subject: subject || "General Medicine",
                description: `Automatically generated from your notes on ${new Date().toLocaleDateString()}`,
                createdBy: session.user.id,
                flashcards: {
                    create: generatedCards.map((card: any) => ({
                        question: card.question,
                        answer: card.answer,
                        explanation: card.explanation,
                    }))
                }
            }
        });

        return NextResponse.json({ success: true, deckId: deck.id });

    } catch (error) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
    }
}
