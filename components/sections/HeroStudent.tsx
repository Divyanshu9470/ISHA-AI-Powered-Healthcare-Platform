"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles, GraduationCap, Trophy, Users, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const initialStats = [
    { label: "Active Students", value: "25,000+", icon: <Users className="w-5 h-5 text-emerald-400" /> },
    { label: "Pass Rate", value: "98.2%", icon: <Trophy className="w-5 h-5 text-amber-400" /> },
    { label: "High-Yield Lectures", value: "1,200+", icon: <BookOpen className="w-5 h-5 text-blue-400" /> },
    { label: "Board Mentors", value: "50+", icon: <GraduationCap className="w-5 h-5 text-purple-400" /> },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" as const },
    },
};

export function HeroStudent() {
    const [stats, setStats] = useState(initialStats);

    useEffect(() => {
        fetch("/api/stats")
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setStats([
                        { label: "Active Students", value: data.activeStudents.toString(), icon: <Users className="w-5 h-5 text-emerald-400" /> },
                        { label: "Pass Rate", value: data.successRate.toString() + "%", icon: <Trophy className="w-5 h-5 text-amber-400" /> },
                        { label: "High-Yield Lectures", value: data.videoLectures.toString(), icon: <BookOpen className="w-5 h-5 text-blue-400" /> },
                        { label: "Board Mentors", value: data.expertMentors.toString(), icon: <GraduationCap className="w-5 h-5 text-purple-400" /> },
                    ]);
                }
            })
            .catch(err => {
                console.error("Stats fetch error:", err);
            });
    }, []);

    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32 bg-[#050505] text-white">
            {/* Background design */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full mix-blend-screen opacity-70 animate-pulse-slow" />
                <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-teal-600/10 blur-[120px] rounded-full mix-blend-screen opacity-50" />
            </div>

            {/* Micro-Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)"
                }}
            />

            <motion.div
                className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Board Prep Focus Tag */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-2 text-xs font-semibold text-emerald-400 mb-8 backdrop-blur-md shadow-sm"
                >
                    <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>USMLE • PLAB • NEET PG • FMGE • INICET Prep</span>
                </motion.div>

                {/* Primary Student Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-6 max-w-5xl leading-[0.95]"
                >
                    <span className="bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                        Master Board Exams with
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent inline-block pb-4">
                        Clinical Simulators.
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl leading-relaxed font-light"
                >
                    Accelerate your recall using interactive board-style courses, the 3D ER Triage Simulator, spaced repetition flashcards, and step-by-step diagnostic breakdown guides.
                </motion.p>

                {/* Action-Oriented Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20"
                >
                    <Link href="/courses" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="rounded-full px-12 py-7 text-lg font-semibold shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] hover:scale-[1.02] transition-all duration-300 bg-emerald-600 hover:bg-emerald-500 text-white border-0 w-full"
                        >
                            Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/simulator" className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-12 py-7 text-lg font-semibold border-white/20 text-white hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm w-full bg-white/5"
                        >
                            Enter Triage Simulator
                        </Button>
                    </Link>
                </motion.div>

                {/* Outcomes Grid */}
                <motion.div
                    variants={itemVariants}
                    className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 text-left"
                >
                    <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                        <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-emerald-400" /> Spaced Repetition (SRS)
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light">
                            Tackle memory decay curves with smart-scheduling flashcard decks mapped to all core medical topics. Generate personalized test reviews.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                        <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-amber-400" /> ER Triage Simulation
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light">
                            Manage critical patients in virtual ER wards. Analyze ECGs, order labs, and check diagnostic outcomes in high-pressure gamified modes.
                        </p>
                    </div>
                </motion.div>

                {/* Student Stats Grid */}
                {/* TODO: Verify if stats represent real student pass rates or placeholders */}
                <motion.div
                    variants={itemVariants}
                    className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
                >
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-500"
                        >
                            <div className="mb-2">
                                {stat.icon}
                            </div>
                            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-widest text-center mt-1">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>

            </motion.div>
        </section>
    );
}
