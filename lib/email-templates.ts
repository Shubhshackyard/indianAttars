/**
 * Email template generators for indianattars
 * Styled with Emerald Branding: rgb(4, 120, 87) / #047857, Mint Tint (#ECFDF5), Soft Cream (#FAF7F2), Dark Ink (#1C1A17)
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
  paymentId?: string;
  amount: number;
  currency?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  status?: "Paid & Confirmed" | "Failed" | "Cancelled";
  errorMessage?: string;
  shippingAddress?: {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  clerkUserId?: string;
  items?: Array<{ name: string; categoryLabel?: string; qty?: string; unitPrice: number; quantity: number }>;
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
            <td style="background-color: rgb(4, 120, 87); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; color: #FFFFFF; font-weight: normal; letter-spacing: 2px; text-transform: lowercase;">indianattars</h1>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #A7F3D0; letter-spacing: 3px; text-transform: uppercase;">The Art of Pure Indian Fragrance</p>
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
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: rgb(4, 120, 87);">New Website Inquiry Received</h2>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #57534E;">You have received a new contact submission from your website form:</p>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #EAE5D9;">
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C; width: 100px;">Name:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${params.name}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Email:</td>
        <td style="padding: 6px 0; font-size: 14px; color: rgb(4, 120, 87);"><a href="mailto:${params.email}" style="color: rgb(4, 120, 87); text-decoration: underline;">${params.email}</a></td>
      </tr>
      ${params.subject ? `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Subject:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${params.subject}</td>
      </tr>` : ""}
    </table>

    <div style="background-color: #FFFFFF; border-left: 3px solid rgb(4, 120, 87); padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0; box-shadow: 0 1px 4px rgba(0,0,0,0.02);">
      <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #78716C; letter-spacing: 1px;">Message:</p>
      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1C1A17; white-space: pre-wrap;">${params.message}</p>
    </div>
  `);
}

export function renderContactUserEmail(params: ContactEmailParams): string {
  return EMAIL_WRAPPER(`
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: rgb(4, 120, 87);">Thank you for contacting indianattars</h2>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #1C1A17;">Dear <strong>${params.name}</strong>,</p>
    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #57534E;">We have received your message regarding "<strong>${params.subject || "General Inquiry"}</strong>". Our master distillers and support team will review your message and reply within 24 business hours.</p>
    
    <div style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; border: 1px solid #EAE5D9; margin-bottom: 24px;">
      <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #78716C; text-transform: uppercase; letter-spacing: 1px;">Your Message Summary:</p>
      <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #57534E; font-style: italic;">"${params.message}"</p>
    </div>

    <p style="margin: 0; font-size: 13px; color: #78716C;">Warm regards,<br><strong style="color: rgb(4, 120, 87);">The indianattars Team</strong></p>
  `);
}

// --- Bulk Inquiry Templates ---
export function renderBulkInquiryAdminEmail(params: BulkInquiryEmailParams): string {
  return EMAIL_WRAPPER(`
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: rgb(4, 120, 87);">High-Priority Wholesale Inquiry Received</h2>
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
        <td style="padding: 6px 0; font-size: 14px; color: rgb(4, 120, 87);"><a href="mailto:${params.email}" style="color: rgb(4, 120, 87); text-decoration: underline;">${params.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Phone / WhatsApp:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;"><a href="tel:${params.phone}" style="color: #1C1A17; text-decoration: none;">${params.phone}</a></td>
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
      ${params.products ? `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Requested Products:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${params.products}</td>
      </tr>` : ""}
      ${params.quantity ? `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Quantity:</td>
        <td style="padding: 6px 0; font-size: 14px; color: rgb(4, 120, 87); font-weight: bold;">${params.quantity}</td>
      </tr>` : ""}
    </table>

    ${params.message ? `
    <div style="background-color: #FFFFFF; border-left: 3px solid rgb(4, 120, 87); padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0; box-shadow: 0 1px 4px rgba(0,0,0,0.02);">
      <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #78716C; letter-spacing: 1px;">Additional Message:</p>
      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1C1A17; white-space: pre-wrap;">${params.message}</p>
    </div>` : ""}
  `);
}

export function renderBulkInquiryUserEmail(params: BulkInquiryEmailParams): string {
  return EMAIL_WRAPPER(`
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: rgb(4, 120, 87);">Bulk Inquiry Received — indianattars</h2>
    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #1C1A17;">Dear <strong>${params.fullName}</strong>,</p>
    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #57534E;">
      Thank you for your interest in our wholesale pure Indian attars, essential oils, and hydrosols. We have logged your request and our enterprise team is compiling a customized quote with COA specification sheets.
    </p>

    <!-- Inquiry Specs Box -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #ECFDF5; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #A7F3D0;">
      <tr>
        <td colSpan="2" style="padding-bottom: 10px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: rgb(4, 120, 87); border-bottom: 1px solid #A7F3D0;">
          📋 Wholesale Quote Specifications
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0 4px 0; font-size: 13px; font-weight: bold; color: #78716C; width: 140px;">Requested Quantity:</td>
        <td style="padding: 8px 0 4px 0; font-size: 14px; color: rgb(4, 120, 87); font-weight: bold;">${params.quantity || "Custom Wholesale"}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; font-size: 13px; font-weight: bold; color: #78716C;">Destination:</td>
        <td style="padding: 4px 0; font-size: 14px; color: #1C1A17;">${params.location}</td>
      </tr>
      ${params.products ? `
      <tr>
        <td style="padding: 4px 0; font-size: 13px; font-weight: bold; color: #78716C;">Products:</td>
        <td style="padding: 4px 0; font-size: 14px; color: #1C1A17;">${params.products}</td>
      </tr>` : ""}
    </table>

    <!-- What Happens Next Section -->
    <div style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; border: 1px solid #EAE5D9; margin-bottom: 24px;">
      <h3 style="margin: 0 0 12px 0; font-family: Georgia, serif; font-size: 16px; color: rgb(4, 120, 87);">What Happens Next?</h3>
      <ol style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.7; color: #57534E;">
        <li>Our B2B specialist evaluates batch availability ex-Kannauj &amp; Kanpur.</li>
        <li>We generate a custom pricing breakdown including export/packaging options.</li>
        <li>You will receive your detailed quote &amp; documentation within 24 hours.</li>
      </ol>
    </div>

    <p style="margin: 0; font-size: 13px; color: #78716C;">Warm regards,<br><strong style="color: rgb(4, 120, 87);">The indianattars Commercial Desk</strong></p>
  `);
}

// --- Order Email Templates ---
export function renderOrderCustomerEmail(params: OrderEmailParams): string {
  const isFailed = params.status === "Failed";
  const isCancelled = params.status === "Cancelled";
  const isSuccess = !isFailed && !isCancelled;

  const amountFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: params.currency || "INR",
  }).format(params.amount > 1000 ? params.amount / 100 : params.amount);

  const phone = params.customerPhone || params.shippingAddress?.phone || "";

  return EMAIL_WRAPPER(`
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: rgb(4, 120, 87);">
      ${isSuccess ? "Thank You for Your Order!" : isFailed ? "Payment Verification Error" : "Checkout Cancelled"}
    </h2>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #57534E;">
      ${isSuccess ? `Dear <strong>${params.customerName || params.shippingAddress?.name || "Valued Buyer"}</strong>, your payment of <strong>${amountFormatted}</strong> has been successfully processed.` : isFailed ? `Dear customer, your payment transaction could not be verified. If funds were debited, they will be automatically refunded.` : `Dear customer, your checkout process was cancelled.`}
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #EAE5D9;">
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C; width: 140px;">Order ID:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17; font-family: monospace;">${params.orderId}</td>
      </tr>
      ${params.paymentId ? `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Payment ID:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17; font-family: monospace;">${params.paymentId}</td>
      </tr>` : ""}
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Order Total:</td>
        <td style="padding: 6px 0; font-size: 16px; font-weight: bold; color: rgb(4, 120, 87);">${amountFormatted}</td>
      </tr>
      ${params.shippingAddress ? `
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C; vertical-align: top;">Shipping Destination:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">
          <strong>${params.shippingAddress.name || params.customerName || ""}</strong><br>
          ${params.shippingAddress.address || ""}<br>
          ${params.shippingAddress.city || ""}, ${params.shippingAddress.state || ""} ${params.shippingAddress.pincode || ""}<br>
          Phone / WhatsApp: ${phone || "Not provided"}
        </td>
      </tr>` : ""}
    </table>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${isSuccess ? `https://indianattars.com/order-success?orderId=${encodeURIComponent(params.orderId)}` : "https://indianattars.com/cart"}" style="background-color: rgb(4, 120, 87); color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 24px; font-size: 14px; font-weight: bold; display: inline-block;">
        ${isSuccess ? "View & Download Tax Invoice →" : "Return to Cart & Complete Order →"}
      </a>
    </div>
  `);
}

export function renderOrderAdminEmail(params: OrderEmailParams): string {
  const isFailed = params.status === "Failed";
  const isCancelled = params.status === "Cancelled";
  const isSuccess = !isFailed && !isCancelled;

  const amountFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: params.currency || "INR",
  }).format(params.amount > 1000 ? params.amount / 100 : params.amount);

  const subjectHeader = isSuccess
    ? "New Paid Order Alert"
    : isFailed
    ? "Payment Failure Alert"
    : "Payment Cancellation Alert";

  const resolvedPhone = params.customerPhone || params.shippingAddress?.phone || "";

  return EMAIL_WRAPPER(`
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: rgb(4, 120, 87);">${subjectHeader}</h2>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #57534E;">
      ${isSuccess ? "A new payment has been successfully verified via Razorpay:" : isFailed ? "A payment transaction failed or signature verification failed:" : "A customer abandoned/cancelled their payment checkout:"}
    </p>

    <!-- 1. Customer & Account Profile Card -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #EAE5D9;">
      <tr>
        <td colSpan="2" style="padding-bottom: 10px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: rgb(4, 120, 87); border-bottom: 1px solid #EAE5D9;">
          👤 Customer Profile &amp; Contact Info
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0 4px 0; font-size: 13px; font-weight: bold; color: #78716C; width: 140px;">Customer Name:</td>
        <td style="padding: 8px 0 4px 0; font-size: 14px; font-weight: bold; color: #1C1A17;">${params.customerName || params.shippingAddress?.name || "Valued Buyer"}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; font-size: 13px; font-weight: bold; color: #78716C;">Customer Email:</td>
        <td style="padding: 4px 0; font-size: 14px; color: rgb(4, 120, 87); font-weight: bold;">
          <a href="mailto:${params.customerEmail || ""}" style="color: rgb(4, 120, 87); text-decoration: underline;">${params.customerEmail || "Not provided"}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 4px 0; font-size: 13px; font-weight: bold; color: #78716C;">Phone / WhatsApp:</td>
        <td style="padding: 4px 0; font-size: 14px; color: #1C1A17; font-weight: bold;">
          ${resolvedPhone ? `<a href="tel:${resolvedPhone}" style="color: #1C1A17; text-decoration: none;">${resolvedPhone}</a>` : `<span style="color: #78716C; font-style: italic;">Not provided</span>`}
        </td>
      </tr>
      ${params.clerkUserId ? `
      <tr>
        <td style="padding: 4px 0; font-size: 13px; font-weight: bold; color: #78716C;">Clerk User ID:</td>
        <td style="padding: 4px 0; font-size: 13px; color: #57534E; font-family: monospace;">${params.clerkUserId}</td>
      </tr>` : ""}
      ${params.shippingAddress ? `
      <tr>
        <td style="padding: 8px 0 4px 0; font-size: 13px; font-weight: bold; color: #78716C; vertical-align: top;">Shipping Address:</td>
        <td style="padding: 8px 0 4px 0; font-size: 13px; color: #1C1A17; line-height: 1.5;">
          <strong>${params.shippingAddress.name || params.customerName || ""}</strong><br>
          ${params.shippingAddress.address || ""}<br>
          ${params.shippingAddress.city || ""}, ${params.shippingAddress.state || ""} ${params.shippingAddress.pincode || ""}
        </td>
      </tr>` : ""}
    </table>

    <!-- 2. Transaction & Payment Details Card -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #EAE5D9;">
      <tr>
        <td colSpan="2" style="padding-bottom: 10px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: rgb(4, 120, 87); border-bottom: 1px solid #EAE5D9;">
          💳 Transaction Details
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0 4px 0; font-size: 13px; font-weight: bold; color: #78716C; width: 140px;">Razorpay Order ID:</td>
        <td style="padding: 8px 0 4px 0; font-size: 14px; color: #1C1A17; font-family: monospace;">${params.orderId}</td>
      </tr>
      ${params.paymentId ? `
      <tr>
        <td style="padding: 4px 0; font-size: 13px; font-weight: bold; color: #78716C;">Razorpay Payment ID:</td>
        <td style="padding: 4px 0; font-size: 14px; color: #1C1A17; font-family: monospace;">${params.paymentId}</td>
      </tr>` : ""}
      <tr>
        <td style="padding: 4px 0; font-size: 13px; font-weight: bold; color: #78716C;">Total Amount:</td>
        <td style="padding: 4px 0; font-size: 16px; font-weight: bold; color: rgb(4, 120, 87);">${amountFormatted}</td>
      </tr>
      ${params.errorMessage ? `
      <tr>
        <td style="padding: 4px 0; font-size: 13px; font-weight: bold; color: #DC2626;">Failure Error:</td>
        <td style="padding: 4px 0; font-size: 13px; color: #DC2626; font-weight: bold;">${params.errorMessage}</td>
      </tr>` : ""}
    </table>

    <!-- 3. Purchased Items Breakdown Table -->
    ${params.items && params.items.length > 0 ? `
    <div style="margin-bottom: 24px;">
      <h4 style="margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #78716C;">Items Ordered</h4>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border: 1px solid #EAE5D9; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr style="background-color: #ECFDF5; color: rgb(4, 120, 87); font-size: 11px; text-transform: uppercase;">
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #EAE5D9;">Item</th>
            <th style="padding: 10px; text-align: center; border-bottom: 1px solid #EAE5D9;">Qty</th>
            <th style="padding: 10px; text-align: right; border-bottom: 1px solid #EAE5D9;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${params.items.map((item: any) => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #F3EFE6; font-size: 13px;">
                <strong>${item.name}</strong>
                <div style="font-size: 11px; color: #78716C;">${item.categoryLabel || ""} · ${item.qty || ""}</div>
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #F3EFE6; font-size: 13px; text-align: center; font-family: monospace;">${item.quantity || 1}</td>
              <td style="padding: 10px; border-bottom: 1px solid #F3EFE6; font-size: 13px; text-align: right; font-family: monospace; font-weight: bold; color: rgb(4, 120, 87);">₹${((item.unitPrice || 0) * (item.quantity || 1)).toLocaleString("en-IN")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>` : ""}
  `);
}

// --- Newsletter Email Templates ---
export function renderNewsletterWelcomeEmail(email: string): string {
  return EMAIL_WRAPPER(`
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background-color: #ECFDF5; color: rgb(4, 120, 87); border: 1px solid #A7F3D0; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; padding: 6px 16px; border-radius: 20px;">Welcome to indianattars</span>
      <h2 style="margin: 16px 0 8px 0; font-family: Georgia, serif; font-size: 22px; color: rgb(4, 120, 87);">The Fragrance Journal &amp; Botanical Updates</h2>
      <p style="margin: 0; font-size: 14px; color: #57534E;">Thank you for subscribing with <strong>${email}</strong>.</p>
    </div>

    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #57534E;">You are now part of our inner circle. As a subscriber, you will receive:</p>

    <ul style="margin: 0 0 24px 0; padding-left: 20px; font-size: 14px; color: #57534E; line-height: 1.8;">
      <li>🌸 Early notifications on fresh seasonal flower harvests (Ruh Gulab, Jasmine Sambac, Wild Khus).</li>
      <li>📜 Exclusive access to new batch Certificates of Analysis (COA) and slab price drops.</li>
      <li>✨ Heritage distillation stories directly from our Kannauj copper degs.</li>
    </ul>

    <div style="text-align: center; margin: 28px 0;">
      <a href="https://indianattars.com/products" style="background-color: rgb(4, 120, 87); color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 24px; font-size: 14px; font-weight: bold; display: inline-block;">Explore Pure Collection</a>
    </div>
  `);
}

export function renderNewsletterAdminAlertEmail(email: string): string {
  return EMAIL_WRAPPER(`
    <h2 style="margin: 0 0 16px 0; font-family: Georgia, serif; font-size: 20px; color: rgb(4, 120, 87);">New Newsletter Subscriber Joined</h2>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #57534E;">A new visitor has subscribed to the indianattars fragrance journal:</p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAF7F2; border-radius: 8px; padding: 20px; margin-bottom: 24px; border: 1px solid #EAE5D9;">
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C; width: 140px;">Subscriber Email:</td>
        <td style="padding: 6px 0; font-size: 14px; color: rgb(4, 120, 87); font-weight: bold;"><a href="mailto:${email}" style="color: rgb(4, 120, 87); text-decoration: underline;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #78716C;">Subscription Date:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #1C1A17;">${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
      </tr>
    </table>
  `);
}

export const renderNewsletterAdminEmail = renderNewsletterAdminAlertEmail;
