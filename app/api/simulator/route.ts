import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy-key");


const CASES_DB: Record<string, { systemPrompt: string; fallbackResponses: Record<string, string> }> = {
  "#842": {
    systemPrompt: `
      You are a 45-year-old male patient named John Doe. 
      CHIEF COMPLAINT: Severe abdominal pain.
      HISTORY: Started last night around the umbilicus, now migrated to the Right Lower Quadrant (RLQ).
      VITALS: HR 110 (tachycardia), Temp 101.2 F (fever), BP 130/85.
      SYMPTOMS: Nausea, anorexia (loss of appetite), exquisite tenderness at McBurney's point.
      DIAGNOSIS (Hidden): Acute Appendicitis.
    `,
    fallbackResponses: {
      location: "It started around my belly button last night, but now it has migrated down to the lower right side of my stomach. It hurts a lot when you press there.",
      severity: "It's easily an 8 or 9 out of 10. It hurts to move or even breathe deeply.",
      symptoms: "Yes, I feel very nauseous and I haven't been able to eat anything all day. Just thinking about food makes me feel sick.",
      fever: "Yeah, I feel hot and sweaty. The nurse checked my temperature and said it was 101.2 F.",
      tests: "Okay doctor, please order whatever tests you need. I just want this pain to stop.",
      greeting: "Hello doctor. I'm John. Thank you for seeing me. I'm in a lot of pain right now."
    }
  },
  "#294": {
    systemPrompt: `
      You are a 52-year-old female patient named Sarah Jenkins. 
      CHIEF COMPLAINT: Right Upper Quadrant Pain.
      HISTORY: Started after eating a greasy cheeseburger last night, radiates to right scapula / shoulder blade.
      VITALS: HR 105 (tachycardia), Temp 100.8 F (fever), BP 142/90.
      SYMPTOMS: Severe right upper quadrant abdominal pain, nausea, threw up twice.
      DIAGNOSIS (Hidden): Acute Cholecystitis.
    `,
    fallbackResponses: {
      location: "It is a severe, sharp pain in the upper right side of my belly, right below my ribs. It shoots through to my back, near my shoulder blade.",
      severity: "It's a constant, aching 8 out of 10. It gets much worse if I try to take a deep breath.",
      symptoms: "I have been vomiting and feel very nauseous. It all started about an hour after eating dinner last night.",
      fever: "Yes, I feel warm. My temperature was 100.8 F.",
      tests: "Yes, doctor. I am ready for any tests to get some relief.",
      greeting: "Hello, doctor. I'm Sarah. I'm really hurting, especially when I breathe in."
    }
  },
  "#511": {
    systemPrompt: `
      You are a 68-year-old male patient named Robert Miller. 
      CHIEF COMPLAINT: Left Lower Quadrant Pain.
      HISTORY: Constant pain for the last 2 days in the lower left belly, associated with chills, constipation, and bloating.
      VITALS: HR 95, Temp 101.5 F (fever), BP 138/82.
      SYMPTOMS: Left lower quadrant tenderness, bloating, constipation, mild chills.
      DIAGNOSIS (Hidden): Acute Sigmoid Diverticulitis.
    `,
    fallbackResponses: {
      location: "It is in the lower left part of my stomach. It has been a constant, steady ache there for the past two days.",
      severity: "I would rate it as a 7 out of 10. It feels like a severe cramp that won't go away.",
      symptoms: "I've been very constipated, bloated, and I've had some chills. No vomiting, but I don't feel like eating.",
      fever: "Yes, I have been shivering. My temp is 101.5 F.",
      tests: "I agree, doctor. Let's do whatever scans or blood work you think are best.",
      greeting: "Hello doctor, I'm Robert. My stomach has been acting up badly."
    }
  },
  "#107": {
    systemPrompt: `
      You are a 29-year-old female patient named Emily Watson. 
      CHIEF COMPLAINT: Diffuse abdominal pain and watery diarrhea.
      HISTORY: Cramping abdominal pain all over, watery diarrhea and vomiting since this morning.
      VITALS: HR 112, Temp 100.2 F, BP 110/70.
      SYMPTOMS: Diffuse abdominal cramping, nausea, vomiting, watery stools, signs of mild dehydration.
      DIAGNOSIS (Hidden): Acute Gastroenteritis.
    `,
    fallbackResponses: {
      location: "It is all over my stomach, doctor. It feels like bad, colicky cramps that come and go in waves.",
      severity: "When the cramps hit, it's a 7/10, but then it eases up to a 3/10. I am exhausted from going to the bathroom.",
      symptoms: "I have had watery diarrhea at least 8 times today, and I threw up three times this morning.",
      fever: "I feel slightly warm. The nurse said my temperature was 100.2 F.",
      tests: "Whatever you think is best, doctor. I'm just so weak.",
      greeting: "Hi doctor, I'm Emily. I've been running to the toilet all day today."
    }
  },
  "#733": {
    systemPrompt: `
      You are a 38-year-old male patient named David Vance. 
      CHIEF COMPLAINT: Severe right flank pain radiating to the groin.
      HISTORY: Sudden onset of excruciating right back/side pain coming in waves, radiating to the groin.
      VITALS: HR 115 (due to pain), Temp 98.6 F (normal), BP 152/95.
      SYMPTOMS: Stabbing flank pain, nausea, vomiting, hematuria (blood in urine).
      DIAGNOSIS (Hidden): Renal Colic / Nephrolithiasis.
    `,
    fallbackResponses: {
      location: "It is on my right lower back and side, and it's traveling down towards my groin area.",
      severity: "It is a 10 out of 10. The worst pain of my life! I can't sit still or find any position that helps.",
      symptoms: "I feel extremely nauseous and threw up once from the sheer intensity of the pain. I also noticed my urine looked slightly pinkish.",
      fever: "No, I don't think I have a fever. The thermometer showed 98.6 F.",
      tests: "Please, doctor, order the tests. Can I get some pain medication too?",
      greeting: "Doctor! I'm David. Please help me, I am in agony!"
    }
  }
};

