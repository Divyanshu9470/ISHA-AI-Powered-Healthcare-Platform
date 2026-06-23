import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center max-w-xl flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
                By accessing IshaMed platforms, you agree to comply with our terms, user agreements, and acceptable usage guidelines for clinical decision support systems.
            </p>
            <Link href="/">
                <Button className="rounded-full px-8 py-5">Back to Home</Button>
            </Link>
        </div>
    );
}
