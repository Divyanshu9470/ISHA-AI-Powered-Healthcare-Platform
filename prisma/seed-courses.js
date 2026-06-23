const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.course.deleteMany();

  const subjects = [
    { name: "Anatomy", thumb: "/courses/anatomy.png", level: "Pre-clinical", exam: "USMLE Step 1" },
    { name: "Physiology", thumb: "/courses/physiology.png", level: "Pre-clinical", exam: "USMLE Step 1" },
    { name: "Biochemistry", thumb: "/courses/biochemistry.png", level: "Pre-clinical", exam: "USMLE Step 1" },
    { name: "Pathology", thumb: "/courses/pathology.png", level: "Para-clinical", exam: "USMLE Step 1" },
    { name: "Pharmacology", thumb: "/courses/pharmacology.png", level: "Para-clinical", exam: "FMGE" },
    { name: "Microbiology", thumb: "/courses/microbiology.png", level: "Para-clinical", exam: "USMLE Step 1" },
    { name: "Forensic Medicine", thumb: "/courses/forensic.png", level: "Para-clinical", exam: "NEET PG" },
    { name: "Community Medicine", thumb: "/courses/community.png", level: "Para-clinical", exam: "FMGE" },
    { name: "Medicine", thumb: "/courses/medicine.png", level: "Clinical", exam: "PLAB 1" },
    { name: "Surgery", thumb: "/courses/surgery.png", level: "Clinical", exam: "NEET PG" },
    { name: "Pediatrics", thumb: "/courses/pediatrics.png", level: "Clinical", exam: "PLAB 1" },
    { name: "OBG", thumb: "/courses/obg.png", level: "Clinical", exam: "MRCP Part 1" },
    { name: "ENT", thumb: "/courses/ent.png", level: "Clinical", exam: "NEET PG" },
    { name: "Ophthalmology", thumb: "/courses/ophthalmology.png", level: "Clinical", exam: "USMLE Step 2 CK" },
    { name: "Dermatology", thumb: "/courses/dermatology.png", level: "Clinical", exam: "NEET PG" },
    { name: "Psychiatry", thumb: "/courses/psychiatry.png", level: "Clinical", exam: "USMLE Step 2 CK" },
    { name: "Radiology", thumb: "/courses/radiology.png", level: "Clinical", exam: "NEET PG" },
    { name: "Anesthesia", thumb: "/courses/medicine.png", level: "Clinical", exam: "NEET PG" }, // Reusing medicine
    { name: "Orthopedics", thumb: "/courses/surgery.png", level: "Clinical", exam: "NEET PG" } // Reusing surgery
  ];

  for (const sub of subjects) {
    await prisma.course.create({
      data: {
        title: `Comprehensive ${sub.name} for ${sub.exam}`,
        description: `Master all concepts of ${sub.name} with our high-yield video lectures and clinical correlations.`,
        price: 99.99 + (Math.random() * 50),
        category: sub.name,
        exam: sub.exam,
        level: sub.level,
        published: true,
        thumbnail: sub.thumb
      }
    });
  }

  console.log(`Seeded ${subjects.length} courses successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
