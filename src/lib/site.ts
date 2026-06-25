export const siteConfig = {
  name: "VolfPack",
  tagline: "Your shorts factory.",
  description:
    "VolfPack turns your long-form video library into a predictable short-form revenue pipeline. Local when privacy matters, hosted when your team needs speed.",
  url: "https://www.volfpack.online",
  github: "https://github.com/volfpackonline",
  ogImage: "/og.png",
  nav: [
    { title: "Features", href: "/features" },
    { title: "How it works", href: "/how-it-works" },
    { title: "Use cases", href: "/use-cases" },
    { title: "Open source", href: "/open-source" },
  ],
  builders: [
    { handle: "cxprakash", twitter: "https://x.com/cxprakash" },
    { handle: "iamsausii", twitter: "https://x.com/iamsausii" },
    { handle: "msuraj025", twitter: "https://x.com/msuraj025" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
