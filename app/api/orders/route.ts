import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOrdersByUserId } from "@/lib/orders-db";

export async function GET() {
  try {
    const { userId } = await auth();

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
