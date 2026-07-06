"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, RotateCcw, Headphones, Users, CheckCircle2, 
  Circle, Volume2, ShieldAlert, Trophy, Brain, Activity, 
  Stethoscope, Clock, Zap, Heart, RefreshCw, BarChart2, Flame,
  Shuffle, Loader2, SkipBack, SkipForward, Repeat, Search, X
} from "lucide-react";

const SOUNDSCAPES = [
  // ── 🇬🇧 English Classics ──────────────────────────────────────────────
  { id: "daydream",     name: "🌙 Daydream — Luna",                    url: "/audio/daydream.mp3",    lang: "EN" },
  { id: "oak_tree",    name: "🌳 Under the Oak Tree",                  url: "/audio/oak_tree.mp3",   lang: "EN" },
  { id: "lover",       name: "💗 Lover — Taylor Swift",                url: "/audio/lover.mp3",      lang: "EN" },
  { id: "backstreet",  name: "🎵 I Want It That Way — Backstreet Boys", url: "/audio/backstreet.mp3", lang: "EN" },
  { id: "nothing",     name: "💛 Nothing's Gonna Change My Love",      url: "/audio/nothing.mp3",    lang: "EN" },
  { id: "notalone",    name: "🤍 You Are Not Alone — Michael Jackson",  url: "/audio/notalone.mp3",   lang: "EN" },
  { id: "everybreath", name: "🌬️ Every Breath You Take — The Police",  url: "/audio/everybreath.mp3", lang: "EN" },
  { id: "kissme",      name: "😊 Kiss Me — Sixpence None the Richer",  url: "/audio/kissme.mp3",      lang: "EN" },
  { id: "iris",        name: "🌺 Iris — Goo Goo Dolls",                url: "/audio/iris.mp3",        lang: "EN" },
  { id: "heavenknows", name: "✨ Heaven — Bryan Adams",                 url: "/audio/heavenknows.mp3", lang: "EN" },
  { id: "myheartwill", name: "🚢 My Heart Will Go On — Celine Dion",   url: "/audio/myheartwill.mp3", lang: "EN" },
  { id: "rightwait",   name: "⏳ Right Here Waiting — Richard Marx",   url: "/audio/rightwait.mp3",   lang: "EN" },
  { id: "imagine",     name: "🕊️ Imagine — John Lennon",               url: "/audio/imagine.mp3",     lang: "EN" },
  { id: "wicked",      name: "🌹 Wicked Game — Chris Isaak",           url: "/audio/wicked.mp3",      lang: "EN" },
  { id: "everywhere",  name: "🌟 Everything I Do — Bryan Adams",        url: "/audio/everywhere.mp3",  lang: "EN" },
  { id: "careless",   name: "🎷 Careless Whisper — George Michael",    url: "/audio/careless.mp3",    lang: "EN" },
  { id: "hero",        name: "🦸 Hero — Mariah Carey",                  url: "/audio/hero.mp3",        lang: "EN" },
  { id: "sacrifice",   name: "🕯️ Sacrifice — Elton John",              url: "/audio/sacrifice.mp3",   lang: "EN" },
  { id: "eternal",     name: "🔥 Eternal Flame — Roxette",              url: "/audio/eternal.mp3",     lang: "EN" },
  { id: "heart_alone", name: "💔 Alone — Heart",                        url: "/audio/heart_alone.mp3", lang: "EN" },
  { id: "still_loving",name: "🦂 Still Loving You — Scorpions",         url: "/audio/still_loving.mp3", lang: "EN" },
  { id: "neverup",    name: "🎤 Never Gonna Give You Up — Rick Astley", url: "/audio/neverup.mp3",     lang: "EN" },
  { id: "total_eclipse",name:"🌑 Total Eclipse of the Heart — Bonnie Tyler", url: "/audio/total_eclipse.mp3", lang: "EN" },
  { id: "more_than_words", name: "🎸 More Than Words — Extreme",        url: "/audio/more_than_words.mp3", lang: "EN" },
  { id: "iloveyou",    name: "💚 I Will Always Love You — Whitney",     url: "/audio/iloveyou.mp3",    lang: "EN" },
  // ── 🇮🇳 Hindi / Bollywood ─────────────────────────────────────────────
  { id: "tum_hi_ho",   name: "🌹 Tum Hi Ho — Aashiqui 2",              url: "/audio/tum_hi_ho.mp3",   lang: "HI" },
  { id: "kal_ho",      name: "🌅 Ab Tere Bin — Aashiqui",               url: "/audio/kal_ho.mp3",      lang: "HI" },
  { id: "kabhi_alvida",name: "🛫 Kabhi Alvida Naa Kehna",               url: "/audio/kabhi_alvida.mp3",lang: "HI" },
  { id: "ae_dil",      name: "💜 Ae Dil Hai Mushkil — Title",           url: "/audio/ae_dil.mp3",      lang: "HI" },
  { id: "raabta",      name: "✨ Ajj Din Chadheya — Love Aaj Kal",      url: "/audio/raabta.mp3",      lang: "HI" },
  { id: "channa_mereya",name:"💛 Channa Mereya — Ae Dil",               url: "/audio/channa_mereya.mp3",lang: "HI" },
  { id: "mann",        name: "🎵 Mera Mann — Mann",                    url: "/audio/mann.mp3",        lang: "HI" },
  { id: "phir_le_aya", name: "🌙 Aaoge Jab Tum — Jab We Met",          url: "/audio/phir_le_aya.mp3", lang: "HI" },
];

