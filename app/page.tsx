"use client";

import Link from "next/link";
import { Stethoscope, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ChooserPage() {
    return (
        <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center font-sans relative overflow-hidden px-4">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-4xl w-full text-center relative z-10">
                {/* Logo & Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center mb-12"
                >
                    <div className="bg-blue-500/10 p-3 rounded-2xl border border-blue-500/20 mb-4">
                        <Stethoscope className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Isha<span className="text-blue-400">Med</span>
                    </h1>
                    <p className="text-slate-400 mt-3 text-lg font-light">
                        Select your platform to get started
                    </p>
                </motion.div>

                {/* Chooser Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* For Clinicians */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-blue-500/30 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 group shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                <Stethoscope className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">For Clinicians</h2>
                            <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">
                                AI Clinical Copilot designed for medical practices. Features advanced patient report OCR, voice SOAP dictation, probabilistic differentials, and secure EHR integrations.
                            </p>
                        </div>
                        <Link
                            href="/clinical-copilot"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 hover:scale-[1.01]"
                        >
                            Enter Clinical Suite <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* For Medical Students */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 group shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-emerald-500/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">For Medical Students</h2>
                            <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">
                                High-yield medical board prep platform. Access subject-wise courses, interactive 3D Triage Simulator, Arena mode, spaced repetition flashcards, and Q&A forum.
                            </p>
                        </div>
                        <Link
                            href="/students"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:scale-[1.01]"
                        >
                            Enter Student Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
