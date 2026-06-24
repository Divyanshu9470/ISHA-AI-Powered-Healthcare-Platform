"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Activity, Dna, AlertTriangle, Pill, ShieldAlert, Sparkles, Search } from "lucide-react";

const SAMPLE_SUBJECTS = [
    {
        id: "anatomy",
        name: "Anatomy & Histology",
        icon: <BookOpen className="w-5 h-5" />,
        color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        content: {
            title: "Microcytic Hypochromic Erythrocytes",
            highlights: ["Bone marrow biopsy reveals depleted iron stores in erythroblasts.", "Prussian blue staining shows absent haemosiderin.", "Peripheral blood smear shows anisocytosis and poikilocytosis."],
            details: "Erythrocytes are smaller than the nucleus of a normal lymphocyte (microcytic) and show a widened central zone of pallor (hypochromic) reflecting reduced hemoglobin concentration."
        }
    },
    {
        id: "physiology",
        name: "Physiology & Biochemistry",
        icon: <Activity className="w-5 h-5" />,
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        content: {
            title: "Iron Absorption & Heme Synthesis",
            highlights: ["Dietary Fe3+ reduced to Fe2+ by duodenal cytochrome B.", "Absorption via Divalent Metal Transporter 1 (DMT1) in enterocytes.", "Heme synthesis rate-limiting step: ALAS1 activity inhibited due to lack of iron co-factor."],
            details: "Hepcidin regulates systemic iron flows by binding to and causing the degradation of ferroportin, the sole cellular iron exporter in enterocytes and macrophages."
        }
    },
    {
        id: "pathology",
        name: "Pathology & Manifestations",
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        content: {
            title: "Plummer-Vinson Syndrome & Koilonychia",
            highlights: ["Koilonychia: Spoon-shaped fingernails caused by epithelial thinning.", "Atrophic glossitis: Smooth red tongue due to loss of filiform papillae.", "Esophageal webs: Dysphagia to solids, predisposing to squamous cell carcinoma."],
            details: "Symptoms stem from decreased oxygen-carrying capacity (fatigue, pallor) and depletion of iron-dependent respiratory enzymes in fast-dividing epithelial cells."
        }
    },
    {
        id: "pharmacology",
        name: "Pharmacology & Management",
        icon: <Pill className="w-5 h-5" />,
        color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        content: {
            title: "Oral Ferrous Sulfate & IV Iron Sucrose",
            highlights: ["Oral supplementation: Ferrous sulfate (200mg) provides 65mg elemental iron.", "Absorption enhanced by co-administration of Vitamin C (Ascorbic Acid).", "IV formulation: Iron sucrose or ferric carboxymaltose preferred for malabsorption."],
            details: "Side effects of oral iron include dark stools, constipation, and epigastric pain. Desferrioxamine is the antidote used to treat acute iron toxicity."
        }
    }
];

export function OmniNotesShowcase() {
    const [activeTab, setActiveTab] = useState("anatomy");
    const [searchQuery, setSearchQuery] = useState("Iron Deficiency Anemia");

    const currentSubject = SAMPLE_SUBJECTS.find(s => s.id === activeTab) || SAMPLE_SUBJECTS[0];

    return (
        <section className="py-24 bg-slate-950 text-white border-b border-white/5 relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full font-semibold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3 h-3 animate-pulse" /> Omni-Disciplinary Notes
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Complete Connected Science
                    </h2>
                    <p className="text-slate-400 font-light max-w-2xl mx-auto text-base">
                        Stop bouncing between different textbooks. View any condition's structure, mechanism, symptoms, and therapies side by side in one integrated research module.
                    </p>
                </div>

                {/* Mock Search Input */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 h-5 text-slate-500" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-12 pr-4 py-4 bg-slate-900/60 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-xl transition-all font-medium text-base"
                            placeholder="Search any condition, drug, or structure..."
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs px-3 py-1.5 rounded-xl font-semibold">
                            Enter
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Sidebar Tabs */}
                    <div className="lg:col-span-4 space-y-3">
                        {SAMPLE_SUBJECTS.map((sub) => (
                            <button
                                key={sub.id}
                                onClick={() => setActiveTab(sub.id)}
                                className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 ${
                                    activeTab === sub.id
                                        ? "bg-slate-900 border-white/20 shadow-xl"
                                        : "bg-transparent border-transparent hover:bg-white/[0.02]"
                                }`}
                            >
                                <div className={`p-3 rounded-xl border ${sub.color}`}>
                                    {sub.icon}
                                </div>
                                <div>
                                    <h4 className={`font-bold transition-colors ${activeTab === sub.id ? "text-white" : "text-slate-400"}`}>
                                        {sub.name}
                                    </h4>
                                    <span className="text-xs text-slate-500 font-light">Connected view</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right Display Board */}
                    <div className="lg:col-span-8 bg-slate-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-xl min-h-[400px] flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Dna className="w-48 h-48 text-white" />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div>
                                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest block mb-2">
                                        Integrated Pathology Analysis
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                                        {currentSubject.content.title}
                                    </h3>
                                </div>

                                <p className="text-slate-300 leading-relaxed font-light text-base">
                                    {currentSubject.content.details}
                                </p>

                                <div className="space-y-3 pt-4 border-t border-white/5">
                                    <h5 className="text-sm font-semibold text-white uppercase tracking-wider">
                                        High-Yield Findings & Key Connections
                                    </h5>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {currentSubject.content.highlights.map((hl, i) => (
                                            <li key={i} className="flex gap-2.5 items-start text-sm text-slate-400">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2" />
                                                <span>{hl}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Bottom clinical correlation tag */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                                <span>Curated by Verified Board Pathologists</span>
                            </div>
                            <Link href="/simulator">
                                <div className="text-xs text-blue-400 font-semibold cursor-pointer hover:underline flex items-center gap-1">
                                    Open 3D Anatomy View &rarr;
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
