"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, User, Bot, Activity, FileText, Pill, ChevronLeft, 
  Award, HelpCircle, CheckCircle2, XCircle, RefreshCw, LogIn 
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const DIAGNOSIS_OPTIONS = [
  "Acute Appendicitis",
  "Acute Cholecystitis",
  "Diverticulitis",
  "Gastroenteritis",
  "Renal Colic"
];

export interface PatientCase {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female";
  chiefComplaint: string;
  initialSystemMessage: string;
  initialPatientMessage: string;
  vitals: {
    hr: string;
    bp: string;
    temp: string;
    spo2: string;
    hrAlert?: boolean;
    tempAlert?: boolean;
  };
  medications: string[];
  diagnosis: string;
  cbcResults: string;
  usResults: string;
  ctResults: string;
  explanation: string;
  incorrectExplanation: string;
}

const PATIENT_CASES: PatientCase[] = [
  {
    id: "#842",
    name: "John Doe",
    age: 45,
    gender: "male",
    chiefComplaint: "Abdominal Pain",
    initialSystemMessage: "You are now interacting with a 45-year-old male patient complaining of severe abdominal pain.",
    initialPatientMessage: "Doctor, my stomach hurts so much. It started last night around my belly button and now it's moved to the lower right side.",
    vitals: { hr: "110 bpm", bp: "130/85", temp: "101.2 °F", spo2: "98%", hrAlert: true, tempAlert: true },
    medications: ["Lisinopril 10mg (Daily)", "Atorvastatin 20mg (Daily)"],
    diagnosis: "Acute Appendicitis",
    cbcResults: "• WBC: 14.5 x10³/µL (High)\n• Neutrophils: 82% (High)\n• CRP: 24 mg/L (High)",
    usResults: "• Appendix: 8.5 mm (dilated)\n• Target sign positive\n• Free fluid in RLQ",
    ctResults: "• Appendix: 9.0 mm dilated\n• Pericecal fat stranding\n• Appendicolith seen",
    explanation: "Excellent job, doctor! The patient presents with classic migratory abdominal pain (starting periumbilical and localizing to the RLQ), low-grade fever, tachycardia, and tenderness at McBurney's point. This is highly indicative of Acute Appendicitis.",
    incorrectExplanation: "Incorrect diagnosis. Although the patient presents with abdominal pain, the classic migration of pain from the umbilicus to the RLQ, associated with fever and McBurney's point tenderness, is pathognomonic for Acute Appendicitis."
  },
  {
    id: "#294",
    name: "Sarah Jenkins",
    age: 52,
    gender: "female",
    chiefComplaint: "Right Upper Quadrant Pain",
    initialSystemMessage: "You are now interacting with a 52-year-old female patient complaining of severe upper stomach pain.",
    initialPatientMessage: "Doctor, I have this horrible pain in the upper right side of my stomach. It started after I ate a cheeseburger last night, and it's radiating to my right shoulder blade. I've thrown up twice.",
    vitals: { hr: "105 bpm", bp: "142/90", temp: "100.8 °F", spo2: "97%", hrAlert: true, tempAlert: true },
    medications: ["Metformin 500mg (Twice daily)", "Levothyroxine 75mcg (Daily)"],
    diagnosis: "Acute Cholecystitis",
    cbcResults: "• WBC: 12.8 x10³/µL (High)\n• LFTs: Alk Phos: 135 U/L (Elevated)\n• Bilirubin: 1.1 mg/dL (Normal)",
    usResults: "• Gallbladder wall: 5 mm (thickened)\n• Pericholecystic fluid present\n• Sonographic Murphy's sign positive\n• Multiple gallstones visualized",
    ctResults: "• Gallbladder distended with wall enhancement\n• Surrounding inflammatory changes\n• No gallstone duct obstruction",
    explanation: "Excellent job, doctor! The patient presents with severe right upper quadrant pain radiating to the shoulder blade, triggered by fatty meals (postprandial), associated with vomiting, fever, and leukocytosis. The positive Murphy's sign and ultrasound findings confirm Acute Cholecystitis.",
    incorrectExplanation: "Incorrect diagnosis. The patient's right upper quadrant pain triggered by fat ingestion, radiating to the right scapula, coupled with gallbladder wall thickening and sonographic Murphy's sign, is classic for Acute Cholecystitis."
  },
  {
    id: "#511",
    name: "Robert Miller",
    age: 68,
    gender: "male",
    chiefComplaint: "Left Lower Quadrant Pain",
    initialSystemMessage: "You are now interacting with a 68-year-old male patient complaining of left-sided lower abdominal pain.",
    initialPatientMessage: "Doctor, my stomach is hurting terribly on the lower left side. It's been constant for the last two days, and I've been feeling chilled, constipated, and bloated.",
    vitals: { hr: "95 bpm", bp: "138/82", temp: "101.5 °F", spo2: "96%", hrAlert: false, tempAlert: true },
    medications: ["Amlodipine 5mg (Daily)", "Tamsulosin 0.4mg (Daily)"],
    diagnosis: "Diverticulitis",
    cbcResults: "• WBC: 15.2 x10³/µL (High)\n• Neutrophils: 85% (High)\n• CRP: 42 mg/L (High)",
    usResults: "• Thickenings of colonic wall in LLQ\n• Suboptimal evaluation due to overlying bowel gas",
    ctResults: "• Sigmoid colon wall thickening & multiple outpouchings\n• Pericolic fat stranding\n• No abscess or free air detected",
    explanation: "Excellent job, doctor! The patient presents with classic left lower quadrant pain ('left-sided appendicitis'), fever, leucocytosis, and altered bowel habits. The abdominal CT scan confirming sigmoid colonic wall thickening and fat stranding is diagnostic for acute diverticulitis.",
    incorrectExplanation: "Incorrect diagnosis. Left lower quadrant pain, constipation, fever, and leukocytosis in an older patient is the classic presentation of acute Sigmoid Diverticulitis, confirmed by fat stranding and wall thickening on CT scan."
  },
  {
    id: "#107",
    name: "Emily Watson",
    age: 29,
    gender: "female",
    chiefComplaint: "Diffuse Abdominal Pain & Diarrhea",
    initialSystemMessage: "You are now interacting with a 29-year-old female patient complaining of cramping stomach pain, nausea, and diarrhea.",
    initialPatientMessage: "Doctor, I've been running to the bathroom all day. I have watery diarrhea, vomiting, and this horrible cramping pain all over my stomach that comes and goes.",
    vitals: { hr: "112 bpm", bp: "110/70", temp: "100.2 °F", spo2: "99%", hrAlert: true, tempAlert: true },
    medications: ["Oral Contraceptive Pill (Daily)"],
    diagnosis: "Gastroenteritis",
    cbcResults: "• WBC: 9.8 x10³/µL (Normal)\n• Hematocrit: 47% (High, indicating dehydration)\n• Potassium: 3.4 mEq/L (Low)",
    usResults: "• Normal appendix, gallbladder, and kidneys\n• No free fluid in abdomen",
    ctResults: "• Diffuse, mild small and large bowel wall thickening\n• No inflammatory fat stranding or focal pathology",
    explanation: "Excellent job, doctor! The patient presents with cramping, diffuse abdominal pain, watery diarrhea, vomiting, low-grade fever, and mild hypokalemia/dehydration. The lack of localized tenderness and negative imaging confirm acute Gastroenteritis.",
    incorrectExplanation: "Incorrect diagnosis. The combination of diffuse cramping pain, vomiting, profuse watery diarrhea, hyperactive bowel sounds, and normal inflammatory markers/imaging is diagnostic for Gastroenteritis."
  },
  {
    id: "#733",
    name: "David Vance",
    age: 38,
    gender: "male",
    chiefComplaint: "Severe Flank Pain",
    initialSystemMessage: "You are now interacting with a 38-year-old male patient complaining of sudden, agonizing flank pain.",
    initialPatientMessage: "Doctor, help! I have this sharp, stabbing pain in my lower back and side that's coming in waves. It's so bad I can't find any comfortable position. The pain is traveling down towards my groin, and I feel like throwing up.",
    vitals: { hr: "115 bpm", bp: "152/95", temp: "98.6 °F", spo2: "98%", hrAlert: true, tempAlert: false },
    medications: ["None"],
    diagnosis: "Renal Colic",
    cbcResults: "• WBC: 8.5 x10³/µL (Normal)\n• Urinalysis: RBC >50/hpf (Hematuria)\n• Calcium oxalate crystals seen",
    usResults: "• Right kidney: Mild hydronephrosis\n• Dilated right proximal ureter",
    ctResults: "• 4 mm calcified stone in the right distal ureter\n• Proximal ureteral dilatation",
    explanation: "Excellent job, doctor! The patient presents with classic renal colic: sudden, severe unilateral flank pain radiating to the groin, coming in waves (colicky), associated with microscopic hematuria, hydronephrosis on ultrasound, and a distal ureteral stone on non-contrast CT.",
    incorrectExplanation: "Incorrect diagnosis. Sudden, agonizing, colicky flank pain radiating to the groin, coupled with hematuria and hydronephrosis/stone on CT, is the textbook presentation of Renal Colic (Nephrolithiasis)."
  }
];

