import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const hashedPasswordAdmin = await bcrypt.hash('password123', 10)
    const hashedPasswordStudent = await bcrypt.hash('student123', 10)

    // Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'isha@example.com' },
        update: {},
        create: {
            email: 'isha@example.com',
            name: 'Dr. Isha Mishra',
            password: hashedPasswordAdmin,
            role: 'ADMIN',
        },
    })

    // Create Student User
    const student = await prisma.user.upsert({
        where: { email: 'student@example.com' },
        update: {},
        create: {
            email: 'student@example.com',
            name: 'Test Student',
            password: hashedPasswordStudent,
            role: 'STUDENT',
        },
    })

    // Create Sample Course 1
    const course1 = await prisma.course.upsert({
        where: { id: 'anatomy-101' },
        update: {},
        create: {
            id: 'anatomy-101',
            title: 'Complete Human Anatomy: Upper Limb',
            description: 'Master the upper limb anatomy with 3D visualizations and mnemonics.',
            price: 2999,
            thumbnail: '/placeholder-1.png',
            published: true,
            lessons: {
                create: [
                    {
                        title: 'Introduction to Upper Limb',
                        videoUrl: 'https://example.com/video1.mp4',
                        description: 'Overview of bones and joints.',
                    },
                    {
                        title: 'Muscles of Pectoral Region',
                        videoUrl: 'https://example.com/video2.mp4',
                        description: 'Action and nerve supply of pectoralis major/minor.',
                    },
                ],
            },
        },
    })

    // Create Sample Course 2
    const course2 = await prisma.course.upsert({
        where: { id: 'patho-basics' },
        update: {},
        create: {
            id: 'patho-basics',
            title: 'General Pathology: Cell Injury',
            description: 'Understanding the basics of cell injury, adaptation, and death.',
            price: 1999,
            thumbnail: '/placeholder-2.png',
            published: true,
            lessons: {
                create: [
                    {
                        title: 'Cellular Adaptations',
                        videoUrl: 'https://example.com/video3.mp4',
                        description: 'Hypertrophy, hyperplasia, atrophy, and metaplasia.',
                    },
                ],
            },
        },
    })

    // Enroll student in Course 1
    await prisma.enrollment.create({
        data: {
            userId: student.id,
            courseId: course1.id,
        },
    }).catch(() => console.log('Already enrolled')) // Ignore if already enrolled

    console.log({ admin, student, course1, course2 })
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
