"use client";

import { useState } from "react";
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

export default function SimulatorPage() {
  const { data: session, status } = useSession();
  
  const [messages, setMessages] = useState([
    { role: "system", content: "You are now interacting with a 45-year-old male patient complaining of severe abdominal pain." },
    { role: "patient", content: "Doctor, my stomach hurts so much. It started last night around my belly button and now it's moved to the lower right side." }
  ]);
  const [orderedLabs, setOrderedLabs] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [savingResult, setSavingResult] = useState(false);

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
        body: JSON.stringify({ messages: newMessages }),
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
    
    const isCorrect = diagnosis === "Acute Appendicitis";
    const baseScore = isCorrect ? 80 : 0;
    // Efficiency bonus: fewer questions asked results in a higher score
    const efficiencyBonus = isCorrect ? Math.max(20 - doctorMessagesCount * 2, 0) : 0;
    const finalScore = baseScore + efficiencyBonus;
    
    const evalData = {
      isCorrect,
      score: finalScore,
      doctorMessagesCount,
      diagnosis,
      explanation: isCorrect 
        ? "Excellent job, doctor! The patient presents with classic migratory abdominal pain (starting periumbilical and localizing to the RLQ), low-grade fever, tachycardia, and tenderness at McBurney's point. This is highly indicative of Acute Appendicitis."
        : "Incorrect diagnosis. Although the patient presents with abdominal pain, the classic migration of pain from the umbilicus to the RLQ, associated with fever and McBurney's point tenderness, is pathognomonic for Acute Appendicitis."
    };
    
    setEvaluationResult(evalData);
    
    if (status === "authenticated") {
      setSavingResult(true);
      try {
        await fetch("/api/simulator/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patientCase: "Case #842: John Doe (Appendicitis)",
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
    setMessages([
      { role: "system", content: "You are now interacting with a 45-year-old male patient complaining of severe abdominal pain." },
      { role: "patient", content: "Doctor, my stomach hurts so much. It started last night around my belly button and now it's moved to the lower right side." }
    ]);
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
              Virtual Patient: Case #842
            </h1>
            <p className="text-sm text-slate-400">Chief Complaint: Abdominal Pain</p>
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
              <div className="absolute top-2 left-4 text-[10px] text-emerald-500 font-mono uppercase tracking-widest opacity-50">Heart Rate: 110 BPM</div>
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
                  <VitalItem label="HR" value="110 bpm" alert />
                  <VitalItem label="BP" value="130/85" />
                  <VitalItem label="Temp" value="101.2 °F" alert />
                  <VitalItem label="SpO2" value="98%" />
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
                            <div className="text-xs text-red-400 mt-1 font-mono leading-relaxed">
                              • WBC: 14.5 x10³/µL (High)<br />
                              • Neutrophils: 82% (High)<br />
                              • CRP: 24 mg/L (High)
                            </div>
                          )}
                          {lab === "Ultrasound" && (
                            <div className="text-xs text-amber-400 mt-1 font-mono leading-relaxed">
                              • Appendix: 8.5 mm (dilated)<br />
                              • Target sign positive<br />
                              • Free fluid in RLQ
                            </div>
                          )}
                          {lab === "CT Scan" && (
                            <div className="text-xs text-amber-400 mt-1 font-mono leading-relaxed">
                              • Appendix: 9.0 mm dilated<br />
                              • Pericecal fat stranding<br />
                              • Appendicolith seen
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
                  <li>Lisinopril 10mg (Daily)</li>
                  <li>Atorvastatin 20mg (Daily)</li>
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
                    Based on your consultation and findings, select the primary diagnosis for Case #842.
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
