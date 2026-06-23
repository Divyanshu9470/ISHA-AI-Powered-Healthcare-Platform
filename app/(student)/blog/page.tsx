import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center max-w-xl flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">IshaMed Blog</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
                Insights, clinical case studies, medical exam tips, and updates on AI trends in healthcare. Our team and guest clinicians write weekly columns.
            </p>
            <Link href="/">
                <Button className="rounded-full px-8 py-5">Read Articles</Button>
            </Link>
        </div>
    );
}
