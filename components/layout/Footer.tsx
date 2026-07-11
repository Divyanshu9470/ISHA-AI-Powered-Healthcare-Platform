"use client";

import Link from "next/link";
import { Stethoscope, Facebook, Twitter, Instagram, Linkedin, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useState } from "react";

export function Footer() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
    const [email, setEmail] = useState("");

    return (
        <footer className="bg-[#030712] border-t border-border mt-auto pt-20 pb-8 relative overflow-hidden text-slate-400">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-all duration-300">
                                <Stethoscope className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-lg font-bold text-white">
                                Isha<span className="text-primary">Med</span>
                            </span>
                        </Link>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                            Empowering the next generation of medical professionals with world-class education and comprehensive resources.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: "#", label: "Facebook" },
                                { icon: Twitter, href: "#", label: "Twitter" },
                                { icon: Instagram, href: "#", label: "Instagram" },
                                { icon: Linkedin, href: "#", label: "LinkedIn" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Platform</h3>
                        <ul className="space-y-3 text-sm">
                            {["Courses", "Mentors", "Study Material", "Q&A Forum", "Test Series"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Helpful Resources Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Helpful Resources</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "Site Map", href: "#" },
                                { name: "Terms of Use", href: "#" },
                                { name: "Privacy Center", href: "#" },
                                { name: "Security Center", href: "#" },
                                { name: "Accessibility Center", href: "#" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Us Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">About Us</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "Contact Us", href: "#" },
                                { name: "Company", href: "#" },
                                { name: "Our Programs", href: "#" },
                                { name: "Blogs", href: "#" },
                                { name: "FAQs", href: "#" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Stay Updated</h3>
                        <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                            Get the latest medical updates, exam tips, and course announcements delivered to your inbox.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative flex-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-300 placeholder:text-slate-500 text-slate-200"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-coral text-coral-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-300 shadow-md shadow-coral/20 flex items-center gap-1"
                            >
                                Join <ArrowRight size={14} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} IshaMed Platform. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors duration-200">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
