"use client";

import { VideoPlayer } from "@/components/course/VideoPlayer";
import { LessonSidebar } from "@/components/course/LessonSidebar";
import { Quiz } from "@/components/course/Quiz";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Lesson {
    id: string;
    title: string;
    videoUrl: string;
    description: string | null;
}

interface Course {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
}

export default function CoursePlayerClient({ course }: { course: Course }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [activeLesson, setActiveLesson] = useState(course.lessons[0] || null);

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "quiz", label: "Quiz" },
        { id: "qa", label: "Q&A" },
        { id: "notes", label: "Notes" },
    ];

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <VideoPlayer videoUrl={activeLesson?.videoUrl} />

                    <div className="space-y-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                            {activeLesson ? activeLesson.title : course.title}
                        </h1>
                        <div className="flex items-center gap-4 border-b border-border">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                                        activeTab === tab.id
                                            ? "border-primary text-primary"
                                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="min-h-[200px] text-muted-foreground leading-relaxed">
                            {activeTab === "overview" && (
                                <div className="space-y-4">
                                    <p>{activeLesson?.description || course.description}</p>
                                    {!activeLesson && (
                                        <div className="p-8 border-2 border-dashed border-border rounded-xl text-center">
                                            <p>No lessons available for this course yet.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === "quiz" && (
                                <Quiz />
                            )}
                            {activeTab === "qa" && (
                                <p>Q&A section coming soon. Ask your doubts here and get answers from mentors.</p>
                            )}
                            {activeTab === "notes" && (
                                <p>Downloadable high-yield notes for this lecture will be available here.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <LessonSidebar 
                        lessons={course.lessons} 
                        activeLessonId={activeLesson?.id} 
                        onSelectLesson={(lesson: any) => setActiveLesson(lesson)} 
                    />
                </div>
            </div>
        </div>
    );
}
