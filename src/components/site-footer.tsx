import { GitHubIcon, XIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={siteConfig.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="transition-colors hover:text-foreground"
          >
            <XIcon className="size-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-4">
        <p className="mx-auto max-w-6xl px-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. Open source under the
          MIT License.
        </p>
      </div>
    </footer>
  );
}
