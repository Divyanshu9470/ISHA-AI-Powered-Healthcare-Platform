import { Hero } from "@/components/sections/Hero";
import { InteractiveDemo } from "@/components/sections/InteractiveDemo";
import { Features } from "@/components/sections/Features";
import { SecurityTrust } from "@/components/sections/SecurityTrust";
import { Pricing } from "@/components/sections/Pricing";
import { CallToAction } from "@/components/sections/CallToAction";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ISHA Clinical Copilot — AI-Powered Practice Automation",
    description: "Automate complex medical report synthesis, generate structured SOAP notes, and integrate secure HIPAA-compliant AI into your clinical workflows.",
    openGraph: {
        title: "ISHA Clinical Copilot — AI-Powered Practice Automation",
        description: "Automate complex medical report synthesis, generate structured SOAP notes, and integrate secure HIPAA-compliant AI into your clinical workflows.",
        type: "website",
    }
};

export default function ClinicalCopilotPage() {
    return (
        <div className="flex flex-col">
            <Hero />
            <div id="sandbox-demo">
                <InteractiveDemo />
            </div>
            <div id="features">
                <Features />
            </div>
            <div id="security">
                <SecurityTrust />
            </div>
            <div id="pricing">
                <Pricing />
            </div>
            <CallToAction />
        </div>
    );
}
