import { CourseCard } from "@/components/ui/CourseCard";
import { CourseSidebar } from "@/components/layout/CourseSidebar";
import { prisma } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Medical Board Prep Course Catalog | IshaMed",
    description: "Browse high-yield medical courses designed for USMLE, PLAB, NEET PG, and FMGE. Filter by specialty, syllabus, or exam level to find the right module.",
    keywords: ["medical board prep", "USMLE prep courses", "NEET PG medical coaching", "FMGE preparation", "medical learning syllabus"]
};

interface CoursesPageProps {
    searchParams: Promise<{
        category?: string | string[];
        exam?: string | string[];
        level?: string | string[];
    }>;
}

const MOCK_COURSES = [
    { id: "anatomy-101", title: "Comprehensive Anatomy for USMLE Step 1", description: "Master all concepts of Anatomy with our high-yield video lectures and clinical correlations.", price: 129.99, category: "Anatomy", exam: "USMLE Step 1", level: "Pre-clinical", published: true, thumbnail: "/courses/anatomy.png" },
    { id: "physiology-101", title: "Comprehensive Physiology for USMLE Step 1", description: "Master all concepts of Physiology with our high-yield video lectures.", price: 119.99, category: "Physiology", exam: "USMLE Step 1", level: "Pre-clinical", published: true, thumbnail: "/courses/physiology.png" },
    { id: "biochem-101", title: "Comprehensive Biochemistry for USMLE Step 1", description: "Master all concepts of Biochemistry with our clinical correlations.", price: 99.99, category: "Biochemistry", exam: "USMLE Step 1", level: "Pre-clinical", published: true, thumbnail: "/courses/biochemistry.png" },
    { id: "patho-basics", title: "General Pathology: Cell Injury", description: "Understanding the basics of cell injury, adaptation, and death.", price: 149.99, category: "Pathology", exam: "USMLE Step 1", level: "Para-clinical", published: true, thumbnail: "/placeholder-2.png" },
    { id: "pharmacology-101", title: "Comprehensive Pharmacology for FMGE", description: "Master all concepts of Pharmacology with high-yield video lectures.", price: 139.99, category: "Pharmacology", exam: "FMGE", level: "Para-clinical", published: true, thumbnail: "/courses/pharmacology.png" },
    { id: "microbiology-101", title: "Comprehensive Microbiology for USMLE Step 1", description: "Master all concepts of Microbiology with clinical correlations.", price: 109.99, category: "Microbiology", exam: "USMLE Step 1", level: "Para-clinical", published: true, thumbnail: "/courses/microbiology.png" },
    { id: "forensic-101", title: "Comprehensive Forensic Medicine for NEET PG", description: "Master all concepts of Forensic Medicine with clinical correlations.", price: 124.99, category: "Forensic Medicine", exam: "NEET PG", level: "Para-clinical", published: true, thumbnail: "/courses/forensic.png" },
    { id: "community-101", title: "Comprehensive Community Medicine for FMGE", description: "Master all concepts of Community Medicine.", price: 114.99, category: "Community Medicine", exam: "FMGE", level: "Para-clinical", published: true, thumbnail: "/courses/community.png" },
    { id: "medicine-101", title: "Comprehensive Medicine for PLAB 1", description: "Master all concepts of Medicine with clinical correlations.", price: 149.99, category: "Medicine", exam: "PLAB 1", level: "Clinical", published: true, thumbnail: "/courses/medicine.png" },
    { id: "surgery-101", title: "Comprehensive Surgery for NEET PG", description: "Master all concepts of Surgery with clinical correlations.", price: 139.99, category: "Surgery", exam: "NEET PG", level: "Clinical", published: true, thumbnail: "/courses/surgery.png" },
    { id: "pediatrics-101", title: "Comprehensive Pediatrics for PLAB 1", description: "Master all concepts of Pediatrics.", price: 119.99, category: "Pediatrics", exam: "PLAB 1", level: "Clinical", published: true, thumbnail: "/courses/pediatrics.png" },
    { id: "obg-101", title: "Comprehensive OBG for MRCP Part 1", description: "Master all concepts of OBG.", price: 129.99, category: "OBG", exam: "MRCP Part 1", level: "Clinical", published: true, thumbnail: "/courses/obg.png" },
    { id: "ent-101", title: "Comprehensive ENT for NEET PG", description: "Master all concepts of ENT.", price: 109.99, category: "ENT", exam: "NEET PG", level: "Clinical", published: true, thumbnail: "/courses/ent.png" },
    { id: "ophthalmology-101", title: "Comprehensive Ophthalmology for USMLE Step 2 CK", description: "Master all concepts of Ophthalmology.", price: 119.99, category: "Ophthalmology", exam: "USMLE Step 2 CK", level: "Clinical", published: true, thumbnail: "/courses/ophthalmology.png" },
    { id: "dermatology-101", title: "Comprehensive Dermatology for NEET PG", description: "Master all concepts of Dermatology.", price: 99.99, category: "Dermatology", exam: "NEET PG", level: "Clinical", published: true, thumbnail: "/courses/dermatology.png" },
    { id: "psychiatry-101", title: "Comprehensive Psychiatry for USMLE Step 2 CK", description: "Master all concepts of Psychiatry.", price: 114.99, category: "Psychiatry", exam: "USMLE Step 2 CK", level: "Clinical", published: true, thumbnail: "/courses/psychiatry.png" },
    { id: "radiology-101", title: "Comprehensive Radiology for NEET PG", description: "Master all concepts of Radiology.", price: 124.99, category: "Radiology", exam: "NEET PG", level: "Clinical", published: true, thumbnail: "/courses/radiology.png" }
];

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
    const params = await searchParams;
    
    // Normalize params to arrays
    const categories = Array.isArray(params.category) ? params.category : params.category ? [params.category] : [];
    const exams = Array.isArray(params.exam) ? params.exam : params.exam ? [params.exam] : [];
    const levels = Array.isArray(params.level) ? params.level : params.level ? [params.level] : [];

    const where: any = { published: true };

    if (categories.length > 0) {
        where.category = { in: categories };
    }
    
    if (exams.length > 0) {
        where.exam = { in: exams };
    }
    
    if (levels.length > 0) {
        where.level = { in: levels };
    }

    let courses: any[] = [];
    try {
        courses = await prisma.course.findMany({
            where,
            include: {
                lessons: true,
                enrollments: true
            },
            orderBy: { createdAt: "desc" },
        });
    } catch (e) {
        console.error("Database error, falling back to mock courses:", e);
        courses = MOCK_COURSES.map(c => ({
            ...c,
            lessons: [{ id: "l1" }, { id: "l2" }],
            enrollments: []
        })).filter((course) => {
            if (categories.length > 0 && !categories.includes(course.category)) return false;
            if (exams.length > 0 && !exams.includes(course.exam)) return false;
            if (levels.length > 0 && !levels.includes(course.level)) return false;
            return true;
        });
    }

    // Map instructor by category to one of the real seeded board mentors
    const mentorMap: { [key: string]: string } = {
        "Anatomy": "Dr. Isha Mishra",
        "Pathology": "Dr. Priya Sharma",
        "Physiology": "Dr. Ashwani Kumar",
        "Pharmacology": "Dr. Rajeev Seth",
        "Biochemistry": "Dr. Amit Patel",
        "Microbiology": "Dr. Priya Sharma",
        "Medicine": "Dr. Ashwani Kumar",
        "Surgery": "Dr. Rajeev Seth"
    };

    // We map the DB courses to match the CourseCard props format
    const formattedCourses = courses.map((course) => {
        const lessonCount = course.lessons?.length || 0;
        const totalMinutes = lessonCount * 45;
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        const durationStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

        return {
            id: course.id,
            title: course.title,
            instructor: mentorMap[course.category] || "Dr. Isha Mishra",
            thumbnail: course.thumbnail || "/placeholder-1.png",
            duration: durationStr,
            rating: 5.0,
            students: course.enrollments?.length || 0,
            category: course.category,
            price: course.price,
        };
    });

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore Courses</h1>
                <p className="text-muted-foreground text-lg">Master every subject with our comprehensive video library designed for medical students.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <aside className="md:col-span-1">
                    <CourseSidebar />
                </aside>

                <div className="md:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {formattedCourses.map((course) => (
                            <CourseCard key={course.id} {...course} />
                        ))}
                        {formattedCourses.length === 0 && (
                            <div className="col-span-full text-center py-12">
                                <p className="text-muted-foreground">No courses match your selected filters.</p>
                                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
