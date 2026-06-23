"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function CourseSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    // Get current filter values from URL
    const currentCategories = searchParams.getAll("category");
    const currentExams = searchParams.getAll("exam");
    const currentLevels = searchParams.getAll("level");

    const categories = [
        "Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology", "Microbiology", 
        "Forensic Medicine", "Community Medicine", "Medicine", "Surgery", "Pediatrics", 
        "OBG", "ENT", "Ophthalmology", "Dermatology", "Psychiatry", "Radiology", "Anesthesia", "Orthopedics"
    ];

    const exams = [
        "USMLE Step 1", "USMLE Step 2 CK", "PLAB 1", "PLAB 2", "MRCP Part 1", "MCCQE", "NEET PG", "FMGE"
    ];

    const levels = ["Pre-clinical", "Para-clinical", "Clinical", "Post-graduate"];

    const toggleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const existingValues = params.getAll(key);
        
        if (existingValues.includes(value)) {
            // Remove the value
            const newValues = existingValues.filter(v => v !== value);
            params.delete(key);
            newValues.forEach(v => params.append(key, v));
        } else {
            // Add the value
            params.append(key, value);
        }
        
        router.push(`${pathname}?${params.toString()}`);
    };

    const resetFilters = () => {
        router.push(pathname);
    };

    const isChecked = (key: string, value: string) => {
        return searchParams.getAll(key).includes(value);
    };

    return (
        <>
            <Button
                variant="outline"
                className="md:hidden w-full mb-4 gap-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Filter size={16} /> Filters
            </Button>

            <div className={cn(
                "bg-card border border-border rounded-xl p-6 h-fit sticky top-24 transition-all duration-300",
                isOpen ? "block" : "hidden md:block"
            )}>
                <div className="flex items-center justify-between mb-6 md:hidden">
                    <h3 className="font-bold text-foreground">Filters</h3>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X size={20} />
                    </Button>
                </div>

                <div className="mb-8">
                    <h3 className="font-bold text-foreground mb-4">Subject</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {categories.map((category) => (
                            <label key={category} className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input 
                                        type="checkbox" 
                                        className="peer h-4 w-4 border border-input rounded text-primary focus:ring-primary/20"
                                        checked={isChecked("category", category)}
                                        onChange={() => toggleFilter("category", category)}
                                    />
                                </div>
                                <span className={cn(
                                    "text-sm transition-colors",
                                    isChecked("category", category) ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground"
                                )}>
                                    {category}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="font-bold text-foreground mb-4">Target Exam</h3>
                    <div className="space-y-2">
                        {exams.map((exam) => (
                            <label key={exam} className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="h-4 w-4 border border-input rounded text-primary focus:ring-primary/20"
                                    checked={isChecked("exam", exam)}
                                    onChange={() => toggleFilter("exam", exam)}
                                />
                                <span className={cn(
                                    "text-sm transition-colors",
                                    isChecked("exam", exam) ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground"
                                )}>
                                    {exam}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="font-bold text-foreground mb-4">Level</h3>
                    <div className="space-y-2">
                        {levels.map((level) => (
                            <label key={level} className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="h-4 w-4 border border-input rounded text-primary focus:ring-primary/20"
                                    checked={isChecked("level", level)}
                                    onChange={() => toggleFilter("level", level)}
                                />
                                <span className={cn(
                                    "text-sm transition-colors",
                                    isChecked("level", level) ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground"
                                )}>
                                    {level}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <Button className="w-full" variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </div>
        </>
    );
}
