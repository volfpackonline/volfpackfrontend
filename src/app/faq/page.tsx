import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { faqPageSchema, breadcrumbSchema, type Faq } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about VolfPack — how it turns long videos into shorts, what you can upload, captions and voiceover, privacy, pricing, and which platforms it supports.",
  alternates: { canonical: "/faq" },
};

const FAQS: Faq[] = [
  {
    q: "What does VolfPack do?",
    a: "VolfPack turns one long-form video into a week of ready-to-post shorts. Paste a link and it finds your best moments, reframes them vertically, writes punchy hooks, adds captions and optional voiceover, and hands you finished 9:16 clips to review and post.",
  },
  {
    q: "What kind of videos can I use?",
    a: "Any long-form video — podcasts, vlogs, interviews, streams, webinars, or talks. Paste a YouTube link or upload your own file and VolfPack takes it from there.",
  },
  {
    q: "Do I need any video editing skills?",
    a: "None. There are no timelines or keyframes to learn. You paste a link, VolfPack does the cutting, framing, captioning and hooks, and you simply review and approve the finished shorts.",
  },
  {
    q: "How many shorts can I get from one video?",
    a: "Typically 6–10 publish-ready shorts from a single long-form video, depending on its length and how many strong moments it contains.",
  },
  {
    q: "Which platforms are the shorts made for?",
    a: "Every clip is exported in vertical 9:16 — ready to post to TikTok, Instagram Reels, and YouTube Shorts.",
  },
  {
    q: "Can I review and edit clips before posting?",
    a: "Yes. Nothing is published automatically. You review each short — framing, captions, hook and transcript — and approve it before you download or schedule it. You stay in control of the final cut.",
  },
  {
    q: "Does it add captions and a voiceover?",
    a: "Yes. VolfPack generates animated, word-by-word captions that snap to each spoken word, and you can optionally add a natural-sounding AI voiceover.",
  },
  {
    q: "What languages does VolfPack support?",
    a: "VolfPack can produce captions and voiceover in multiple languages, so you can repurpose one video for audiences across different regions.",
  },
  {
    q: "Is my content private and secure?",
    a: "Yes. Your footage is processed in an isolated, encrypted workspace. It is never shared and never used to train public models, and you control exactly which integrations are enabled.",
  },
  {
    q: "How much does it cost?",
    a: "You can start for free — paste a link and make your first short at no cost. Reach out for team and agency plans.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />

      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Everything you need to know about turning long videos into
          ready-to-post shorts with VolfPack.
        </p>
      </div>

      <dl className="space-y-4">
        {FAQS.map((faq) => (
          <div
            key={faq.q}
            className="rounded-3xl border border-border/60 bg-card p-6 shadow-cute sm:p-7"
          >
            <dt className="font-heading text-lg font-bold">{faq.q}</dt>
            <dd className="mt-2 text-muted-foreground">{faq.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
