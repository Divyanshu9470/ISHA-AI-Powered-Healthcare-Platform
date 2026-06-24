# IshaMed Platform: Quick Start Guide

Welcome to the **IshaMed Platform**, a unified application featuring two distinct environments:
1. **IshaClinical**: An advanced AI Clinical Copilot for clinicians (evidence-based diagnostic synthesis, OCR triage, and SOAP note dictation).
2. **IshaMed Student**: A NEET PG, FMGE, and INICET prep hub for medical students (dynamic performance analytics, course/lecture players, interactive quizzes, and Spaced Repetition Flashcards).

---

## 🚀 Setup & Installation

### 1. Install Dependencies
Ensure you have Node.js (v18+) and npm installed. Run:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your_next_auth_secret_key"
NEXTAUTH_URL="http://localhost:3000"

# Razorpay Sandbox/Production Keys (Required for active checkouts)
RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_key_secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_your_key_id"
```

---

## 🗄️ Database Management

The platform uses **Prisma** with a local SQLite database for easy development and zero-config setup.

### Sync Database Schema
Synchronize the local SQLite database with your Prisma schema:
```bash
npx prisma db push
```

### Populate Seed Data
Generate realistic demo records (mentors, students, tests, flashcard progress, and courses):
```bash
npx prisma db seed
```

---

## 💻 Local Development

Start the Next.js development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Student Hub Landing**: `/students`
- **Clinical Copilot Hub Landing**: `/clinical-copilot`
- **Student Analytics Dashboard**: `/student/analytics`

---

## 📦 Production Builds & Deployment

### Local Production Verification
Compile the application to test for type-safety and bundle optimization:
```bash
npm run build
```

### Deploy to Vercel
Deploy updates directly to Vercel:
```bash
npx vercel --prod
```
