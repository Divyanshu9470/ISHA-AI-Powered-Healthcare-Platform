import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      courseId
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ 
        error: "Razorpay credentials are not configured. Please configure them in your environment variables." 
      }, { status: 500 });
    }

    // 1. Enforce signature validation
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 2. Update Transaction and Enroll Student
    await prisma.$transaction([
      prisma.transaction.updateMany({
        where: { providerOrderId: razorpay_order_id },
        data: { 
          status: "SUCCESS",
          paymentMethod: "RAZORPAY"
        }
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

    return NextResponse.json({ status: "SUCCESS" });

  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
