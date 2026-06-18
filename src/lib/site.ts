export const siteConfig = {
  name: "VolfPack",
  tagline: "Turn words into video.",
  description:
    "VolfPack is an open-source text-to-video AI. Describe a scene in plain language and generate cinematic video in seconds.",
  url: "https://volfpack.ai",
  github: "https://github.com/volfpack/volfpack",
  twitter: "https://twitter.com/volfpack",
  ogImage: "/og.png",
  nav: [
    { title: "Features", href: "/#features" },
    { title: "How it works", href: "/#how-it-works" },
    { title: "Generate", href: "/generate" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
