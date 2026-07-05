"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Plus, Search, Filter, Zap, TrendingUp, 
    Calendar, Trophy, Brain, Flame, Target
} from "lucide-react";
import { FlashcardDeckCard } from "@/components/flashcards/FlashcardDeckCard";
import { AIGeneratorModal } from "@/components/modals/AIGeneratorModal";
import { cn } from "@/lib/utils";

export default function FlashcardsDashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
    const [decks, setDecks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cardStats, setCardStats] = useState({ streak: 0, retention: 0, rank: "N/A" });

    useEffect(() => {
        fetch("/api/flashcards/decks")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setDecks(data);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        fetch("/api/flashcards/stats")
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setCardStats(data);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const categories = ["All", "Anatomy", "Physiology", "Pathology", "Pharmacology", "Biochemistry"];

    // Fallback Mock Data if no decks exist yet
    const displayDecks = decks.length > 0 ? decks : [
        {
            id: "deck-1",
            title: "Cardiovascular Pathology",
            description: "High-yield flashcards covering valvular diseases, cardiomyopathies, and congenital heart defects.",
            subject: "Pathology",
            imageUrl: "/cardiovascular-pathology.png",
            _count: { flashcards: 124 }
        },
        {
            id: "deck-2",
            title: "Upper Limb Anatomy",
            description: "Detailed muscular insertions, nerve supplies, and clinical correlations of the brachial plexus.",
            subject: "Anatomy",
            imageUrl: "/upper-limb-anatomy.png",
            _count: { flashcards: 86 }
        },
        {
            id: "deck-3",
            title: "Antibiotics Masterclass",
            description: "Mechanism of action, spectrum of activity, and key side effects for USMLE/NEET-PG.",
            subject: "Pharmacology",
            imageUrl: "/antibiotics-masterclass.png",
            _count: { flashcards: 210 }
        }
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Stats Section */}
            <div className="bg-slate-950 text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1d7e9f44,transparent)]" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                        <div>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 mb-4"
                            >
                                <div className="bg-primary/20 p-2 rounded-xl border border-primary/20">
                                    <Brain className="w-6 h-6 text-primary" />
                                </div>
                                <span className="text-primary font-bold tracking-widest uppercase text-sm">Spaced Repetition System</span>
                            </motion.div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-6xl font-black tracking-tighter"
                            >
                                Master Your <span className="text-gradient-primary">Knowledge.</span>
                            </motion.h1>
                        </div>
                        
                        <div className="flex gap-4">
                            <StatCard icon={Flame} label="Daily Streak" value={`${cardStats.streak} Days`} color="text-orange-500" />
                            <StatCard icon={Target} label="Retention" value={`${cardStats.retention}%`} color="text-teal" />
                            <StatCard icon={Trophy} label="Rank" value={cardStats.rank} color="text-yellow-500" />
                        </div>
                    </div>

                    {/* Search & Filter Bar */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row gap-4 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl"
                    >
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                                type="text" 
                                placeholder="Search medical decks, topics, or mnemonics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 pl-14 py-4 text-white placeholder:text-slate-600"
                            />
                        </div>
                        <div className="flex items-center gap-2 px-2 overflow-x-auto no-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap",
                                        selectedCategory === cat 
                                            ? "bg-primary text-white shadow-lg shadow-primary/20" 
                                            : "bg-white/5 text-slate-400 hover:bg-white/10"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => setIsGeneratorOpen(true)}
                            className="bg-white text-black px-8 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-slate-200 transition-all"
                        >
                            <Plus className="w-5 h-5" /> Create Deck
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Decks Grid */}
            <div className="container mx-auto px-6 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayDecks.map((deck, idx) => (
                        <motion.div
                            key={deck.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                        >
                            <FlashcardDeckCard 
                                deck={deck} 
                                progress={deck.progress || { mastered: 0, total: deck._count?.flashcards || 1 }}
                            />
                        </motion.div>
                    ))}

                    {/* AI Generator Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        onClick={() => setIsGeneratorOpen(true)}
                        className="group bg-gradient-to-br from-primary/10 to-teal/10 border-2 border-dashed border-primary/30 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center hover:border-primary transition-all cursor-pointer shadow-xl shadow-primary/5"
                    >
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Zap className="w-10 h-10 text-primary animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">AI Deck Generator</h3>
                        <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-[240px]">
                            Upload your clinical notes or medical PDFs and let our AI create high-yield cards in seconds.
                        </p>
                        <button className="bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
                            Start Generating
                        </button>
                    </motion.div>
                </div>
            </div>

            <AIGeneratorModal isOpen={isGeneratorOpen} onClose={() => setIsGeneratorOpen(false)} />
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color }: any) {
    return (
        <div className="bg-white/5 border border-white/5 backdrop-blur-md p-4 rounded-3xl flex items-center gap-4">
            <div className={cn("p-2 rounded-xl bg-white/5", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
                <p className="text-lg font-black">{value}</p>
            </div>
        </div>
    );
}
