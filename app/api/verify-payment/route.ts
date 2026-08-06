import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";
import { sendEmail, ADMIN_EMAIL } from "@/lib/resend";
import { saveOrder } from "@/lib/orders-db";
import {
  renderOrderAdminEmail,
  renderOrderCustomerEmail,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const { userId: authUserId } = await auth();
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount = 0,
      currency = "INR",
      customerEmail,
      customerName,
      userId: bodyUserId,
      items = [],
    } = body;

    const clerkUserId = authUserId || bodyUserId || "guest";

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters." },
        { status: 400 },
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      console.error("RAZORPAY_KEY_SECRET missing in environment variables.");
      return NextResponse.json(
        { error: "Razorpay secret key not configured on server." },
        { status: 500 },
      );
    }

    // HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isSignatureValid = generatedSignature === razorpay_signature;

    if (!isSignatureValid) {
      console.warn(
        `Payment signature verification failed for order: ${razorpay_order_id}`,
      );
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment signature. Verification failed.",
        },
        { status: 400 },
      );
    }

    // Persist order into server database linked to clerkUserId
    saveOrder({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      clerkUserId,
      customerName,
      customerEmail,
      amount: Number(amount) / 100, // convert paise to INR
      currency,
      items,
      date: new Date().toISOString(),
      status: "Paid & Processing",
    });

    // Send order confirmation emails via Resend with Clerk User Profile linkage
    const orderPayload = {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: Number(amount),
      currency,
      customerEmail,
      customerName,
      clerkUserId,
    };

    const adminEmailResult = await sendEmail({
      to: ADMIN_EMAIL,
      subject: `[Paid Order] Order ${razorpay_order_id} Confirmed (User: ${clerkUserId})`,
      html: renderOrderAdminEmail(orderPayload),
    });

    if (customerEmail) {
      await sendEmail({
        to: customerEmail,
        subject: `Order Confirmation — indianattars (${razorpay_order_id})`,
        html: renderOrderCustomerEmail(orderPayload),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      clerkUserId,
      emailSent: adminEmailResult.success,
    });
  } catch (error: any) {
    console.error("Error verifying Razorpay payment signature:", error);
    return NextResponse.json(
      { error: error?.message || "Payment verification failed" },
      { status: 500 },
    );
  }
}
