import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOrdersByUserId } from "@/lib/orders-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderIdParam = searchParams.get("orderId");

    const { userId } = await auth();

    if (orderIdParam) {
      const { getOrderById } = await import("@/lib/orders-db");
      const singleOrder = getOrderById(orderIdParam);
      if (singleOrder) {
        return NextResponse.json({ success: true, order: singleOrder });
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required to view order history." },
        { status: 401 },
      );
    }

    const orders = getOrdersByUserId(userId);

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch order history." },
      { status: 500 },
    );
  }
}
