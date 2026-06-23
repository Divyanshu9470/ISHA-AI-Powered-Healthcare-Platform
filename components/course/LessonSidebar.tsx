"use client";

import { ChevronDown, PlayCircle, Lock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Lesson {
    id: string;
    title: string;
    videoUrl: string;
    description: string | null;
}

interface LessonSidebarProps {
    lessons: Lesson[];
    activeLessonId?: string;
    onSelectLesson: (lesson: Lesson) => void;
}

export function LessonSidebar({ lessons, activeLessonId, onSelectLesson }: LessonSidebarProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="bg-card border border-border rounded-xl h-fit overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border bg-muted/30">
                <h3 className="font-bold text-foreground">Course Content</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    {lessons.length} Lessons Available
                </p>
            </div>

            <div className="overflow-y-auto max-h-[600px]">
                <div className="border-b border-border last:border-0">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                    >
                        <span className="font-semibold text-sm text-foreground">Course Lessons</span>
                        <ChevronDown
                            size={16}
                            className={cn(
                                "text-muted-foreground transition-transform duration-200",
                                isOpen ? "transform rotate-180" : ""
                            )}
                        />
                    </button>

                    {isOpen && (
                        <div className="bg-muted/10">
                            {lessons.map((lesson, idx) => (
                                <div
                                    key={lesson.id}
                                    onClick={() => onSelectLesson(lesson)}
                                    className={cn(
                                        "flex items-center gap-3 p-3 pl-6 text-sm cursor-pointer transition-colors border-l-2",
                                        activeLessonId === lesson.id
                                            ? "bg-primary/10 border-primary text-primary font-medium"
                                            : "border-transparent hover:bg-muted/20 text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <PlayCircle size={16} className={activeLessonId === lesson.id ? "fill-primary text-primary-foreground" : ""} />
                                    <div className="flex-1">
                                        <p className="truncate">{idx + 1}. {lesson.title}</p>
                                    </div>
                                </div>
                            ))}
                            {lessons.length === 0 && (
                                <p className="p-4 text-xs text-muted-foreground text-center">No lessons found</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

