import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const ADMIN_EMAILS = [
  "edivyanshu.dvs700@gmail.com",
  "imishamishra8@gmail.com",
];


const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(2).max(100),
  phone: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  university: z.string().optional().nullable(),
  rollNumber: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
      console.error(
        JSON.stringify({
          event: "INVALID_INPUT",
          route: "/api/auth/register",
          ip,
          errors: parsed.error.format(),
        })
      );
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { name, email, password, phone, country, state, university, rollNumber } = parsed.data;

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

    // Section 4: Upgrade bcrypt cost factor to 12
    const hashedPassword = await bcrypt.hash(password, 12);

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
        passwordChangedAt: new Date(),
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

