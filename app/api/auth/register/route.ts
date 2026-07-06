import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

const ADMIN_EMAILS = [
  "edivyanshu.dvs700@gmail.com",
  "imishamishra8@gmail.com",
];

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, country, state, university, rollNumber } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // Check if user already exists
    let existingUser = null;
    try {
      existingUser = await prisma.user.findUnique({ where: { email } });
    } catch (dbError: any) {
      console.error("DB lookup error:", dbError?.message);
      return NextResponse.json(
        { error: "Database connection issue. Please try again in a few seconds." },
        { status: 503 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in instead." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Auto-elevate known admin emails
    const role = ADMIN_EMAILS.includes(email.toLowerCase()) ? "ADMIN" : "STUDENT";

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone: phone || null,
        country: country || null,
        state: state || null,
        university: university || null,
        rollNumber: rollNumber || null,
        role,
      },
    });

    return NextResponse.json(
      { message: "Account created successfully!", user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error?.message || error);
    // Prisma unique constraint violation
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in instead." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
