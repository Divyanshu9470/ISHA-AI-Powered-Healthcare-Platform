"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Star, Trash2, Shield, Calendar, AlertTriangle, Sparkles, HelpCircle, AlertCircle } from "lucide-react";

interface Feedback {
    id: string;
    name: string | null;
    email: string | null;
    type: "SUGGESTION" | "BUG" | "FEATURE_REQUEST" | "OTHER";
    message: string;
    rating: number;
    difficulty: "EASY" | "NORMAL" | "DIFFICULT" | "NONE";
    createdAt: string;
}

export default function AdminFeedbacksPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"ALL" | "SUGGESTION" | "BUG" | "FEATURE_REQUEST" | "OTHER">("ALL");

    const fetchFeedbacks = () => {
        setLoading(true);
        fetch("/api/admin/feedbacks")
            .then((res) => res.json())
            .then((data) => {
                setFeedbacks(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchFeedbacks();
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this feedback?")) return;

        try {
            const res = await fetch(`/api/admin/feedbacks?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setFeedbacks((prev) => prev.filter((f) => f.id !== id));
            }
        } catch (error) {
            console.error("Delete feedback error:", error);
        }
    };

    const filtered =
        filter === "ALL" ? feedbacks : feedbacks.filter((f) => f.type === filter);

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-foreground font-serif">User Feedback</h1>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    const typeBadges = {
        SUGGESTION: { label: "Suggestion", style: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Sparkles },
        BUG: { label: "Glitch / Bug", style: "bg-red-500/10 text-red-600 border-red-500/20", icon: AlertCircle },
        FEATURE_REQUEST: { label: "Feature Request", style: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20", icon: MessageSquare },
        OTHER: { label: "Other", style: "bg-gray-500/10 text-gray-400 border-gray-500/20", icon: HelpCircle },
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground font-serif">User Feedback</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {feedbacks.length} submissions from SCU college launch
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {(["ALL", "SUGGESTION", "BUG", "FEATURE_REQUEST", "OTHER"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                filter === f
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-card border-border text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {f === "ALL" && "All"}
                            {f === "SUGGESTION" && "Suggestions"}
                            {f === "BUG" && "Glitch/Bugs"}
                            {f === "FEATURE_REQUEST" && "Features"}
                            {f === "OTHER" && "Others"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Feedback Grid */}
            <div className="space-y-4">
                {filtered.map((feedback) => {
                    const badge = typeBadges[feedback.type] || typeBadges.OTHER;
                    const IconComponent = badge.icon;

                    return (
                        <div
                            key={feedback.id}
                            className="bg-card border border-border/80 rounded-2xl p-6 hover:shadow-md transition-shadow relative group"
                        >
                            {/* Card Top / Metadata */}
                            <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                        {(feedback.name || "A")[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-foreground">
                                            {feedback.name || "Anonymous User"}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            {feedback.email || "anonymous@example.com"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                    {/* Type Badge */}
                                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${badge.style}`}>
                                        <IconComponent className="w-3.5 h-3.5" />
                                        {badge.label}
                                    </span>

                                    {/* Difficulty Badge */}
                                    {feedback.difficulty !== "NONE" && (
                                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                                            feedback.difficulty === "EASY"
                                                ? "bg-green-500/10 text-green-600 border-green-500/20"
                                                : feedback.difficulty === "NORMAL"
                                                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                                : "bg-red-500/10 text-red-600 border-red-500/20"
                                        }`}>
                                            {feedback.difficulty === "EASY" && "🟢 Smooth Experience"}
                                            {feedback.difficulty === "NORMAL" && "🟡 Fair Experience"}
                                            {feedback.difficulty === "DIFFICULT" && "🔴 Difficult / Laggy"}
                                        </span>
                                    )}

                                    {/* Star Rating */}
                                    <div className="flex items-center gap-0.5 ml-2 bg-amber-500/5 px-2 py-1 rounded-lg border border-amber-500/10">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${
                                                    i < feedback.rating
                                                        ? "fill-amber-400 text-amber-400"
                                                        : "text-muted-foreground/30"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Message content */}
                            <p className="text-sm text-foreground/90 leading-relaxed bg-muted/30 p-4 rounded-xl border border-border/40 whitespace-pre-wrap">
                                {feedback.message}
                            </p>

                            {/* Card Footer / Date / Delete */}
                            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Submitted on {new Date(feedback.createdAt).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>

                                <button
                                    onClick={() => handleDelete(feedback.id)}
                                    className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-red-500 hover:text-red-600 font-bold transition-all"
                                    title="Delete feedback"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}

                {filtered.length === 0 && (
                    <div className="text-center py-16 bg-card border border-border/80 rounded-2xl text-muted-foreground">
                        <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No feedback submissions found under this filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
