"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Headphones, Users, CheckCircle2, Circle, Volume2 } from "lucide-react";

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

  // Brain Game State
  const [showBrainGame, setShowBrainGame] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 mix-blend-overlay"></div>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col lg:flex-row gap-8 items-start justify-center pt-24">
        
        {/* Left Column: Timer */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl flex flex-col items-center w-full max-w-md">
            
            {/* Duration Selector */}
            <div className="flex items-center gap-2 mb-8 bg-black/20 p-1.5 rounded-full border border-white/5">
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
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`}></span>
              {isActive ? 'Focusing...' : 'Ready to Focus'}
            </div>

            <div className="relative mb-12 flex justify-center w-full">
              <svg className="w-64 h-64 transform -rotate-90">
                <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
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
              <button onClick={toggleTimer} className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
              <button onClick={resetTimer} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button 
              onClick={() => setShowBrainGame(true)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all hover:-translate-y-1"
            >
              🧠 Launch Brain Warmup
            </button>
            
            <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">1,248 students focusing right now</span>
            </div>
          </div>
        </div>

        {/* Right Column: Tasks & Ambience */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          {/* Soundscape Mixer */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Headphones className="w-5 h-5 text-purple-400" /> Soundscape Mixer
            </h3>
            <div className="space-y-5">
              {SOUNDSCAPES.map(sound => (
                <div key={sound.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSound(sound.id, sound.url)}>
                    <span className={`text-sm transition-colors ${activeSounds[sound.id] ? 'text-white font-medium' : 'text-slate-400'}`}>
                      {sound.name}
                    </span>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${activeSounds[sound.id] ? 'bg-blue-500' : 'bg-slate-700'}`}>
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
                        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Study Goals */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
              Study Goals
              <span className="text-xs font-normal text-slate-400">
                {tasks.filter(t => t.completed).length}/{tasks.length} Done
              </span>
            </h3>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {tasks.map(task => (
                <div key={task.id} onClick={() => toggleTask(task.id)} className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${task.completed ? 'bg-white/5' : 'hover:bg-white/5 border border-white/5'}`}>
                  {task.completed ? <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> : <Circle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />}
                  <span className={`text-sm leading-relaxed ${task.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{task.text}</span>
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
                  <button type="button" onClick={() => setIsAddingTask(false)} className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium py-2 rounded-xl transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button 
                onClick={() => setIsAddingTask(true)} 
                className="w-full mt-4 py-3 border border-dashed border-white/20 rounded-xl text-sm text-slate-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
              >
                + Add Custom Goal
              </button>
            )}
          </div>
        </div>
      </div>

      {showBrainGame && <BrainGameModal onClose={() => setShowBrainGame(false)} />}
    </div>
  );
}

