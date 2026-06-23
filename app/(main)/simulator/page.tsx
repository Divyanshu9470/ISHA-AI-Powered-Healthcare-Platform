"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Bot, Activity, FileText, Pill, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SimulatorPage() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are now interacting with a 45-year-old male patient complaining of severe abdominal pain." },
    { role: "patient", content: "Doctor, my stomach hurts so much. It started last night around my belly button and now it's moved to the lower right side." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const newMessages = [...messages, { role: "doctor", content: input }];
    setMessages(newMessages);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
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
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-emerald-600/20">
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
              <button className="text-blue-400 hover:text-blue-300 underline underline-offset-4">Order CBC</button>
              <button className="text-blue-400 hover:text-blue-300 underline underline-offset-4">Order Ultrasound</button>
              <button className="text-blue-400 hover:text-blue-300 underline underline-offset-4">Perform Physical Exam</button>
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
                <div className="text-sm text-slate-400 bg-slate-950 p-4 rounded-xl border border-white/5">
                  <p>No tests ordered yet.</p>
                  <p className="mt-2 text-xs italic">Use the chat to order specific lab tests or imaging.</p>
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
