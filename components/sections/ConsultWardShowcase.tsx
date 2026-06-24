"use client";

import { MessageSquare, CheckCircle2, Award, User, MessageCircle, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LATEST_THREADS = [
    {
        id: "case-01",
        title: "Differentiating Mobitz Type I vs Type II ECG block under high vagal tone",
        tag: "Cardiology",
        author: "Ayush Sharma (Final Year MBBS)",
        answersCount: 3,
        likes: 42,
        verifiedReply: {
            author: "Dr. Sandeep Nair, DM (Cardiology)",
            badge: "Licensed Cardiologist",
            roleColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            summary: "Look closely at the PR interval duration. Mobitz I shows progressive PR prolongation prior to the dropped QRS. Mobitz II has fixed PR intervals. Vagal maneuvers typically worsen Mobitz I but improve Mobitz II."
        }
    },
    {
        id: "case-02",
        title: "FMGE High-Yield: How to remember lysosomal storage disease enzyme deficiencies?",
        tag: "Biochemistry",
        author: "Meera Patel (MBBS Aspirant)",
        answersCount: 5,
        likes: 56,
        verifiedReply: {
            author: "Dr. Ashwani Kumar (Senior Mentor)",
            badge: "USMLE 272 • FMGE Rank 12",
            roleColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
            summary: "Use the classic mnemonics: 'No Tay-Sachs cherry (Tay-Sachs = Cherry red spot, NO hepatosplenomegaly, Hexosaminidase A deficiency)'. Let's compile the rest in this grid..."
        }
    }
];

export function ConsultWardShowcase() {
    return (
        <section className="py-24 bg-slate-950 text-white border-b border-white/5 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full font-semibold uppercase tracking-wider mb-4">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-400" /> Active Peer & Mentor Network
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Consult the Ward
                    </h2>
                    <p className="text-slate-400 font-light max-w-2xl mx-auto text-base">
                        Stuck on a complex board question or clinical case? Post it to the ward. Get verified, step-by-step guidance from senior ranks and licensed medical specialists.
                    </p>
                </div>

                {/* Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Active Threads */}
                    <div className="lg:col-span-8 space-y-6">
                        {LATEST_THREADS.map((thread) => (
                            <div
                                key={thread.id}
                                className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 hover:border-blue-500/20 transition-all duration-300"
                            >
                                {/* Header */}
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-2.5">
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-slate-300">
                                            {thread.tag}
                                        </span>
                                        <span className="text-xs text-slate-500 font-light">Posted by {thread.author}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-400 font-light">
                                        <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-slate-500" /> {thread.answersCount} replies</span>
                                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-500/70" /> {thread.likes} likes</span>
                                    </div>
                                </div>

                                <Link href="/forum">
                                    <h4 className="text-lg font-bold text-white mb-5 hover:text-blue-400 transition-colors cursor-pointer">
                                        {thread.title}
                                    </h4>
                                </Link>

                                {/* Verified Response */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-bold text-white">{thread.verifiedReply.author}</h5>
                                                <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full border mt-0.5 ${thread.verifiedReply.roleColor}`}>
                                                    {thread.verifiedReply.badge}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>Verified Guidance</span>
                                        </div>
                                    </div>
                                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light">
                                        "{thread.verifiedReply.summary}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Info Box */}
                    <div className="lg:col-span-4 bg-gradient-to-br from-blue-950/20 to-slate-950 border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
                        <Award className="w-12 h-12 text-blue-400 mb-6" />
                        <h4 className="text-xl font-bold text-white mb-3">Become a Mentor</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                            Are you a resident doctor or a top-scoring senior student? Apply to join our advisory & mentorship panel. Share clinical pearls, verify answers, and gain recognition.
                        </p>
                        <ul className="space-y-3 mb-8 text-xs text-slate-400 font-light">
                            <li className="flex gap-2.5 items-start">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Get a verified green or blue badge.</span>
                            </li>
                            <li className="flex gap-2.5 items-start">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Earn rewards & platform revenue shares.</span>
                            </li>
                            <li className="flex gap-2.5 items-start">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Build your professional medical profile.</span>
                            </li>
                        </ul>
                        <Link href="/forum">
                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-2xl py-6 font-semibold shadow-lg shadow-blue-500/10">
                                Apply for Verification
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
