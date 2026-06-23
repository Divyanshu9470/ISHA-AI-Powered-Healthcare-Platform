"use client";

import { BookOpen, ArrowUpRight, Search, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const articles = [
    {
        title: "How to Read a CBC (Complete Blood Count) Report",
        desc: "Learn to interpret parameters like MCV, MCH, and RDW to identify underlying anemias or microcytic patterns.",
        category: "Laboratory",
        slug: "how-to-read-cbc-report"
    },
    {
        title: "High Hemoglobin Levels: Meaning, Causes & Clinical Indications",
        desc: "An in-depth review of erythrocytosis, dehydration, chronic hypoxia, and when to refer to hematology.",
        category: "Hematology",
        slug: "high-hemoglobin-meaning"
    },
    {
        title: "Liver Function Tests (LFTs): Interpreting AST and ALT Ratios",
        desc: "Understand what a 2:1 AST:ALT ratio signifies and when to suspect alcoholic injury versus fatty liver disease.",
        category: "Hepatology",
        slug: "liver-function-test-guide"
    },
    {
        title: "Understanding ECG Basics: A Quick Guide for Clinicians",
        desc: "Master the 12-lead baseline, identifying ST elevations, reciprocal changes, and axis deviations in 5 minutes.",
        category: "Cardiology",
        slug: "understanding-ecg-basics"
    },
    {
        title: "Deciphering Blood Sugar Trends & Glucose Tolerance Tests",
        desc: "A clinical guide on mapping glycemic variation, HbA1c correlations, and managing early pre-diabetes.",
        category: "Endocrinology",
        slug: "blood-sugar-trends-explained"
    }
];

export function SEOArticles() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section ref={ref} id="medical-resources" className="py-24 bg-[#050505] text-white relative">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full font-semibold uppercase tracking-wider mb-4">
                            <BookOpen className="w-3.5 h-3.5" /> Medical Resources
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                            Clinician Education & Guides
                        </h2>
                        <p className="text-sm text-slate-500 mt-2 font-light max-w-xl">
                            Read clinical guide summaries curated by our medical board to assist with rapid diagnostic recall.
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search clinical guides..."
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 pl-11 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((art, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-extrabold uppercase bg-white/10 text-slate-300 px-2 py-0.5 rounded-md tracking-wider">
                                        {art.category}
                                    </span>
                                    <FileText className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                                    {art.title}
                                </h3>
                                <p className="text-xs text-slate-400 font-light leading-relaxed mb-6 line-clamp-3">
                                    {art.desc}
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs font-semibold text-slate-500 group-hover:text-white transition-colors">
                                <span>Read Full Guide</span>
                                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
