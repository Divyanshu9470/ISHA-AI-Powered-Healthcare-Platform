"use client";

import { useEffect, useState, useCallback } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    ChevronDown,
    ChevronUp,
    X,
    Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lesson {
    id: string;
    title: string;
    videoUrl: string;
    createdAt: string;
}

interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string | null;
    published: boolean;
    createdAt: string;
    _count: { lessons: number; enrollments: number };
    lessons: Lesson[];
}

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
    const [showLessonForm, setShowLessonForm] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        thumbnail: "",
        published: false,
    });

    // Lesson form state
    const [lessonData, setLessonData] = useState({
        title: "",
        videoUrl: "",
        description: "",
    });

    const fetchCourses = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/courses");
            const data = await res.json();
            setCourses(data);
        } catch (e) {
            console.error("Failed to fetch courses:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const resetForm = () => {
        setFormData({ title: "", description: "", price: "", thumbnail: "", published: false });
        setEditingCourse(null);
        setShowForm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingCourse
            ? `/api/admin/courses/${editingCourse.id}`
            : "/api/admin/courses";
        const method = editingCourse ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        resetForm();
        fetchCourses();
    };

    const handleEdit = (course: Course) => {
        setFormData({
            title: course.title,
            description: course.description,
            price: course.price.toString(),
            thumbnail: course.thumbnail || "",
            published: course.published,
        });
        setEditingCourse(course);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this course and all its lessons?")) return;
        await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
        fetchCourses();
    };

    const togglePublish = async (course: Course) => {
        await fetch(`/api/admin/courses/${course.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ published: !course.published }),
        });
        fetchCourses();
    };

    const handleAddLesson = async (e: React.FormEvent, courseId: string) => {
        e.preventDefault();
        await fetch("/api/admin/lessons", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...lessonData, courseId }),
        });
        setLessonData({ title: "", videoUrl: "", description: "" });
        setShowLessonForm(null);
        fetchCourses();
    };

    const handleDeleteLesson = async (lessonId: string) => {
        if (!confirm("Delete this lesson?")) return;
        await fetch(`/api/admin/lessons/${lessonId}`, { method: "DELETE" });
        fetchCourses();
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-foreground">Courses</h1>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Courses</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your courses and lessons ({courses.length} total)
                    </p>
                </div>
                <Button
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                    className="rounded-xl gap-2"
                >
                    <Plus size={18} /> Add Course
                </Button>
            </div>

            {/* Create/Edit Form */}
            {showForm && (
                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">
                            {editingCourse ? "Edit Course" : "New Course"}
                        </h2>
                        <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="Course title..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Price (₹)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="2999"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                                placeholder="Course description..."
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Thumbnail URL</label>
                                <input
                                    type="text"
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="/thumbnail.jpg"
                                />
                            </div>
                            <div className="flex items-end">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.published}
                                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                        className="w-4 h-4 rounded accent-primary"
                                    />
                                    <span className="text-sm font-medium text-foreground">Publish immediately</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="submit" className="rounded-xl">
                                {editingCourse ? "Update Course" : "Create Course"}
                            </Button>
                            <Button type="button" variant="outline" onClick={resetForm} className="rounded-xl">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Course Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                {courses.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">No courses yet. Create your first course!</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {courses.map((course) => (
                            <div key={course.id}>
                                {/* Course Row */}
                                <div className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                                    <button
                                        onClick={() =>
                                            setExpandedCourse(expandedCourse === course.id ? null : course.id)
                                        }
                                        className="text-muted-foreground hover:text-foreground shrink-0"
                                    >
                                        {expandedCourse === course.id ? (
                                            <ChevronUp size={18} />
                                        ) : (
                                            <ChevronDown size={18} />
                                        )}
                                    </button>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-foreground truncate">{course.title}</h3>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {course._count.lessons} lessons · {course._count.enrollments} enrollments · ₹{course.price.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                    <span
                                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${course.published
                                                ? "bg-green-500/10 text-green-600"
                                                : "bg-yellow-500/10 text-yellow-600"
                                            }`}
                                    >
                                        {course.published ? "Published" : "Draft"}
                                    </span>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <button
                                            onClick={() => togglePublish(course)}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                            title={course.published ? "Unpublish" : "Publish"}
                                        >
                                            {course.published ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(course)}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course.id)}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded: Lessons */}
                                {expandedCourse === course.id && (
                                    <div className="bg-muted/20 border-t border-border px-4 py-4 pl-12 space-y-2">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-sm font-semibold text-foreground">
                                                Lessons ({course.lessons.length})
                                            </h4>
                                            <button
                                                onClick={() =>
                                                    setShowLessonForm(showLessonForm === course.id ? null : course.id)
                                                }
                                                className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
                                            >
                                                <Plus size={14} /> Add Lesson
                                            </button>
                                        </div>

                                        {/* Add Lesson Form */}
                                        {showLessonForm === course.id && (
                                            <form
                                                onSubmit={(e) => handleAddLesson(e, course.id)}
                                                className="bg-card border border-border rounded-xl p-4 space-y-3 mb-3"
                                            >
                                                <input
                                                    type="text"
                                                    required
                                                    value={lessonData.title}
                                                    onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                                                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                                    placeholder="Lesson title"
                                                />
                                                <input
                                                    type="text"
                                                    required
                                                    value={lessonData.videoUrl}
                                                    onChange={(e) => setLessonData({ ...lessonData, videoUrl: e.target.value })}
                                                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                                    placeholder="Video URL"
                                                />
                                                <div className="flex gap-2">
                                                    <Button type="submit" size="sm" className="rounded-lg">
                                                        Add Lesson
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => setShowLessonForm(null)}
                                                        className="rounded-lg"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </form>
                                        )}

                                        {course.lessons.length === 0 ? (
                                            <p className="text-sm text-muted-foreground py-2">No lessons yet.</p>
                                        ) : (
                                            course.lessons.map((lesson, idx) => (
                                                <div
                                                    key={lesson.id}
                                                    className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors group"
                                                >
                                                    <span className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                                                        {idx + 1}
                                                    </span>
                                                    <Video size={14} className="text-muted-foreground shrink-0" />
                                                    <span className="text-sm text-foreground flex-1 truncate">
                                                        {lesson.title}
                                                    </span>
                                                    <button
                                                        onClick={() => handleDeleteLesson(lesson.id)}
                                                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
