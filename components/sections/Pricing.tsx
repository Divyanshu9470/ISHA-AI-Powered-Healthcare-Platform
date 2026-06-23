"use client";

import { Check, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

// TODO: Confirm if the pricing packages and dollar values below represent live tiers or placeholders.
const tiers = [
    {
        name: "Sandbox Starter",
        price: "$0",
        period: "Forever free",
        desc: "Best for testing capabilities or small practice trial.",
        features: [
            "5 patient report uploads/month",
            "Basic abnormal values flagging",
            "Standard differential diagnostics suggestions",
            "Single doctor seat",
            "Basic email support"
        ],
        cta: "Start Sandbox",
        highlighted: false
    },
    {
        name: "Clinic Pro",
        price: "$79",
        period: "per month",
        desc: "Ideal for active doctors and small private clinics.",
        features: [
            "Unlimited patient record uploads",
            "Advanced OCR for handwritten records",
            "AI-Generated SOAP notes & dictation support",
            "Historical timeline comparisons",
            "Up to 3 doctor seats",
            "HIPAA compliant secure storage",
            "Priority support"
        ],
        cta: "Upgrade to Pro",
        highlighted: true
    },
    {
        name: "Health System Enterprise",
        price: "Custom",
        period: "per system",
        desc: "Tailored solutions for medical groups and multi-site hospitals.",
        features: [
            "Custom local deployment options",
            "Full EHR integration (HL7 / FHIR standard)",
            "Dedicated secure DB instances",
            "Custom AI model fine-tuning & feedback",
            "Unlimited doctor & admin seats",
            "SLA & Dedicated Account Manager",
            "Advanced clinician audit logging"
        ],
        cta: "Request Enterprise Demo",
        highlighted: false
    }
];

export function Pricing() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section ref={ref} id="pricing-plans" className="py-24 lg:py-32 bg-slate-900/40 border-y border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4">
                        Transparent Pricing
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                        Designed for Practices of All Sizes
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
                        Select a plan that aligns with your volume or contact us to set up FHIR integrations for hospital networks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
                    {tiers.map((tier, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            className={`p-8 rounded-[2rem] border transition-all duration-300 flex flex-col relative ${
                                tier.highlighted
                                    ? "bg-blue-600/10 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.15)] scale-[1.02]"
                                    : "bg-slate-950/60 border-white/5 hover:border-white/20"
                            }`}
                        >
                            {tier.highlighted && (
                                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </span>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                <p className="text-sm text-slate-400 font-light min-h-[40px] leading-relaxed">{tier.desc}</p>
                            </div>

                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-5xl font-extrabold text-white tracking-tight">{tier.price}</span>
                                {tier.period && (
                                    <span className="text-sm text-slate-500 font-light">
                                        {tier.price.startsWith("$") ? `/ ${tier.period}` : `${tier.period}`}
                                    </span>
                                )}
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {tier.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                        <span className="font-light">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full rounded-full py-6 font-semibold transition-all duration-300 ${
                                    tier.highlighted
                                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                        : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10"
                                }`}
                            >
                                {tier.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-slate-500">
                        Have custom compliance or network security requirements?
                    </p>
                    <div className="mt-4 flex justify-center">
                        <Button className="rounded-full bg-slate-950 hover:bg-slate-900 border border-white/10 text-white px-8 py-5 text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-blue-400" /> Book an Integration Call
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
