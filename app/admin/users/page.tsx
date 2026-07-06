"use client";

import { useEffect, useState } from "react";
import { Users, Shield, GraduationCap } from "lucide-react";

interface User {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    country: string | null;
    state: string | null;
    university: string | null;
    rollNumber: string | null;
    role: string;
    createdAt: string;
    _count: { enrollments: number };
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"ALL" | "ADMIN" | "STUDENT">("ALL");

    useEffect(() => {
        fetch("/api/admin/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered =
        filter === "ALL" ? users : users.filter((u) => u.role === filter);

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-foreground">Users</h1>
                <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Users</h1>
                    <p className="text-muted-foreground mt-1">
                        {users.length} registered users
                    </p>
                </div>
                <div className="flex gap-2">
                    {(["ALL", "ADMIN", "STUDENT"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === f
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {f === "ALL" ? "All" : f === "ADMIN" ? "Admins" : "Students"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    User
                                </th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Enrollments
                                </th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Joined
                                </th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filtered.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-muted/20 transition-colors"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                                                {(user.name || user.email)[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {user.name || "—"}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {user.email}
                                                </p>
                                                {user.phone && (
                                                    <p className="text-[10px] text-muted-foreground/85 mt-0.5 font-sans">
                                                        📞 {user.phone}
                                                    </p>
                                                )}
                                                {(user.university || user.rollNumber || user.state || user.country) && (
                                                    <div className="text-[9px] text-muted-foreground/75 mt-1 border-t border-border/20 pt-1 space-y-0.5 max-w-[200px] leading-tight">
                                                        {user.university && (
                                                            <p className="truncate">🏫 {user.university}</p>
                                                        )}
                                                        {user.rollNumber && (
                                                            <p className="truncate">🆔 Roll: {user.rollNumber}</p>
                                                        )}
                                                        {(user.state || user.country) && (
                                                            <p className="truncate">📍 {[user.state, user.country].filter(Boolean).join(", ")}</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${user.role === "ADMIN"
                                                    ? "bg-purple-500/10 text-purple-600"
                                                    : "bg-blue-500/10 text-blue-600"
                                                }`}
                                        >
                                            {user.role === "ADMIN" ? (
                                                <Shield size={12} />
                                            ) : (
                                                <GraduationCap size={12} />
                                            )}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-foreground">
                                        {user._count.enrollments}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-muted-foreground">
                                        {new Date(user.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <button
                                            onClick={async () => {
                                                const newRole = user.role === "ADMIN" ? "STUDENT" : "ADMIN";
                                                const res = await fetch("/api/admin/users", {
                                                    method: "PATCH",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ userId: user.id, role: newRole }),
                                                });
                                                if (res.ok) {
                                                    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u));
                                                }
                                            }}
                                            className="text-xs font-medium text-primary hover:underline underline-offset-4"
                                        >
                                            {user.role === "ADMIN" ? "Make Student" : "Make Admin"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground text-sm">
                        No users found.
                    </div>
                )}
            </div>
        </div>
    );
}
