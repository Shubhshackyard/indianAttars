import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/orders-db";
import { SITE } from "@/lib/site";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const paymentId = searchParams.get("paymentId") || "PAY-" + Math.floor(100000 + Math.random() * 900000);

    if (!orderId) {
      return new NextResponse("Order ID is required", { status: 400 });
    }

    const dbOrder = getOrderById(orderId);

    const formattedDate = dbOrder?.date
      ? new Date(dbOrder.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

    const items = dbOrder?.items || [];
    const calculatedTotal = items.length > 0
      ? items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0)
      : (dbOrder?.amount ? (dbOrder.amount > 50000 ? dbOrder.amount / 100 : dbOrder.amount) : 0);

    const amountFormatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: dbOrder?.currency || "INR",
      maximumFractionDigits: 0,
    }).format(calculatedTotal);

    const shippingAddress = dbOrder?.shippingAddress;

    const nameParam = searchParams.get("name");
    const emailParam = searchParams.get("email");
    const phoneParam = searchParams.get("phone");
    const addressParam = searchParams.get("address");
    const cityParam = searchParams.get("city");
    const stateParam = searchParams.get("state");
    const pincodeParam = searchParams.get("pincode");

    const customerName = nameParam || shippingAddress?.name || dbOrder?.customerName || "Valued Buyer";
    const customerEmail = emailParam || dbOrder?.customerEmail || "Not provided";
    const customerPhone = phoneParam || shippingAddress?.phone || dbOrder?.customerPhone || "Not provided";
    const customerAddress = addressParam || shippingAddress?.address || "";
    const customerCity = cityParam || shippingAddress?.city || "";
    const customerState = stateParam || shippingAddress?.state || "";
    const customerPincode = pincodeParam || shippingAddress?.pincode || "";

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tax Invoice — ${orderId} — ${SITE.name}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @page {
      size: A4 portrait;
      margin: 15mm 20mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1C1A17;
      background: #FFFFFF;
      padding: 40px 20px;
      font-size: 13px;
      line-height: 1.5;
    }
    .invoice-card {
      max-width: 750px;
      margin: 0 auto;
      border: 1px solid #EAE5D9;
      padding: 45px 50px;
      background: #FFFFFF;
      .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #047857;
      padding-bottom: 18px;
      margin-bottom: 24px;
    }
    .brand {
      font-size: 24px;
      font-family: Georgia, serif;
      font-weight: bold;
      color: #047857;
    }
    .subtitle {
      font-size: 11px;
      color: #78716C;
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .gstin {
      font-family: monospace;
      font-size: 11px;
      background: #ECFDF5;
      color: #047857;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid #A7F3D0;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid #EAE5D9;
    }
    .section-title {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #78716C;
      font-weight: bold;
      margin-bottom: 6px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }
    th {
      background: #ECFDF5;
      border-bottom: 1px solid #A7F3D0;
      padding: 10px 12px;
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #047857;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #F3EFE6;
    }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .font-mono { font-family: monospace; }
    .total-box {
      float: right;
      width: 300px;
      margin-top: 15px;
      border-top: 2px solid #047857;
      padding-top: 10px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
    }
    .total-grand {
      font-size: 16px;
      font-weight: bold;
      color: #047857;
      margin-top: 4px;
    }
    .footer-note {
      clear: both;
      margin-top: 40px;
      padding-top: 16px;
      border-top: 1px solid #EAE5D9;
      font-size: 11px;
      color: #78716C;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      @page {
        size: A4 portrait;
        margin: 0 !important;
      }
      html, body {
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .no-print {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
      }
      .invoice-card {
        border: none !important;
        max-width: 100% !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 15mm 20mm !important;
        box-shadow: none !important;
        box-sizing: border-box !important;
      }
    }
  </style>
</head>
<body>

  <div class="no-print" style="max-width: 750px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center;">
    <button onclick="window.print()" style="background: #047857; color: #fff; border: none; padding: 10px 22px; border-radius: 20px; font-weight: bold; cursor: pointer; font-size: 13px;">
      🖨️ Save as PDF / Print Invoice
    </button>
    <a href="https://indianattars.com" style="color: #047857; text-decoration: none; font-weight: bold; font-size: 13px;">
      ← Return to Store
    </a>
  </div>

  <div class="invoice-card">
    <div class="header">
      <div>
        <div class="brand">${SITE.name}</div>
        <div class="subtitle">Tax Invoice &amp; Official Receipt</div>
        <div style="font-size: 11px; color: #57534E; margin-top: 2px;">Kannauj &amp; Kanpur, Uttar Pradesh, India</div>
      </div>
      <div style="text-align: right;">
        <div class="gstin">GSTIN: ${SITE.gst}</div>
        <div style="font-size: 11px; color: #78716C; margin-top: 6px;">Date: ${formattedDate}</div>
      </div>
    </div>

    <!-- Distributor / Seller & Customer Details Grid -->
    <div class="grid-2" style="grid-template-columns: 1fr 1fr; gap: 24px; border-bottom: 1px solid #EAE5D9; padding-bottom: 20px; margin-bottom: 20px;">
      <div>
        <div class="section-title" style="color: #047857; font-weight: bold;">Distributor / Seller</div>
        <div style="font-weight: bold; font-size: 15px; color: #1C1A17;">${SITE.name}</div>
        <div style="font-size: 12px; color: #57534E;">Kannauj &amp; Kanpur, Uttar Pradesh, India</div>
        <div style="font-size: 12px; color: #57534E; margin-top: 2px;"><strong>GSTIN:</strong> 09AGJPK7407Q1ZO</div>
        <div style="font-size: 12px; color: #57534E;"><strong>Email:</strong> info@indianattars.com</div>
        <div style="font-size: 12px; color: #57534E;"><strong>Phone:</strong> +91 79053 37598</div>

        <div class="section-title" style="margin-top: 14px;">Transaction Summary</div>
        <div style="font-size: 11px; color: #78716C;">Order ID: <span class="font-mono" style="color: #1C1A17; font-weight: bold;">${orderId}</span></div>
        <div style="font-size: 11px; color: #78716C;">Payment ID: <span class="font-mono" style="color: #047857; font-weight: bold;">${dbOrder?.paymentId || paymentId}</span></div>
      </div>

      <div>
        <div class="section-title" style="color: #047857; font-weight: bold;">Billed &amp; Shipped To (Customer)</div>
        <div style="font-weight: bold; font-size: 14px; color: #1C1A17;">${customerName}</div>
        ${customerAddress ? `<div style="font-size: 12px; color: #57534E;">${customerAddress}</div>` : ""}
        ${customerCity || customerState || customerPincode ? `<div style="font-size: 12px; color: #57534E;">${customerCity}${customerCity && customerState ? ", " : ""}${customerState} ${customerPincode ? `- ${customerPincode}` : ""}</div>` : ""}
        <div style="margin-top: 6px; font-size: 12px; color: #1C1A17;"><strong>Email:</strong> ${customerEmail}</div>
        <div style="font-size: 12px; color: #1C1A17;"><strong>Phone / WhatsApp:</strong> ${customerPhone}</div>
      </div>
    </div>

    <div class="section-title">Itemized Order Summary</div>
    <table>
      <thead>
        <tr>
          <th>Item Description</th>
          <th class="text-center">Qty</th>
          <th class="text-right">Unit Price</th>
          <th class="text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        ${items.length > 0 ? items.map(item => `
          <tr>
            <td>
              <strong>${item.name}</strong>
              <div style="font-size: 11px; color: #78716C;">${item.categoryLabel} · ${item.qty}</div>
            </td>
            <td class="text-center font-mono">${item.quantity}</td>
            <td class="text-right font-mono">₹${item.unitPrice.toLocaleString("en-IN")}</td>
            <td class="text-right font-mono" style="font-weight: bold;">₹${(item.unitPrice * item.quantity).toLocaleString("en-IN")}</td>
          </tr>
        `).join("") : `
          <tr>
            <td colspan="4" class="text-center" style="color: #78716C; font-style: italic;">
              Order details confirmed via payment gateway.
            </td>
          </tr>
        `}
      </tbody>
    </table>

    <div class="total-box">
      <div class="total-row">
        <span>Subtotal</span>
        <span class="font-mono">${amountFormatted}</span>
      </div>
      <div class="total-row">
        <span>Delivery (Air Express)</span>
        <span class="font-mono" style="color: #047857;">FREE</span>
      </div>
      <div class="total-row total-grand">
        <span>Total Paid</span>
        <span class="font-mono">${amountFormatted}</span>
      </div>
    </div>

    <div class="footer-note">
      <div>
        <strong>Authenticity Guarantee:</strong> Pure Kannauj Steam Distilled Extracts.
      </div>
      <div>
        Support: info@indianattars.com | +91 79053 37598
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      // Auto-trigger print modal if requested
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('print') === 'true') {
        window.print();
      }
    };
  </script>

</body>
</html>`;

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error: any) {
    console.error("Error generating tax invoice document:", error);
    return new NextResponse("Failed to generate tax invoice document", { status: 500 });
  }
}
