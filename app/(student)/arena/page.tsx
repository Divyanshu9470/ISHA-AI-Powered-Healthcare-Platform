"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, AlertCircle, HeartPulse, Clock, Trophy, Shield, ChevronRight } from "lucide-react";
import Link from "next/link";
import { clinicalCases as allCases, ClinicalCase } from "./cases";

export default function ArenaPage() {
  const [activeCases, setActiveCases] = useState<ClinicalCase[]>(() => {
    // Shuffle all cases and pick 10
    const shuffled = [...allCases].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  });
  const [gameState, setGameState] = useState<'finding' | 'incoming' | 'playing' | 'result' | 'finished'>('finding');
  const [currentCase, setCurrentCase] = useState(0);
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [visibleSymptoms, setVisibleSymptoms] = useState<number>(0);

  // Finding Match
  useEffect(() => {
    if (gameState === 'finding') {
      const timer = setTimeout(() => setGameState('incoming'), 3000);
      return () => clearTimeout(timer);
    }
    if (gameState === 'incoming') {
      const timer = setTimeout(() => {
        setGameState('playing');
        setVisibleSymptoms(0);
        setTimeLeft(30);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // Symptoms Revealer
  useEffect(() => {
    if (gameState === 'playing' && activeCases.length > 0 && visibleSymptoms < activeCases[currentCase].symptoms.length) {
      const timer = setTimeout(() => setVisibleSymptoms(prev => prev + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState, visibleSymptoms, currentCase, activeCases]);

  const [hasSaved, setHasSaved] = useState(false);

  // Save results to backend
  useEffect(() => {
    if (gameState !== 'finished' || hasSaved || activeCases.length === 0) return;

    const isWinner = score >= opponentScore;
    const saveResults = async () => {
        setHasSaved(true);
        try {
            await fetch('/api/simulator/results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patientCase: activeCases.map(c => c.id).join(", "),
                    score: score,
                    status: isWinner ? "WON" : "LOST",
                }),
            });
        } catch (error) {
            console.error('Failed to save arena results:', error);
        }
    };
    saveResults();
  }, [gameState, hasSaved, score, opponentScore, activeCases]);

  const nextCase = useCallback(() => {
    if (currentCase < activeCases.length - 1) {
      setCurrentCase(prev => prev + 1);
      setSelectedOption(null);
      setVisibleSymptoms(0);
      setGameState('incoming');
    } else {
      setGameState('finished');
    }
  }, [currentCase, activeCases.length]);

  const startNextShift = useCallback(() => {
    const shuffled = [...allCases].sort(() => Math.random() - 0.5);
    setActiveCases(shuffled.slice(0, 10));
    setCurrentCase(0);
    setScore(0);
    setOpponentScore(0);
    setTimeLeft(30);
    setSelectedOption(null);
    setVisibleSymptoms(0);
    setHasSaved(false);
    setGameState('finding');
  }, []);

  const handleSelect = useCallback((idx: number) => {
    if (selectedOption !== null || gameState !== 'playing' || activeCases.length === 0) return;
    setSelectedOption(idx);
    
    if (idx === activeCases[currentCase].answer) {
      const speedBonus = timeLeft * 50;
      const deductionForHints = visibleSymptoms * 20; // Less points if you needed more symptoms
      setScore(prev => prev + 500 + speedBonus - deductionForHints);
    }

    setGameState('result');

    // Simulate opponent answering
    setTimeout(() => {
      if (Math.random() > 0.4) {
        setOpponentScore(prev => prev + 500 + (Math.floor(Math.random() * 200)));
      }
      setTimeout(nextCase, 2500);
    }, 1000);
  }, [selectedOption, gameState, activeCases, currentCase, timeLeft, visibleSymptoms, nextCase]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setTimeout(() => handleSelect(-1), 0); // Timeout
    }
  }, [gameState, timeLeft, handleSelect]);

  if (gameState === 'finding' || activeCases.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-[#050505] to-[#050505]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-32 h-32 mb-8 relative flex items-center justify-center">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 rounded-full border border-red-500/30"></motion.div>
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="absolute inset-0 rounded-full border border-red-500/20"></motion.div>
            <Activity className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-mono text-white tracking-widest">CONNECTING TO ER NETWORK...</h2>
          <p className="text-red-500/70 mt-4 font-mono uppercase text-sm">Searching for available trauma surgeons</p>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const isWinner = score >= opponentScore;

    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 relative overflow-hidden text-center">
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${isWinner ? 'from-green-900/20' : 'from-red-900/20'} via-[#050505] to-[#050505]`}></div>
        
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10 mb-8">
          {isWinner ? <Trophy className="w-32 h-32 text-yellow-500 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]" /> : <Shield className="w-32 h-32 text-slate-600" />}
        </motion.div>
        
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl font-bold text-white mb-4 z-10">
          {isWinner ? "SHIFT COMPLETE: EXCELLENT" : "SHIFT COMPLETE: NEEDS REVIEW"}
        </motion.h1>
        <p className="text-slate-400 mb-12 max-w-lg z-10">Your diagnostic speed and accuracy were evaluated against a peer surgeon.</p>
        
        <div className="flex gap-12 items-center justify-center z-10 mb-12">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl w-48 backdrop-blur-md">
            <p className="text-blue-400 mb-2 font-mono text-sm uppercase">Your Score</p>
            <p className="text-4xl font-mono font-bold text-white">{score}</p>
          </div>
          <div className="text-2xl font-bold text-slate-600 font-mono">VS</div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl w-48 backdrop-blur-md">
            <p className="text-red-400 mb-2 font-mono text-sm uppercase">Dr. Chen</p>
            <p className="text-4xl font-mono font-bold text-white">{opponentScore}</p>
          </div>
        </div>
        
        <div className="flex gap-4 z-10">
          <button onClick={startNextShift} className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)]">Start Next Shift</button>
          <Link href="/courses" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-bold transition-all">Back to Studies</Link>
        </div>
      </div>
    );
  }

  const cCase = activeCases[currentCase];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col font-sans relative overflow-hidden">
      
      {/* Background Grid & EKG Line */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-1/3 left-0 w-full h-32 z-0 opacity-10 pointer-events-none overflow-hidden flex items-center">
        <svg className="w-[200%] h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
          <motion.path 
            d="M0,50 L200,50 L210,10 L220,90 L230,50 L400,50 L410,20 L420,80 L430,50 L600,50 L610,10 L620,90 L630,50 L800,50 L810,30 L820,70 L830,50 L1000,50" 
            fill="none" stroke="#ef4444" strokeWidth="2"
            animate={{ x: [-1000, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-24 relative z-10 flex-1 flex flex-col">
        
        {/* Top ER Dashboard */}
        <div className="flex justify-between items-center bg-[#0a0a0f] p-4 rounded-xl border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)] mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <span className="font-mono text-red-500 font-bold tracking-widest text-sm">TRAUMA BAY 1</span>
            </div>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="font-mono text-slate-400 text-sm">CASE {currentCase + 1}/{activeCases.length}</div>
          </div>
          
          <div className="flex items-center gap-12">
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-mono uppercase mb-1">Your Score</p>
              <p className="font-mono font-bold text-blue-400 text-xl">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-mono uppercase mb-1">Rival Score</p>
              <p className="font-mono font-bold text-red-400 text-xl">{opponentScore}</p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {gameState === 'incoming' ? (
            <motion.div 
              key="incoming"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <AlertCircle className="w-24 h-24 text-yellow-500 mb-6 animate-pulse" />
              <h2 className="text-4xl font-black text-white tracking-widest uppercase mb-2">Incoming Patient</h2>
              <p className="text-yellow-500/80 font-mono text-lg">ETA: {cCase?.id || 'UNKNOWN'} arriving now.</p>
            </motion.div>
          ) : (
            <motion.div 
              key="playing"
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="flex-1 flex flex-col lg:flex-row gap-6"
            >
              {/* Left Column: Patient Chart */}
              <div className="flex-1 bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <HeartPulse className="w-32 h-32" />
                </div>
                
                <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-3xl font-serif text-white mb-2">{cCase.patient}</h3>
                    <div className="inline-block bg-red-500/10 text-red-400 font-mono text-xs px-3 py-1 rounded-full border border-red-500/20">
                      {cCase.id}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-mono uppercase mb-1">Vitals</p>
                    <p className="font-mono text-blue-400 font-bold">{cCase.vitals}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-xs text-slate-500 font-mono uppercase mb-4 tracking-widest flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Clinical Presentation
                  </p>
                  <div className="space-y-4">
                    {cCase.symptoms.map((sym, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: idx <= visibleSymptoms ? 1 : 0, x: idx <= visibleSymptoms ? 0 : -20 }}
                        className={`p-4 rounded-xl border ${idx <= visibleSymptoms ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent'}`}
                      >
                        <p className="text-lg text-slate-300 font-light flex items-start gap-3">
                          <span className="text-blue-500 mt-1"><ChevronRight className="w-4 h-4" /></span>
                          {sym}
                        </p>
                      </motion.div>
                    ))}
                    {visibleSymptoms < cCase.symptoms.length && gameState === 'playing' && (
                      <div className="p-4 flex items-center gap-3 text-slate-500 animate-pulse">
                        <div className="w-4 h-4 rounded-full border-2 border-slate-600 border-t-blue-500 animate-spin"></div>
                        <span className="font-mono text-sm">Gathering more symptoms...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Diagnosis / Action */}
              <div className="w-full lg:w-[400px] flex flex-col gap-6">
                
                {/* Timer Box */}
                <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className={`absolute bottom-0 left-0 h-1 transition-all ease-linear ${timeLeft < 5 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${(timeLeft / 30) * 100}%` }}></div>
                  <p className="text-xs text-slate-500 font-mono uppercase mb-2">Time to Crash</p>
                  <div className={`text-6xl font-mono font-black tracking-tighter ${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                    00:{timeLeft.toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Options Box */}
                <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 flex-1 flex flex-col">
                  <p className="text-xs text-slate-500 font-mono uppercase mb-4 tracking-widest text-center">Select Primary Diagnosis</p>
                  <div className="flex flex-col gap-3 flex-1 justify-center">
                    {cCase.options.map((opt, idx) => {
                      let btnState = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50 text-slate-300";
                      let icon = null;

                      if (gameState === 'result') {
                        if (idx === cCase.answer) {
                          btnState = "bg-green-600/20 border-green-500 text-green-400";
                          icon = "✅";
                        } else if (selectedOption === idx) {
                          btnState = "bg-red-600/20 border-red-500 text-red-400";
                          icon = "❌";
                        } else {
                          btnState = "bg-transparent border-white/5 text-slate-600 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={gameState !== 'playing'}
                          onClick={() => handleSelect(idx)}
                          className={`p-4 rounded-xl border text-left font-medium transition-all relative overflow-hidden group ${btnState}`}
                        >
                          <div className="flex justify-between items-center relative z-10">
                            <span>{opt}</span>
                            <span>{icon}</span>
                          </div>
                          {gameState === 'playing' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
