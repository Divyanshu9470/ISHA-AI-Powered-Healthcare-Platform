"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Stethoscope, Moon, Sun, User as UserIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavbarClinical() {
    const { data: session } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        
        const stored = localStorage.getItem("theme");
        if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    const toggleDark = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const navLinks = [
        { name: "Home", href: "/clinical-copilot" },
        { name: "Interactive Demo", href: "/clinical-copilot#sandbox-demo" },
        { name: "Features", href: "/clinical-copilot#features" },
        { name: "Security & Trust", href: "/clinical-copilot#security" },
        { name: "Pricing", href: "/clinical-copilot#pricing" },
        { name: "Interactive Tool", href: "/copilot" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b border-transparent",
                isScrolled
                    ? "bg-background/70 backdrop-blur-xl border-border/50 shadow-sm py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/clinical-copilot" className="flex items-center gap-2.5 group flex-shrink-0">
                    <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-105">
                        <Stethoscope className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground sm:block">
                        Isha<span className="text-primary">Clinical</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1 xl:gap-6 mx-4 overflow-x-auto no-scrollbar">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-[13px] xl:text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 px-2 py-1 whitespace-nowrap after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {link.name}
                        </Link>
                    ))}
                    {session?.user?.role === "ADMIN" && (
                        <Link href="/admin" className="text-[13px] xl:text-sm font-bold text-red-500 hover:text-red-600 transition-colors px-2 py-1 whitespace-nowrap border-l border-border/50 ml-2">
                            Admin
                        </Link>
                    )}
                </div>

                <div className="hidden lg:flex items-center gap-3">
                    <button
                        onClick={toggleDark}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {session ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <UserIcon size={16} />
                                </div>
                                <span className="hidden lg:block text-foreground">{session.user?.name || "Clinician"}</span>
                            </div>
                            <button onClick={() => signOut()} className="text-muted-foreground hover:text-red-500 transition-colors p-2" title="Sign Out">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                                Log in
                            </Link>
                            <Link href="/register" className="inline-flex items-center justify-center whitespace-nowrap text-sm bg-primary text-primary-foreground h-10 px-6 font-semibold shadow-lg shadow-primary/20 rounded-full hover:scale-[1.02] transition-all duration-300">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center gap-2">
                    <button
                        onClick={toggleDark}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border p-6 shadow-xl animate-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-foreground py-3 px-4 rounded-xl hover:bg-muted hover:text-primary transition-all duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {session?.user?.role === "ADMIN" && (
                            <Link href="/admin" className="text-base font-medium text-red-500 py-3 px-4 rounded-xl hover:bg-muted transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>
                                Admin Dashboard
                            </Link>
                        )}
                        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                            {session ? (
                                <button onClick={() => signOut()} className="flex items-center justify-center gap-2 w-full text-red-500 font-medium py-2 hover:bg-red-50 rounded-xl transition-colors">
                                    <LogOut size={18} /> Sign Out
                                </button>
                            ) : (
                                <>
                                    <Link href="/login" className="flex items-center justify-center w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                                        Log in
                                    </Link>
                                    <Link href="/register" className="flex items-center justify-center w-full bg-primary text-primary-foreground py-2.5 rounded-full font-semibold shadow-md">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
