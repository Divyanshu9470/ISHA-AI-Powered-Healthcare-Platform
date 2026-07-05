"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Video,
    GraduationCap,
    Stethoscope,
    ChevronLeft,
    ChevronRight,
    MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Live Classes", href: "/admin/live-classes", icon: Video },
    { label: "Enrollments", href: "/admin/enrollments", icon: GraduationCap },
    { label: "Feedback", href: "/admin/feedbacks", icon: MessageSquare },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "h-screen sticky top-0 bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out",
                collapsed ? "w-[72px]" : "w-[260px]"
            )}
        >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
                <Link href="/admin" className="flex items-center gap-2.5 min-w-0">
                    <div className="bg-primary/10 p-2 rounded-xl shrink-0">
                        <Stethoscope className="w-5 h-5 text-primary" />
                    </div>
                    {!collapsed && (
                        <div className="min-w-0">
                            <span className="text-lg font-bold text-foreground block">
                                Isha<span className="text-primary">Med</span>
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                                Admin Panel
                            </span>
                        </div>
                    )}
                </Link>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon size={20} className="shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            {!collapsed && (
                <div className="p-4 border-t border-border">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                        ← Back to Main Site
                    </Link>
                </div>
            )}
        </aside>
    );
}
