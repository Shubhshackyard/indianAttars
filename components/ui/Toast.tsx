"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { useToastStore, type ToastVariant } from "@/lib/toast";

const styles: Record<ToastVariant, { cls: string; icon: React.ReactNode }> = {
  success: {
    cls: "bg-success text-white",
    icon: <CheckCircle2 size={18} />,
  },
  error: {
    cls: "bg-error text-white",
    icon: <XCircle size={18} />,
  },
  info: {
    cls: "bg-ink text-white",
    icon: <Info size={18} />,
  },
};

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[200] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => dismiss(t.id)}
            className={`pointer-events-auto flex items-center gap-3 rounded-md px-4 py-3 text-left text-sm shadow-lift ${styles[t.variant].cls}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            {styles[t.variant].icon}
            <span className="flex-1">{t.message}</span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
