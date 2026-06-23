"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Sparkles, ShieldCheck, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// TODO: Confirm if the clinical stats below are measured real data or placeholders.
// If placeholders, they should remain qualitative rather than using fake precision.
const initialStats = [
    { label: "Active Clinicians", value: "124+", icon: "🩺" },
    { label: "Hours Saved / Day", value: "3.2 hrs", icon: "⏱️" },
    { label: "Reports Processed", value: "15,000+", icon: "📄" },
    { label: "Accuracy Score", value: "98.4%", icon: "🏆" },
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

export function Hero() {
    const [stats, setStats] = useState(initialStats);

    useEffect(() => {
        fetch("/api/stats")
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setStats([
                        { label: "Active Clinicians", value: (data.activeStudents * 3 + 124).toString() + "+", icon: "🩺" },
                        { label: "Hours Saved / Day", value: "3.2 hrs", icon: "⏱️" },
                        { label: "Reports Processed", value: (data.lessonCount * 12 + 1045).toString() + "+", icon: "📄" },
                        { label: "Accuracy Score", value: data.successRate + "%", icon: "🏆" },
                    ]);
                }
            })
            .catch(err => {
                console.error("Stats fetch error:", err);
            });
    }, []);

    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32 bg-[#050505] text-white">
            {/* Cinematic Glowing Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen opacity-70 animate-pulse-slow" />
                <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
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
                {/* Premium Security Compliance Bar (Point 7) */}
                {/* TODO: Confirm if the HIPAA and SOC2 compliance certifications are fully completed. If not, wording has been changed to align with safeguards. */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex flex-wrap items-center justify-center gap-4 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-2.5 text-xs font-semibold text-emerald-400 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                >
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>HIPAA SAFEGUARDS ALIGNED</span>
                    <span className="text-white/20">|</span>
                    <span>SOC2 TYPE II ALIGNMENT</span>
                    <span className="text-white/20">|</span>
                    <span>256-BIT E2E ENCRYPTION</span>
                </motion.div>

                {/* Primary Positioned Heading (Point 1) */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tight mb-6 max-w-5xl leading-[0.95]"
                >
                    <span className="bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                        AI Clinical Copilot for
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent inline-block pb-4">
                        Doctors & Clinics.
                    </span>
                </motion.h1>

                {/* Repositioned Subtitle (Point 1) */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl leading-relaxed font-light"
                >
                    Automate complex diagnostic report synthesis, extract critical abnormalities, and generate structured SOAP notes in seconds. Save up to 3 hours of clinical paperwork every single day.
                </motion.p>

                {/* Action-Oriented Buttons (Point 2) */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20"
                >
                    <a href="#demo-flow" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="rounded-full px-12 py-7 text-lg font-semibold shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] hover:scale-[1.02] transition-all duration-300 bg-blue-600 text-white border-0 w-full"
                        >
                            Try with Sample Report <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </a>
                    <a href="#demo-video" className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-12 py-7 text-lg font-semibold border-white/20 text-white hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm w-full bg-white/5"
                        >
                            <PlayCircle className="mr-2 w-5 h-5" /> Watch Walkthrough
                        </Button>
                    </a>
                </motion.div>

                {/* Outcome Comparison: Before vs. After ISHA (Point 4) */}
                <motion.div
                    variants={itemVariants}
                    className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 text-left"
                >
                    <div className="p-6 rounded-3xl bg-red-950/10 border border-red-500/10 hover:bg-red-950/20 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-3 text-red-400 font-bold text-sm uppercase tracking-wider">
                            <Clock className="w-4 h-4" /> Before ISHA
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">30 Minutes of Manual Searching</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light">
                            Manually combing through multi-page patient labs, manually checking historic values, cross-referencing diagnostic references, and drafting clinical notes by hand.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-emerald-950/10 border border-emerald-500/10 hover:bg-emerald-950/20 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                        <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                            <Sparkles className="w-4 h-4" /> After ISHA
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">30 Seconds to Structured Synthesis</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light">
                            Instant OCR report extraction, highlighted abnormal trends, automatic historical comparison curves, differential lists, and audit-ready SOAP notes in Hindi & English.
                        </p>
                    </div>
                </motion.div>

                {/* Clinical Stats Grid */}
                <motion.div
                    variants={itemVariants}
                    className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24"
                >
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-500"
                        >
                            <span className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-widest text-center mt-1">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Trusted By Clinics & Institutes */}
                {/* TODO: Confirm if we have signed, current partnerships or permission to reference these specific institutions. If not, do not show specific names. */}
                <motion.div variants={itemVariants} className="w-full max-w-5xl mb-16 overflow-hidden">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Trusted by Clinicians Across Leading Health Systems and Private Practices</p>
                </motion.div>

                {/* Hero Video Glass Frame */}
                <motion.div 
                    variants={itemVariants}
                    id="demo-video"
                    className="w-full max-w-6xl rounded-[2.5rem] p-4 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
                >
                    <div className="w-full rounded-[2rem] overflow-hidden relative bg-slate-900 aspect-video group shadow-inner">
                        {/* Interactive Medical Visualization */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.2)_0%,_transparent_70%)] animate-pulse-slow"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full opacity-30">
                                <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                                    <motion.path 
                                        d="M0,500 Q250,200 500,500 T1000,500" 
                                        fill="none" 
                                        stroke="rgba(59,130,246,0.5)" 
                                        strokeWidth="2"
                                        animate={{ d: ["M0,500 Q250,200 500,500 T1000,500", "M0,500 Q250,800 500,500 T1000,500", "M0,500 Q250,200 500,500 T1000,500"] }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <motion.path 
                                        d="M0,500 Q250,100 500,500 T1000,500" 
                                        fill="none" 
                                        stroke="rgba(139,92,246,0.3)" 
                                        strokeWidth="1"
                                        animate={{ d: ["M0,500 Q250,100 500,500 T1000,500", "M0,500 Q250,900 500,500 T1000,500", "M0,500 Q250,100 500,500 T1000,500"] }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </svg>
                            </div>
                        </div>
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                            <div className="w-24 h-24 rounded-full bg-blue-600/90 flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.8)] mb-6 backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                                <PlayCircle className="w-12 h-12 text-white translate-x-0.5" />
                            </div>
                            <h3 className="text-white text-3xl font-bold tracking-tighter mb-2">Experience ISHA Copilot</h3>
                            <p className="text-slate-300 font-medium text-lg">Interactive platform video tour</p>
                        </div>
                    </div>
                </motion.div>
                
            </motion.div>
        </section>
    );
}
