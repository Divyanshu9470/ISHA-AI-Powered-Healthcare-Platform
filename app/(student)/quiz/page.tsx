"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Brain, Activity, Pill, CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { quizDatabase, Subject, QuizQuestion } from "./data";

export default function QuizPage() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'results'>('menu');
  const [subject, setSubject] = useState<Subject | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ qIndex: number; selected: number; isCorrect: boolean }[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const [hasSaved, setHasSaved] = useState(false);



  // Save results to backend
  useEffect(() => {
    if (gameState !== 'results' || hasSaved || !subject || activeQuestions.length === 0) return;

    const saveResults = async () => {
        setHasSaved(true);
        try {
            await fetch('/api/tests/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject,
                    score,
                    maxScore: activeQuestions.length,
                }),
            });
        } catch (error) {
            console.error('Failed to save quiz results:', error);
        }
    };
    saveResults();
  }, [gameState, hasSaved, subject, score, activeQuestions.length]);

  const subjects = [
    { name: "Anatomy", icon: <BookOpen className="w-8 h-8 text-blue-400" />, color: "border-blue-500/50", bg: "bg-blue-500/10" },
    { name: "Physiology", icon: <Activity className="w-8 h-8 text-green-400" />, color: "border-green-500/50", bg: "bg-green-500/10" },
    { name: "Pathology", icon: <Brain className="w-8 h-8 text-purple-400" />, color: "border-purple-500/50", bg: "bg-purple-500/10" },
    { name: "Pharmacology", icon: <Pill className="w-8 h-8 text-yellow-400" />, color: "border-yellow-500/50", bg: "bg-yellow-500/10" },
  ];

  const startQuiz = (selectedSub: Subject) => {
    const questions = quizDatabase.filter(q => q.subject === selectedSub).sort(() => Math.random() - 0.5);
    setActiveQuestions(questions);
    setSubject(selectedSub);
    setCurrentQIndex(0);
    setScore(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowExplanation(false);
    setHasSaved(false);
    setTimeLeft(30);
    setGameState('playing');
  };

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const isCorrect = idx === activeQuestions[currentQIndex].answer;
    if (isCorrect) setScore(s => s + 1);
    
    setAnswers(prev => [...prev, { qIndex: currentQIndex, selected: idx, isCorrect }]);
    setShowExplanation(true);
  };

  // Timer countdown hook
  useEffect(() => {
    if (gameState !== 'playing' || !timerEnabled || selectedOption !== null) return;
    if (timeLeft <= 0) {
      handleSelect(-1); // Timeout
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, timerEnabled, timeLeft, selectedOption]);

  const nextQuestion = () => {
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex(c => c + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      setGameState('results');
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-[#050505] py-24 px-4 flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505] pointer-events-none"></div>
        
        <div className="text-center mb-16 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Subject Mastery Quiz
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            Test your knowledge with high-yield clinical vignettes modeled after real board exams (USMLE, PLAB, etc.).
          </p>
          <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md w-fit mx-auto">
            <input
              type="checkbox"
              id="timer-toggle"
              checked={timerEnabled}
              onChange={(e) => setTimerEnabled(e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-black text-blue-500 focus:ring-blue-500 focus:ring-offset-black accent-blue-500 cursor-pointer"
            />
            <label htmlFor="timer-toggle" className="text-sm font-medium text-slate-300 cursor-pointer select-none">
              Enable Timer (30s per question)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full relative z-10">
          {subjects.map((sub) => (
            <button
              key={sub.name}
              onClick={() => startQuiz(sub.name as Subject)}
              className={`flex items-center gap-6 p-8 rounded-3xl border border-white/5 bg-[#0a0a0f] hover:bg-white/5 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:border-white/20 group`}
            >
              <div className={`p-4 rounded-2xl ${sub.bg} border ${sub.color} group-hover:scale-110 transition-transform`}>
                {sub.icon}
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-1">{sub.name}</h3>
                <p className="text-slate-500 text-sm">Clinical vignettes & MCQs</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const percentage = Math.round((score / activeQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-[#050505] py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-[#050505] to-[#050505] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-12 text-center mb-12 shadow-[0_0_50px_rgba(168,85,247,0.1)]">
            <h2 className="text-3xl font-bold text-white mb-2">{subject} Mastery</h2>
            <p className="text-slate-400 mb-8">Quiz Complete</p>
            
            <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-[#111] border-4 border-purple-500/30 mb-8 relative">
              <span className="text-5xl font-black text-white">{percentage}%</span>
            </div>
            
            <div className="flex justify-center gap-12 mb-12">
              <div>
                <p className="text-slate-500 text-sm uppercase tracking-wider mb-1">Correct</p>
                <p className="text-3xl font-bold text-green-400">{score}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm uppercase tracking-wider mb-1">Total</p>
                <p className="text-3xl font-bold text-white">{activeQuestions.length}</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={() => { setHasSaved(false); setGameState('menu'); }} className="flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all">
                <RotateCcw className="w-5 h-5" /> Choose Another Subject
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = activeQuestions[currentQIndex];

  return (
    <div className="min-h-screen bg-[#050505] py-24 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => { setHasSaved(false); setGameState('menu'); }} className="text-slate-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold">
              ← Exit
            </button>
            <div className="h-4 w-px bg-white/20"></div>
            <span className="text-blue-400 font-bold uppercase tracking-widest">{subject}</span>
          </div>
          {timerEnabled && (
            <div className={`font-mono text-lg font-bold px-4 py-1.5 rounded-full border ${timeLeft < 10 ? 'text-red-500 border-red-500/30 bg-red-500/10 animate-pulse' : 'text-slate-300 border-white/10 bg-white/5'}`}>
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
          )}
          <div className="text-slate-400 font-mono">
            Question {currentQIndex + 1} of {activeQuestions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5 rounded-full mb-12 overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQIndex) / activeQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question Area */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative"
          >
            <div className="mb-8">
              <p className="text-lg text-slate-300 leading-relaxed mb-6 font-light">{q.vignette}</p>
              <h2 className="text-2xl font-bold text-white">{q.question}</h2>
            </div>

            <div className="flex flex-col gap-3">
              {q.options.map((opt, idx) => {
                let stateClass = "bg-white/5 border-white/10 hover:bg-white/10 text-slate-300";
                
                if (selectedOption !== null) {
                  if (idx === q.answer) {
                    stateClass = "bg-green-600/20 border-green-500 text-green-400";
                  } else if (idx === selectedOption) {
                    stateClass = "bg-red-600/20 border-red-500 text-red-400";
                  } else {
                    stateClass = "bg-transparent border-white/5 text-slate-600 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelect(idx)}
                    className={`p-5 rounded-2xl border text-left font-medium transition-all flex justify-between items-center ${stateClass}`}
                  >
                    <span>{opt}</span>
                    {selectedOption !== null && idx === q.answer && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {selectedOption !== null && idx === selectedOption && idx !== q.answer && <XCircle className="w-5 h-5 text-red-500" />}
                  </button>
                )
              })}
            </div>

            {showExplanation && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                  <h4 className="text-blue-400 font-bold mb-2 uppercase tracking-widest text-sm">Explanation</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={nextQuestion} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all">
                    Next Question <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
