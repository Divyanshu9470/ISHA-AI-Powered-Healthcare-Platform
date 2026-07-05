"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Layers, Clock, TrendingUp, ChevronRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardDeckProps {
    deck: {
        id: string;
        title: string;
        description: string | null;
        subject: string;
        category?: string | null;
        imageUrl?: string | null;
        _count?: {
            flashcards: number;
        };
    };
    progress?: {
        mastered: number;
        total: number;
    };
}

export function FlashcardDeckCard({ deck, progress }: FlashcardDeckProps) {
    const [imgError, setImgError] = useState(false);
    const completionRate = progress ? (progress.mastered / progress.total) * 100 : 0;

    return (
        <Link href={`/flashcards/${deck.id}`}>
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
                {/* Visual Header */}
                <div className="h-40 relative bg-slate-900 overflow-hidden">
                    {deck.imageUrl && !imgError ? (
                        <img 
                            src={deck.imageUrl} 
                            alt={deck.title} 
                            onError={() => setImgError(true)}
                            className="w-full h-full object-cover opacity-60 grayscale-[0.3] group-hover:scale-110 transition-transform duration-700" 
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-teal/20" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                            {deck.subject}
                        </div>
                    </div>

                    <div className="absolute -bottom-6 right-8 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20 group-hover:rotate-6 transition-transform duration-500">
                        <Layers className="w-8 h-8" />
                    </div>
                </div>

                <div className="p-8 pt-10">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest mb-3">
                        <BookOpen className="w-3.5 h-3.5" /> {deck._count?.flashcards || 0} Cards
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                        {deck.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-8 leading-relaxed">
                        {deck.description || "Master these clinical concepts with our AI-optimized spaced repetition decks."}
                    </p>

                    {/* Progress Indicator */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-muted-foreground uppercase">Retention</span>
                            <span className="text-primary">{Math.round(completionRate)}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${completionRate}%` }}
                                className="h-full bg-gradient-to-r from-primary to-teal"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" /> 15m review
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                            Start Session <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
