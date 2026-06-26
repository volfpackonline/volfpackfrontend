export const siteConfig = {
  name: "VolfPack",
  tagline: "Your shorts factory.",
  description:
    "VolfPack turns one long video into a week of ready-to-post shorts — auto captions, vertical framing, voiceovers, and scroll-stopping hooks. No editing skills required.",
  url: "https://www.volfpack.online",
  signInUrl: "https://app.volfpack.online/signin",
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
