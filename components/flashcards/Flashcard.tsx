"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, HelpCircle, CheckCircle2, ChevronRight, RotateCw, Image as ImageIcon } from "lucide-react";

interface FlashcardProps {
    card: {
        id: string;
        question: string;
        answer: string;
        explanation?: string | null;
        image?: string | null;
        subject?: string;
        difficulty?: string;
    };
    onReview: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export function Flashcard({ card, onReview }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="relative w-full max-w-2xl mx-auto h-[500px] perspective-1000">
            <motion.div
                className="w-full h-full relative preserve-3d cursor-pointer"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden">
                    <div className="h-full w-full bg-card border border-border rounded-[2.5rem] p-10 flex flex-col shadow-2xl overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-teal" />
                        
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
                                <Sparkles className="w-3 h-3" /> {card.subject || "General Medicine"}
                            </div>
                            <div className="text-muted-foreground text-xs font-medium flex items-center gap-1">
                                <HelpCircle className="w-3 h-3" /> Question
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-6">
                                {card.question}
                            </h2>
                            {card.image && (
                                <div className="w-full max-w-xs aspect-video bg-muted rounded-2xl flex items-center justify-center border border-border overflow-hidden">
                                    <img src={card.image} alt="Reference" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex justify-center">
                            <div className="px-6 py-3 bg-muted rounded-2xl text-sm font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all flex items-center gap-2">
                                <RotateCw className="w-4 h-4" /> Tap to reveal answer
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)]">
                    <div className="h-full w-full bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 flex flex-col shadow-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal to-primary" />
                        
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-2 px-3 py-1 bg-teal/10 rounded-full text-[10px] font-bold text-teal uppercase tracking-widest">
                                <CheckCircle2 className="w-3 h-3" /> Answer
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <RotateCw className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col px-4 overflow-y-auto no-scrollbar">
                            <div className="text-xl md:text-2xl font-semibold text-white mb-6 leading-relaxed">
                                {card.answer}
                            </div>
                            {card.explanation && (
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 mt-auto">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Clinical Explanation</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {card.explanation}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-3">
                            <button 
                                onClick={(e) => { e.stopPropagation(); onReview('hard'); }}
                                className="flex flex-col items-center gap-1 p-3 bg-red-500/10 border border-red-500/20 rounded-2xl hover:bg-red-500 transition-all group"
                            >
                                <span className="text-xs font-bold text-red-500 group-hover:text-white">Hard</span>
                                <span className="text-[10px] text-red-500/60 group-hover:text-white/60">1m</span>
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onReview('medium'); }}
                                className="flex flex-col items-center gap-1 p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl hover:bg-blue-500 transition-all group"
                            >
                                <span className="text-xs font-bold text-blue-500 group-hover:text-white">Good</span>
                                <span className="text-[10px] text-blue-500/60 group-hover:text-white/60">1d</span>
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onReview('easy'); }}
                                className="flex flex-col items-center gap-1 p-3 bg-teal/10 border border-teal/50 rounded-2xl hover:bg-teal transition-all group"
                            >
                                <span className="text-xs font-bold text-teal group-hover:text-white">Easy</span>
                                <span className="text-[10px] text-teal/60 group-hover:text-white/60">4d</span>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
