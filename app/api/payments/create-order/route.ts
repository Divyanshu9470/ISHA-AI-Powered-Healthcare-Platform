import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { razorpay } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createOrderSchema = z.object({
  courseId: z.string().cuid(),
  amount: z.number().positive(),
  currency: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 422 }
      );
    }

    const { courseId, amount, currency } = parsed.data;

    // Fetch the course from the database to prevent price tampering
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Verify course price
    if (Math.abs(amount - course.price) > 0.01) {
      console.warn(
        JSON.stringify({
          event: "PRICE_TAMPERING",
          userId: session.user.id,
          courseId,
          submittedAmount: amount,
          expectedAmount: course.price,
          timestamp: new Date().toISOString(),
        })
      );
      return NextResponse.json(
        { error: "Invalid payment amount: Price mismatch detected." },
        { status: 400 }
      );
    }


    // Ensure Razorpay credentials are set in environment
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === "MISSING_KEY_ID" || !process.env.RAZORPAY_KEY_SECRET) {
      const mockOrderId = `mock_order_${Math.random().toString(36).substring(7)}`;
      
      // Directly create success transaction and enroll the student for demo/sandbox purposes
      await prisma.$transaction([
        prisma.transaction.create({
          data: {
            userId: session.user.id,
            courseId,
            amount,
            currency: currency || "INR",
            status: "SUCCESS",
            provider: "MOCK",
            providerOrderId: mockOrderId,
          },
        }),
        prisma.enrollment.upsert({
          where: {
            userId_courseId: {
              userId: session.user.id,
              courseId: courseId,
            }
          },
          update: {},
          create: {
            userId: session.user.id,
            courseId: courseId,
          }
        })
      ]);

      return NextResponse.json({
        id: mockOrderId,
        amount: Math.round(amount * 100),
        currency: currency || "INR",
        isMock: true
      }, { status: 201 });
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency: currency || "INR",
      receipt: `receipt_${Math.random().toString(36).substring(7)}`,
    };
    
    const order = await razorpay.orders.create(options);

    // 2. Create a Pending Transaction in DB
    await prisma.transaction.create({
      data: {
        userId: session.user.id,
        courseId,
        amount,
        currency: currency || "INR",
        status: "PENDING",
        provider: "RAZORPAY",
        providerOrderId: order.id,
      },
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      isMock: false
    }, { status: 201 });

  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
