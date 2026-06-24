"use client";

import { useState } from "react";
import { Gamepad2, Brain, Zap, ShieldAlert, Sparkles, Trophy, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const MINI_GAMES = [
    {
        id: "ecg-match",
        title: "ECG Speed Match",
        icon: <Zap className="w-6 h-6 text-amber-400" />,
        desc: "Match dynamic heart rhythm strips (Atrial Fibrillation, Mobitz Block, VTach) to clinical terms under a 60-second timer.",
        actionText: "Play ECG Match",
        stats: "Record: 2,400 pts",
        color: "from-amber-950/40 to-slate-950 hover:border-amber-500/20"
    },
    {
        id: "triage-rush",
        title: "Triage Rush",
        icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
        desc: "Sort incoming trauma patients in a fast-paced virtual ER lobby based on vitals, complaints, and immediate risks.",
        actionText: "Launch Triage",
        stats: "Record: Level 12",
        color: "from-red-950/40 to-slate-950 hover:border-red-500/20"
    },
    {
        id: "drug-tetris",
        title: "Contraindicated Tetris",
        icon: <Brain className="w-6 h-6 text-purple-400" />,
        desc: "Match falling drug block pairs (e.g., Sildenafil + Nitrate) to clear dangerous combinations before the stack reaches the top.",
        actionText: "Start Tetris",
        stats: "Record: 4,800 pts",
        color: "from-purple-950/40 to-slate-950 hover:border-purple-500/20"
    }
];

export function BrainBreaksShowcase() {
    return (
        <section className="py-24 bg-slate-900/10 border-b border-white/5 relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full font-semibold uppercase tracking-wider mb-4">
                        <Gamepad2 className="w-3.5 h-3.5 text-purple-400 animate-bounce" /> Gamified Stress Relief
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Brain Breaks
                    </h2>
                    <p className="text-slate-400 font-light max-w-2xl mx-auto text-base">
                        Academic burnout is real. Unwind and clear your mind between intense study blocks with our medical-themed mini-games designed to reinforce practical knowledge without the pressure.
                    </p>
                </div>

                {/* Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MINI_GAMES.map((game) => (
                        <div
                            key={game.id}
                            className={`p-8 rounded-3xl bg-gradient-to-br ${game.color} border border-white/5 transition-all duration-300 group flex flex-col justify-between`}
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {game.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{game.title}</h3>
                                <p className="text-sm text-slate-400 font-light leading-relaxed mb-8">{game.desc}</p>
                            </div>

                            <div className="flex items-center justify-between gap-4 mt-4 pt-6 border-t border-white/5">
                                <span className="text-xs text-slate-500 font-medium">{game.stats}</span>
                                <Button
                                    size="sm"
                                    className="bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl py-4 px-4 font-bold flex items-center gap-1 text-xs"
                                >
                                    <Play className="w-3 h-3 fill-current" /> {game.actionText}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
