"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Loader2, FileText, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface AIGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AIGeneratorModal({ isOpen, onClose }: AIGeneratorModalProps) {
    const router = useRouter();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/flashcards/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, title, subject: "General Medicine" }),
            });
            const data = await res.json();
            if (data.success) {
                setIsSuccess(true);
                setTimeout(() => {
                    router.push(`/flashcards/${data.deckId}`);
                    onClose();
                }, 2000);
            }
        } catch (error) {
            alert("Failed to generate. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
            />

            <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-card border border-border w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
            >
                <button onClick={onClose} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground">
                    <X className="w-6 h-6" />
                </button>

                <div className="p-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-primary/20 p-2 rounded-xl">
                            <Zap className="w-6 h-6 text-primary animate-pulse" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">AI Deck Generator</h2>
                    </div>

                    {!isSuccess ? (
                        <>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Deck Title</label>
                                    <input 
                                        type="text"
                                        placeholder="e.g., Renal Physiology Chapter 4"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-muted border border-border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Notes / Text Content</label>
                                    <textarea 
                                        placeholder="Paste your medical notes here... (Minimum 100 characters for best results)"
                                        rows={8}
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="w-full bg-muted border border-border rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-primary transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleGenerate}
                                disabled={isLoading || !text}
                                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl mt-8 disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" /> Analyzing Medical Data...
                                    </>
                                ) : (
                                    <>
                                        Generate Premium Flashcards <Zap className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                            </div>
                            <h3 className="text-3xl font-black mb-2">Deck Ready!</h3>
                            <p className="text-muted-foreground">Redirecting you to your new study session...</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
