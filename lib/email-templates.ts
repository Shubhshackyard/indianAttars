/**
 * Email template generators for indianattars
 * Styled with luxury branding: Burgundy (#7A1C30), Gold (#C59B27), Soft Cream (#FAF7F2), Dark Ink (#1C1A17)
 */

interface ContactEmailParams {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface BulkInquiryEmailParams {
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  location: string;
  interests?: string[];
  products?: string;
  quantity?: string;
  message?: string;
}

interface OrderEmailParams {
  orderId: string;
  paymentId: string;
  amount: number;
  currency?: string;
  customerName?: string;
  customerEmail?: string;
  clerkUserId?: string;
  items?: Array<{ name: string; qty: string; unitPrice: number; quantity: number }>;
}

const EMAIL_WRAPPER = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>indianattars</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF7F2; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1C1A17; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAF7F2; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #EAE5D9; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <!-- Header -->
          <tr>
            <td style="background-color: #7A1C30; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; color: #FFFFFF; font-weight: normal; letter-spacing: 2px; text-transform: lowercase;">indianattars</h1>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #E5C384; letter-spacing: 3px; text-transform: uppercase;">The Art of Pure Indian Fragrance</p>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #FAF7F2; padding: 24px 40px; text-align: center; border-top: 1px solid #EAE5D9; font-size: 12px; color: #78716C; line-height: 1.6;">
              <p style="margin: 0; font-weight: 500; color: #1C1A17;">indianattars &bull; Kannauj &amp; Kanpur, Uttar Pradesh, India</p>
              <p style="margin: 4px 0 0 0;">Pure Attars &bull; Essential Oils &bull; Ruh &amp; Absolutes &bull; Hydrosols</p>
              <p style="margin: 12px 0 0 0; font-size: 11px; color: #A8A29E;">&copy; ${new Date().getFullYear()} indianattars. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// --- Contact Form Templates ---
export function renderContactAdminEmail(params: ContactEmailParams): string {
  return EMAIL_WRAPPER(`
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: #7A1C30;">New Website Inquiry Received</h2>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #57534E;">You have received a new contact submission from your website form:</p>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #EAE5D9;">
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C; width: 100px;">Name:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${params.name}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Email:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #7A1C30;"><a href="mailto:${params.email}" style="color: #7A1C30; text-decoration: underline;">${params.email}</a></td>
      </tr>
      ${params.subject ? `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Subject:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${params.subject}</td>
      </tr>` : ""}
    </table>

    <div style="background-color: #FFFFFF; border-left: 3px solid #7A1C30; padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0; box-shadow: 0 1px 4px rgba(0,0,0,0.02);">
      <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #78716C; letter-spacing: 1px;">Message:</p>
      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1C1A17; white-space: pre-wrap;">${params.message}</p>
    </div>
  `);
}

export function renderContactUserEmail(params: ContactEmailParams): string {
  return EMAIL_WRAPPER(`
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: #7A1C30;">Thank you for contacting indianattars</h2>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #1C1A17;">Dear <strong>${params.name}</strong>,</p>
    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #57534E;">We have received your message regarding "<strong>${params.subject || "General Inquiry"}</strong>". Our master distillers and support team will review your message and reply within 24 business hours.</p>
    
    <div style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; border: 1px solid #EAE5D9; margin-bottom: 24px;">
      <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #78716C; text-transform: uppercase; letter-spacing: 1px;">Your Message Summary:</p>
      <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #57534E; font-style: italic;">"${params.message}"</p>
    </div>

    <p style="margin: 0; font-size: 13px; color: #78716C;">Warm regards,<br><strong style="color: #7A1C30;">The indianattars Team</strong></p>
  `);
}

// --- Bulk Inquiry Templates ---
export function renderBulkInquiryAdminEmail(params: BulkInquiryEmailParams): string {
  return EMAIL_WRAPPER(`
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: #7A1C30;">High-Priority Wholesale Inquiry Received</h2>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #57534E;">A new bulk quote inquiry has been submitted with the following specs:</p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #EAE5D9;">
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C; width: 140px;">Contact Name:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${params.fullName}</td>
      </tr>
      ${params.company ? `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Company:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${params.company}</td>
      </tr>` : ""}
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Email:</td>
        <td style="padding: 6px 0; font-size: 14px;"><a href="mailto:${params.email}" style="color: #7A1C30; text-decoration: underline;">${params.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Phone / WhatsApp:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${params.phone}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Location:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${params.location}</td>
      </tr>
      ${params.interests && params.interests.length > 0 ? `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Categories:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${params.interests.join(", ")}</td>
      </tr>` : ""}
      ${params.quantity ? `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Quantity:</td>
        <td style="padding: 6px 0; font-size: 14px; font-weight: bold; color: #7A1C30;">${params.quantity}</td>
      </tr>` : ""}
      ${params.products ? `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Requested Products:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${params.products}</td>
      </tr>` : ""}
    </table>

    ${params.message ? `
    <div style="background-color: #FFFFFF; border-left: 3px solid #C59B27; padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
      <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #78716C; letter-spacing: 1px;">Additional Message:</p>
      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1C1A17;">${params.message}</p>
    </div>` : ""}
  `);
}

export function renderBulkInquiryUserEmail(params: BulkInquiryEmailParams): string {
  return EMAIL_WRAPPER(`
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: #7A1C30;">Bulk Inquiry Received — indianattars</h2>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #1C1A17;">Dear <strong>${params.fullName}</strong>,</p>
    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #57534E;">Thank you for your interest in our wholesale pure Indian attars, essential oils, and hydrosols. We have logged your request and our enterprise team is compiling a customized quote with COA specification sheets.</p>
    
    <div style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; border: 1px solid #EAE5D9; margin-bottom: 24px;">
      <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #7A1C30; font-family: Georgia, serif;">What Happens Next?</h3>
      <ol style="margin: 0; padding-left: 20px; font-size: 13px; color: #57534E; line-height: 1.7;">
        <li>Our B2B specialist evaluates batch availability ex-Kannauj &amp; Kanpur.</li>
        <li>We generate a custom pricing breakdown including export/packaging options.</li>
        <li>You will receive your detailed quote &amp; documentation within 24 hours.</li>
      </ol>
    </div>

    <p style="margin: 0; font-size: 13px; color: #78716C;">Warm regards,<br><strong style="color: #7A1C30;">B2B Supply Team &bull; indianattars</strong></p>
  `);
}

// --- Order Confirmation Templates ---
export function renderOrderCustomerEmail(params: OrderEmailParams): string {
  const amountFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: params.currency || "INR",
  }).format(params.amount / 100);

  return EMAIL_WRAPPER(`
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background-color: #FDF6E2; color: #C59B27; border: 1px solid #E5C384; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; padding: 6px 16px; border-radius: 20px;">Payment Verified</span>
      <h2 style="margin: 16px 0 8px 0; font-family: Georgia, serif; font-size: 22px; color: #7A1C30;">Thank you for your order!</h2>
      <p style="margin: 0; font-size: 14px; color: #57534E;">Your payment has been successfully processed.</p>
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #EAE5D9;">
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Order Reference:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17; font-family: monospace;">${params.orderId}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Payment ID:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17; font-family: monospace;">${params.paymentId}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Total Amount Paid:</td>
        <td style="padding: 6px 0; font-size: 16px; font-weight: bold; color: #7A1C30;">${amountFormatted}</td>
      </tr>
    </table>

    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #57534E;">Our dispatch center in Kannauj &amp; Kanpur will begin carefully hand-packing your pure aromatics in tamper-proof glass packaging. You will receive tracking updates shortly.</p>

    <div style="text-align: center; margin: 28px 0;">
      <a href="https://indianattars.com" style="background-color: #7A1C30; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 24px; font-size: 14px; font-weight: bold; display: inline-block;">Visit Store</a>
    </div>
  `);
}

export function renderOrderAdminEmail(params: OrderEmailParams): string {
  const amountFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: params.currency || "INR",
  }).format(params.amount / 100);

  return EMAIL_WRAPPER(`
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: #7A1C30;">New Paid Order Notification</h2>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #57534E;">A new online payment has been confirmed via Razorpay:</p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #EAE5D9;">
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C; width: 140px;">Razorpay Order ID:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17; font-family: monospace;">${params.orderId}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Payment ID:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17; font-family: monospace;">${params.paymentId}</td>
      </tr>
      ${params.clerkUserId ? `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Clerk User ID:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #7A1C30; font-family: monospace;">${params.clerkUserId}</td>
      </tr>` : ""}
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Amount Verified:</td>
        <td style="padding: 6px 0; font-size: 16px; font-weight: bold; color: #7A1C30;">${amountFormatted}</td>
      </tr>
    </table>
  `);
}
