"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function RouteProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed left-0 top-0 z-[200] h-[3px] bg-primary"
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "100%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}
