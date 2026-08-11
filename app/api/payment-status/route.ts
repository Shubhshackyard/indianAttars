import { NextResponse } from "next/server";
import { saveOrder } from "@/lib/orders-db";
import { sendEmail, ADMIN_EMAIL } from "@/lib/resend";
import {
  renderOrderCustomerEmail,
  renderOrderAdminEmail,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      orderId,
      paymentId,
      status, // "success" | "failed" | "cancelled"
      amount,
      currency,
      customerEmail,
      customerName,
      customerPhone,
      shippingAddress,
      clerkUserId,
      errorMessage,
      items,
    } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId is required." },
        { status: 400 },
      );
    }

    const normalizedStatus: "Paid & Confirmed" | "Failed" | "Cancelled" =
      status === "success"
        ? "Paid & Confirmed"
        : status === "failed"
        ? "Failed"
        : "Cancelled";

    // 1. Save or update order in persistence layer
    await saveOrder({
      orderId: orderId,
      paymentId: paymentId || "N/A",
      amount: amount || 0,
      currency: currency || "INR",
      status: normalizedStatus,
      customerEmail: customerEmail || "",
      customerName: customerName || "",
      customerPhone: customerPhone || "",
      shippingAddress: shippingAddress || undefined,
      clerkUserId: clerkUserId || "",
      items: items || [],
      date: new Date().toISOString(),
    });

    const resolvedPhone = customerPhone || shippingAddress?.phone || "";
    const resolvedName = customerName || shippingAddress?.name || "";
    const resolvedEmail = customerEmail || shippingAddress?.email || "";

    // 2. Sync order details to Clerk User Metadata for Admin Dashboard
    if (clerkUserId && clerkUserId !== "guest") {
      const { syncOrderToClerkUser } = await import("@/lib/clerk-sync");
      syncOrderToClerkUser({
        clerkUserId,
        orderId,
        paymentId: paymentId || "N/A",
        amountInINR: Number(amount) > 1000 ? Number(amount) / 100 : Number(amount),
        status: normalizedStatus,
        items: items || [],
        shippingAddress,
        customerPhone: resolvedPhone,
        customerName: resolvedName,
      }).catch(() => {});
    }

    const emailParams = {
      orderId,
      paymentId,
      amount: amount || 0,
      currency: currency || "INR",
      customerName: resolvedName,
      customerEmail: resolvedEmail,
      customerPhone: resolvedPhone,
      status: normalizedStatus,
      errorMessage,
      shippingAddress,
      clerkUserId,
      items,
    };

    let userEmailSent = false;
    let adminEmailSent = false;

    // 2. Dispatch Customer Status Email if email address is provided
    if (customerEmail) {
      const subject =
        normalizedStatus === "Paid & Confirmed"
          ? "Payment Verified & Order Confirmed — indianattars"
          : normalizedStatus === "Failed"
          ? "Payment Transaction Declined / Failed — indianattars"
          : "Checkout Cancelled — Complete Your indianattars Purchase";

      const res = await sendEmail({
        to: customerEmail,
        subject,
        html: renderOrderCustomerEmail(emailParams),
      });
      userEmailSent = res.success;
    }

    // 3. Dispatch Admin Alert Email to shivaayessentials@gmail.com
    const adminSubject =
      normalizedStatus === "Paid & Confirmed"
        ? `[Order Alert] Payment Verified: ${orderId}`
        : normalizedStatus === "Failed"
        ? `[Payment Failed] Transaction Error: ${orderId}`
        : `[Payment Cancelled] Checkout Abandoned: ${orderId}`;

    const adminRes = await sendEmail({
      to: ADMIN_EMAIL,
      subject: adminSubject,
      html: renderOrderAdminEmail(emailParams),
      replyTo: customerEmail || undefined,
    });
    adminEmailSent = adminRes.success;

    return NextResponse.json({
      success: true,
      status: normalizedStatus,
      userEmailSent,
      adminEmailSent,
    });
  } catch (error: any) {
    console.error("Error processing payment status endpoint:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to log payment status." },
      { status: 500 },
    );
  }
}
