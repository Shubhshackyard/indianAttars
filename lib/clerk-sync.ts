import { createClerkClient } from "@clerk/nextjs/server";

export interface SyncOrderParams {
  clerkUserId: string;
  orderId: string;
  paymentId?: string;
  amountInINR: number;
  status: string;
  items?: any[];
  shippingAddress?: any;
  customerPhone?: string;
  customerName?: string;
}

export async function syncOrderToClerkUser(params: SyncOrderParams) {
  if (!params.clerkUserId || params.clerkUserId === "guest") return;

  try {
    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) return;

    const clerk = createClerkClient({ secretKey });
    const user = await clerk.users.getUser(params.clerkUserId);
    if (!user) return;

    const existingMetadata = user.unsafeMetadata || {};
    const existingOrders = Array.isArray(existingMetadata.orders)
      ? (existingMetadata.orders as any[])
      : [];

    const formattedItems = Array.isArray(params.items)
      ? params.items.map((i: any) =>
          typeof i === "string"
            ? i
            : `${i.name || "Product"} (${i.qty || ""} x${i.quantity || 1})`,
        )
      : [];

    const newOrderSummary = {
      orderId: params.orderId,
      paymentId: params.paymentId || "N/A",
      amountINR: `₹${params.amountInINR.toLocaleString("en-IN")}`,
      status: params.status,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      items: formattedItems,
    };

    // Filter out duplicates and append new order
    const updatedOrders = [
      newOrderSummary,
      ...existingOrders.filter((o: any) => o.orderId !== params.orderId),
    ];

    const totalSpentNumber = updatedOrders.reduce((sum, o: any) => {
      const val =
        typeof o.amountINR === "string"
          ? Number(o.amountINR.replace(/[^0-9.]/g, ""))
          : Number(o.amountINR) || 0;
      return sum + val;
    }, 0);

    // Deep merge updated metadata into Clerk user profile
    await clerk.users.updateUserMetadata(params.clerkUserId, {
      unsafeMetadata: {
        ...existingMetadata,
        shippingAddress: params.shippingAddress || existingMetadata.shippingAddress || null,
        customerPhone: params.customerPhone || params.shippingAddress?.phone || existingMetadata.customerPhone || "",
        customerName: params.customerName || params.shippingAddress?.name || existingMetadata.customerName || "",
        totalOrders: updatedOrders.length,
        totalSpentINR: `₹${totalSpentNumber.toLocaleString("en-IN")}`,
        lastOrder: newOrderSummary,
        orders: updatedOrders,
      },
    });

    console.log(`[Clerk Metadata Sync] Successfully synced order ${params.orderId} for user ${params.clerkUserId}`);
  } catch (err) {
    console.warn(`[Clerk Metadata Sync] Warning: Could not sync order to Clerk metadata for user ${params.clerkUserId}:`, err);
  }
}
