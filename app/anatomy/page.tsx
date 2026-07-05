import React from "react";
import AnatomyViewer from "@/components/anatomy/AnatomyViewer";
import { NavbarStudent } from "@/components/layout/NavbarStudent";
import { FooterStudent } from "@/components/layout/FooterStudent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Anatomy Viewer | IshaMed",
  description: "High-yield interactive 3D anatomy laboratory for medical board examinations (NEET PG, USMLE, FMGE). Study clinical correlations and practice case questions.",
};

export default function AnatomyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <NavbarStudent />
      <main className="flex-grow pt-20">
        <AnatomyViewer />
      </main>
      <FooterStudent />
    </div>
  );
}
