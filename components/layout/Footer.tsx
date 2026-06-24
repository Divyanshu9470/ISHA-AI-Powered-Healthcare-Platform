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
        <footer ref={ref} className="bg-muted/20 border-t border-border mt-auto pt-20 pb-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px]" />

            <motion.div
                className="container mx-auto px-4 md:px-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-all duration-300">
                                <Stethoscope className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-lg font-bold text-foreground">
                                Isha<span className="text-primary">Med</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
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
                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Platform</h3>
                        <ul className="space-y-3 text-sm">
                            {["Courses", "Mentors", "Study Material", "Q&A Forum", "Test Series"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 group">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Helpful Resources Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Helpful Resources</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "Site Map", href: "#" },
                                { name: "Terms of Use", href: "#" },
                                { name: "Privacy Center", href: "#" },
                                { name: "Security Center", href: "#" },
                                { name: "Accessibility Center", href: "#" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 group">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Us Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">About Us</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "Contact Us", href: "#" },
                                { name: "Company", href: "#" },
                                { name: "Our Programs", href: "#" },
                                { name: "Blogs", href: "#" },
                                { name: "FAQs", href: "#" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 group">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Stay Updated</h3>
                        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                            Get the latest medical updates, exam tips, and course announcements delivered to your inbox.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative flex-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-300 placeholder:text-muted-foreground/60"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-coral text-coral-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-md shadow-coral/20 flex items-center gap-1"
                            >
                                Join <ArrowRight size={14} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} IshaMed Platform. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-foreground transition-colors duration-200">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground transition-colors duration-200">Terms of Service</Link>
                        <Link href="#" className="hover:text-foreground transition-colors duration-200">Refund Policy</Link>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
                    Made with <Heart size={11} className="text-coral fill-coral" /> for future doctors.
                </div>
            </motion.div>
        </footer>
    );
}
