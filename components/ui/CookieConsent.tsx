"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "ia-cookie-consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed bottom-20 inset-x-0 mx-auto z-[130] w-[calc(100vw-2rem)] max-w-xl rounded-lg border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111827] p-4 shadow-lift lg:bottom-4"
        >
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm text-[#374151] dark:text-[#E5E7EB]">
              We use cookies to improve your browsing experience. By continuing,
              you agree to our{" "}
              <Link href="/privacy" className="font-semibold text-primary dark:text-[#57c08c] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <button
              onClick={accept}
              className="shrink-0 rounded-pill bg-[#1F2937] px-5 py-2 font-label text-[0.65rem] uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#000000] dark:bg-[#F9FAFB] dark:text-[#111827] dark:hover:bg-white"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
