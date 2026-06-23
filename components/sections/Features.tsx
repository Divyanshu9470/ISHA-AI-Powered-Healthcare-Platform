"use client";

import { Stethoscope, Mic, ScanText, Database, Network, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const features = [
    {
        icon: Stethoscope,
        title: "AI Medical Copilot",
        description: "Generate instant case summaries, highlight critical out-of-range parameters, track historical value shifts, and suggest differential diagnoses on a unified screen.",
        gradient: "from-[#1D7E9F] to-[#2BA0C7]",
        iconBg: "bg-[#1D7E9F]/10",
        iconColor: "text-[#1D7E9F]",
    },
    {
        icon: Mic,
        title: "Voice-to-Clinical Notes",
        description: "Dictate patient interactions directly. Our specialized medical speech model converts natural conversation into structured, audit-ready SOAP notes in seconds.",
        gradient: "from-[#0F6E56] to-[#14A07E]",
        iconBg: "bg-[#0F6E56]/10",
        iconColor: "text-[#0F6E56]",
    },
    {
        icon: ScanText,
        title: "Handwritten prescription OCR",
        description: "Digitize handwritten notes, prescriptions, and external lab reports instantly with high-fidelity, medically contextual character recognition.",
        gradient: "from-[#D85A30] to-[#E8844A]",
        iconBg: "bg-[#D85A30]/10",
        iconColor: "text-[#D85A30]",
    },
    {
        icon: Database,
        title: "RAG Patient Search",
        description: "Perform semantic search across a patient's entire medical record history, imaging reports, and external PDF labs to quickly recall clinical context.",
        gradient: "from-[#7C3AED] to-[#A78BFA]",
        iconBg: "bg-[#7C3AED]/10",
        iconColor: "text-[#7C3AED]",
    },
    {
        icon: Network,
        title: "FHIR & HL7 Integrations",
        description: "Seamlessly exchange medical records and synch clinical summaries with your existing EMR/EHR platforms via HL7 or FHIR integration endpoints.",
        gradient: "from-[#D97706] to-[#F59E0B]",
        iconBg: "bg-[#D97706]/10",
        iconColor: "text-[#D97706]",
    },
    {
        icon: BrainCircuit,
        title: "Clinical Reasoning Assistant",
        description: "Support diagnostic decisions with evidence-based differential diagnosis suggestions linked to clinical research references.",
        gradient: "from-[#1D7E9F] to-[#0F6E56]",
        iconBg: "bg-[#1D7E9F]/10",
        iconColor: "text-[#1D7E9F]",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: "easeOut" as const,
        },
    }),
};

export function Features() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });

    return (
        <section className="py-24 lg:py-32 relative overflow-hidden bg-slate-950 text-white" ref={ref}>
            {/* Subtle background pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                      linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16 lg:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4">
                        Modern Clinic Capabilities
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                        Powering Smarter{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Clinical Workflows</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Designed to sit beside the clinician. Accelerate patient chart reviews, transcription, and diagnostic synthesis.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/[0.02] hover:bg-white/[0.04]"
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.iconBg} ${feature.iconColor} group-hover:scale-110 transition-all duration-300`}>
                                <feature.icon size={26} strokeWidth={1.8} />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-400 leading-relaxed text-[15px] font-light">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
