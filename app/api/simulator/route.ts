import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: Request) {
  let messages: any[] = [];
  let lastMessage = "";
  try {
    const session = await getServerSession(authOptions);
    // Guest access is allowed; log the user email if logged in, otherwise process as guest
    const userIdentifier = session?.user?.email || "Guest";
    const body = await req.json();
    messages = body.messages || [];
    console.log(`Simulator received messages from ${userIdentifier}:`, JSON.stringify(messages));
    
    // Construct a comprehensive system prompt for the patient simulation
    const systemPrompt = `
      You are a 45-year-old male patient named John Doe. 
      CHIEF COMPLAINT: Severe abdominal pain.
      HISTORY: Started last night around the umbilicus, now migrated to the Right Lower Quadrant (RLQ).
      VITALS: HR 110 (tachycardia), Temp 101.2 F (fever), BP 130/85.
      SYMPTOMS: Nausea, anorexia (loss of appetite), exquisite tenderness at McBurney's point.
      DIAGNOSIS (Hidden): Acute Appendicitis.
      
      INSTRUCTIONS:
      - Stay in character as John. You are in pain and anxious.
      - Do not diagnose yourself. Answer the doctor's questions based on your symptoms.
      - Use layperson terms unless the doctor uses medical terms first.
      - If the doctor orders a test (CBC, Ultrasound, CT), acknowledge it and wait for results (which the doctor will see in the UI).
      - Be concise but realistic.
    `;

    // Convert messages to Gemini format, filtering out system messages and the last message
    // Gemini history must alternate between user and model roles
    const history = messages
      .filter((m: any) => m.role !== "system" && m !== messages[messages.length - 1])
      .map((m: any) => ({
        role: m.role === "doctor" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

    // Ensure we don't have consecutive identical roles in history (a Gemini requirement)
    const filteredHistory = [];
    for (let i = 0; i < history.length; i++) {
      if (i === 0 || history[i].role !== history[i - 1].role) {
        filteredHistory.push(history[i]);
      }
    }

    lastMessage = messages[messages.length - 1]?.content || "";
    if (!lastMessage) {
      return NextResponse.json({ role: "patient", content: "..." });
    }

    // Construct the full conversation context for a single-shot generation
    // This is more robust than the startChat API for complex personas
    const conversationHistory = filteredHistory
      .map(m => `${m.role === 'user' ? 'Doctor' : 'Patient'}: ${m.parts[0].text}`)
      .join('\n');

    const fullPrompt = `
${systemPrompt}

RECENT CONVERSATION:
${conversationHistory}

Doctor: ${lastMessage}
Patient:`;

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    // Use generateContent for a more direct response
    const result = await model.generateContent(fullPrompt);
    const aiResponse = result.response.text().trim();

    if (!aiResponse) {
      console.warn("Gemini returned empty response for prompt:", fullPrompt);
      return NextResponse.json({ role: "patient", content: "I'm sorry doctor, I'm in too much pain to talk right now..." });
    }

    return NextResponse.json({ role: "patient", content: aiResponse });

  } catch (error: any) {
    console.error("Simulator Gemini Error, falling back to mock response:", error);
    
    const docQuery = (lastMessage || "").toLowerCase();
    let reply = "I'm in a lot of pain, doctor. It's mostly in the lower right part of my stomach.";
    
    if (docQuery.includes("where") || docQuery.includes("location") || docQuery.includes("pain")) {
      reply = "It started around my belly button last night, but now it has migrated down to the lower right side of my stomach. It hurts a lot when you press there.";
    } else if (docQuery.includes("scale") || docQuery.includes("1 to 10") || docQuery.includes("how bad")) {
      reply = "It's easily an 8 or 9 out of 10. It hurts to move or even breathe deeply.";
    } else if (docQuery.includes("nausea") || docQuery.includes("throw up") || docQuery.includes("vomit") || docQuery.includes("eat") || docQuery.includes("appetite") || docQuery.includes("symptom")) {
      reply = "Yes, I feel very nauseous and I haven't been able to eat anything all day. Just thinking about food makes me feel sick.";
    } else if (docQuery.includes("fever") || docQuery.includes("temperature") || docQuery.includes("hot")) {
      reply = "Yeah, I feel hot and sweaty. The nurse checked my temperature and said it was 101.2 F.";
    } else if (docQuery.includes("test") || docQuery.includes("ct") || docQuery.includes("ultrasound") || docQuery.includes("cbc") || docQuery.includes("blood")) {
      reply = "Okay doctor, please order whatever tests you need. I just want this pain to stop.";
    } else if (docQuery.includes("hello") || docQuery.includes("hi ") || docQuery.includes("meet") || docQuery.includes("name")) {
      reply = "Hello doctor. I'm John. Thank you for seeing me. I'm in a lot of pain right now.";
    }
    
    return NextResponse.json({ role: "patient", content: reply });
  }
}
