"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, AlertTriangle, Play, Sparkles, TrendingDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type ReportType = "CBC" | "LFT" | "ECG";

const sampleData = {
    CBC: {
        title: "Complete Blood Count (CBC) Analysis",
        summary: "Patient presents with fatigue and mild shortness of breath. The blood panel indicates microcytic, hypochromic anemia, consistent with iron deficiency.",
        abnormal: [
            { parameter: "Hemoglobin (Hb)", value: "9.2 g/dL", reference: "12.0 - 15.5 g/dL", status: "Low", flag: true },
            { parameter: "MCV", value: "72 fL", reference: "80 - 100 fL", status: "Low", flag: true },
            { parameter: "MCH", value: "22 pg", reference: "27 - 33 pg", status: "Low", flag: true },
            { parameter: "Red Blood Cell (RBC)", value: "3.8 x10^12/L", reference: "4.1 - 5.1 x10^12/L", status: "Low", flag: true },
        ],
        history: "Hemoglobin has decreased from 10.8 g/dL (3 months ago) to 9.2 g/dL. MCV shows a progressive downward trend from 79 fL.",
        differentials: [
            { diagnosis: "Iron Deficiency Anemia", probability: "High (85%)", reasoning: "Low Hb, microcytic (low MCV), and hypochromic (low MCH) markers." },
            { diagnosis: "Thalassemia Minor", probability: "Medium (10%)", reasoning: "Requires Hemoglobin Electrophoresis to rule out hereditary traits." },
            { diagnosis: "Anemia of Chronic Disease", probability: "Low (5%)", reasoning: "Inflammatory markers are within normal range." },
        ],
        questions: [
            "Are there any signs of chronic blood loss (e.g., heavy menstrual cycles, dark stools)?",
            "Has the patient experienced any dietary changes or gastrointestinal symptoms?",
            "Is there a family history of anemia or hemoglobinopathy?"
        ]
    },
    LFT: {
        title: "Liver Function Test (LFT) Analysis",
        summary: "Liver panel reveals moderate elevation of transaminases (ALT/AST) with a ratio > 2, accompanied by mild elevation of GGT. Alkaline phosphatase is normal, suggesting hepatocellular injury rather than cholestasis.",
        abnormal: [
            { parameter: "ALT (Alanine Aminotransferase)", value: "142 U/L", reference: "7 - 56 U/L", status: "High", flag: true },
            { parameter: "AST (Aspartate Aminotransferase)", value: "288 U/L", reference: "10 - 40 U/L", status: "Critical", flag: true },
            { parameter: "GGT", value: "95 U/L", reference: "9 - 48 U/L", status: "High", flag: true },
        ],
        history: "AST and ALT were within normal limits during the last screening (1 year ago). The sudden elevation suggests an acute insult or lifestyle transition.",
        differentials: [
            { diagnosis: "Alcohol-Induced Hepatitis", probability: "High (70%)", reasoning: "AST:ALT ratio is > 2:1 with elevated GGT." },
            { diagnosis: "Metabolic Dysfunction-Associated Steatohepatitis (MASH)", probability: "Medium (20%)", reasoning: "Mild hepatomegaly noted on ultrasound." },
            { diagnosis: "Drug-Induced Liver Injury (DILI)", probability: "Low (10%)", reasoning: "Correlate with recent acetaminophen or herbal supplement intake." },
        ],
        questions: [
            "What is the patient's daily/weekly alcohol consumption profile?",
            "Has the patient started any new over-the-counter medications, supplements, or prescription drugs?",
            "Is there any history of fatigue, abdominal pain, or jaundice?"
        ]
    },
    ECG: {
        title: "Electrocardiogram (ECG) Analysis",
        summary: "12-lead ECG demonstrates sinus rhythm at 72 bpm. Notable changes include ST-segment elevation in leads V2-V4, with reciprocal ST-depression in inferior leads (II, III, aVF), signaling acute anterior wall myocardial injury.",
        abnormal: [
            { parameter: "ST Segment (V2-V4)", value: "+2.5 mm elevation", reference: "Isoelectric (0 mm)", status: "Critical Elevation", flag: true },
            { parameter: "T Wave (V2-V4)", value: "Hyperacute / Peaked", reference: "Normal asymmetric", status: "Abnormal", flag: true },
            { parameter: "ST Segment (II, III, aVF)", value: "-1.0 mm depression", reference: "Isoelectric (0 mm)", status: "Reciprocal Change", flag: true },
        ],
        history: "ECG from 6 months ago showed normal sinus rhythm without ST-T wave abnormalities or axis deviation.",
        differentials: [
            { diagnosis: "Acute Anterior ST-Elevation Myocardial Infarction (STEMI)", probability: "Critical (95%)", reasoning: "ST elevation in anterior leads with corresponding reciprocal inferior changes." },
            { diagnosis: "Acute Pericarditis", probability: "Low (3%)", reasoning: "Unlikely due to absence of diffuse PR-depression or concave ST-elevation." },
            { diagnosis: "Early Repolarization Variant", probability: "Low (2%)", reasoning: "Reciprocal changes strongly point toward active ischemia." },
        ],
        questions: [
            "Is the patient experiencing substernal chest pain, radiating to the left arm or jaw?",
            "What is the exact onset time of the symptoms (critical window for reperfusion therapy)?",
            "Are there associated symptoms such as diaphoresis, dyspnea, or nausea?"
        ]
    }
};

