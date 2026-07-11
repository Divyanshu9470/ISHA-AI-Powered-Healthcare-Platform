"use client";

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useState, useEffect, useCallback } from "react";

// TODO: Verify authenticity of the student testimonials below (confirming these are real, consenting individuals with accurate titles/scores).
const testimonials = [
    {
        name: "Dr. Sarah Jenkins",
        role: "USMLE Step 1 — 265",
        content: "IshaMed's conceptual approach completely changed how I studied. The clarity in Pathology and Medicine is unmatched. Every video feels like a masterclass.",
        initials: "SJ",
        gradient: "from-[#1D7E9F] to-[#0F6E56]",
    },
    {
        name: "Dr. Michael Chen",
        role: "PLAB 1 — Passed",
        content: "The high-yield videos were a lifesaver for my last-minute revision. I couldn't have cleared the exam without the structured approach and comprehensive notes.",
        initials: "MC",
        gradient: "from-[#0F6E56] to-[#14A07E]",
    },
    {
        name: "Dr. Elena Rodriguez",
        role: "USMLE Step 2 — 272",
        content: "Mentorship played a huge role. Knowing I had guidance from top-ranked doctors whenever I felt stuck gave me the confidence to keep pushing forward.",
        initials: "ER",
        gradient: "from-[#D85A30] to-[#E8844A]",
    },
    {
        name: "Dr. Ahmed Hassan",
        role: "MRCP Part 1 — Passed",
        content: "The test analytics feature helped me identify my weak areas with precision. I went from struggling with Pharmacology to mastering it in just 3 months.",
        initials: "AH",
        gradient: "from-[#7C3AED] to-[#A78BFA]",
    },
    {
        name: "Dr. Sophie Dubois",
        role: "International Medical Graduate",
        content: "As an IMG, IshaMed was my lifeline. The live Q&A sessions made all the difference — I could get my doubts cleared in real-time by actual experts.",
        initials: "SD",
        gradient: "from-[#1D7E9F] to-[#D85A30]",
    },
];

export function Testimonials() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    // Auto-advance
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isPaused, nextSlide]);

    // Show 3 cards at a time on desktop, 1 on mobile
    const getVisibleCards = () => {
        const cards = [];
        for (let i = 0; i < 3; i++) {
            cards.push(testimonials[(activeIndex + i) % testimonials.length]);
        }
        return cards;
    };

    return (
        <section className="py-24 lg:py-32 relative overflow-hidden bg-[#080c14]" ref={ref}>
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-20">
                    <span className="inline-block text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-4">
                        Success Stories
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                        Trusted by <span className="text-primary">Top Rankers</span>
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Join a community of successful medical professionals who achieved their dreams with us.
                    </p>
                </div>

                {/* Carousel */}
                <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {getVisibleCards().map((testimonial, index) => (
                            <div
                                key={`${activeIndex}-${index}`}
                                className="group relative bg-slate-900 p-8 rounded-2xl border border-white/5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-500"
                            >
                                {/* Gradient top border */}
                                <div className={`absolute top-0 left-6 right-6 h-[3px] rounded-full bg-gradient-to-r ${testimonial.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

                                {/* Quote icon */}
                                <Quote className="absolute top-8 right-8 text-primary/[0.08] w-14 h-14" />

                                {/* Stars */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={15} className="text-amber-400 fill-amber-400" />
                                    ))}
                                </div>

                                {/* Quote - Serif */}
                                <p className="font-serif text-slate-200 mb-8 leading-relaxed text-[17px] italic">
                                    &ldquo;{testimonial.content}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-[15px]">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-primary font-medium">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel Controls */}
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <button
                            onClick={prevSlide}
                            className="w-10 h-10 rounded-full border border-white/10 bg-slate-900 text-slate-300 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-300"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex
                                        ? "w-8 bg-primary"
                                        : "w-2 bg-slate-700 hover:bg-slate-500"
                                        }`}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="w-10 h-10 rounded-full border border-white/10 bg-slate-900 text-slate-300 hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-300"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
