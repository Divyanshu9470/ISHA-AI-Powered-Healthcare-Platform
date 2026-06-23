"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Trash2, ExternalLink, X, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LiveClass {
    id: string;
    title: string;
    meetLink: string;
    scheduledAt: string;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    SCHEDULED: "bg-blue-500/10 text-blue-600",
    LIVE: "bg-red-500/10 text-red-600",
    COMPLETED: "bg-green-500/10 text-green-600",
};

export default function AdminLiveClassesPage() {
    const [classes, setClasses] = useState<LiveClass[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        meetLink: "",
        scheduledAt: "",
    });

    const fetchClasses = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/live-classes");
            const data = await res.json();
            setClasses(data);
        } catch (e) {
            console.error("Failed to fetch live classes:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClasses();
    }, [fetchClasses]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/admin/live-classes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        setFormData({ title: "", meetLink: "", scheduledAt: "" });
        setShowForm(false);
        fetchClasses();
    };

    const updateStatus = async (id: string, status: string) => {
        await fetch(`/api/admin/live-classes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        fetchClasses();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this live class?")) return;
        await fetch(`/api/admin/live-classes/${id}`, { method: "DELETE" });
        fetchClasses();
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-foreground">Live Classes</h1>
                <div className="space-y-3">
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
                    <h1 className="text-2xl font-bold text-foreground">Live Classes</h1>
                    <p className="text-muted-foreground mt-1">
                        Schedule and manage live sessions ({classes.length} total)
                    </p>
                </div>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="rounded-xl gap-2"
                >
                    <Plus size={18} /> Schedule Class
                </Button>
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Schedule a Live Class</h2>
                        <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="Pathology Doubt Session"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Meet Link</label>
                                <input
                                    type="url"
                                    required
                                    value={formData.meetLink}
                                    onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="https://meet.google.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Scheduled At</label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={formData.scheduledAt}
                                    onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="rounded-xl">
                            Schedule Class
                        </Button>
                    </form>
                </div>
            )}

            {/* Classes List */}
            <div className="space-y-3">
                {classes.length === 0 ? (
                    <div className="bg-card border border-border rounded-2xl text-center py-16">
                        <p className="text-muted-foreground">No live classes scheduled yet.</p>
                    </div>
                ) : (
                    classes.map((cls) => (
                        <div
                            key={cls.id}
                            className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 hover:shadow-sm transition-shadow"
                        >
                            {/* Status indicator */}
                            <div className="shrink-0">
                                {cls.status === "LIVE" ? (
                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                        <Radio size={20} className="text-red-500 animate-pulse" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                        {new Date(cls.scheduledAt).getDate()}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground">{cls.title}</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {new Date(cls.scheduledAt).toLocaleString("en-IN", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </p>
                            </div>

                            {/* Status Badge */}
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[cls.status] || ""}`}>
                                {cls.status}
                            </span>

                            {/* Actions */}
                            <div className="flex items-center gap-1 shrink-0">
                                {cls.status === "SCHEDULED" && (
                                    <button
                                        onClick={() => updateStatus(cls.id, "LIVE")}
                                        className="text-xs bg-red-500/10 text-red-600 hover:bg-red-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                                    >
                                        Go Live
                                    </button>
                                )}
                                {cls.status === "LIVE" && (
                                    <button
                                        onClick={() => updateStatus(cls.id, "COMPLETED")}
                                        className="text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                                    >
                                        End
                                    </button>
                                )}
                                <a
                                    href={cls.meetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                >
                                    <ExternalLink size={16} />
                                </a>
                                <button
                                    onClick={() => handleDelete(cls.id)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
