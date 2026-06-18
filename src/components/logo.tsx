import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 font-heading", className)}
    >
      <span className="grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-violet-300 via-pink-300 to-sky-300 text-white shadow-cute">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-4 drop-shadow-sm"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7-11-7Z" fill="currentColor" />
        </svg>
      </span>
      <span className="text-xl font-bold tracking-tight">{siteConfig.name}</span>
    </Link>
  );
}
