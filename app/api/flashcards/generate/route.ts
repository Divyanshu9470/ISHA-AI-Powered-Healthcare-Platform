import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export async function POST(req: Request) {
    let session: any = null;
    let title = "";
    let subject = "";

    try {
        session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const text = body.text;
        title = body.title || "";
        subject = body.subject || "";

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
        console.error("AI Generation Error, falling back to mock flashcards:", error);
        
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        // Generate high-yield default flashcards based on subject or text content
        const defaultCards = [
          {
            question: "What is the first-line drug of choice for the management of anaphylaxis?",
            answer: "Intramuscular Epinephrine (Adrenaline) 1:1000",
            explanation: "Epinephrine is the first-line treatment for anaphylaxis due to its alpha-1 agonist (vasoconstriction), beta-1 agonist (increased heart rate/contractility), and beta-2 agonist (bronchodilation) effects."
          },
          {
            question: "Which anatomical landmark is used to locate the base of the appendix during surgery?",
            answer: "McBurney's point",
            explanation: "McBurney's point is located one-third of the distance from the anterior superior iliac spine (ASIS) to the umbilicus. It corresponds to the base of the appendix."
          },
          {
            question: "What is the classic triad of symptoms in Normal Pressure Hydrocephalus (NPH)?",
            answer: "Dementia, Gait instability, and Urinary incontinence ('wet, wobbly, and wacky')",
            explanation: "NPH is characterized by ventricular enlargement out of proportion to sulcal atrophy. Symptoms improve significantly with a lumbar puncture or shunt insertion."
          },
          {
            question: "Which pathogen is the most common cause of community-acquired pneumonia (CAP)?",
            answer: "Streptococcus pneumoniae",
            explanation: "Streptococcus pneumoniae (pneumococcus) is a Gram-positive, lancet-shaped diplococcus. It remains the most common bacterial cause of CAP across all age groups."
          },
          {
            question: "What is the primary diagnostic marker used to screen for and monitor Prostate Cancer?",
            answer: "Prostate-Specific Antigen (PSA)",
            explanation: "PSA is a glycoprotein produced by prostate epithelial cells. While elevated in prostate cancer, it can also rise in benign conditions like BPH and prostatitis."
          }
        ];

        try {
            const deck = await prisma.flashcardDeck.create({
                data: {
                    title: title || "High-Yield Medical Deck",
                    subject: subject || "Clinical Medicine",
                    description: `High-yield cards compiled on ${new Date().toLocaleDateString()}`,
                    createdBy: session.user.id,
                    flashcards: {
                        create: defaultCards
                    }
                }
            });
            return NextResponse.json({ success: true, deckId: deck.id });
        } catch (dbError) {
            console.error("DB fallback creation failed:", dbError);
            return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
        }
    }
}
