import { NextResponse } from "next/server";
import { sendEmail, ADMIN_EMAIL } from "@/lib/resend";
import {
  renderNewsletterWelcomeEmail,
  renderNewsletterAdminEmail,
} from "@/lib/email-templates";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Send Welcome Email to Subscriber from orders@indianattars.com
    const welcomeResult = await sendEmail({
      to: cleanEmail,
      subject: "Welcome to indianattars — Fragrance Journal & Botanical Updates",
      html: renderNewsletterWelcomeEmail(cleanEmail),
    });

    // 2. Send Admin Notification to shivaayessentials@gmail.com
    const adminResult = await sendEmail({
      to: ADMIN_EMAIL,
      subject: `[Newsletter] New Subscriber: ${cleanEmail}`,
      html: renderNewsletterAdminEmail(cleanEmail),
      replyTo: cleanEmail,
    });

    return NextResponse.json({
      success: true,
      message: "Subscription successful! Welcome email dispatched.",
      welcomeSent: welcomeResult.success,
      adminSent: adminResult.success,
    });
  } catch (error: any) {
    console.error("Error processing newsletter API request:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process newsletter subscription." },
      { status: 500 },
    );
  }
}
