import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { razorpay } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, amount, currency } = await req.json();

    if (!courseId || !amount) {
      return NextResponse.json({ error: "Missing courseId or amount" }, { status: 400 });
    }

    // 1. Create a Razorpay Order (or Mock if keys missing)
    let order;
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== "MISSING_KEY_ID") {
      const options = {
        amount: Math.round(amount * 100), // Razorpay expects amount in paise
        currency: currency || "INR",
        receipt: `receipt_${Math.random().toString(36).substring(7)}`,
      };
      order = await razorpay.orders.create(options);
    } else {
      console.log("Using Mock Razorpay Order (No keys found in .env)");
      order = {
        id: `mock_order_${Math.random().toString(36).substring(7)}`,
        amount: Math.round(amount * 100),
        currency: currency || "INR",
        isMock: true
      };
    }

    // 2. Create a Pending Transaction in DB
    await prisma.transaction.create({
      data: {
        userId: session.user.id,
        courseId,
        amount: parseFloat(amount),
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
      isMock: (order as any).isMock || false
    }, { status: 201 });

  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
