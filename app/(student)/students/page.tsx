import { HeroStudent } from "@/components/sections/HeroStudent";
import { Testimonials } from "@/components/sections/Testimonials";
import { SEOArticles } from "@/components/sections/SEOArticles";
import { CourseCard } from "@/components/ui/CourseCard";
import Link from "next/link";
import { Sparkles, Trophy, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
    title: "ISHA Med Prep — High-Yield Board Exam Courses & Simulators",
    description: "Accelerate your medical learning with high-yield board prep courses, spaced repetition flashcards, clinical diagnostic guides, and interactive triage simulators.",
    openGraph: {
        title: "ISHA Med Prep — High-Yield Board Exam Courses & Simulators",
        description: "Accelerate your medical learning with high-yield board prep courses, spaced repetition flashcards, clinical diagnostic guides, and interactive triage simulators.",
        type: "website",
    }
};

export default async function StudentsPage() {
    let courses: any[] = [];
    try {
        courses = await prisma.course.findMany({
            where: { published: true },
            include: {
                lessons: true,
                enrollments: true
            },
            take: 3,
            orderBy: { createdAt: "desc" }
        });
    } catch (e) {
        console.error("Error fetching featured courses:", e);
    }

    const mentorMap: { [key: string]: string } = {
        "Anatomy": "Dr. Isha Mishra",
        "Pathology": "Dr. Priya Sharma",
        "Physiology": "Dr. Ashwani Kumar",
        "Pharmacology": "Dr. Rajeev Seth",
        "Biochemistry": "Dr. Amit Patel",
        "Microbiology": "Dr. Priya Sharma",
        "Medicine": "Dr. Ashwani Kumar",
        "Surgery": "Dr. Rajeev Seth"
    };

    const featuredCourses = courses.map((course) => {
        const lessonCount = course.lessons?.length || 0;
        const totalMinutes = lessonCount * 45;
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        const durationStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

        return {
            id: course.id,
            title: course.title,
            instructor: mentorMap[course.category] || "Dr. Isha Mishra",
            thumbnail: course.thumbnail || "/placeholder-1.png",
            duration: durationStr,
            rating: 5.0,
            students: course.enrollments?.length || 0,
            category: course.category,
            price: course.price,
        };
    });

    return (
        <div className="flex flex-col">
            <HeroStudent />

            {/* Student Features Grid */}
            <section className="py-24 bg-slate-950 text-white border-b border-white/5">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-semibold uppercase tracking-wider mb-4">
                            <Sparkles className="w-3 h-3" /> Built for Rankers
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Advanced Medical Learning Ecosystem
                        </h2>
                        <p className="text-slate-400 font-light max-w-2xl mx-auto">
                            We combine traditional medical curriculum with advanced active learning modules to boost recall accuracy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "High-Yield Video Lectures", desc: "Foundational, para-clinical, and clinical video lessons directly matching board topics.", icon: <BookOpen className="w-6 h-6 text-blue-400" /> },
                            { title: "Triage Simulation", desc: "Interactive virtual ER wards to put your diagnostic reasoning to the test.", icon: <Trophy className="w-6 h-6 text-emerald-400" /> },
                            { title: "Spaced Repetition (SRS)", desc: "Adaptive flashcards that track memory decay curves to maximize active recall.", icon: <Sparkles className="w-6 h-6 text-purple-400" /> },
                            { title: "Expert Mentorship", desc: "Direct guidance and live Q&A sessions from doctors and top-ranked board alumni.", icon: <GraduationCap className="w-6 h-6 text-amber-400" /> }
                        ].map((feat, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                                    {feat.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-white">{feat.title}</h3>
                                <p className="text-sm text-slate-400 font-light leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Courses Preview */}
            <section className="py-24 bg-slate-900/20">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-widest block mb-2">High-Yield Content</span>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Featured Board Prep Courses</h2>
                        </div>
                        <Link href="/courses" className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm flex items-center gap-1.5 shrink-0 transition-colors">
                            View All Courses <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredCourses.map((course) => (
                            <CourseCard key={course.id} {...course} />
                        ))}
                        {featuredCourses.length === 0 && (
                            <div className="col-span-full text-center py-12 text-slate-400">
                                No featured courses available.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Testimonials />
            
            <SEOArticles />

            {/* Call to Action */}
            <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-emerald-950 to-slate-950 text-white">
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-white rounded-full" />
                    <div className="absolute bottom-[20%] right-[10%] w-3 h-3 bg-white rounded-full" />
                </div>
                <div className="container mx-auto px-4 md:px-6 text-center relative z-10 max-w-3xl">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Unlock Your High-Yield Dashboard Today
                    </h2>
                    <p className="text-lg text-slate-300 mb-12 font-light leading-relaxed">
                        Join thousands of medical students using ISHA to study smarter, retain longer, and clear their board exams with confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-10 py-4 rounded-full shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.02]">
                                Start Free Trial
                            </button>
                        </Link>
                        <Link href="/courses">
                            <button className="bg-transparent border border-white/20 hover:bg-white/10 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300">
                                Explore Courses
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