export async function POST(req: Request) {
  let messages: any[] = [];
  let lastMessage = "";
  let caseId = "#842";
  try {
    const session = await getServerSession(authOptions);
    const userIdentifier = session?.user?.email || "Guest";
    const body = await req.json();
    messages = body.messages || [];
    caseId = body.caseId || "#842";
    console.log(`Simulator received messages from ${userIdentifier} for case ${caseId}:`, JSON.stringify(messages));
    
    const patientCase = CASES_DB[caseId] || CASES_DB["#842"];
    const systemPrompt = `
      ${patientCase.systemPrompt}
      
      INSTRUCTIONS:
      - Stay in character as the patient. You are in pain and anxious.
      - Do not diagnose yourself. Answer the doctor's questions based on your symptoms.
      - Use layperson terms unless the doctor uses medical terms first.
      - If the doctor orders a test (CBC, Ultrasound, CT), acknowledge it and wait for results (which the doctor will see in the UI).
      - Be concise but realistic.
    `;

    const history = messages
      .filter((m: any) => m.role !== "system" && m !== messages[messages.length - 1])
      .map((m: any) => ({
        role: m.role === "doctor" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

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
    const patientCase = CASES_DB[caseId] || CASES_DB["#842"];
    const fallback = patientCase.fallbackResponses;
    let reply = fallback.location;
    
    if (docQuery.includes("where") || docQuery.includes("location") || docQuery.includes("pain")) {
      reply = fallback.location;
    } else if (docQuery.includes("scale") || docQuery.includes("1 to 10") || docQuery.includes("how bad")) {
      reply = fallback.severity;
    } else if (docQuery.includes("nausea") || docQuery.includes("throw up") || docQuery.includes("vomit") || docQuery.includes("eat") || docQuery.includes("appetite") || docQuery.includes("symptom") || docQuery.includes("stool") || docQuery.includes("diarrhea")) {
      reply = fallback.symptoms;
    } else if (docQuery.includes("fever") || docQuery.includes("temperature") || docQuery.includes("hot")) {
      reply = fallback.fever;
    } else if (docQuery.includes("test") || docQuery.includes("ct") || docQuery.includes("ultrasound") || docQuery.includes("cbc") || docQuery.includes("blood")) {
      reply = fallback.tests;
    } else if (docQuery.includes("hello") || docQuery.includes("hi ") || docQuery.includes("meet") || docQuery.includes("name")) {
      reply = fallback.greeting;
    }
    
    return NextResponse.json({ role: "patient", content: reply });
  }
}
