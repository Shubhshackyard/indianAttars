import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

const envFrom = process.env.RESEND_FROM_EMAIL;
export const DEFAULT_FROM_EMAIL =
  envFrom && !envFrom.includes("onboarding@resend.dev")
    ? envFrom
    : "indianattars <orders@indianattars.com>";

export const ADMIN_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL || "shivaayessentials@gmail.com";

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = DEFAULT_FROM_EMAIL,
  replyTo,
}: SendEmailParams) {
  if (!resend) {
    console.warn(
      "[Resend] API key not configured (RESEND_API_KEY missing). Skipping email dispatch.",
    );
    return { success: false, error: "RESEND_API_KEY missing" };
  }

  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo,
    });

    if (data.error) {
      console.error("[Resend] Failed to send email:", data.error);
      return { success: false, error: data.error };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("[Resend] Exception when sending email:", error);
    return { success: false, error: error?.message || "Unknown error" };
  }
}
