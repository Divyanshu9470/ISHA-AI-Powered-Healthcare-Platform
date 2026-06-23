import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function StudyMaterialPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center max-w-xl flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">High-Yield Study Material</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
                Access comprehensive clinical study guides, revision worksheets, laboratory interpretation charts, and curated memory aids for board prep.
            </p>
            <Link href="/students">
                <Button className="rounded-full px-8 py-5">Access Library</Button>
            </Link>
        </div>
    );
}