export default function FocusPage() {
  const [maxTime, setMaxTime] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingTrack, setIsLoadingTrack] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isRepeat, setIsRepeat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [langFilter, setLangFilter] = useState<"ALL"|"EN"|"HI">("ALL");
  const [likedSounds, setLikedSounds] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try { return JSON.parse(localStorage.getItem('ishamedLiked') || '{}'); } catch { return {}; }
    }
    return {};
  });
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const [soundscapes, setSoundscapes] = useState(SOUNDSCAPES);

  const shuffleTracks = () => {
    setSoundscapes(prev => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      shuffleTracks();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Persist liked songs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ishamedLiked', JSON.stringify(likedSounds));
    }
  }, [likedSounds]);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedSounds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered + sorted list
  const filteredSoundscapes = soundscapes
    .filter(s => langFilter === 'ALL' || s.lang === langFilter)
    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const sortedSoundscapes = [...filteredSoundscapes].sort((a, b) => {
    if (likedSounds[a.id] && !likedSounds[b.id]) return -1;
    if (!likedSounds[a.id] && likedSounds[b.id]) return 1;
    return 0;
  });

  const currentTrack = soundscapes.find(s => s.id === currentTrackId) ?? null;

  // Get next / prev track index from full sorted list
  const getAdjacentTrack = (dir: 1 | -1) => {
    const list = sortedSoundscapes;
    const idx = list.findIndex(s => s.id === currentTrackId);
    if (idx === -1) return list[0] ?? null;
    const next = (idx + dir + list.length) % list.length;
    return list[next];
  };

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

  // ── Radio-mode: stop previous, play new ───────────────────────────────
  const playTrack = (id: string, url: string) => {
    // Stop currently playing track
    if (currentTrackId && currentTrackId !== id && audioRefs.current[currentTrackId]) {
      audioRefs.current[currentTrackId].pause();
      audioRefs.current[currentTrackId].currentTime = 0;
    }

    // If clicking the same track → toggle pause/play
    if (currentTrackId === id) {
      if (isPlaying) {
        audioRefs.current[id]?.pause();
        setIsPlaying(false);
      } else {
        audioRefs.current[id]?.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    // Create audio element if not cached
    if (!audioRefs.current[id]) {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.addEventListener('waiting', () => setIsLoadingTrack(true));
      audio.addEventListener('playing', () => setIsLoadingTrack(false));
      audio.addEventListener('canplay', () => setIsLoadingTrack(false));
      audio.addEventListener('ended', () => {
        if (isRepeat) {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        } else {
          const next = getAdjacentTrack(1);
          if (next) playTrack(next.id, next.url);
        }
      });
      audioRefs.current[id] = audio;
    }

    setCurrentTrackId(id);
    setIsLoadingTrack(true);
    setIsPlaying(true);
    audioRefs.current[id].play()
      .then(() => setIsLoadingTrack(false))
      .catch(() => setIsLoadingTrack(false));
  };

  const skipTrack = (dir: 1 | -1) => {
    const next = getAdjacentTrack(dir);
    if (next) playTrack(next.id, next.url);
  };

  const changeVolume = (val: number) => {
    setVolume(val);
    if (currentTrackId && audioRefs.current[currentTrackId]) {
      audioRefs.current[currentTrackId].volume = val;
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
          {/* Soundscape Mixer — Spotify Style */}
          <div className="bg-[#121212] backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
              <h3 className="text-base font-bold flex items-center gap-2 text-white">
                <Headphones className="w-4 h-4 text-green-400" /> Soundscape Mixer
              </h3>
              <button onClick={shuffleTracks} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-green-400 hover:text-white bg-green-500/10 border border-green-500/20 hover:bg-green-600/30 transition-all hover:scale-105">
                <Shuffle className="w-3 h-3" /> Shuffle
              </button>
            </div>

            {/* Liked Songs */}
            {Object.values(likedSounds).some(Boolean) && (
              <div className="px-4 pt-3 pb-1">
                <p className="text-[10px] uppercase tracking-widest text-green-400 font-bold mb-2">❤️ Liked Songs</p>
                <div className="space-y-1">
                  {soundscapes.filter(s => likedSounds[s.id]).map(sound => (
                    <div key={`liked-${sound.id}`} onClick={() => playTrack(sound.id, sound.url)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all group ${currentTrackId === sound.id ? "bg-green-500/15 border border-green-500/20" : "hover:bg-white/5"}`}>
                      <div className="w-5 flex items-center justify-center shrink-0">
                        {isLoadingTrack && currentTrackId === sound.id
                          ? <Loader2 className="w-3.5 h-3.5 text-green-400 animate-spin" />
                          : currentTrackId === sound.id && isPlaying
                            ? <div className="flex items-end gap-[2px] h-4">{[1,2,3].map(i => <motion.div key={i} className="w-[3px] bg-green-400 rounded-full" animate={{ height: ["4px","12px","6px","10px","4px"] }} transition={{ duration: 0.8, repeat: Infinity, delay: i*0.15 }} />)}</div>
                            : <Heart className="w-3 h-3 text-green-400 fill-green-400" />}
                      </div>
                      <span className={`text-xs flex-1 truncate ${currentTrackId === sound.id ? "text-green-400 font-semibold" : "text-slate-300"}`}>{sound.name}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 mt-3 mb-1" />
              </div>
            )}

            {/* Search + Filter */}
            <div className="px-4 pt-3 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input type="text" placeholder="Search songs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 transition-colors" />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-3 h-3 text-slate-500 hover:text-white" /></button>}
              </div>
              <div className="flex gap-1.5 items-center">
                {(["ALL","EN","HI"] as const).map(f => (
                  <button key={f} onClick={() => setLangFilter(f)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${langFilter === f ? "bg-green-500 text-black" : "bg-white/5 text-slate-400 hover:text-white"}`}>
                    {f === "ALL" ? "🌍 All" : f === "EN" ? "🇬🇧 EN" : "🇮🇳 HI"}
                  </button>
                ))}
                <span className="ml-auto text-[10px] text-slate-500">{sortedSoundscapes.length} songs</span>
              </div>
            </div>

            {/* Track List */}
            <div className="px-4 py-3">
              <div className="space-y-0.5 max-h-[300px] overflow-y-auto pr-1" style={{scrollbarWidth:"thin", scrollbarColor:"#333 transparent"}}>
                {sortedSoundscapes.length === 0
                  ? <p className="text-center text-slate-500 text-xs py-6">No songs found</p>
                  : sortedSoundscapes.map((sound, idx) => (
                  <div key={sound.id} onClick={() => playTrack(sound.id, sound.url)}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${currentTrackId === sound.id ? "bg-white/10" : "hover:bg-white/5"}`}>
                    <div className="w-5 flex items-center justify-center shrink-0">
                      {isLoadingTrack && currentTrackId === sound.id
                        ? <Loader2 className="w-3.5 h-3.5 text-green-400 animate-spin" />
                        : currentTrackId === sound.id && isPlaying
                          ? <div className="flex items-end gap-[2px] h-4">{[1,2,3].map(i => <motion.div key={i} className="w-[3px] bg-green-400 rounded-full" animate={{ height: ["4px","12px","6px","10px","4px"] }} transition={{ duration: 0.8, repeat: Infinity, delay: i*0.15 }} />)}</div>
                          : <><span className="text-[11px] text-slate-500 group-hover:hidden">{idx + 1}</span><Play className="w-3.5 h-3.5 text-white hidden group-hover:block" /></>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate transition-colors ${currentTrackId === sound.id ? "text-green-400 font-semibold" : "text-slate-300 group-hover:text-white"}`}>{sound.name}</p>
                      {isLoadingTrack && currentTrackId === sound.id && <p className="text-[10px] text-slate-500 animate-pulse">Loading…</p>}
                    </div>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0 ${("lang" in sound) && (sound as {lang:string}).lang === "HI" ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/10 text-blue-400"}`}>
                      {"lang" in sound ? (sound as {lang:string}).lang : "EN"}
                    </span>
                    <button onClick={e => toggleLike(sound.id, e)} className={`shrink-0 p-1 rounded-full transition-all opacity-0 group-hover:opacity-100 ${likedSounds[sound.id] ? "!opacity-100" : ""} hover:scale-110`}>
                      <Heart className={`w-3.5 h-3.5 ${likedSounds[sound.id] ? "fill-green-400 text-green-400" : "text-slate-500 hover:text-white"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Now Playing Bar */}
            <AnimatePresence>
              {currentTrack && (
                <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
                  className="border-t border-white/5 px-4 py-3 bg-[#181818]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-end gap-[3px] h-5 shrink-0">
                      {isPlaying ? [1,2,3,4].map(i => <motion.div key={i} className="w-[3px] bg-green-400 rounded-full" animate={{ height: ["4px","16px","8px","12px","4px"] }} transition={{ duration: 0.9, repeat: Infinity, delay: i*0.12 }} />) : [1,2,3,4].map(i => <div key={i} className="w-[3px] h-[4px] bg-slate-600 rounded-full" />)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-green-400 font-semibold truncate">{currentTrack.name}</p>
                      <p className="text-[10px] text-slate-500">{isLoadingTrack ? "Loading…" : isPlaying ? "Now Playing" : "Paused"}</p>
                    </div>
                    <button onClick={e => toggleLike(currentTrack.id, e)} className="shrink-0">
                      <Heart className={`w-4 h-4 transition-colors ${likedSounds[currentTrack.id] ? "fill-green-400 text-green-400" : "text-slate-500 hover:text-green-400"}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <button onClick={() => setIsRepeat(r => !r)} title="Repeat" className={`p-1.5 rounded-full transition-colors ${isRepeat ? "text-green-400" : "text-slate-500 hover:text-white"}`}><Repeat className="w-3.5 h-3.5" /></button>
                    <button onClick={() => skipTrack(-1)} className="p-1.5 text-slate-400 hover:text-white transition-colors"><SkipBack className="w-4 h-4 fill-current" /></button>
                    <button onClick={() => playTrack(currentTrack.id, currentTrack.url)} className="w-9 h-9 bg-green-400 hover:bg-green-300 rounded-full flex items-center justify-center transition-colors shrink-0">
                      {isLoadingTrack ? <Loader2 className="w-4 h-4 text-black animate-spin" /> : isPlaying ? <Pause className="w-4 h-4 text-black fill-black" /> : <Play className="w-4 h-4 text-black fill-black ml-0.5" />}
                    </button>
                    <button onClick={() => skipTrack(1)} className="p-1.5 text-slate-400 hover:text-white transition-colors"><SkipForward className="w-4 h-4 fill-current" /></button>
                    <div className="flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                      <input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => changeVolume(parseFloat(e.target.value))} className="w-14 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-400" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
