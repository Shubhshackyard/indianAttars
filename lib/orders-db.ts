import fs from "fs";
import path from "path";

export interface OrderItemRecord {
  productSlug: string;
  name: string;
  categoryLabel: string;
  qty: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderRecord {
  orderId: string;
  paymentId: string;
  clerkUserId: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  amount: number; // in INR
  currency: string;
  items: OrderItemRecord[];
  date: string;
  status: "Paid & Processing" | "Dispatched" | "Delivered" | "Paid & Confirmed" | "Failed" | "Cancelled";
}

const ORDERS_FILE_PATH = path.join(process.cwd(), "data", "orders.json");

function ensureDirectoryExists() {
  try {
    const dir = path.dirname(ORDERS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (error) {
    console.warn("[Orders DB] Could not create orders data directory:", error);
  }
}

export function getAllOrders(): OrderRecord[] {
  try {
    ensureDirectoryExists();
    if (!fs.existsSync(ORDERS_FILE_PATH)) {
      return [];
    }
    const data = fs.readFileSync(ORDERS_FILE_PATH, "utf-8");
    return JSON.parse(data) as OrderRecord[];
  } catch (error) {
    console.warn("[Orders DB] Error reading orders file:", error);
    return [];
  }
}

export function saveOrder(order: OrderRecord): boolean {
  try {
    ensureDirectoryExists();
    const orders = getAllOrders();
    // Prevent duplicate orders
    const existingIndex = orders.findIndex((o) => o.orderId === order.orderId);
    if (existingIndex >= 0) {
      orders[existingIndex] = order;
    } else {
      orders.unshift(order);
    }
    fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(orders, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.warn("[Orders DB] Error saving order record:", error);
    return false;
  }
}

export function getOrdersByUserId(clerkUserId: string): OrderRecord[] {
  if (!clerkUserId) return [];
  const orders = getAllOrders();
  return orders.filter((o) => o.clerkUserId === clerkUserId);
}

export function getOrderById(orderId: string): OrderRecord | undefined {
  const orders = getAllOrders();
  return orders.find((o) => o.orderId === orderId);
}
