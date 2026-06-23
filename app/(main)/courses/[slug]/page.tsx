import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import CoursePlayerClient from "./CoursePlayerClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CheckoutModalWrapper } from "@/components/payment/CheckoutModalWrapper";

export default async function CoursePlayerPage({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {
    const { slug } = await params;
    const session = await getServerSession(authOptions);

    const course = await prisma.course.findUnique({
        where: { id: slug },
        include: {
            lessons: {
                orderBy: { createdAt: "asc" },
            },
        },
    });

    if (!course) {
        notFound();
    }

    // Check enrollment
    let isEnrolled = false;
    if (session?.user?.id) {
        const enrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId: course.id,
                }
            }
        });
        isEnrolled = !!enrollment;
    }

    // Admins always have access
    if (session?.user?.role === "ADMIN") {
        isEnrolled = true;
    }

    if (!isEnrolled) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-xl">
                        <div className="aspect-video relative bg-slate-900 flex items-center justify-center group">
                            {course.thumbnail ? (
                                <img src={course.thumbnail} alt={course.title} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale-[0.5]" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                            )}
                            <div className="relative z-10 text-center p-8">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">Course Locked</h2>
                                <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto">Enroll now to get lifetime access to all lectures, quizzes, and premium study materials.</p>
                                <CheckoutModalWrapper 
                                    course={{ id: course.id, title: course.title, price: course.price }} 
                                />
                            </div>
                        </div>
                        <div className="p-10">
                            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{course.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-xl">What you'll learn</h3>
                                    <ul className="space-y-3">
                                        {course.lessons.slice(0, 4).map((lesson, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600">
                                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                {lesson.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 h-fit">
                                    <h3 className="font-bold mb-4">Course Includes</h3>
                                    <div className="space-y-4 text-sm text-slate-600">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                            <span>{course.lessons.length} High-yield video lessons</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                            <span>Comprehensive study notes (PDF)</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>Expert Q&A support</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <CoursePlayerClient course={course} />;
}