function BrainGameModal({ onClose }: { onClose: () => void }) {
  const [selectedGame, setSelectedGame] = useState<'menu' | 'neural' | 'reaction' | 'pattern'>('menu');

  if (selectedGame === 'neural') return <NeuralGame onClose={onClose} onBack={() => setSelectedGame('menu')} />;
  if (selectedGame === 'reaction') return <ReactionStrikeGame onClose={onClose} onBack={() => setSelectedGame('menu')} />;
  if (selectedGame === 'pattern') return <PatternRecallGame onClose={onClose} onBack={() => setSelectedGame('menu')} />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-4xl bg-[#0a0a0f] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_0_100px_rgba(59,130,246,0.15)]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white text-xl transition-colors">✕</button>
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">Choose Your Focus Warmup</h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Select a cognitive exercise to prime your brain for studying. Whether you need to calm your nerves, wake up your reflexes, or sharpen your working memory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Option 1: Neural Flow */}
          <div onClick={() => setSelectedGame('neural')} className="group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:-translate-y-2">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Neural Flow</h3>
            <p className="text-sm text-slate-400 text-center">Relax your muscle memory and lower your heart rate by smoothly gathering scattered energy.</p>
            <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-blue-400 text-center">Calm & Centering</div>
          </div>

          {/* Option 2: Reaction Strike */}
          <div onClick={() => setSelectedGame('reaction')} className="group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 rounded-2xl p-6 transition-all hover:-translate-y-2">
            <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Reaction Strike</h3>
            <p className="text-sm text-slate-400 text-center">Wake up your central nervous system by striking random targets as fast as possible.</p>
            <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-red-400 text-center">Speed & Reflexes</div>
          </div>

          {/* Option 3: Pattern Recall */}
          <div onClick={() => setSelectedGame('pattern')} className="group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/50 rounded-2xl p-6 transition-all hover:-translate-y-2">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Pattern Recall</h3>
            <p className="text-sm text-slate-400 text-center">Expand your working memory by memorizing and repeating an ever-growing sequence.</p>
            <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-yellow-400 text-center">Working Memory</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==============================
// GAME 1: NEURAL FLOW (CANVAS)
// ==============================
function NeuralGame({ onClose, onBack }: { onClose: () => void, onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won'>('playing');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false, speed: 0 };
    let lastMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      x: number; y: number; size: number; baseX: number; baseY: number; color: string; vx: number; vy: number;
      constructor(x: number, y: number) {
        this.x = x; this.y = y; this.baseX = x; this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.vx = 0; this.vy = 0;
        const colors = ['#60a5fa', '#a78bfa', '#34d399', '#f472b6'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
      update() {
        let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy);
        if (mouse.speed > 25) {
          if (distance < 200) { this.vx -= (dx / distance) * 5; this.vy -= (dy / distance) * 5; }
        } else if (distance < 300) {
          this.vx += (dx / distance) * 0.1; this.vy += (dy / distance) * 0.1;
        } else {
          this.vx += (this.baseX - this.x) * 0.01; this.vy += (this.baseY - this.y) * 0.01;
        }
        this.vx *= 0.92; this.vy *= 0.92;
        this.x += this.vx; this.y += this.vy;
      }
    }

    const init = () => {
      particles = [];
      const numParticles = window.innerWidth > 768 ? 400 : 200;
      for (let i = 0; i < numParticles; i++) {
        const radius = Math.random() * (canvas.width / 3) + 50;
        const angle = Math.random() * Math.PI * 2;
        particles.push(new Particle(canvas.width / 2 + Math.cos(angle) * radius, canvas.height / 2 + Math.sin(angle) * radius));
      }
    };
    init();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left; const newY = e.clientY - rect.top;
      mouse.speed = Math.sqrt(Math.pow(newX - lastMouse.x, 2) + Math.pow(newY - lastMouse.y, 2));
      mouse.x = newX; mouse.y = newY; lastMouse = { x: newX, y: newY }; mouse.active = true;
    };
    const handleMouseLeave = () => { mouse.active = false; mouse.speed = 0; };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let scoreCounter = 0;
    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(10, 10, 15, 0.2)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      let gatheredCount = 0;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(); particles[i].draw();
        if (Math.sqrt(Math.pow(mouse.x - particles[i].x, 2) + Math.pow(mouse.y - particles[i].y, 2)) < 80) gatheredCount++;
      }

      if (mouse.active) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
        gradient.addColorStop(0, mouse.speed > 25 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(96, 165, 250, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2); ctx.fill();
      }

      if (mouse.speed < 15 && gatheredCount > particles.length * 0.8) scoreCounter += 0.5;
      else if (scoreCounter > 0) scoreCounter -= 0.5;

      const newProgress = Math.min(100, Math.max(0, scoreCounter));
      setProgress(newProgress);
      if (newProgress >= 100) { setGameState('won'); return; }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 overflow-hidden">
      <div className="relative w-full max-w-5xl h-[70vh] rounded-[3rem] overflow-hidden flex flex-col border border-white/10 shadow-[0_0_150px_rgba(59,130,246,0.15)] bg-[#05050a]">
        <button onClick={onBack} className="absolute top-6 left-8 text-slate-500 hover:text-white text-sm z-50 transition-colors uppercase tracking-widest">← Back</button>
        <button onClick={onClose} className="absolute top-6 right-8 text-slate-500 hover:text-white text-2xl z-50 transition-colors">✕</button>
        {gameState === 'playing' ? (
          <>
            <div className="absolute top-8 left-0 w-full text-center z-10 pointer-events-none px-4">
              <h2 className="text-3xl font-serif text-white tracking-wider mb-2">Neural Gathering</h2>
              <p className="text-sm text-slate-400 font-light max-w-md mx-auto">Move your cursor <span className="text-blue-400 font-medium">slowly and smoothly</span> to gather the energy. Moving fast scatters it.</p>
            </div>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair touch-none" />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 md:w-96 z-10 pointer-events-none">
              <div className="flex justify-between text-xs text-slate-400 mb-2 uppercase tracking-widest font-semibold"><span>Scattered</span><span>Gathered</span></div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/5">
                <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/40 backdrop-blur-md">
            <h3 className="text-5xl font-serif text-white mb-4 tracking-tight">Centered & Focused</h3>
            <p className="text-slate-400 mb-10 max-w-lg text-center text-lg leading-relaxed font-light">Your physical movements are calmed, and your neural energy is centered.</p>
            <button onClick={onClose} className="px-12 py-4 bg-white hover:bg-slate-200 text-black rounded-full font-bold shadow-[0_0_40px_rgba(255,255,255,0.2)]">Begin Study Session</button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ==============================
// GAME 2: REACTION STRIKE
// ==============================
function ReactionStrikeGame({ onClose, onBack }: { onClose: () => void, onBack: () => void }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'ended'>('start');
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('ended');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const moveTarget = () => {
    // Keep target within 10% to 90% of screen to avoid edges
    setTargetPos({
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 80) + 10
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState('playing');
    moveTarget();
  };

  const handleStrike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from catching it
    if (gameState !== 'playing') return;
    setScore(s => s + 1);
    moveTarget();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f0f15] border border-white/10 rounded-3xl w-full max-w-5xl h-[70vh] relative overflow-hidden shadow-[0_0_100px_rgba(239,68,68,0.1)]">
        <button onClick={onBack} className="absolute top-5 left-5 text-slate-500 hover:text-white text-sm transition-colors uppercase tracking-widest z-50">← Back</button>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-500 hover:text-white text-xl z-50">✕</button>
        
        {/* Top UI */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-40">
          <div className="text-center w-full absolute top-6">
            <h2 className="text-2xl font-bold text-red-400 uppercase tracking-widest opacity-50">Reaction Strike</h2>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md mt-10">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">Time</span>
            <span className={`text-3xl font-mono ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>00:{timeLeft.toString().padStart(2, '0')}</span>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md text-right mt-10">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">Targets Hit</span>
            <span className="text-3xl font-mono text-red-400">{score}</span>
          </div>
        </div>

        {/* Game Area */}
        {gameState === 'start' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/40">
            <div className="w-24 h-24 mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Reaction Strike</h3>
            <p className="text-slate-400 mb-8 max-w-sm text-center">A target will appear randomly. Click it as fast as possible. You have 30 seconds.</p>
            <button onClick={startGame} className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(220,38,38,0.4)]">Start Drill</button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="absolute inset-0 cursor-crosshair" onClick={() => { /* Miss penalty could go here */ }}>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              key={score} // Forces re-animation on new target
              onClick={handleStrike}
              className="absolute w-16 h-16 -ml-8 -mt-8 rounded-full border-4 border-red-500 bg-red-500/20 flex items-center justify-center hover:bg-red-500/40"
              style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
            >
              <div className="w-4 h-4 bg-red-500 rounded-full" />
            </motion.div>
          </div>
        )}

        {gameState === 'ended' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/80 backdrop-blur-md">
            <h3 className="text-4xl font-bold text-white mb-2">Nervous System Online! ⚡</h3>
            <p className="text-slate-300 mb-8 text-center">You struck <span className="text-red-400 font-bold text-xl">{score}</span> targets in 30 seconds.</p>
            <div className="flex gap-4">
              <button onClick={startGame} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold">Try Again</button>
              <button onClick={onClose} className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold">Start Focus Session</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ==============================
// GAME 3: PATTERN RECALL
// ==============================
function PatternRecallGame({ onClose, onBack }: { onClose: () => void, onBack: () => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userStep, setUserStep] = useState(0);
  const [gameState, setGameState] = useState<'start' | 'showing' | 'playing' | 'lost'>('start');
  const [activeSquare, setActiveSquare] = useState<number | null>(null);
  const [level, setLevel] = useState(1);

  const startRound = (currentSeq: number[]) => {
    setGameState('showing');
    setUserStep(0);
    const newSeq = [...currentSeq, Math.floor(Math.random() * 9)];
    setSequence(newSeq);

    // Play sequence
    let i = 0;
    const interval = setInterval(() => {
      setActiveSquare(newSeq[i]);
      
      // Turn off highlight after 400ms
      setTimeout(() => setActiveSquare(null), 400);

      i++;
      if (i >= newSeq.length) {
        clearInterval(interval);
        setTimeout(() => setGameState('playing'), 600); // Wait a bit before letting user play
      }
    }, 800);
  };

  const startGame = () => {
    setLevel(1);
    startRound([]);
  };

  const handleSquareClick = (index: number) => {
    if (gameState !== 'playing') return;

    setActiveSquare(index);
    setTimeout(() => setActiveSquare(null), 200);

    if (index === sequence[userStep]) {
      // Correct click
      if (userStep + 1 === sequence.length) {
        // Round complete
        setGameState('showing');
        setTimeout(() => {
          setLevel(l => l + 1);
          startRound(sequence);
        }, 1000);
      } else {
        setUserStep(s => s + 1);
      }
    } else {
      // Wrong click
      setGameState('lost');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-md w-full relative shadow-[0_0_100px_rgba(234,179,8,0.1)]">
        <button onClick={onBack} className="absolute top-5 left-5 text-slate-500 hover:text-white text-sm transition-colors uppercase tracking-widest z-50">← Back</button>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-500 hover:text-white text-xl z-50">✕</button>
        
        <div className="text-center mb-8 mt-6">
          <h2 className="text-2xl font-bold text-yellow-400 tracking-widest uppercase mb-2">Pattern Recall</h2>
          <p className="text-sm text-slate-400">Memorize the sequence.</p>
        </div>

        <div className="flex justify-between items-center mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
          <div><span className="text-xs text-slate-400 uppercase tracking-widest">Level</span><div className="text-3xl font-bold text-white">{level}</div></div>
          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase tracking-widest">Status</span>
            <div className={`text-xl font-bold uppercase mt-1 ${gameState === 'showing' ? 'text-blue-400 animate-pulse' : gameState === 'playing' ? 'text-green-400' : 'text-red-400'}`}>
              {gameState === 'showing' ? 'Watch' : gameState === 'playing' ? 'Your Turn' : gameState === 'lost' ? 'Failed' : 'Ready'}
            </div>
          </div>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-[300px] mx-auto">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              onClick={() => handleSquareClick(i)}
              className={`
                aspect-square rounded-xl transition-all duration-200 cursor-pointer border-2
                ${gameState === 'playing' ? 'hover:scale-95' : ''}
                ${activeSquare === i ? 'bg-yellow-400 border-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.6)] scale-95' : 'bg-white/5 border-white/10'}
              `}
            />
          ))}
        </div>

        {gameState === 'start' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-3xl backdrop-blur-sm">
            <button onClick={startGame} className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(202,138,4,0.4)]">Start Memory Test</button>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 rounded-3xl backdrop-blur-md">
            <h3 className="text-3xl font-bold text-red-500 mb-2">Sequence Broken!</h3>
            <p className="text-slate-300 mb-6">You reached Level {level}.</p>
            <div className="flex flex-col gap-3">
              <button onClick={startGame} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold">Try Again</button>
              <button onClick={onClose} className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-full font-bold">Start Focus Session</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
