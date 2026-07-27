"use client";

import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="font-display text-hero italic leading-none text-primary">
        500
      </span>
      <h1 className="mt-2 font-display text-h2 text-ink">
        Something went wrong.
      </h1>
      <p className="mt-2 text-muted">
        An unexpected error occurred. Please try again, or reach us at{" "}
        <a href={`mailto:${SITE.email}`} className="text-primary underline">
          {SITE.email}
        </a>
        .
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className={buttonClasses({ variant: "primary", size: "lg" })}
        >
          Try Again
        </button>
        <Link
          href="/"
          className={buttonClasses({ variant: "secondary", size: "lg" })}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
