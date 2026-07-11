import React from "react";
import Link from "next/link";
import { NavbarStudent } from "@/components/layout/NavbarStudent";
import { FooterStudent } from "@/components/layout/FooterStudent";
import { Metadata } from "next";
import { Activity, Sparkles, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Interactive Anatomy Viewer | IshaMed",
  description: "High-yield interactive 3D anatomy laboratory for medical board examinations (NEET PG, USMLE, FMGE) - Coming Soon.",
};

export default function AnatomyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      <NavbarStudent />
      
      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4">
        <div className="max-w-2xl w-full text-center space-y-8 relative py-12 px-6 rounded-3xl bg-[#080c14] border border-white/5 shadow-2xl">
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="relative inline-flex items-center justify-center p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
            <Activity className="w-10 h-10 animate-pulse" />
            <Sparkles className="w-4 h-4 absolute top-2 right-2 text-emerald-300 animate-bounce" />
          </div>

          {/* Heading */}
          <div className="space-y-4 relative">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 uppercase">
              Under Development
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Anatomy Laboratory
            </h1>
            <p className="text-2xl font-bold text-slate-300">
              Interactive 3D Atlas Coming Soon
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-400 leading-relaxed text-base max-w-md mx-auto relative">
            We are building a premium, GPU-accelerated 3D anatomical model viewer with clinical case mapping, high-yield organ dissecting, and FMGE/NEET-PG board exam correlation.
          </p>

          {/* CTA Link */}
          <div className="relative pt-4">
            <Link 
              href="/students" 
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-slate-900 border border-white/10 hover:border-emerald-500/30 text-slate-200 hover:text-white rounded-full hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-black/40 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Student Dashboard
            </Link>
          </div>
        </div>
      </main>

      <FooterStudent />
    </div>
  );
}
