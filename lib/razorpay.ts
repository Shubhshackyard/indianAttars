import { toast } from "@/lib/toast";

export interface CheckoutCustomerInfo {
  userId?: string;
  name?: string;
  email?: string;
  contact?: string;
}

export interface CheckoutOptions {
  amountInINR: number;
  description?: string;
  customer?: CheckoutCustomerInfo;
  items?: any[];
  onSuccess?: (paymentInfo: { orderId: string; paymentId: string }) => void;
  onCancel?: () => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    Razorpay?: any;
  }
}

/** Dynamically load the Razorpay checkout.js script if not already present. */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Initiates Razorpay Standard Web Checkout.
 * 1. Calls /api/create-order to obtain order_id (linked to authenticated user)
 * 2. Launches Razorpay modal window
 * 3. Verifies signature via /api/verify-payment upon success
 */
export async function processRazorpayCheckout(options: CheckoutOptions) {
  try {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Failed to load Razorpay payment gateway script.");
      options.onError?.("Script load error");
      return;
    }

    // Amount in paise (e.g. ₹500 = 50000 paise)
    const amountInPaise = Math.round(options.amountInINR * 100);

    if (amountInPaise < 100) {
      toast.error("Minimum payment amount is ₹1.00.");
      return;
    }

    // Step 1: Create order via backend API with user profile metadata
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        userId: options.customer?.userId,
        customerName: options.customer?.name,
        customerEmail: options.customer?.email,
      }),
    });

    const orderData = await res.json();

    if (!res.ok || !orderData.order_id) {
      const errMsg = orderData.error || "Could not create payment order.";
      toast.error(errMsg);
      options.onError?.(errMsg);
      return;
    }

    const keyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TM4fai0Gnbzrjm";

    // Step 2: Open Razorpay checkout modal
    const rzpOptions = {
      key: keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "indianattars",
      description: options.description || "Pure Oils, Attars & Absolutes",
      image: "/favicon.ico",
      order_id: orderData.order_id,
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        try {
          // Step 3: Verify signature on backend API and link to user profile
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: amountInPaise,
              currency: "INR",
              customerName: options.customer?.name,
              customerEmail: options.customer?.email,
              userId: options.customer?.userId,
              items: options.items || [],
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            toast.success("Payment verified successfully!");
            options.onSuccess?.({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
            });

            // Redirect to Order Success & Receipt Page
            if (typeof window !== "undefined") {
              window.location.href = `/order-success?orderId=${encodeURIComponent(response.razorpay_order_id)}&paymentId=${encodeURIComponent(response.razorpay_payment_id)}`;
            }
          } else {
            const err = verifyData.error || "Payment signature verification failed.";
            toast.error(err);
            options.onError?.(err);
          }
        } catch (err: any) {
          toast.error("Failed to verify payment with server.");
          options.onError?.(err.message);
        }
      },
      prefill: {
        name: options.customer?.name || "",
        email: options.customer?.email || "",
        contact: options.customer?.contact || "",
      },
      theme: {
        color: "#7A1C30",
      },
      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled.");
          options.onCancel?.();
        },
      },
    };

    const razorpayInstance = new window.Razorpay(rzpOptions);

    // Handle payment failed event
    razorpayInstance.on("payment.failed", function (response: any) {
      console.error("Razorpay payment failed:", response.error);
      const msg = response.error?.description || "Payment failed.";
      toast.error(`Payment Failed: ${msg}`);
      options.onError?.(msg);
    });

    razorpayInstance.open();
  } catch (error: any) {
    console.error("Razorpay checkout error:", error);
    toast.error("An error occurred during checkout initialization.");
    options.onError?.(error.message);
  }
}
