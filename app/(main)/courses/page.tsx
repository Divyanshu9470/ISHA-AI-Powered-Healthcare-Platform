import { CourseCard } from "@/components/ui/CourseCard";
import { CourseSidebar } from "@/components/layout/CourseSidebar";
import { prisma } from "@/lib/db";

interface CoursesPageProps {
    searchParams: Promise<{
        category?: string | string[];
        exam?: string | string[];
        level?: string | string[];
    }>;
}

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

    const courses = await prisma.course.findMany({
        where,
        orderBy: { createdAt: "desc" },
    });

    // We map the DB courses to match the CourseCard props format
    const formattedCourses = courses.map((course) => ({
        id: course.id,
        title: course.title,
        instructor: "Dr. Ashwani Kumar", // Hardcoded for now
        thumbnail: course.thumbnail || "/placeholder-1.png",
        duration: "52h 15m", // Above 50 hours as requested
        rating: 4.9,
        students: 120 + Math.floor(Math.random() * 50),
        category: course.category,
        price: course.price,
    }));

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
