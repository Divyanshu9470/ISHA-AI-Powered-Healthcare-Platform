"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function CallToAction() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

    return (
        <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden bg-gradient-cta animate-gradient">
            {/* Animated particles / decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-white/20 rounded-full animate-float" />
                <div className="absolute top-[60%] left-[20%] w-1.5 h-1.5 bg-white/15 rounded-full animate-float-delayed" />
                <div className="absolute top-[30%] right-[15%] w-2.5 h-2.5 bg-white/10 rounded-full animate-float" />
                <div className="absolute top-[70%] right-[25%] w-1.5 h-1.5 bg-white/20 rounded-full animate-float-delayed" />
                <div className="absolute top-[10%] left-[50%] w-2 h-2 bg-white/10 rounded-full animate-shimmer" />
                <div className="absolute bottom-[15%] left-[40%] w-3 h-3 bg-white/[0.08] rounded-full animate-float" />
            </div>

            {/* Radial overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.15)_100%)]" />

            <motion.div
                className="container mx-auto px-4 md:px-6 text-center relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white/90 mb-8 border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 mr-2" />
                    Special Launch Offer — Try Clinic Pro Risk Free
                </div>

                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
                    Ready to Streamline Your{" "}
                    <span className="relative">
                        Clinical Practice
                        <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                            <path d="M1 5.5C40 2 80 2 100 4C120 6 160 6 199 3" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </span>
                    ?
                </h2>

                <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of clinicians using ISHA to automate reports analysis, dictate patient visits, and focus on delivering care.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="rounded-full px-10 py-6 text-base font-semibold bg-white text-[#1D7E9F] hover:bg-white/95 hover:scale-[1.02] shadow-2xl shadow-black/20 transition-all duration-300"
                    >
                        Start Free Sandbox Trial <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button
                        size="lg"
                        className="rounded-full px-10 py-6 text-base font-semibold bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                    >
                        Schedule EHR Integration Call
                    </Button>
                </div>

                {/* Trust badges */}
                <div className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/55 text-sm">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Cancel subscription anytime
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        No credit card required for sandbox
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        100% HIPAA compliant
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
