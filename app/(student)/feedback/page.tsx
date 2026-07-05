"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Star, MessageSquare, AlertCircle, Sparkles, HelpCircle, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

type FeedbackType = "SUGGESTION" | "BUG" | "FEATURE_REQUEST" | "OTHER";
type DifficultyType = "EASY" | "NORMAL" | "DIFFICULT" | "NONE";

export default function FeedbackPage() {
    const { data: session } = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState<FeedbackType>("SUGGESTION");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [difficulty, setDifficulty] = useState<DifficultyType>("NONE");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Populate user info when session loads
    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setEmail(session.user.email || "");
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!message.trim()) {
            setError("Please share your message or suggestion.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name || "Anonymous",
                    email: email || "anonymous@example.com",
                    type,
                    message,
                    rating,
                    difficulty,
                }),
            });

            if (res.ok) {
                setSuccess(true);
                setMessage("");
                setDifficulty("NONE");
                setRating(5);
            } else {
                const data = await res.json();
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error("Feedback submit error:", err);
            setError("Network error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const categories: { value: FeedbackType; label: string; icon: any; desc: string }[] = [
        {
            value: "SUGGESTION",
            label: "General Suggestion",
            icon: Sparkles,
            desc: "Ideas on how we can improve the design or content",
        },
        {
            value: "BUG",
            label: "Report a Difficulty / Bug",
            icon: AlertCircle,
            desc: "Tell us about a broken feature, lag, or visual glitch",
        },
        {
            value: "FEATURE_REQUEST",
            label: "Request a Feature",
            icon: MessageSquare,
            desc: "Features or tools you'd love to see on IshaMed",
        },
        {
            value: "OTHER",
            label: "Other Feedback",
            icon: HelpCircle,
            desc: "Any other comments, questions, or general thoughts",
        },
    ];

    if (success) {
        return (
            <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-card/40 backdrop-blur-xl border border-border/80 p-8 rounded-3xl text-center shadow-2xl animate-in fade-in zoom-in duration-500">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 scale-110 animate-bounce">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight mb-3 text-foreground">
                        Thank You!
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                        Your feedback has been successfully recorded. The IshaMed team reviews every suggestion carefully to build the best experience for medical students.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => setSuccess(false)}
                            className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300 transform active:scale-[0.98]"
                        >
                            Submit Another Response
                        </button>
                        <Link
                            href="/students"
                            className="block w-full py-3.5 px-4 rounded-xl border border-border/80 hover:bg-muted/50 text-foreground font-semibold transition-all duration-300"
                        >
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Back Link */}
                <div className="mb-8">
                    <Link
                        href="/students"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Student Space
                    </Link>
                </div>

                {/* Hero Headers */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        SCU College Launch Feedback
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
                        Share Your <span className="text-primary">Suggestions</span>
                    </h1>
                    <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                        We want to hear about your experience! Help us improve IshaMed by sharing your feature requests, bugs, or difficulties.
                    </p>
                </div>

                {/* Feedback Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-card/45 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
                >
                    {error && (
                        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium flex items-center gap-2.5">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Feedback Category Selection */}
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-3">
                            What kind of feedback do you want to share?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {categories.map((cat) => {
                                const Icon = cat.icon;
                                const isSelected = type === cat.value;
                                return (
                                    <button
                                        key={cat.value}
                                        type="button"
                                        onClick={() => setType(cat.value)}
                                        className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-300 ${
                                            isSelected
                                                ? "border-primary bg-primary/5 shadow-md shadow-primary/5 ring-1 ring-primary"
                                                : "border-border/60 hover:border-border hover:bg-muted/20"
                                        }`}
                                    >
                                        <div className={`p-2 rounded-xl mb-3 ${isSelected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-sm text-foreground mb-1">
                                            {cat.label}
                                        </span>
                                        <span className="text-xs text-muted-foreground leading-relaxed">
                                            {cat.desc}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Star Rating Section */}
                    <div className="border-t border-border/40 pt-6">
                        <label className="block text-sm font-bold text-foreground mb-1">
                            Rate your overall experience on IshaMed
                        </label>
                        <span className="text-xs text-muted-foreground block mb-4">
                            How satisfied are you with the navigation, features, and content?
                        </span>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(null)}
                                    className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none"
                                >
                                    <Star
                                        className={`w-9 h-9 transition-colors duration-200 ${
                                            star <= (hoverRating ?? rating)
                                                ? "fill-amber-400 text-amber-400"
                                                : "text-muted border-none"
                                        }`}
                                    />
                                </button>
                            ))}
                            <span className="ml-3 text-sm font-bold text-foreground">
                                {rating === 5 && "⭐ Excellent"}
                                {rating === 4 && "👍 Good"}
                                {rating === 3 && "😐 Average"}
                                {rating === 2 && "👎 Disliked"}
                                {rating === 1 && "⚠️ Poor"}
                            </span>
                        </div>
                    </div>

                    {/* Platform Difficulty Section */}
                    <div className="border-t border-border/40 pt-6">
                        <label className="block text-sm font-bold text-foreground mb-1">
                            Did you experience any navigation or usage difficulties?
                        </label>
                        <span className="text-xs text-muted-foreground block mb-4">
                            Help us identify if the platform feels smooth or challenging to use.
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                            {(["EASY", "NORMAL", "DIFFICULT"] as DifficultyType[]).map((dif) => (
                                <button
                                    key={dif}
                                    type="button"
                                    onClick={() => setDifficulty(dif)}
                                    className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all duration-300 ${
                                        difficulty === dif
                                            ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                                            : "border-border/60 hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {dif === "EASY" && "🟢 Smooth / Easy"}
                                    {dif === "NORMAL" && "🟡 Fair / Normal"}
                                    {dif === "DIFFICULT" && "🔴 Challenging"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message Area */}
                    <div className="border-t border-border/40 pt-6 space-y-2">
                        <label htmlFor="message" className="block text-sm font-bold text-foreground">
                            Suggestions, improvements, or feature requests
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="What features do you want to see? What should we improve? Tell us about any glitches..."
                            rows={5}
                            required
                            className="w-full bg-background border border-border/70 focus:border-primary/80 focus:ring-1 focus:ring-primary rounded-2xl p-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all resize-none shadow-inner"
                        />
                    </div>

                    {/* Contact Info (Pre-filled if logged in) */}
                    <div className="border-t border-border/40 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Your Name (Optional)
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Anonymous"
                                className="w-full bg-background border border-border/70 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Email Address (Optional)
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="anonymous@example.com"
                                className="w-full bg-background border border-border/70 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 transform active:scale-[0.99]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Submitting Suggestions...
                                </>
                            ) : (
                                "Submit Feedback & Suggestions 🚀"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
