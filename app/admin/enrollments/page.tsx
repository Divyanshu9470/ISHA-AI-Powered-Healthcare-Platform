"use client";

import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

interface Enrollment {
    id: string;
    createdAt: string;
    user: { id: string; name: string | null; email: string };
    course: { id: string; title: string; price: number };
    paymentMethod: string;
}

export default function AdminEnrollmentsPage() {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/enrollments")
            .then((res) => res.json())
            .then((data) => {
                setEnrollments(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-foreground">Enrollments</h1>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <GraduationCap className="text-primary" size={28} />
                    Enrollments
                </h1>
                <p className="text-muted-foreground mt-1">
                    {enrollments.length} total enrollments
                </p>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="text-left px-5 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Student
                                </th>
                                <th className="text-left px-5 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Course
                                </th>
                                <th className="text-left px-5 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="text-left px-5 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Method
                                </th>
                                <th className="text-left px-5 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Enrolled On
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {enrollments.map((enrollment) => (
                                <tr
                                    key={enrollment.id}
                                    className="hover:bg-muted/10 transition-colors"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                                                {(enrollment.user.name || enrollment.user.email)[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {enrollment.user.name || "—"}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {enrollment.user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="text-sm font-medium text-foreground">
                                            {enrollment.course.title}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4 text-sm font-bold text-foreground">
                                        ₹{enrollment.course.price.toLocaleString("en-IN")}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                            enrollment.paymentMethod === 'UPI' ? 'bg-blue-100 text-blue-700' :
                                            enrollment.paymentMethod === 'CARD' ? 'bg-purple-100 text-purple-700' :
                                            'bg-slate-100 text-slate-600'
                                        }`}>
                                            {enrollment.paymentMethod}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-muted-foreground">
                                        {new Date(enrollment.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {enrollments.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground text-sm">
                        No enrollments yet.
                    </div>
                )}
            </div>
        </div>
    );
}
