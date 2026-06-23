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
      courseId,
      isMock
    } = await req.json();

    // 1. Verify Signature (Skip if mock)
    if (!isMock) {
      const secret = process.env.RAZORPAY_KEY_SECRET || "dummy_secret";
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body.toString())
        .digest("hex");

      const isAuthentic = expectedSignature === razorpay_signature;

      if (!isAuthentic) {
        return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
      }
    } else {
      console.log("Verified Mock Payment for Order:", razorpay_order_id);
    }

    // 2. Update Transaction and Enroll Student
    await prisma.$transaction([
      prisma.transaction.updateMany({
        where: { providerOrderId: razorpay_order_id },
        data: { 
          status: "SUCCESS",
          paymentMethod: isMock ? "MOCK_PAYMENT" : "RAZORPAY"
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