export default function SimulatorPage() {
  const { data: session, status } = useSession();
  
  const [currentCase, setCurrentCase] = useState<PatientCase>(PATIENT_CASES[0]);
  const [messages, setMessages] = useState([
    { role: "system", content: PATIENT_CASES[0].initialSystemMessage },
    { role: "patient", content: PATIENT_CASES[0].initialPatientMessage }
  ]);
  const [orderedLabs, setOrderedLabs] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [savingResult, setSavingResult] = useState(false);

  // Initialize random case on mount to prevent Next.js hydration mismatch
  useEffect(() => {
    const rand = Math.floor(Math.random() * PATIENT_CASES.length);
    const selected = PATIENT_CASES[rand];
    setCurrentCase(selected);
    setMessages([
      { role: "system", content: selected.initialSystemMessage },
      { role: "patient", content: selected.initialPatientMessage }
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const newMessages = [...messages, { role: "doctor", content: input }];
    setMessages(newMessages);
    
    // Check if doctor ordered lab tests or imaging
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("cbc") || lowerInput.includes("blood count") || lowerInput.includes("inflammatory") || lowerInput.includes("complete blood")) {
      if (!orderedLabs.includes("CBC")) {
        setOrderedLabs(prev => [...prev, "CBC"]);
      }
    }
    if (lowerInput.includes("ultrasound") || lowerInput.includes("usg") || lowerInput.includes("imaging") || lowerInput.includes("echo")) {
      if (!orderedLabs.includes("Ultrasound")) {
        setOrderedLabs(prev => [...prev, "Ultrasound"]);
      }
    }
    if (lowerInput.includes("ct ") || lowerInput.includes("computed tomography") || lowerInput.includes("ct scan")) {
      if (!orderedLabs.includes("CT Scan")) {
        setOrderedLabs(prev => [...prev, "CT Scan"]);
      }
    }

    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, caseId: currentCase.id }),
      });
      const data = await res.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: "system", content: `Error: ${data.details || data.error}` }]);
      } else if (data.role) {
        setMessages(prev => [...prev, { role: data.role, content: data.content }]);
      }
    } catch (error: any) {
      console.error("Failed to fetch response:", error);
      setMessages(prev => [...prev, { role: "system", content: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitDiagnosis = async (diagnosis: string) => {
    setSelectedDiagnosis(diagnosis);
    const doctorMessagesCount = messages.filter(m => m.role === "doctor").length;
    
    const isCorrect = diagnosis === currentCase.diagnosis;
    const baseScore = isCorrect ? 80 : 0;
    // Efficiency bonus: fewer questions asked results in a higher score
    const efficiencyBonus = isCorrect ? Math.max(20 - doctorMessagesCount * 2, 0) : 0;
    const finalScore = baseScore + efficiencyBonus;
    
    const evalData = {
      isCorrect,
      score: finalScore,
      doctorMessagesCount,
      diagnosis,
      explanation: isCorrect ? currentCase.explanation : currentCase.incorrectExplanation
    };
    
    setEvaluationResult(evalData);
    
    if (status === "authenticated") {
      setSavingResult(true);
      try {
        await fetch("/api/simulator/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patientCase: `Case ${currentCase.id}: ${currentCase.name} (${currentCase.diagnosis})`,
            score: finalScore,
            status: isCorrect ? "COMPLETED" : "FAILED",
          }),
        });
      } catch (err) {
        console.error("Failed to save results:", err);
      } finally {
        setSavingResult(false);
      }
    }
  };

  const handleRestart = () => {
    const rand = Math.floor(Math.random() * PATIENT_CASES.length);
    const selected = PATIENT_CASES[rand];
    setCurrentCase(selected);
    setMessages([
      { role: "system", content: selected.initialSystemMessage },
      { role: "patient", content: selected.initialPatientMessage }
    ]);
    setOrderedLabs([]);
    setInput("");
    setSelectedDiagnosis("");
    setEvaluationResult(null);
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans relative">
      {/* Guest Practice Banner */}
      {status === "unauthenticated" && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-200 px-4 py-2.5 text-center text-xs sm:text-sm flex items-center justify-center gap-2 relative z-20">
          <span>⚠️ You are practicing as a guest. Your diagnostic achievements won't be saved to your profile.</span>
          <Link href="/login?callbackUrl=/simulator" className="underline font-bold hover:text-amber-100 flex items-center gap-1">
            <LogIn className="w-3.5 h-3.5" /> Log In
          </Link>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/courses" className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Virtual Patient: Case {currentCase.id}
            </h1>
            <p className="text-sm text-slate-400">Chief Complaint: {currentCase.chiefComplaint}</p>
          </div>
        </div>
        <button 
          onClick={() => setIsSubmitModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-emerald-600/20"
        >
          Submit Diagnosis
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'doctor' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'system' ? (
                  <div className="w-full text-center my-4">
                    <span className="bg-slate-800 text-slate-400 text-xs px-4 py-1 rounded-full uppercase tracking-wider font-semibold border border-white/5">
                      {msg.content}
                    </span>
                  </div>
                ) : (
                  <div className={`flex gap-4 max-w-[80%] ${msg.role === 'doctor' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'doctor' ? 'bg-blue-600' : 'bg-slate-800 border border-white/10'}`}>
                      {msg.role === 'doctor' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-slate-300" />}
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      msg.role === 'doctor' 
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-900/20' 
                        : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5 shadow-black/20'
                    } shadow-xl leading-relaxed`}>
                      {msg.content}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-4 max-w-[80%]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg bg-slate-800 border border-white/10">
                    <Bot className="w-5 h-5 text-slate-300" />
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-800 text-slate-200 rounded-tl-none border border-white/5 shadow-xl flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-slate-900/80 backdrop-blur-lg border-t border-white/10">
            <div className="max-w-4xl mx-auto relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask the patient a question or order a test..."
                className="w-full bg-slate-950 border border-white/10 rounded-full pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-slate-200 placeholder:text-slate-600 shadow-inner"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 p-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="max-w-4xl mx-auto mt-4 flex gap-3 text-sm">
              <span className="text-slate-500">Quick Actions:</span>
              <button onClick={() => setInput("Order complete blood count (CBC) and check inflammatory markers.")} className="text-blue-400 hover:text-blue-300 underline underline-offset-4">Order CBC</button>
              <button onClick={() => setInput("Perform right lower quadrant abdominal ultrasound imaging.")} className="text-blue-400 hover:text-blue-300 underline underline-offset-4">Order Ultrasound</button>
              <button onClick={() => setInput("Perform a complete physical examination focusing on your abdomen.")} className="text-blue-400 hover:text-blue-300 underline underline-offset-4">Perform Physical Exam</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-slate-900 border-l border-white/10 overflow-y-auto hidden lg:block">
          <div className="p-6">
            {/* Real-time EKG Visualization */}
            <div className="mb-8 p-4 bg-black rounded-2xl border border-emerald-500/20 relative overflow-hidden h-32">
              <div className="absolute top-2 left-4 text-[10px] text-emerald-500 font-mono uppercase tracking-widest opacity-50">Heart Rate: {currentCase.vitals.hr}</div>
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                <motion.path 
                  d="M0,50 L50,50 L60,20 L70,80 L80,50 L150,50 L160,10 L170,90 L180,50 L250,50 L260,30 L270,70 L280,50 L400,50" 
                  fill="none" stroke="#10b981" strokeWidth="2"
                  animate={{ x: [-400, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none"></div>
            </div>

            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Patient Chart</h3>
            
            <div className="space-y-6">
              <SidebarSection icon={Activity} title="Vitals" color="text-red-400">
                <div className="grid grid-cols-2 gap-4">
                  <VitalItem label="HR" value={currentCase.vitals.hr} alert={currentCase.vitals.hrAlert} />
                  <VitalItem label="BP" value={currentCase.vitals.bp} />
                  <VitalItem label="Temp" value={currentCase.vitals.temp} alert={currentCase.vitals.tempAlert} />
                  <VitalItem label="SpO2" value={currentCase.vitals.spo2} />
                </div>
              </SidebarSection>

              <SidebarSection icon={FileText} title="Lab Results" color="text-blue-400">
                <div className="text-sm text-slate-400 bg-slate-950 p-4 rounded-xl border border-white/5 space-y-3">
                  {orderedLabs.length === 0 ? (
                    <>
                      <p>No tests ordered yet.</p>
                      <p className="mt-2 text-xs italic">Use the chat to order specific lab tests or imaging.</p>
                    </>
                  ) : (
                    <div className="space-y-3">
                      {orderedLabs.map((lab) => (
                        <div key={lab} className="border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                          <div className="font-semibold text-white text-xs uppercase tracking-wider">{lab}</div>
                          {lab === "CBC" && (
                            <div className="text-xs text-red-400 mt-1 font-mono whitespace-pre-line leading-relaxed">
                              {currentCase.cbcResults}
                            </div>
                          )}
                          {lab === "Ultrasound" && (
                            <div className="text-xs text-amber-400 mt-1 font-mono whitespace-pre-line leading-relaxed">
                              {currentCase.usResults}
                            </div>
                          )}
                          {lab === "CT Scan" && (
                            <div className="text-xs text-amber-400 mt-1 font-mono whitespace-pre-line leading-relaxed">
                              {currentCase.ctResults}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </SidebarSection>

              <SidebarSection icon={Pill} title="Medications" color="text-purple-400">
                <ul className="text-sm text-slate-300 space-y-2 list-disc pl-4">
                  {currentCase.medications.map((med) => (
                    <li key={med}>{med}</li>
                  ))}
                </ul>
              </SidebarSection>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Diagnosis Modal */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !evaluationResult && setIsSubmitModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative z-10 overflow-hidden"
            >
              {!evaluationResult ? (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-blue-400" /> Submit Diagnosis
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Based on your consultation and findings, select the primary diagnosis for Case {currentCase.id}.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {DIAGNOSIS_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSubmitDiagnosis(opt)}
                        className="w-full text-left p-4 rounded-xl border border-white/5 bg-slate-950 hover:bg-slate-800 hover:border-blue-500/50 text-slate-200 transition-all font-medium"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="inline-flex p-3 rounded-full mb-4 bg-slate-950">
                    {evaluationResult.isCorrect ? (
                      <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                    ) : (
                      <XCircle className="w-12 h-12 text-red-500" />
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {evaluationResult.isCorrect ? "Diagnosis Correct!" : "Diagnosis Incorrect"}
                  </h3>
                  
                  <div className="flex justify-center gap-4 my-6">
                    <div className="bg-slate-950 border border-white/5 p-4 rounded-2xl w-32">
                      <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">Score</div>
                      <div className="text-3xl font-bold text-white">{evaluationResult.score}</div>
                    </div>
                    <div className="bg-slate-950 border border-white/5 p-4 rounded-2xl w-32">
                      <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">Questions</div>
                      <div className="text-3xl font-bold text-white">{evaluationResult.doctorMessagesCount}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 px-4">
                    {evaluationResult.explanation}
                  </p>
                  
                  {status === "unauthenticated" && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-xs text-amber-200 mb-6 text-left">
                      <span>Sign up for a free student profile to record your diagnostic score and compete on the leaderboard!</span>
                      <div className="mt-2 text-right">
                        <Link href="/register" className="underline font-bold hover:text-amber-100">
                          Create Account →
                        </Link>
                      </div>
                    </div>
                  )}

                  {status === "authenticated" && (
                    <div className="text-xs text-slate-500 mb-6">
                      {savingResult ? "Saving diagnostic shift..." : "Shift recorded successfully on your student dashboard!"}
                    </div>
                  )}
                  
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={handleRestart}
                      className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                    <button
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors"
                    >
                      Close Report
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarSection({ icon: Icon, title, children, color }: any) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${color}`} />
        <h4 className="font-medium text-slate-200">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function VitalItem({ label, value, alert }: any) {
  return (
    <div className={`p-3 rounded-lg border ${alert ? 'bg-red-500/10 border-red-500/20' : 'bg-slate-800/50 border-white/5'}`}>
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className={`font-semibold ${alert ? 'text-red-400' : 'text-slate-200'}`}>{value}</div>
    </div>
  );
}
