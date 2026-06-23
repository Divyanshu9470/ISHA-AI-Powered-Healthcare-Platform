"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, BrainCircuit, AlertCircle, ChevronRight, Dna, Database, Microscope, Search, Zap, Stethoscope, Mic, MicOff } from "lucide-react";

import { analyzeSymptoms, transcribeAudio } from "./actions";

export default function CopilotPage() {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        setIsTranscribing(true);
        
        try {
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = (reader.result as string).split(',')[1];
            const transcription = await transcribeAudio(base64Audio, 'audio/webm');
            setSymptoms((prev) => prev ? `${prev} ${transcription}` : transcription);
            setIsTranscribing(false);
          };
        } catch (err: any) {
          setError("Transcription failed: " + err.message);
          setIsTranscribing(false);
        }

        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsListening(true);
      setError(null);
    } catch (err: any) {
      setError("Microphone access denied or not available.");
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsListening(false);
      setMediaRecorder(null);
    }
  };

  const toggleVoiceSearch = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    setResults(null);
    setError(null);

    try {
      const data = await analyzeSymptoms(symptoms);
      setResults(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans relative overflow-hidden pt-20">
      
      {/* Sci-Fi Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <SparkleIcon className="w-4 h-4" /> Proprietary AI Engine v2.0
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 flex items-center justify-center gap-4">
            <BrainCircuit className="w-12 h-12 text-blue-500" />
            Clinical Copilot
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Input patient presentation. Our neural network cross-references 10,000+ medical cases to generate probabilistic differentials and link directly to your study materials.
          </p>
        </motion.div>

        {/* Main Interface */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" /> Patient Presentation
                </h2>
                <button
                  onClick={toggleVoiceSearch}
                  className={`p-2 rounded-full transition-all ${
                    isListening 
                      ? "bg-red-500/20 text-red-500 animate-pulse border border-red-500/50" 
                      : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"
                  }`}
                  title={isListening ? "Stop Listening" : "Voice Search"}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>
              
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., 55yo male presents with crushing substernal chest pain radiating to the left jaw, diaphoresis, and shortness of breath starting 2 hours ago..."
                className="w-full h-48 bg-black/40 border border-white/10 rounded-2xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 resize-none transition-colors"
              />
              
              {isListening && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mt-2 text-xs text-red-400 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  Recording... Click the mic again to stop and transcribe.
                </motion.div>
              )}

              {isTranscribing && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mt-2 text-xs text-blue-400 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Gemini is transcribing your medical presentation...
                </motion.div>
              )}
              
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !symptoms.trim()}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Microscope className="w-5 h-5" />
                    </motion.div>
                    Analyzing Neural Pathways...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" /> Generate Differential
                  </>
                )}
              </button>
            </div>

            {/* Quick Stats Panel */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Dna className="w-6 h-6 text-purple-400 mb-2" />
                <div className="text-2xl font-bold">12.4M</div>
                <div className="text-xs text-slate-500 uppercase">Data Points</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Database className="w-6 h-6 text-green-400 mb-2" />
                <div className="text-2xl font-bold">99.8%</div>
                <div className="text-xs text-slate-500 uppercase">Accuracy Rate</div>
              </div>
            </div>
          </motion.div>

          {/* Output / Analysis Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3 text-red-400"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div 
                  key="analyzing"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-3xl p-12 min-h-[400px]"
                >
                  <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    <div className="absolute inset-4 rounded-full border-b-2 border-teal-500 animate-spin" style={{ animationDuration: '2s' }}></div>
                    <BrainCircuit className="absolute inset-0 m-auto w-10 h-10 text-blue-400 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2 tracking-widest uppercase">Processing Symptoms</h3>
                  <div className="flex flex-col items-center gap-2 text-sm text-slate-500 font-mono">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>&gt; Cross-referencing Harrison's Principles...</motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>&gt; Calculating probabilistic weights...</motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>&gt; Identifying educational gaps...</motion.div>
                  </div>
                </motion.div>
              )}

              {!isAnalyzing && results && (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                >
                  {/* Result Header */}
                  <div className="flex items-start justify-between mb-8 pb-8 border-b border-white/10">
                    <div>
                      <h3 className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" /> Primary Diagnosis
                      </h3>
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">{results.primary.condition}</div>
                      <div className="flex items-center gap-3">
                        <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${results.primary.probability}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></motion.div>
                        </div>
                        <span className="text-red-400 font-bold">{results.primary.probability}% Match</span>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Differentials */}
                  <div className="mb-8">
                    <h3 className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-4">Secondary Differentials</h3>
                    <div className="space-y-3">
                      {results.differentials.map((diff: any, idx: number) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + (idx * 0.1) }}
                          key={idx} className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5"
                        >
                          <span className="font-medium text-slate-300">{diff.condition}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${diff.probability}%` }} transition={{ duration: 1, delay: 0.8 }} className="h-full bg-orange-400"></motion.div>
                            </div>
                            <span className="text-sm text-orange-400 font-mono">{diff.probability}%</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps & Integration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="bg-blue-900/20 border border-blue-500/20 rounded-2xl p-5">
                      <h4 className="text-sm text-blue-400 font-bold uppercase mb-3 flex items-center gap-2"><Zap className="w-4 h-4" /> Recommended Labs</h4>
                      <div className="flex flex-wrap gap-2">
                        {results.labs.map((lab: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-md border border-blue-500/20">{lab}</span>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="bg-purple-900/20 border border-purple-500/20 rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm text-purple-400 font-bold uppercase mb-2 flex items-center gap-2"><Stethoscope className="w-4 h-4" /> Study Integration</h4>
                        <p className="text-sm text-purple-200/70 mb-4">{results.recommendedLecture}</p>
                      </div>
                      <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                        Jump to Lecture <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  </div>

                </motion.div>
              )}

              {!isAnalyzing && !results && (
                <div className="h-full flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-3xl p-12 min-h-[400px] text-center border-dashed">
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <BrainCircuit className="w-10 h-10 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-300 mb-2">Awaiting Input</h3>
                  <p className="text-slate-500 max-w-sm">
                    Enter patient symptoms on the left to activate the Clinical Copilot analysis engine.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

function SparkleIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
