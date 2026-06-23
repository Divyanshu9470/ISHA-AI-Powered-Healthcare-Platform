"use client";

import { Shield, Lock, Database, FileCheck, Award, HeartHandshake, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

// TODO: Confirm that Dr. Sarah Chen, Dr. Raj Patel, and Dr. Elena Rostova are real, consenting individuals with accurate titles.
const advisors = [
    {
        name: "Dr. Sarah Chen, MD",
        role: "Chief Clinical Advisor",
        affiliation: "Former Chief of General Medicine at Mount Sinai",
        avatar: "SC"
    },
    {
        name: "Dr. Raj Patel, MD, FACP",
        role: "Cardiology & Diagnostics Lead",
        affiliation: "Associate Professor of Clinical Medicine",
        avatar: "RP"
    },
    {
        name: "Dr. Elena Rostova, PhD",
        role: "Medical AI Ethics & Safety",
        affiliation: "Member, Society for Medical Decision Making",
        avatar: "ER"
    }
];

// TODO: Confirm if the HIPAA compliance audit and SOC2 Type II audit are officially completed. 
// If still in progress, wording has been changed to represent 'alignment/safeguards'.
const compliances = [
    { name: "Built to align with HIPAA safeguards", desc: "Full administrative, physical, and technical safeguards.", icon: Shield },
    { name: "SOC2 Type II Alignment", desc: "Designed around independent audit guidelines for data security systems.", icon: CheckCircle },
    { name: "End-to-End Encryption", desc: "AES-256 encryption at rest and TLS 1.3 in transit.", icon: Lock },
    { name: "Data Isolation", desc: "Dedicated database instances per clinic to avoid co-mingling.", icon: Database }
];

export function SecurityTrust() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section ref={ref} id="trust-security" className="py-24 lg:py-32 bg-[#050505] text-white relative overflow-hidden">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                    backgroundSize: "60px 60px"
                }}
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* 1. Security Compliance (Point 7) */}
                <div className="text-center mb-20">
                    <span className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-semibold uppercase tracking-wider mb-4">
                        <Shield className="w-3.5 h-3.5" /> Enterprise-Grade Security
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Clinical-Grade Security & Compliance
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
                        We handle sensitive patient records with absolute integrity. Our system meets or exceeds global healthcare standards.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto text-left">
                        {compliances.map((comp, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                                    <comp.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{comp.name}</h3>
                                <p className="text-sm text-slate-400 font-light leading-relaxed">{comp.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 2. Clinical Validation & Advisory Board (Point 3) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto pt-16 border-t border-white/5">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full font-semibold uppercase tracking-wider">
                            <Award className="w-3.5 h-3.5" /> Clinical Integrity
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-white leading-tight">
                            Built for Doctors, <br />
                            Validated by Medicine
                        </h2>
                        <p className="text-slate-400 font-light leading-relaxed">
                            ISHA is not just a general-purpose AI. It is trained on peer-reviewed clinical guidelines, medical case studies, and validated by practicing physicians.
                        </p>

                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                    <FileCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">98.4% Diagnostic Correlation</h4>
                                    <p className="text-xs text-slate-500 font-light mt-0.5">Validated against 10,000+ double-blinded patient record cases.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                    <HeartHandshake className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Zero Patient Data Training</h4>
                                    <p className="text-xs text-slate-500 font-light mt-0.5">We never use uploaded patient records to train public AI models.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                        <h3 className="text-lg font-semibold text-slate-300 pl-1 mb-2">Our Medical Advisors</h3>
                        <div className="space-y-4">
                            {advisors.map((adv, idx) => (
                                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-center">
                                    <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-base border border-blue-500/20 shrink-0">
                                        {adv.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-base leading-none">{adv.name}</h4>
                                        <p className="text-xs text-blue-400 font-medium mt-1">{adv.role}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 font-light">{adv.affiliation}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Founder Section (Point 3) */}
                <div className="mt-24 p-8 rounded-3xl bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border border-white/5 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-3xl font-extrabold text-white shrink-0 shadow-lg shadow-black/40">
                        DS
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">A Note from the Founder</h3>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mb-4">
                            &ldquo;Our mission at ISHA is simple: give clinicians their time back. Healthcare practitioners spend nearly a third of their day typing clinical notes and reading through diagnostic files. By combining specialized LLM architectures with military-grade security, we help doctors focus entirely on patient outcome, not software input.&rdquo;
                        </p>
                        <div className="text-xs text-slate-500">
                            <span className="font-bold text-slate-300">Divyanshu Singh</span> — Founder & CEO, ISHA Med
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
