import { NavbarStudent } from "@/components/layout/NavbarStudent";
import { FooterStudent } from "@/components/layout/FooterStudent";
import { HeroStudent } from "@/components/sections/HeroStudent";
import { InteractiveDemo } from "@/components/sections/InteractiveDemo";
import { OmniNotesShowcase } from "@/components/sections/OmniNotesShowcase";
import { ExamVaultShowcase } from "@/components/sections/ExamVaultShowcase";
import { ConsultWardShowcase } from "@/components/sections/ConsultWardShowcase";
import { BrainBreaksShowcase } from "@/components/sections/BrainBreaksShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { SEOArticles } from "@/components/sections/SEOArticles";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "IshaMed — AI-Powered Medical Education Platform for Students",
    description: "Prepare for USMLE, PLAB, NEET PG, FMGE, and INICET with IshaMed. Access interactive clinical triage simulators, 3D anatomy dissection labs, spaced-repetition flashcards, and high-yield board prep courses.",
    keywords: [
        "AI medical platform for students",
        "USMLE board prep",
        "NEET PG preparation",
        "FMGE online coaching",
        "triage simulator",
        "spaced repetition flashcards",
        "3D anatomy viewer",
        "medical learning dashboard"
    ],
    openGraph: {
        title: "IshaMed — AI-Powered Medical Education Platform for Students",
        description: "Prepare for USMLE, PLAB, NEET PG, FMGE, and INICET with IshaMed. Access interactive clinical triage simulators, 3D anatomy dissection labs, spaced-repetition flashcards, and high-yield board prep courses.",
        type: "website",
    }
};

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-[#050505]">
            <NavbarStudent />
            
            <main className="flex-grow">
                {/* Hero section */}
                <HeroStudent />

                {/* Practical Knowledge: Interactive Sandbox Demo */}
                <div className="bg-slate-950 border-y border-white/5 py-12">
                    <div className="container mx-auto px-4 text-center mb-8">
                        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-semibold uppercase tracking-wider mb-2">
                            Active Diagnostics
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                            Practical Clinical Sandbox
                        </h2>
                        <p className="text-slate-400 font-light text-sm max-w-xl mx-auto mt-2">
                            Build real clinical reasoning by analyzing sample lab results. Watch the AI parse parameters, suggest differentials, and generate diagnostic notes instantly.
                        </p>
                    </div>
                    <InteractiveDemo />
                </div>

                {/* Pillar 1: Omni-Disciplinary Notes Showcase */}
                <OmniNotesShowcase />

                {/* Pillar 2: The Exam Vault */}
                <ExamVaultShowcase />

                {/* Pillar 3: Consult the Ward (Q&A Board) */}
                <ConsultWardShowcase />

                {/* Pillar 4: Brain Breaks Mini-games */}
                <BrainBreaksShowcase />

                {/* Testimonials */}
                <Testimonials />

                {/* SEO educational resources */}
                <SEOArticles />

                {/* Student-Centric CTA */}
                <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-emerald-950 to-slate-950 text-white">
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-white rounded-full" />
                        <div className="absolute bottom-[20%] right-[10%] w-3 h-3 bg-white rounded-full" />
                    </div>
                    <div className="container mx-auto px-4 md:px-6 text-center relative z-10 max-w-3xl">
                        <span className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-semibold uppercase tracking-widest mb-6">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Clear Your Boards
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Unlock Your Clinical Future Today
                        </h2>
                        <p className="text-base md:text-lg text-slate-300 mb-12 font-light leading-relaxed">
                            Join thousands of medical students worldwide who use IshaMed to master theoretical concepts, analyze practical cases, and practice past papers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button
                                    size="lg"
                                    className="rounded-full px-12 py-7 text-lg font-semibold bg-emerald-600 hover:bg-emerald-500 text-white border-0 transition-colors duration-300 shadow-lg shadow-emerald-950/20"
                                >
                                    Start Studying Free <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/courses">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full px-12 py-7 text-lg font-semibold border-white/20 text-white bg-white/5 hover:bg-white/10 transition-colors duration-300"
                                >
                                    Explore Courses
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <FooterStudent />
        </div>
    );
}
