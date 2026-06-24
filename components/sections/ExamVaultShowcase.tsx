"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, GraduationCap, Calendar, FileText, ArrowRight, Download, Play, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const PAST_PAPERS = [
    { id: "neet-pg-2023", exam: "NEET PG", year: 2023, subject: "General Surgery", questions: 200, downloads: "8.4k", rating: 4.9 },
    { id: "fmge-2024", exam: "FMGE", year: 2024, subject: "Pharmacology & Pathology", questions: 300, downloads: "12.2k", rating: 4.8 },
    { id: "usmle-s1-2022", exam: "USMLE Step 1", year: 2022, subject: "Pathology Core", questions: 280, downloads: "15.1k", rating: 4.9 },
    { id: "plab1-2023", exam: "PLAB 1", year: 2023, subject: "Clinical Medicine", questions: 180, downloads: "5.6k", rating: 4.7 },
    { id: "amc-mcq-2023", exam: "AMC MCQ", year: 2023, subject: "General Medicine & OBG", questions: 150, downloads: "3.2k", rating: 4.8 }
];

export function ExamVaultShowcase() {
    const [selectedExam, setSelectedExam] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const examsList = ["All", "NEET PG", "FMGE", "USMLE Step 1", "PLAB 1", "AMC MCQ"];

    const filteredPapers = PAST_PAPERS.filter(paper => {
        const matchesExam = selectedExam === "All" || paper.exam === selectedExam;
        const matchesSearch = paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) || paper.exam.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesExam && matchesSearch;
    });

    return (
        <section className="py-24 bg-slate-900/10 border-b border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-semibold uppercase tracking-wider mb-4">
                        <Trophy className="w-3 h-3 text-emerald-400" /> Free Exam Repository
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        The Exam Vault
                    </h2>
                    <p className="text-slate-400 font-light max-w-2xl mx-auto text-base">
                        Stop paying thousands of dollars for past exam resources. Access verified past papers, interactive simulation mock tests, and detailed concept explanations for free.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl mb-12">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Exam Tags */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-3 md:pb-0 no-scrollbar">
                            {examsList.map((exam) => (
                                <button
                                    key={exam}
                                    onClick={() => setSelectedExam(exam)}
                                    className={`px-4 py-2 text-xs font-semibold rounded-full border whitespace-nowrap transition-all duration-300 ${
                                        selectedExam === exam
                                            ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                            : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                                    }`}
                                >
                                    {exam}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search by subject..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Papers List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPapers.map((paper) => (
                        <div
                            key={paper.id}
                            className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 hover:border-emerald-500/20 transition-all duration-300 group flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white">
                                        {paper.exam}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-light">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>Year {paper.year}</span>
                                    </div>
                                </div>

                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                    {paper.subject} Past Exam
                                </h4>

                                <div className="grid grid-cols-2 gap-4 py-4 my-2 border-y border-white/5 text-xs text-slate-400">
                                    <div className="flex items-center gap-1.5">
                                        <FileText className="w-4 h-4 text-slate-500" />
                                        <span>{paper.questions} Questions</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 justify-end">
                                        <Download className="w-4 h-4 text-slate-500" />
                                        <span>{paper.downloads} Solved</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Link href="/quiz" className="flex-1">
                                    <Button
                                        size="sm"
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-5 text-xs font-bold shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-1.5"
                                    >
                                        <Play className="w-3.5 h-3.5 fill-current" /> Practice Mode
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => alert("Verified past paper answers PDF has started downloading!")}
                                    className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl py-5 px-4"
                                >
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {filteredPapers.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500 text-sm font-light">
                            No past papers found matching your criteria. More past papers are uploaded daily!
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
