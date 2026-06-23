import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function CareersPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center max-w-xl flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Briefcase className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Careers at IshaMed</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
                Join our mission to revolutionize clinical practice and medical board preparation. We are always looking for passionate engineers, clinicians, and medical educators.
            </p>
            <Link href="/">
                <Button className="rounded-full px-8 py-5">View Open Positions</Button>
            </Link>
        </div>
    );
}
