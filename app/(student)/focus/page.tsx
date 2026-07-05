"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, RotateCcw, Headphones, Users, CheckCircle2, 
  Circle, Volume2, ShieldAlert, Trophy, Brain, Activity, 
  Stethoscope, Clock, Zap, Heart, RefreshCw, BarChart2, Flame 
} from "lucide-react";

const SOUNDSCAPES = [
  { id: "lofi", name: "Lofi Study Beats", url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" },
  { id: "piano", name: "Calm Classical Piano", url: "https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3" },
  { id: "zen", name: "Zen Meditation Waves", url: "https://cdn.pixabay.com/audio/2022/10/25/audio_b2829241ec.mp3" },
  { id: "space", name: "Deep Ambient Focus", url: "https://cdn.pixabay.com/audio/2021/11/25/audio_91b3cb18df.mp3" },
  { id: "brown", name: "Deep Brown Noise", url: "https://cdn.pixabay.com/audio/2023/04/11/audio_1ab25145cd.mp3" },
  { id: "rain", name: "Gentle Rain on Window", url: "https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3" },
  { id: "cafe", name: "Cozy Study Cafe", url: "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3" }
];

export default function FocusPage() {
  const [maxTime, setMaxTime] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [activeSounds, setActiveSounds] = useState<Record<string, boolean>>({});
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const [tasks, setTasks] = useState([
    { id: 1, text: "Review Upper Limb Anatomy", completed: false },
    { id: 2, text: "Do 50 Flashcards", completed: true },
    { id: 3, text: "Watch Cell Injury Lecture", completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Brain Games Hub Modal State
  const [showBrainGamesHub, setShowBrainGamesHub] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setTimeout(() => setIsActive(false), 0);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Audio Cleanup on Unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  const toggleSound = (id: string, url: string) => {
    const isCurrentlyActive = activeSounds[id];
    
    if (!audioRefs.current[id]) {
      const audio = new Audio(url);
      audio.loop = true;
      audio.volume = volumes[id] || 0.5;
      audioRefs.current[id] = audio;
    }

    if (isCurrentlyActive) {
      audioRefs.current[id].pause();
      setActiveSounds(prev => ({ ...prev, [id]: false }));
    } else {
      audioRefs.current[id].play().catch(e => console.log("Audio play failed:", e));
      setActiveSounds(prev => ({ ...prev, [id]: true }));
    }
  };

  const changeVolume = (id: string, value: number) => {
    setVolumes(prev => ({ ...prev, [id]: value }));
    if (audioRefs.current[id]) {
      audioRefs.current[id].volume = value;
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(maxTime);
  };

  const setTimerDuration = (minutes: number) => {
    setIsActive(false);
    setMaxTime(minutes * 60);
    setTimeLeft(minutes * 60);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText, completed: false }]);
    setNewTaskText("");
    setIsAddingTask(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-white flex font-sans relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-purple-950/20 mix-blend-overlay" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col lg:flex-row gap-8 items-start justify-center pt-24">
        
        {/* Left Column: Timer */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl flex flex-col items-center w-full max-w-md">
            
            {/* Duration Selector */}
            <div className="flex items-center gap-2 mb-8 bg-black/40 p-1.5 rounded-full border border-white/5">
              {[15, 25, 45, 60].map(mins => (
                <button 
                  key={mins}
                  onClick={() => setTimerDuration(mins)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${maxTime === mins * 60 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  {mins}m
                </button>
              ))}
            </div>

            <div className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-8 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`}></span>
              {isActive ? 'Focusing...' : 'Ready to Focus'}
            </div>

            <div className="relative mb-12 flex justify-center w-full">
              <svg className="w-64 h-64 transform -rotate-90">
                <circle cx="128" cy="128" r="120" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
                <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="4" fill="transparent" 
                  strokeDasharray={120 * 2 * Math.PI} 
                  strokeDashoffset={120 * 2 * Math.PI * (1 - timeLeft / maxTime)} 
                  className="text-blue-500 transition-all duration-1000 ease-linear" 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-mono font-light tracking-tighter">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button onClick={toggleTimer} className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
              <button onClick={resetTimer} className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <RotateCcw className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button 
              onClick={() => setShowBrainGamesHub(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold shadow-[0_0_35px_rgba(79,70,229,0.3)] hover:shadow-[0_0_45px_rgba(79,70,229,0.5)] transition-all hover:-translate-y-0.5 flex items-center gap-2.5 text-base tracking-wide"
            >
              <Brain className="w-5 h-5 text-white animate-pulse" /> Launch Games Hub (Brain Warmup)
            </button>
            
            <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-white/5 backdrop-blur-md">
              <Users className="w-5 h-5 text-green-400 animate-pulse" />
              <span className="text-sm font-medium text-slate-300">1,248 students warming up right now</span>
            </div>
          </div>
        </div>

        {/* Right Column: Tasks & Ambience */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          {/* Soundscape Mixer */}
          <div className="bg-slate-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-slate-100">
              <Headphones className="w-5 h-5 text-purple-400" /> Soundscape Mixer
            </h3>
            <div className="space-y-5">
              {SOUNDSCAPES.map(sound => (
                <div key={sound.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSound(sound.id, sound.url)}>
                    <span className={`text-sm transition-colors ${activeSounds[sound.id] ? 'text-white font-medium' : 'text-slate-400'}`}>
                      {sound.name}
                    </span>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${activeSounds[sound.id] ? 'bg-blue-500' : 'bg-slate-800'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${activeSounds[sound.id] ? 'left-5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                  
                  {activeSounds[sound.id] && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center gap-3 pl-2">
                      <Volume2 className="w-4 h-4 text-slate-400" />
                      <input 
                        type="range" 
                        min="0" max="1" step="0.01" 
                        value={volumes[sound.id] ?? 0.5} 
                        onChange={(e) => changeVolume(sound.id, parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Study Goals */}
          <div className="bg-slate-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-between text-slate-100">
              Study Goals
              <span className="text-xs font-normal text-slate-400">
                {tasks.filter(t => t.completed).length}/{tasks.length} Done
              </span>
            </h3>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {tasks.map(task => (
                <div key={task.id} onClick={() => toggleTask(task.id)} className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${task.completed ? 'bg-white/5' : 'hover:bg-white/5 border border-white/5'}`}>
                  {task.completed ? <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> : <Circle className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />}
                  <span className={`text-sm leading-relaxed ${task.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{task.text}</span>
                </div>
              ))}
            </div>
            
            {isAddingTask ? (
              <form onSubmit={addTask} className="mt-4 flex flex-col gap-2">
                <input
                  type="text"
                  autoFocus
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="What do you want to accomplish?"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2 rounded-xl transition-colors">
                    Save Goal
                  </button>
                  <button type="button" onClick={() => setIsAddingTask(false)} className="px-4 bg-slate-800 hover:bg-slate-750 text-slate-300 text-sm font-medium py-2 rounded-xl transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button 
                onClick={() => setIsAddingTask(true)} 
                className="w-full mt-4 py-3 border border-dashed border-white/10 rounded-xl text-sm text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
              >
                + Add Custom Goal
              </button>
            )}
          </div>
        </div>
      </div>

      {showBrainGamesHub && <BrainGamesHubModal onClose={() => setShowBrainGamesHub(false)} />}
    </div>
  );
}

function BrainGamesHubModal({ onClose }: { onClose: () => void }) {
  const [selectedGame, setSelectedGame] = useState<'menu' | 'symptom' | 'lab' | 'ecg' | 'drug' | 'race'>('menu');

  if (selectedGame === 'symptom') return <SymptomDetectiveGame onClose={onClose} onBack={() => setSelectedGame('menu')} />;
  if (selectedGame === 'lab') return <LabMasterGame onClose={onClose} onBack={() => setSelectedGame('menu')} />;
  if (selectedGame === 'ecg') return <EcgChampionGame onClose={onClose} onBack={() => setSelectedGame('menu')} />;
  if (selectedGame === 'drug') return <DrugMatchGame onClose={onClose} onBack={() => setSelectedGame('menu')} />;
  if (selectedGame === 'race') return <DiagnosisRaceGame onClose={onClose} onBack={() => setSelectedGame('menu')} />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-5xl bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_100px_rgba(99,102,241,0.15)] overflow-y-auto max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white text-xl transition-colors">✕</button>
        
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl mb-4">
            <Brain className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-3 tracking-tight">Clinical Games Hub</h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            Gamified micro-drills to prime your medical recall, spatial interpretations, and reaction speeds before starting your lectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Game 1: Symptom Detective */}
          <div onClick={() => setSelectedGame('symptom')} className="group cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Symptom Detective</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">Diagnose patient conditions based on presenting symptoms under a decaying speed-bonus timer.</p>
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Speed & Diagnostics</div>
          </div>

          {/* Game 2: Lab Master */}
          <div onClick={() => setSelectedGame('lab')} className="group cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-emerald-500/30 rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Lab Master</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">Interpret abnormal values (blood, urine, endocrine panels) and identify the core pathophysiology.</p>
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Lab Values Recall</div>
          </div>

          {/* Game 3: ECG Champion */}
          <div onClick={() => setSelectedGame('ecg')} className="group cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-rose-500/30 rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">ECG Champion</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">Identify electrocardiogram patterns, arrhythmias, and conduction blockages from visual cues.</p>
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Pattern Recognition</div>
          </div>

          {/* Game 4: Drug Match */}
          <div onClick={() => setSelectedGame('drug')} className="group cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-amber-500/30 rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Drug Match</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">Interact with active pharmacology pairings. Match drugs to their therapeutic indications quickly.</p>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Pharmacology Recall</div>
          </div>

          {/* Game 5: Diagnosis Race */}
          <div onClick={() => setSelectedGame('race')} className="group cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-purple-500/30 rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Diagnosis Race</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">A high-velocity speed round. Answer as many rapid clinical True/False questions before time runs out.</p>
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Reflexes & Accuracy</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==============================
// GAME 1: SYMPTOM DETECTIVE
// ==============================
function SymptomDetectiveGame({ onClose, onBack }: { onClose: () => void, onBack: () => void }) {
  const QUESTIONS = [
    {
      symptoms: "A 45-year-old male presents with sudden-onset, crushing substernal chest pain radiating to the left shoulder and jaw, associated with diaphoresis and severe dyspnea.",
      options: ["Myocardial Infarction", "Gastroesophageal Reflux Disease", "Pulmonary Embolism", "Pneumothorax"],
      correct: 0,
      note: "Substernal crushing pain with radiation to left arm/jaw is highly characteristic of acute MI."
    },
    {
      symptoms: "A 22-year-old female presents with acute onset of high fever, severe nuchal rigidity, photophobia, headache, and a non-blanching petechial rash.",
      options: ["Tension Headache", "Meningococcal Meningitis", "Viral Encephalitis", "Migraine"],
      correct: 1,
      note: "Nuchal rigidity, photophobia, fever, and a petechial rash indicate Meningococcemia."
    },
    {
      symptoms: "A 60-year-old female presents with acute pain in the right lower quadrant of the abdomen, fever, leukocytosis, and tenderness at McBurney's point.",
      options: ["Acute Appendicitis", "Cholecystitis", "Diverticulitis", "Ovarian Cyst"],
      correct: 0,
      note: "McBurney's point tenderness indicates appendicitis."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [speedPoints, setSpeedPoints] = useState(1000);
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (answered || ended) return;
    const interval = setInterval(() => {
      setSpeedPoints(prev => Math.max(100, prev - 15));
    }, 150);
    return () => clearInterval(interval);
  }, [currentIdx, answered, ended]);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedOpt(idx);
    setAnswered(true);
    if (idx === QUESTIONS[currentIdx].correct) {
      setScore(s => s + speedPoints);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setAnswered(false);
      setSelectedOpt(null);
      setSpeedPoints(1000);
    } else {
      setEnded(true);
    }
  };

  const curr = QUESTIONS[currentIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f0f15] border border-white/10 rounded-3xl w-full max-w-2xl p-8 relative overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.1)]">
        <button onClick={onBack} className="absolute top-5 left-5 text-slate-500 hover:text-white text-xs transition-colors uppercase tracking-widest z-50">← Back</button>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-500 hover:text-white text-xl z-50">✕</button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-blue-400 tracking-wider uppercase mb-1">Symptom Detective</h2>
          <span className="text-xs text-slate-400">Case {currentIdx + 1} of {QUESTIONS.length}</span>
        </div>

        {!ended ? (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/5 p-6 rounded-2xl leading-relaxed text-slate-200 text-sm">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest block mb-2">Patient Presentation</span>
              &ldquo;{curr.symptoms}&rdquo;
            </div>

            <div className="flex justify-between items-center px-2">
              <div className="text-xs text-slate-400">Speed Bonus Value: <span className="text-blue-400 font-mono font-bold text-sm">{speedPoints} pts</span></div>
              <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${(speedPoints / 1000) * 100}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curr.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={answered}
                  className={`p-4 rounded-xl text-sm font-semibold border text-left transition-all ${
                    answered
                      ? i === curr.correct
                        ? "bg-green-500/10 border-green-500 text-green-400"
                        : i === selectedOpt
                          ? "bg-red-500/10 border-red-500 text-red-400"
                          : "bg-slate-900/40 border-white/5 text-slate-500"
                      : "bg-white/5 border-white/5 text-slate-200 hover:bg-white/10 hover:border-white/10 hover:scale-[1.01]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {answered && (
              <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl text-xs text-slate-400">
                <span className="font-bold text-blue-400 block mb-1">Clinical Note</span>
                {curr.note}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                disabled={!answered}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all"
              >
                {currentIdx === QUESTIONS.length - 1 ? "Finish Game" : "Next Case"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Investigation Complete</h3>
            <p className="text-sm text-slate-400">Your Detective Score: <span className="text-blue-400 font-mono font-bold text-lg">{score} pts</span></p>
            <div className="flex justify-center gap-4">
              <button onClick={() => {
                setCurrentIdx(0);
                setScore(0);
                setSpeedPoints(1000);
                setAnswered(false);
                setSelectedOpt(null);
                setEnded(false);
              }} className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl text-xs font-bold">Restart</button>
              <button onClick={onClose} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold">Done</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ==============================
// GAME 2: LAB MASTER
// ==============================
function LabMasterGame({ onClose, onBack }: { onClose: () => void, onBack: () => void }) {
  const QUESTIONS = [
    {
      values: "pH: 7.25, PaCO2: 55 mmHg (Normal: 35-45), HCO3-: 25 mEq/L (Normal: 22-26)",
      question: "What is the primary acid-base disorder?",
      options: ["Respiratory Acidosis", "Respiratory Alkalosis", "Metabolic Acidosis", "Metabolic Alkalosis"],
      correct: 0,
      note: "pH is acidic (<7.35) and PaCO2 is elevated (>45) causing respiratory acidosis."
    },
    {
      values: "Serum Calcium: 12.5 mg/dL (Normal: 8.5-10.2), PTH (Parathyroid Hormone): Elevated",
      question: "Which diagnosis is consistent with these lab results?",
      options: ["Hypoparathyroidism", "Primary Hyperparathyroidism", "Vitamin D Deficiency", "Renal Osteodystrophy"],
      correct: 1,
      note: "Both elevated calcium and elevated PTH indicate primary hyperparathyroidism."
    },
    {
      values: "TSH: <0.01 μIU/mL (Normal: 0.4-4.0), Free T4: 3.2 ng/dL (Normal: 0.8-1.8)",
      question: "Interpret this thyroid panel status.",
      options: ["Primary Hypothyroidism", "Graves' Disease (Hyperthyroidism)", "Euthyroid Sick Syndrome", "Subclinical Hypothyroidism"],
      correct: 1,
      note: "Suppressed TSH with elevated free T4 signals primary hyperthyroidism."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [ended, setEnded] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedOpt(idx);
    setAnswered(true);
    if (idx === QUESTIONS[currentIdx].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setAnswered(false);
      setSelectedOpt(null);
    } else {
      setEnded(true);
    }
  };

  const curr = QUESTIONS[currentIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f0f15] border border-white/10 rounded-3xl w-full max-w-2xl p-8 relative overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.1)]">
        <button onClick={onBack} className="absolute top-5 left-5 text-slate-500 hover:text-white text-xs transition-colors uppercase tracking-widest z-50">← Back</button>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-500 hover:text-white text-xl z-50">✕</button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-emerald-400 tracking-wider uppercase mb-1">Lab Master</h2>
          <span className="text-xs text-slate-400">Panel {currentIdx + 1} of {QUESTIONS.length}</span>
        </div>

        {!ended ? (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl text-center">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block mb-3">Laboratory Report</span>
              <div className="text-lg font-mono text-white tracking-wide">{curr.values}</div>
            </div>

            <div className="text-sm font-semibold text-slate-300 mb-2">{curr.question}</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curr.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={answered}
                  className={`p-4 rounded-xl text-sm font-semibold border text-left transition-all ${
                    answered
                      ? i === curr.correct
                        ? "bg-green-500/10 border-green-500 text-green-400"
                        : i === selectedOpt
                          ? "bg-red-500/10 border-red-500 text-red-400"
                          : "bg-slate-900/40 border-white/5 text-slate-500"
                      : "bg-white/5 border-white/5 text-slate-200 hover:bg-white/10 hover:border-white/10 hover:scale-[1.01]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {answered && (
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl text-xs text-slate-400">
                <span className="font-bold text-emerald-400 block mb-1">Physiologic Rationale</span>
                {curr.note}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                disabled={!answered}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all"
              >
                {currentIdx === QUESTIONS.length - 1 ? "Complete" : "Next Panel"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Lab Master Finished</h3>
            <p className="text-sm text-slate-400">Your Score: <span className="text-emerald-400 font-mono font-bold text-lg">{score}/{QUESTIONS.length} correct</span></p>
            <div className="flex justify-center gap-4">
              <button onClick={() => {
                setCurrentIdx(0);
                setScore(0);
                setAnswered(false);
                setSelectedOpt(null);
                setEnded(false);
              }} className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl text-xs font-bold">Restart</button>
              <button onClick={onClose} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold">Done</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ==============================
// GAME 3: ECG CHAMPION
// ==============================
function EcgChampionGame({ onClose, onBack }: { onClose: () => void, onBack: () => void }) {
  const QUESTIONS = [
    {
      description: "No P waves present, replaced by rapid, irregular fibrillatory waves with an irregularly irregular narrow QRS rhythm.",
      options: ["Atrial Fibrillation", "Ventricular Tachycardia", "Third-Degree AV Block", "Atrial Flutter"],
      correct: 0,
      note: "Absent P waves and an irregularly irregular QRS rate is the diagnostic signature of atrial fibrillation."
    },
    {
      description: "ST-segment elevation in leads II, III, and aVF, with reciprocal ST-segment depression in leads I and aVL.",
      options: ["Inferior Wall MI", "Anterior Wall MI", "Pericarditis", "Left Bundle Branch Block"],
      correct: 0,
      note: "ST elevation in II, III, aVF localizes the infarction to the inferior wall (RCA territory)."
    },
    {
      description: "Sawtooth-like flutter waves (F waves) present at a regular rate of 300 bpm, with a 2:1 conduction block.",
      options: ["Atrial Flutter", "Atrial Fibrillation", "Torsades de Pointes", "Sinus Bradycardia"],
      correct: 0,
      note: "Sawtooth baseline patterns represent atrial flutter."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [ended, setEnded] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedOpt(idx);
    setAnswered(true);
    if (idx === QUESTIONS[currentIdx].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setAnswered(false);
      setSelectedOpt(null);
    } else {
      setEnded(true);
    }
  };

  const curr = QUESTIONS[currentIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f0f15] border border-white/10 rounded-3xl w-full max-w-2xl p-8 relative overflow-hidden shadow-[0_0_80px_rgba(244,63,94,0.1)]">
        <button onClick={onBack} className="absolute top-5 left-5 text-slate-500 hover:text-white text-xs transition-colors uppercase tracking-widest z-50">← Back</button>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-500 hover:text-white text-xl z-50">✕</button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-rose-500 tracking-wider uppercase mb-1">ECG Champion</h2>
          <span className="text-xs text-slate-400">Pattern {currentIdx + 1} of {QUESTIONS.length}</span>
        </div>

        {!ended ? (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl">
              <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest block mb-2">ECG Waveform Description</span>
              <p className="text-slate-300 text-sm leading-relaxed">&ldquo;{curr.description}&rdquo;</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curr.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={answered}
                  className={`p-4 rounded-xl text-sm font-semibold border text-left transition-all ${
                    answered
                      ? i === curr.correct
                        ? "bg-green-500/10 border-green-500 text-green-400"
                        : i === selectedOpt
                          ? "bg-red-500/10 border-red-500 text-red-400"
                          : "bg-slate-900/40 border-white/5 text-slate-500"
                      : "bg-white/5 border-white/5 text-slate-200 hover:bg-white/10 hover:border-white/10 hover:scale-[1.01]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {answered && (
              <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-xl text-xs text-slate-400">
                <span className="font-bold text-rose-500 block mb-1">Physiologic Rationale</span>
                {curr.note}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                disabled={!answered}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all"
              >
                {currentIdx === QUESTIONS.length - 1 ? "Complete" : "Next Wave"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">ECG Challenge Completed</h3>
            <p className="text-sm text-slate-400">Your Score: <span className="text-rose-500 font-mono font-bold text-lg">{score}/{QUESTIONS.length} correct</span></p>
            <div className="flex justify-center gap-4">
              <button onClick={() => {
                setCurrentIdx(0);
                setScore(0);
                setAnswered(false);
                setSelectedOpt(null);
                setEnded(false);
              }} className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl text-xs font-bold">Restart</button>
              <button onClick={onClose} className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold">Done</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ==============================
// GAME 4: DRUG MATCH
// ==============================
function DrugMatchGame({ onClose, onBack }: { onClose: () => void, onBack: () => void }) {
  const DRUGS = [
    { id: "metformin", label: "Metformin", pairId: "diabetes" },
    { id: "lisinopril", label: "Lisinopril", pairId: "hypertension" },
    { id: "atorvastatin", label: "Atorvastatin", pairId: "lipid" },
    { id: "omeprazole", label: "Omeprazole", pairId: "gerd" }
  ];

  const INDICATIONS = [
    { id: "lipid", label: "HMG-CoA Reductase Inhibitor / Hypercholesterolemia" },
    { id: "diabetes", label: "AMPK Activator / Type 2 Diabetes" },
    { id: "gerd", label: "Proton Pump Inhibitor / GERD" },
    { id: "hypertension", label: "ACE Inhibitor / Hypertension" }
  ];

  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [selectedIndication, setSelectedIndication] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<boolean>(false);

  const handleDrugClick = (id: string) => {
    if (matches.includes(id)) return;
    setSelectedDrug(id);
    if (selectedIndication) {
      checkMatch(id, selectedIndication);
    }
  };

  const handleIndicationClick = (id: string) => {
    const matchingDrug = DRUGS.find(d => d.pairId === id);
    if (!matchingDrug || matches.includes(matchingDrug.id)) return;
    setSelectedIndication(id);
    if (selectedDrug) {
      checkMatch(selectedDrug, id);
    }
  };

  const checkMatch = (drugId: string, indId: string) => {
    const drug = DRUGS.find(d => d.id === drugId);
    if (drug && drug.pairId === indId) {
      setMatches(prev => [...prev, drugId]);
      setSelectedDrug(null);
      setSelectedIndication(null);
    } else {
      setWrongMatch(true);
      setTimeout(() => {
        setWrongMatch(false);
        setSelectedDrug(null);
        setSelectedIndication(null);
      }, 800);
    }
  };

  const ended = matches.length === DRUGS.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f0f15] border border-white/10 rounded-3xl w-full max-w-2xl p-8 relative overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.1)]">
        <button onClick={onBack} className="absolute top-5 left-5 text-slate-500 hover:text-white text-sm transition-colors uppercase tracking-widest z-50">← Back</button>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-500 hover:text-white text-xl z-50">✕</button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-amber-500 tracking-wider uppercase mb-1">Drug Match</h2>
          <span className="text-xs text-slate-400">Match the pharmacology pairings</span>
        </div>

        {!ended ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6 pt-4">
              {/* Drugs List */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-2">Pharmacotherapy Agent</span>
                {DRUGS.map(d => {
                  const isMatched = matches.includes(d.id);
                  return (
                    <button
                      key={d.id}
                      onClick={() => handleDrugClick(d.id)}
                      className={`w-full p-4 text-left rounded-xl text-sm font-semibold border transition-all ${
                        isMatched
                          ? "bg-green-500/10 border-green-500/30 text-green-500/50 cursor-default"
                          : selectedDrug === d.id
                            ? wrongMatch 
                              ? "bg-red-500/20 border-red-500 text-red-400"
                              : "bg-amber-500/20 border-amber-500 text-amber-400"
                            : "bg-white/5 border-white/5 text-slate-200 hover:bg-white/10 hover:border-white/10"
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>

              {/* Indications List */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-2">Indications / Mechanisms</span>
                {INDICATIONS.map(i => {
                  const matchDrug = DRUGS.find(d => d.pairId === i.id);
                  const isMatched = matchDrug ? matches.includes(matchDrug.id) : false;
                  return (
                    <button
                      key={i.id}
                      onClick={() => handleIndicationClick(i.id)}
                      className={`w-full p-4 text-left rounded-xl text-xs font-semibold border transition-all ${
                        isMatched
                          ? "bg-green-500/10 border-green-500/30 text-green-500/50 cursor-default"
                          : selectedIndication === i.id
                            ? wrongMatch
                              ? "bg-red-500/20 border-red-500 text-red-400"
                              : "bg-amber-500/20 border-amber-500 text-amber-400"
                            : "bg-white/5 border-white/5 text-slate-200 hover:bg-white/10 hover:border-white/10"
                      }`}
                    >
                      {i.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {wrongMatch && (
              <div className="text-center text-xs font-semibold text-red-400 animate-pulse mt-2">
                Incorrect Mechanism Matching. Try Again!
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Pharmacology Matched!</h3>
            <p className="text-sm text-slate-400">All drug mechanisms correctly aligned.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => {
                setMatches([]);
                setSelectedDrug(null);
                setSelectedIndication(null);
              }} className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl text-xs font-bold">Restart</button>
              <button onClick={onClose} className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold">Done</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ==============================
// GAME 5: DIAGNOSIS RACE
// ==============================
function DiagnosisRaceGame({ onClose, onBack }: { onClose: () => void, onBack: () => void }) {
  const DRILLS = [
    { statement: "Beta-blockers are contraindicated in patients with acute severe bronchial asthma.", answer: true },
    { statement: "The first-line drug for clinical anaphylaxis is intravenous antihistamine.", answer: false },
    { statement: "Kussmaul breathing is classically seen in patients with Diabetic Ketoacidosis.", answer: true },
    { statement: "The definitive treatment for tension pneumothorax is waiting for an immediate chest X-ray.", answer: false },
    { statement: "Gouty arthritis is characterized by negatively birefringent needle-shaped crystals.", answer: true },
    { statement: "A positive McBurney's sign is diagnostic for acute cholecystitis.", answer: false },
    { statement: "Amylase is more specific than lipase for diagnosing acute pancreatitis.", answer: false }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (!started || ended) return;
    if (timeLeft <= 0) {
      setTimeout(() => setEnded(true), 0);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [started, ended, timeLeft]);

  const handleAnswer = (val: boolean) => {
    if (val === DRILLS[currentIdx].answer) {
      setScore(s => s + 1);
    }
    if (currentIdx < DRILLS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setEnded(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f0f15] border border-white/10 rounded-3xl w-full max-w-md p-8 relative overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.1)]">
        <button onClick={onBack} className="absolute top-5 left-5 text-slate-500 hover:text-white text-sm transition-colors uppercase tracking-widest z-50">← Back</button>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-500 hover:text-white text-xl z-50">✕</button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-purple-400 tracking-wider uppercase mb-1">Diagnosis Race</h2>
          <span className="text-xs text-slate-400">Rapid-fire speed round</span>
        </div>

        {!started ? (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mx-auto">
              <Flame className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Rapid True / False Race</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Answer as many medical statements correctly as you can in 20 seconds.
            </p>
            <button onClick={() => setStarted(true)} className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              Start Race
            </button>
          </div>
        ) : !ended ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Time Left</span>
                <span className="text-2xl font-bold text-white font-mono">{timeLeft}s</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Correct Answers</span>
                <span className="text-2xl font-bold text-purple-400 font-mono">{score}</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl min-h-[120px] flex items-center justify-center text-center">
              <p className="text-slate-200 text-sm leading-relaxed">{DRILLS[currentIdx].statement}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="py-4 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-xl font-bold transition-all text-sm"
              >
                True
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="py-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-xl font-bold transition-all text-sm"
              >
                False
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Race Over!</h3>
            <p className="text-sm text-slate-400">Statements Correct: <span className="text-purple-400 font-mono font-bold text-lg">{score}</span></p>
            <div className="flex justify-center gap-4">
              <button onClick={() => {
                setCurrentIdx(0);
                setScore(0);
                setTimeLeft(20);
                setStarted(true);
                setEnded(false);
              }} className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl text-xs font-bold">Restart</button>
              <button onClick={onClose} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">Done</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
