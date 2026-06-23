import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckSquare } from "lucide-react";

export default function TestSeriesPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center max-w-xl flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <CheckSquare className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Board Test Series</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
                Take high-fidelity subject tests and full-length exam simulations mapping to current USMLE, PLAB, and PG exam formats. Monitor your performance index.
            </p>
            <Link href="/students">
                <Button className="rounded-full px-8 py-5">Start Test Series</Button>
            </Link>
        </div>
    );
}
