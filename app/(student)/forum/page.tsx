import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function ForumPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center max-w-xl flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <MessageSquare className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Q&A Forum</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
                Discuss complex medical board questions, clinical case studies, and exam strategies with other medical candidates and experts.
            </p>
            <Link href="/students">
                <Button className="rounded-full px-8 py-5">Enter Forum</Button>
            </Link>
        </div>
    );
}
