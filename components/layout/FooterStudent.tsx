"use client";

import Link from "next/link";
import { Stethoscope, Facebook, Twitter, Instagram, Linkedin, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useState } from "react";

export function FooterStudent() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubmitted(true);
            setEmail("");
        }
    };

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/students" className="flex items-center gap-2.5 mb-5 group">
                            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-all duration-300">
                                <Stethoscope className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-lg font-bold text-foreground">
                                Isha<span className="text-primary">Med</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Empowering the next generation of medical professionals with world-class education, study materials, and simulation tools.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
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
                            {[
                                { name: "Courses", href: "/courses" },
                                { name: "Mentors", href: "/mentors" },
                                { name: "Study Material", href: "/study-material" },
                                { name: "Q&A Forum", href: "/forum" },
                                { name: "Test Series", href: "/test-series" }
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

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">Company</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "About Us", href: "/about" },
                                { name: "Careers", href: "/careers" },
                                { name: "Blog", href: "/blog" },
                                { name: "Contact", href: "/contact" }
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
                        {isSubmitted ? (
                            <div className="text-sm text-green-600 font-medium bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                                Thank you for subscribing!
                            </div>
                        ) : (
                            <form className="flex gap-2" onSubmit={handleSubscribe}>
                                <div className="relative flex-1">
                                    <input
                                        type="email"
                                        placeholder="future.doctor@med.edu"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-300 placeholder:text-muted-foreground/60 text-foreground"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-coral text-coral-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-md shadow-coral/20 flex items-center gap-1 shrink-0"
                                >
                                    Join <ArrowRight size={14} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} IshaMed Platform. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-foreground transition-colors duration-200">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors duration-200">Terms of Service</Link>
                        <Link href="/refunds" className="hover:text-foreground transition-colors duration-200">Refund Policy</Link>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
                    Made with <Heart size={11} className="text-coral fill-coral" /> for future doctors.
                </div>
            </motion.div>
        </footer>
    );
}
