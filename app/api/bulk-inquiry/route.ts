import { NextResponse } from "next/server";
import { sendEmail, ADMIN_EMAIL } from "@/lib/resend";
import {
  renderBulkInquiryAdminEmail,
  renderBulkInquiryUserEmail,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      company,
      email,
      phone,
      location,
      interests,
      products,
      quantity,
      message,
    } = body;

    if (!fullName || !email || !phone || !location) {
      return NextResponse.json(
        { error: "Full Name, Email, Phone, and Location are required." },
        { status: 400 },
      );
    }

    const payload = {
      fullName,
      company,
      email,
      phone,
      location,
      interests,
      products,
      quantity,
      message,
    };

    // 1. Send wholesale inquiry notification to sales/admin team
    const adminEmailResult = await sendEmail({
      to: ADMIN_EMAIL,
      subject: `[Bulk Inquiry] Quote Request from ${fullName} ${company ? "(" + company + ")" : ""}`,
      html: renderBulkInquiryAdminEmail(payload),
      replyTo: email,
    });

    // 2. Send acknowledgment to the prospective wholesale customer
    const userEmailResult = await sendEmail({
      to: email,
      subject: "Bulk Quote Request Received — indianattars",
      html: renderBulkInquiryUserEmail(payload),
    });

    return NextResponse.json({
      success: true,
      message: "Bulk inquiry received. Confirmation emails dispatched.",
      adminSent: adminEmailResult.success,
      userSent: userEmailResult.success,
    });
  } catch (error: any) {
    console.error("Error processing bulk inquiry API:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process bulk inquiry." },
      { status: 500 },
    );
  }
}
