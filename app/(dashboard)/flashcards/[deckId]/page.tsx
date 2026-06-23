"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ChevronLeft, Settings, Info, Zap, 
    CheckCircle2, Clock, Trophy, RefreshCcw 
} from "lucide-react";
import Link from "next/link";
import { Flashcard } from "@/components/flashcards/Flashcard";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

import { use } from "react";

export default function StudySessionPage({ params }: { params: Promise<{ deckId: string }> }) {
    const { deckId } = use(params);
    const { data: session } = useSession();
    const [cards, setCards] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [sessionStats, setSessionStats] = useState({
        easy: 0,
        medium: 0,
        hard: 0,
        startTime: Date.now()
    });

    // Mock cards for the demo
    useEffect(() => {
        const mockCards = [
            {
                id: "c1",
                question: "What is the primary mechanism of action of Warfarin?",
                answer: "Vitamin K Antagonist",
                explanation: "Warfarin inhibits the enzyme vitamin K epoxide reductase, which is needed to recycle vitamin K. This prevents the activation of clotting factors II, VII, IX, and X.",
                subject: "Pharmacology",
                difficulty: "Medium"
            },
            {
                id: "c2",
                question: "Identify the anatomical structure passing through the optic canal.",
                answer: "Optic Nerve (CN II) & Ophthalmic Artery",
                explanation: "The optic canal is located in the lesser wing of the sphenoid bone. Injury to this area can lead to vision loss and vascular complications.",
                subject: "Anatomy",
                difficulty: "Hard"
            },
            {
                id: "c3",
                question: "Which heart valve is most commonly affected in Acute Rheumatic Fever?",
                answer: "Mitral Valve",
                explanation: "Mitral regurgitation is the most common finding in acute phases, potentially leading to mitral stenosis in chronic rheumatic heart disease.",
                subject: "Pathology",
                difficulty: "Easy"
            }
        ];
        setCards(mockCards);
    }, []);

    const handleReview = async (rating: 'easy' | 'medium' | 'hard') => {
        const currentCard = cards[currentIndex];
        
        setSessionStats(prev => ({
            ...prev,
            [rating]: prev[rating] + 1
        }));

        // Persist progress to DB
        try {
            await fetch("/api/flashcards/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ flashcardId: currentCard.id, rating })
            });
        } catch (error) {
            console.error("Failed to save progress");
        }

        if (currentIndex < cards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    if (isFinished) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-card border border-border w-full max-w-2xl rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-teal to-primary" />
                    
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Trophy className="w-12 h-12 text-primary" />
                    </div>

                    <h2 className="text-4xl font-black mb-4 tracking-tighter text-foreground">Session Complete!</h2>
                    <p className="text-muted-foreground text-lg mb-10">You've mastered {cards.length} new medical concepts today.</p>

                    <div className="grid grid-cols-3 gap-4 mb-12">
                        <ResultStat label="Easy" value={sessionStats.easy} color="text-teal" />
                        <ResultStat label="Good" value={sessionStats.medium} color="text-blue-500" />
                        <ResultStat label="Hard" value={sessionStats.hard} color="text-red-500" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={() => window.location.reload()}
                            className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                            <RefreshCcw className="w-5 h-5" /> Review Again
                        </button>
                        <Link 
                            href="/flashcards"
                            className="flex-1 bg-muted text-foreground py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-muted/80 transition-all"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex) / cards.length) * 100;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Session Header */}
            <header className="p-6 md:p-8 flex items-center justify-between">
                <Link href="/flashcards" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="p-2 bg-muted rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm hidden sm:block">Exit Study Session</span>
                </Link>

                <div className="flex-1 max-w-md mx-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Progress</span>
                        <span className="text-xs font-bold text-primary">{currentIndex + 1} / {cards.length}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-primary to-teal"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-3 bg-muted rounded-xl hover:text-primary transition-all">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Main Study Area */}
            <main className="flex-1 flex items-center justify-center p-6 pb-20">
                <AnimatePresence mode="wait">
                    {currentCard && (
                        <motion.div
                            key={currentCard.id}
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 1.1, x: -20 }}
                            className="w-full"
                        >
                            <Flashcard card={currentCard} onReview={handleReview} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Floating Quick Stats */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 px-8 py-4 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-50">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Clock className="w-4 h-4 text-blue-500" /> {Math.floor((Date.now() - sessionStats.startTime) / 60000)}m elapsed
                </div>
                <div className="w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <Zap className="w-4 h-4 text-primary" /> {currentIndex} streak
                </div>
                <div className="w-[1px] h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-teal" /> 92% accuracy
                </div>
            </div>
        </div>
    );
}

function ResultStat({ label, value, color }: any) {
    return (
        <div className="bg-muted p-6 rounded-3xl">
            <p className={cn("text-3xl font-black mb-1", color)}>{value}</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
        </div>
    );
}
