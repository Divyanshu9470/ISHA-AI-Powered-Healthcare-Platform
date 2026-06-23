import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Info } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center max-w-xl flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Info className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">About IshaMed</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
                IshaMed is a cutting-edge healthcare technology platform dedicated to empowering clinicians with AI-driven documentation tools and helping medical students master board exams.
            </p>
            <Link href="/">
                <Button className="rounded-full px-8 py-5">Back to Home</Button>
            </Link>
        </div>
    );
}
