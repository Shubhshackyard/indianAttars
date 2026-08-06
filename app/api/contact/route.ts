import { NextResponse } from "next/server";
import { sendEmail, ADMIN_EMAIL } from "@/lib/resend";
import {
  renderContactAdminEmail,
  renderContactUserEmail,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 },
      );
    }

    // 1. Send notification to site admin
    const adminEmailResult = await sendEmail({
      to: ADMIN_EMAIL,
      subject: `[Website Contact] ${subject || "Inquiry from " + name}`,
      html: renderContactAdminEmail({ name, email, subject, message }),
      replyTo: email,
    });

    // 2. Send acknowledgment to the user
    const userEmailResult = await sendEmail({
      to: email,
      subject: "Thank you for contacting indianattars",
      html: renderContactUserEmail({ name, email, subject, message }),
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
      adminNotificationSent: adminEmailResult.success,
      userAcknowledgmentSent: userEmailResult.success,
    });
  } catch (error: any) {
    console.error("Error processing contact form API:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process contact submission." },
      { status: 500 },
    );
  }
}
