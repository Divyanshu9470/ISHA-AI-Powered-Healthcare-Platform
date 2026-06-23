"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeSymptoms(symptoms: string) {
  const prompt = `
You are a highly experienced clinical diagnostic assistant.

Analyze the following patient presentation and provide a structured clinical differential diagnosis.

Patient Presentation:
"${symptoms}"

Respond ONLY with valid JSON.

{
  "primary": {
    "condition": "Primary Diagnosis Name",
    "probability": 85
  },
  "differentials": [
    {
      "condition": "Secondary Diagnosis 1",
      "probability": 30
    }
  ],
  "labs": [
    "Required Test 1",
    "Required Test 2"
  ],
  "recommendedLecture":
    "Relevant medical lecture title"
}
`;

  const modelsToTry = [
    "gemini-flash-latest",
    "gemini-2.5-flash",
  ];

  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`Trying model: ${modelName}`);

      const model = genAI.getGenerativeModel({
        model: modelName,
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // More robust JSON extraction
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const cleanedText = jsonMatch[0];
      const parsed = JSON.parse(cleanedText);

      console.log(`Success with ${modelName}`);
      return parsed;

    } catch (error: any) {
      lastError = error;
      console.error(`Failed with ${modelName}:`, error.message);
      
      // If it's a quota error, we might want to try the next model
      // but if it's a 404, we definitely want to try the next one.
    }
  }

  throw new Error(
    `AI Analysis Error: ${lastError?.message || "All Gemini models failed"}`
  );
}

export async function transcribeAudio(base64Audio: string, mimeType: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Audio,
          mimeType: mimeType
        }
      },
      "You are a medical scribe. Transcribe the following medical patient presentation accurately into text. If the audio is unclear, do your best to capture medical terms. ONLY return the transcribed text, no other commentary."
    ]);

    return result.response.text();
  } catch (error: any) {
    console.error("Transcription error:", error);
    throw new Error("Failed to transcribe audio. Please try again or type your symptoms.");
  }
}