export function InteractiveDemo() {
    const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analyzedData, setAnalyzedData] = useState<typeof sampleData.CBC | null>(null);
    const [activeTimeout, setActiveTimeout] = useState<any>(null);

    const handleSelectReport = (type: ReportType) => {
        if (activeTimeout) {
            clearTimeout(activeTimeout);
        }
        setSelectedReport(type);
        setIsAnalyzing(true);
        setAnalyzedData(null);

        // Simulate AI analysis in 2.2 seconds
        const timer = setTimeout(() => {
            setAnalyzedData(sampleData[type]);
            setIsAnalyzing(false);
            setActiveTimeout(null);
        }, 2200);
        setActiveTimeout(timer);
    };

    return (
        <section id="demo-flow" className="py-24 lg:py-32 bg-slate-950 text-white relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center rounded-full bg-blue-500/15 border border-blue-500/30 px-4 py-1.5 text-xs font-semibold text-blue-400 mb-4 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Interactive Sandbox
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-sans bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mb-6">
                        Test the AI Copilot in 10 Seconds
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
                        Select a sample diagnostic report below to simulate an instant clinical upload and witness our structured Copilot synthesis.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
                    {/* Left Panel: Select Report */}
                    <div className="lg:col-span-4 space-y-4">
                        <h3 className="text-lg font-semibold text-slate-300 mb-2 pl-1">Choose a Sample Report</h3>
                        
                        {(Object.keys(sampleData) as ReportType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => handleSelectReport(type)}
                                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                                    selectedReport === type
                                        ? "bg-blue-600/20 border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.15)] text-white"
                                        : "bg-slate-900/60 border-white/5 hover:border-white/20 text-slate-400 hover:text-slate-200"
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                                        selectedReport === type ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
                                    }`}>
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-base text-white">{type === "CBC" ? "CBC Blood Count" : type === "LFT" ? "Liver Function Test" : "12-Lead ECG"}</div>
                                        <div className="text-xs text-slate-400 font-light mt-0.5">Click to run analysis</div>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-1" />
                            </button>
                        ))}

                        <div className="p-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] mt-6">
                            <h4 className="text-sm font-semibold text-slate-300 mb-2">Want to try your own?</h4>
                            <p className="text-xs text-slate-400 leading-relaxed mb-4 font-light">
                                Sign up to upload custom PDF reports, handwritten notes, or DICOM scans for real-time analysis.
                            </p>
                            <Link href="/register" className="block w-full">
                                <Button className="w-full rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs border border-white/10 py-5">
                                    Create Free Provider Account
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Panel: Interactive AI Outputs */}
                    <div className="lg:col-span-8 bg-slate-900/50 border border-white/5 rounded-[2rem] p-6 md:p-8 min-h-[500px] flex flex-col relative overflow-hidden backdrop-blur-md">
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                        
                        <AnimatePresence mode="wait">
                            {/* State 1: Empty State */}
                            {!selectedReport && (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-grow flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-white/5 flex items-center justify-center mb-6">
                                        <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2 text-slate-200">AI Medical Copilot Sandbox</h4>
                                    <p className="text-sm text-slate-400 max-w-sm font-light">
                                        Select a report type on the left to see how ISHA instantly synthesizes complex diagnostic records.
                                    </p>
                                    <div className="mt-8 flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-4 py-2 rounded-full border border-white/5 font-mono">
                                        <Play className="w-3 h-3 text-blue-500 fill-blue-500" /> Waiting for report input...
                                    </div>
                                </motion.div>
                            )}

                            {/* State 2: Loading State */}
                            {isAnalyzing && (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-grow flex flex-col items-center justify-center py-12"
                                >
                                    <div className="relative w-24 h-24 mb-6">
                                        <div className="absolute inset-0 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin" />
                                        <div className="absolute inset-2 rounded-full border-4 border-indigo-500/10 border-b-indigo-400 animate-spin-reverse" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <FileText className="w-8 h-8 text-blue-400" />
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-200 animate-pulse">Running Optical Character Recognition (OCR)...</h4>
                                    <p className="text-xs text-slate-400 mt-2 font-mono">Matching values to clinical reference data & patient timeline...</p>
                                </motion.div>
                            )}

                            {/* State 3: Content Rendered */}
                            {analyzedData && !isAnalyzing && (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6 flex-grow"
                                >
                                    {/* Header info */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
                                        <div>
                                            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Analysis Result</span>
                                            <h3 className="text-2xl font-bold text-white mt-1">{analyzedData.title}</h3>
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                                            <CheckCircle className="w-3.5 h-3.5" /> HIPAA Secured
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1.5">AI Synthesis & Summary</h4>
                                        <p className="text-sm text-slate-300 leading-relaxed font-light">{analyzedData.summary}</p>
                                    </div>

                                    {/* Abnormal Values Table */}
                                    <div>
                                        <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Flagged Abnormal Values</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-sm border-collapse">
                                                <thead>
                                                    <tr className="border-b border-white/10 text-slate-400 text-xs">
                                                        <th className="pb-2 font-semibold">Parameter</th>
                                                        <th className="pb-2 font-semibold">Observed Value</th>
                                                        <th className="pb-2 font-semibold">Reference Range</th>
                                                        <th className="pb-2 font-semibold text-right">Flag</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {analyzedData.abnormal.map((item, idx) => (
                                                        <tr key={idx} className="border-b border-white/5 py-2.5 text-slate-200">
                                                            <td className="py-2.5 font-medium">{item.parameter}</td>
                                                            <td className="py-2.5 font-mono text-white">{item.value}</td>
                                                            <td className="py-2.5 text-slate-400">{item.reference}</td>
                                                            <td className="py-2.5 text-right">
                                                                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-bold ${
                                                                    item.status === "Critical" || item.status === "Critical Elevation"
                                                                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                                                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                                                }`}>
                                                                    <AlertTriangle className="w-3.5 h-3.5" /> {item.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Timeline & Historical Comparison */}
                                    <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                            <TrendingDown className="w-4 h-4 text-blue-400" /> Historical Comparison & Trends
                                        </h4>
                                        <p className="text-sm text-slate-300 leading-relaxed font-light">{analyzedData.history}</p>
                                    </div>

                                    {/* Differential Diagnoses */}
                                    <div>
                                        <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">AI-Suggested Differential Diagnoses</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {analyzedData.differentials.map((diff, idx) => (
                                                <div key={idx} className="p-4 rounded-xl border border-white/5 bg-slate-900/80">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="font-bold text-sm text-white">{diff.diagnosis}</div>
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                                            diff.probability.includes("High") || diff.probability.includes("Critical")
                                                                ? "bg-rose-500/10 text-rose-400"
                                                                : diff.probability.includes("Medium")
                                                                ? "bg-blue-500/10 text-blue-400"
                                                                : "bg-slate-800 text-slate-400"
                                                        }`}>
                                                            {diff.probability.split(" ")[0]}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 leading-relaxed font-light">{diff.reasoning}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Suggested Patient Questions */}
                                    <div className="border-t border-white/5 pt-4">
                                        <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2.5">Suggested Next Clinical Inquiries</h4>
                                        <ul className="space-y-2">
                                            {analyzedData.questions.map((q, idx) => (
                                                <li key={idx} className="flex gap-2.5 items-start text-sm text-slate-300">
                                                    <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                                                    <span className="font-light leading-relaxed">{q}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
