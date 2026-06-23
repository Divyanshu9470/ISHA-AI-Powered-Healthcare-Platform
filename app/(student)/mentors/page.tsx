import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function MentorsPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center max-w-xl flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Board Prep Mentors</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
                Connect with top-rankers, practicing physicians, and expert medical educators. Get personalized coaching for USMLE, PLAB, and PG medical exams.
            </p>
            <Link href="/students">
                <Button className="rounded-full px-8 py-5">Find a Mentor</Button>
            </Link>
        </div>
    );
}
