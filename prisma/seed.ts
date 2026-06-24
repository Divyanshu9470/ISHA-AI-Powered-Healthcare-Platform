import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log("Start seeding...");

    // Clean existing database records to prevent duplicate key errors
    await prisma.transaction.deleteMany();
    await prisma.simulatorSession.deleteMany();
    await prisma.flashcardProgress.deleteMany();
    await prisma.flashcard.deleteMany();
    await prisma.flashcardDeck.deleteMany();
    await prisma.testScore.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.course.deleteMany();
    await prisma.user.deleteMany();

    const hashedPasswordAdmin = await bcrypt.hash('password123', 10)
    const hashedPasswordStudent = await bcrypt.hash('student123', 10)

    // 1. Create Expert Mentors (Admin role)
    const mentors = [
        { email: 'isha@example.com', name: 'Dr. Isha Mishra' },
        { email: 'ashwani@example.com', name: 'Dr. Ashwani Kumar' },
        { email: 'rajeev@example.com', name: 'Dr. Rajeev Seth' },
        { email: 'priya@example.com', name: 'Dr. Priya Sharma' },
        { email: 'amit@example.com', name: 'Dr. Amit Patel' }
    ];

    const adminUsers = [];
    for (const mentor of mentors) {
        const admin = await prisma.user.create({
            data: {
                email: mentor.email,
                name: mentor.name,
                password: hashedPasswordAdmin,
                role: 'ADMIN'
            }
        });
        adminUsers.push(admin);
    }
    console.log(`Seeded ${adminUsers.length} admin mentors.`);

    // 2. Create the primary Test Student
    const testStudent = await prisma.user.create({
        data: {
            email: 'student@example.com',
            name: 'Test Student',
            password: hashedPasswordStudent,
            role: 'STUDENT'
        }
    });

    // 3. Create other students to calculate realistic ranks
    const studentNames = [
        "Aarav Mehta", "Ananya Iyer", "Rahul Sharma", "Sneha Patil", 
        "Vikram Singh", "Kabir Kapoor", "Diya Malhotra", "Rohan Joshi", 
        "Nisha Verma", "Aditya Reddy", "Meera Nair", "Arjun Gupta"
    ];

    const allStudents = [testStudent];
    for (let i = 0; i < studentNames.length; i++) {
        const student = await prisma.user.create({
            data: {
                email: `student${i + 1}@example.com`,
                name: studentNames[i],
                password: hashedPasswordStudent,
                role: 'STUDENT'
            }
        });
        allStudents.push(student);
    }
    console.log(`Seeded ${allStudents.length} students in total.`);

    // 4. Create courses (realistic categories, prices, levels, and exams)
    const courseDetails = [
        { id: "anatomy-101", title: "Comprehensive Anatomy for USMLE Step 1", description: "Master all concepts of Anatomy with our high-yield video lectures and clinical correlations.", price: 129.99, category: "Anatomy", exam: "USMLE Step 1", level: "Pre-clinical", thumbnail: "/courses/anatomy.png" },
        { id: "physiology-101", title: "Comprehensive Physiology for USMLE Step 1", description: "Master all concepts of Physiology with our high-yield video lectures.", price: 119.99, category: "Physiology", exam: "USMLE Step 1", level: "Pre-clinical", thumbnail: "/courses/physiology.png" },
        { id: "biochem-101", title: "Comprehensive Biochemistry for USMLE Step 1", description: "Master all concepts of Biochemistry with our clinical correlations.", price: 99.99, category: "Biochemistry", exam: "USMLE Step 1", level: "Pre-clinical", thumbnail: "/courses/biochemistry.png" },
        { id: "patho-basics", title: "General Pathology: Cell Injury", description: "Understanding the basics of cell injury, adaptation, and death.", price: 149.99, category: "Pathology", exam: "USMLE Step 1", level: "Para-clinical", thumbnail: "/placeholder-2.png" },
        { id: "pharmacology-101", title: "Comprehensive Pharmacology for FMGE", description: "Master all concepts of Pharmacology with high-yield video lectures.", price: 139.99, category: "Pharmacology", exam: "FMGE", level: "Para-clinical", thumbnail: "/courses/pharmacology.png" },
        { id: "microbiology-101", title: "Comprehensive Microbiology for USMLE Step 1", description: "Master all concepts of Microbiology with clinical correlations.", price: 109.99, category: "Microbiology", exam: "USMLE Step 1", level: "Para-clinical", thumbnail: "/courses/microbiology.png" },
        { id: "medicine-101", title: "Comprehensive Medicine for PLAB 1", description: "Master all concepts of Medicine with clinical correlations.", price: 149.99, category: "Medicine", exam: "PLAB 1", level: "Clinical", thumbnail: "/courses/medicine.png" },
        { id: "surgery-101", title: "Comprehensive Surgery for NEET PG", description: "Master all concepts of Surgery with clinical correlations.", price: 139.99, category: "Surgery", exam: "NEET PG", level: "Clinical", thumbnail: "/courses/surgery.png" }
    ];

    const courses = [];
    for (const c of courseDetails) {
        const course = await prisma.course.create({
            data: {
                id: c.id,
                title: c.title,
                description: c.description,
                price: c.price,
                category: c.category,
                exam: c.exam,
                level: c.level,
                published: true,
                thumbnail: c.thumbnail
            }
        });

        // Add 2 lessons to each course
        await prisma.lesson.create({
            data: {
                title: `Introduction to ${c.category}`,
                description: `Foundational concepts of ${c.category} for board prep exams.`,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                courseId: course.id
            }
        });

        await prisma.lesson.create({
            data: {
                title: `${c.category} Advanced High-Yield Topics`,
                description: `Direct clinical correlations and board exam question breakdowns.`,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
                courseId: course.id
            }
        });

        courses.push(course);
    }
    console.log(`Seeded ${courses.length} courses with lessons.`);

    // 5. Enroll testStudent in a few courses
    const enrolledCourses = ["anatomy-101", "patho-basics", "physiology-101"];
    for (const cid of enrolledCourses) {
        await prisma.enrollment.create({
            data: {
                userId: testStudent.id,
                courseId: cid
            }
        });
    }
    console.log(`Enrolled test student in ${enrolledCourses.length} courses.`);

    // 6. Seed test scores for students
    // We seed scores for all students to calculate a real rank
    // For testStudent: we seed scores that result in an average of ~76.7%
    const testStudentScores = [
        { subject: "Anatomy", score: 85, maxScore: 100, daysAgo: 10 },
        { subject: "Pathology", score: 65, maxScore: 100, daysAgo: 8 },
        { subject: "Pharmacology", score: 90, maxScore: 100, daysAgo: 6 },
        { subject: "Physiology", score: 70, maxScore: 100, daysAgo: 4 },
        { subject: "Biochemistry", score: 60, maxScore: 100, daysAgo: 2 },
        { subject: "Microbiology", score: 80, maxScore: 100, daysAgo: 1 }
    ];

    for (const ts of testStudentScores) {
        const scoreDate = new Date();
        scoreDate.setDate(scoreDate.getDate() - ts.daysAgo);
        await prisma.testScore.create({
            data: {
                userId: testStudent.id,
                subject: ts.subject,
                score: ts.score,
                maxScore: ts.maxScore,
                date: scoreDate
            }
        });
    }

    // Seed other students' scores (lower and higher averages to place our student in the middle, say rank #5 of 13)
    const otherAverages = [95, 92, 88, 82, 74, 71, 68, 62, 59, 55, 48, 40];
    const subjects = ["Anatomy", "Pathology", "Pharmacology", "Physiology", "Biochemistry", "Microbiology"];

    for (let i = 0; i < otherAverages.length; i++) {
        const student = allStudents[i + 1];
        const avg = otherAverages[i];
        // Create 3 scores for this student that average to `avg`
        for (let j = 0; j < 3; j++) {
            await prisma.testScore.create({
                data: {
                    userId: student.id,
                    subject: subjects[j % subjects.length],
                    score: avg + (j === 0 ? 5 : j === 1 ? -5 : 0),
                    maxScore: 100
                }
            });
        }
    }
    console.log("Seeded test scores for all students.");

    // 7. Seed simulator sessions for testStudent
    const sessions = [
        { patientCase: "Acute Appendicitis", score: 85.0, status: "COMPLETED" },
        { patientCase: "Myocardial Infarction", score: 90.0, status: "COMPLETED" },
        { patientCase: "Diabetic Ketoacidosis", score: 0.0, status: "IN_PROGRESS" }
    ];

    for (const s of sessions) {
        await prisma.simulatorSession.create({
            data: {
                userId: testStudent.id,
                patientCase: s.patientCase,
                score: s.status === "COMPLETED" ? s.score : null,
                status: s.status
            }
        });
    }
    console.log("Seeded simulator sessions.");

    // 8. Seed flashcard decks, cards and progress
    const decksData = [
        {
            id: "deck-1",
            title: "Cardiovascular Pathology",
            description: "High-yield flashcards covering valvular diseases, cardiomyopathies, and congenital heart defects.",
            subject: "Pathology",
            imageUrl: "https://images.unsplash.com/photo-1530026339112-2884161bd984?q=80&w=800&auto=format&fit=crop",
            cards: [
                { question: "What is the most common cause of Mitral Stenosis?", answer: "Rheumatic Heart Disease", explanation: "Rheumatic fever causes fibrous thickening and calcification of the valve leaflets and chordae tendineae." },
                { question: "Which valvular lesion is associated with water-hammer pulse?", answer: "Aortic Regurgitation", explanation: "The rapid upstroke and collapse of the arterial pulse is caused by a large stroke volume and rapid backflow." },
                { question: "What cardiomyopathy is characterized by asymmetric septal hypertrophy?", answer: "Hypertrophic Obstructive Cardiomyopathy (HOCM)", explanation: "HOCM is usually inherited in an autosomal dominant fashion with mutations in sarcomere proteins." }
            ]
        },
        {
            id: "deck-2",
            title: "Upper Limb Anatomy",
            description: "Detailed muscular insertions, nerve supplies, and clinical correlations of the brachial plexus.",
            subject: "Anatomy",
            imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop",
            cards: [
                { question: "What nerve is injured in Erb-Duchenne palsy?", answer: "Upper Trunk of Brachial Plexus (C5-C6)", explanation: "Caused by traction on the neck, resulting in a 'waiter's tip' arm position." },
                { question: "Which muscle initiates abduction of the arm?", answer: "Supraspinatus (0-15 degrees)", explanation: "The deltoid muscle continues abduction up to 90 degrees." },
                { question: "Injury to which nerve leads to 'claw hand' deformity?", answer: "Ulnar Nerve (C8-T1)", explanation: "Leads to loss of function of the intrinsic hand muscles." }
            ]
        },
        {
            id: "deck-3",
            title: "Antibiotics Masterclass",
            description: "Mechanism of action, spectrum of activity, and key side effects for USMLE/NEET-PG.",
            subject: "Pharmacology",
            imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
            cards: [
                { question: "What is the mechanism of action of Penicillins?", answer: "Inhibits Cell Wall Synthesis", explanation: "Binds to penicillin-binding proteins (PBPs) to block cross-linking of peptidoglycan." },
                { question: "Which antibiotic group is notorious for causing Gray Baby Syndrome?", answer: "Chloramphenicol", explanation: "Caused by the lack of glucuronyl transferase enzyme in neonates to metabolize the drug." },
                { question: "What side effect is associated with fluoroquinolones like Ciprofloxacin?", answer: "Tendon Rupture / Tendonitis", explanation: "Increased risk of Achilles tendon rupture, especially in elderly or patients on corticosteroids." }
            ]
        }
    ];

    for (const d of decksData) {
        const deck = await prisma.flashcardDeck.create({
            data: {
                id: d.id,
                title: d.title,
                description: d.description,
                subject: d.subject,
                imageUrl: d.imageUrl,
                isPublic: true
            }
        });

        // Add cards and review progress for testStudent
        for (let idx = 0; idx < d.cards.length; idx++) {
            const cardData = d.cards[idx];
            const card = await prisma.flashcard.create({
                data: {
                    id: `${d.id}-card-${idx + 1}`,
                    deckId: deck.id,
                    question: cardData.question,
                    answer: cardData.answer,
                    explanation: cardData.explanation,
                    difficulty: idx === 0 ? "Easy" : idx === 1 ? "Medium" : "Hard"
                }
            });

            // Seed review progress:
            // Let's make some mastered, some learning/review, some today, some yesterday to get a streak of 2 days
            let status = "LEARNING";
            let interval = 1;
            let lastReview = new Date();

            if (idx === 0) {
                status = "MASTERED";
                interval = 35; // mastered is > 30 days
                lastReview.setDate(lastReview.getDate() - 1); // Reviewed yesterday
            } else if (idx === 1) {
                status = "REVIEW";
                interval = 5;
                lastReview = new Date(); // Reviewed today
            } else {
                status = "NEW";
                lastReview = new Date(); // Reviewed today
            }

            await prisma.flashcardProgress.create({
                data: {
                    userId: testStudent.id,
                    flashcardId: card.id,
                    interval,
                    easeFactor: 2.5,
                    repetitions: status === "NEW" ? 0 : 2,
                    status,
                    lastReview,
                    streak: status === "NEW" ? 0 : 2
                }
            });
        }
    }
    console.log("Seeded flashcard decks, cards, and study progress.");

    console.log("Database seeded successfully!");
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
