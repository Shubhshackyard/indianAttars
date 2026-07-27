import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="font-display text-hero italic leading-none text-primary">
        404
      </span>
      <h1 className="mt-2 font-display text-h2 text-ink">
        This page has evaporated.
      </h1>
      <p className="mt-2 text-muted">
        The page you’re looking for doesn’t exist or has been moved. Let’s get
        you back to something fragrant.
      </p>
      <Link
        href="/products"
        className={buttonClasses({
          variant: "primary",
          size: "lg",
          className: "mt-6",
        })}
      >
        Back to Shop <ArrowRight size={16} />
      </Link>
    </div>
  );
}
