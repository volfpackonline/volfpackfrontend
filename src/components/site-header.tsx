import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          <Button asChild variant="ghost" size="icon" aria-label="GitHub">
            <a href={siteConfig.github} target="_blank" rel="noreferrer">
              <GitHubIcon className="size-5" />
            </a>
          </Button>
          <ThemeToggle />
          <Button asChild className="ml-1">
            <Link href="/generate">Process a video</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
