import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center max-w-xl flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
                Your data privacy is our priority. We employ state-of-the-art encryption to isolate clinical records and student information. Read our full policy to learn more.
            </p>
            <Link href="/">
                <Button className="rounded-full px-8 py-5">Back to Home</Button>
            </Link>
        </div>
    );
}
