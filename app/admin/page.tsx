"use client";

import { useEffect, useState } from "react";
import {
    Users,
    BookOpen,
    GraduationCap,
    DollarSign,
    Video,
    FileText,
    TrendingUp,
    Clock,
} from "lucide-react";

interface Stats {
    totalUsers: number;
    studentCount: number;
    totalCourses: number;
    publishedCourses: number;
    totalLessons: number;
    totalEnrollments: number;
    totalLiveClasses: number;
    totalRevenue: number;
    recentEnrollments: {
        id: string;
        createdAt: string;
        user: { name: string | null; email: string };
        course: { title: string };
    }[];
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/stats")
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Loading...</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="text-center py-20">
                <p className="text-muted-foreground">Failed to load dashboard data.</p>
            </div>
        );
    }

    const statCards = [
        {
            label: "Total Users",
            value: stats.totalUsers,
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Students",
            value: stats.studentCount,
            icon: GraduationCap,
            color: "text-teal-500",
            bg: "bg-teal-500/10",
        },
        {
            label: "Total Courses",
            value: stats.totalCourses,
            icon: BookOpen,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            label: "Published",
            value: stats.publishedCourses,
            icon: TrendingUp,
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
        {
            label: "Total Lessons",
            value: stats.totalLessons,
            icon: FileText,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            label: "Enrollments",
            value: stats.totalEnrollments,
            icon: GraduationCap,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
        },
        {
            label: "Live Classes",
            value: stats.totalLiveClasses,
            icon: Video,
            color: "text-red-500",
            bg: "bg-red-500/10",
        },
        {
            label: "Est. Revenue",
            value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
            icon: DollarSign,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Welcome back! Here&apos;s an overview of your platform.
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-muted-foreground">
                                {card.label}
                            </span>
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}
                            >
                                <card.icon size={20} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-foreground">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-primary" />
                    Recent Enrollments
                </h2>
                {stats.recentEnrollments.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-4">No enrollments yet.</p>
                ) : (
                    <div className="space-y-3">
                        {stats.recentEnrollments.map((enrollment) => (
                            <div
                                key={enrollment.id}
                                className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                                        {(enrollment.user.name || enrollment.user.email)[0].toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {enrollment.user.name || enrollment.user.email}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            Enrolled in <span className="font-medium text-primary">{enrollment.course.title}</span>
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground shrink-0 ml-4">
                                    {new Date(enrollment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
