import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    // Enforce Clerk Authentication for Order Creation
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required to initiate checkout. Please sign in." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { amount, currency = "INR", receipt, customerEmail, customerName } = body;

    // Minimum amount validation: amount in paise (min 100 paise = ₹1)
    const parsedAmount = Number(amount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount < 100) {
      return NextResponse.json(
        { error: "Invalid amount. Minimum amount is 100 paise (₹1)." },
        { status: 400 },
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("Razorpay API keys missing in environment variables.");
      return NextResponse.json(
        { error: "Razorpay credentials not configured on server." },
        { status: 500 },
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(parsedAmount),
      currency: currency || "INR",
      receipt: receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        clerkUserId: userId,
        customerEmail: customerEmail || "",
        customerName: customerName || "",
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      userId: userId,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create Razorpay order" },
      { status: 500 },
    );
  }
}
