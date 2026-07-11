"use client";

import Link from "next/link";
import { Stethoscope, Facebook, Twitter, Instagram, Linkedin, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useState } from "react";

export function FooterClinical() {
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
        <footer className="bg-[#030712] border-t border-white/5 mt-auto pt-20 pb-8 relative overflow-hidden text-slate-400">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/clinical-copilot" className="flex items-center gap-2.5 mb-5 group">
                            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-all duration-300">
                                <Stethoscope className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-lg font-bold text-white">
                                Isha<span className="text-primary">Clinical</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 text-slate-300">
                            Empowering doctors and clinics with advanced medical OCR, structured SOAP note dictation, and evidence-based diagnostic synthesis.
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
                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Solutions Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Solutions</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "Interactive Demo", href: "/clinical-copilot#sandbox-demo" },
                                { name: "Clinical Copilot Tool", href: "/copilot" },
                                { name: "EHR / FHIR Integrations", href: "/clinical-copilot#features" },
                                { name: "Pricing Plans", href: "/clinical-copilot#pricing" }
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

                    {/* Helpful Resources Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">Helpful Resources</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "Site Map", href: "/sitemap" },
                                { name: "Terms of Use", href: "/terms" },
                                { name: "Privacy Center", href: "/privacy" },
                                { name: "Security Center", href: "/security" },
                                { name: "Accessibility Center", href: "/accessibility" }
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
                                { name: "Contact Us", href: "/contact" },
                                { name: "Company", href: "/about" },
                                { name: "Our Programs", href: "/courses" },
                                { name: "Blogs", href: "/blog" },
                                { name: "FAQs", href: "/faq" }
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
                        <p className="text-sm leading-relaxed mb-5 text-slate-300">
                            Get latest updates on HIPAA standards, product feature updates, and technical documentations.
                        </p>
                        {isSubmitted ? (
                            <div className="text-sm text-green-400 font-medium bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                                Thank you for subscribing!
                            </div>
                        ) : (
                            <form className="flex gap-2" onSubmit={handleSubscribe}>
                                <div className="relative flex-1">
                                    <input
                                        type="email"
                                        placeholder="clinician@health.org"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-300 placeholder:text-slate-600 text-white"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-blue-500/20 flex items-center gap-1 shrink-0"
                                >
                                    Join <ArrowRight size={14} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Isha Clinical. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
                        <Link href="/refunds" className="hover:text-white transition-colors duration-200">Refund Policy</Link>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
                    Made with <Heart size={11} className="text-red-500 fill-red-500" /> for modern clinicians.
                </div>
            </div>
        </footer>
    );
}
