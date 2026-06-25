# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Next.js version warning

This project uses **Next.js 16 + React 19**, which has breaking changes from
older versions baked into Claude's training data. Before writing any Next.js
code (routing, metadata, `route.ts` handlers, `next/font`, image/OG generation,
caching), read the relevant guide under `node_modules/next/dist/docs/`
(`01-app`, `02-pages`, `03-architecture`). Heed deprecation notices.

## Commands

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm run start      # Serve the production build
npm run lint       # ESLint (eslint-config-next, flat config)
npm run typecheck  # tsc --noEmit
```

There is **no test runner configured** in this repo. Validate changes with
`npm run typecheck` and `npm run lint`.

## Naming: the README is stale

The package is `volfpack-frontend` and the README still describes a
"text-to-video" product. **The actual product in the code is "Video Enigma"** —
a tool that ingests a long-form video URL and cuts it into a publish-ready 9:16
short. The source of truth for product name/copy is [src/lib/site.ts](src/lib/site.ts)
and the domain model is [src/lib/types.ts](src/lib/types.ts), not the README.

## Architecture

App Router project under `src/`, path alias `@/* → ./src/*`.

### Two surfaces
- **Marketing** — landing page ([src/app/page.tsx](src/app/page.tsx)) composed
  from [src/components/marketing/](src/components/marketing/) sections, plus
  standalone pages (`features`, `how-it-works`, `use-cases`, `open-source`).
- **Studio** — the working app at [src/app/generate/page.tsx](src/app/generate/page.tsx),
  built from [src/components/studio/](src/components/studio/).

### The pipeline contract (the core abstraction)
[src/lib/types.ts](src/lib/types.ts) defines the whole domain: an `IngestRequest`
(URL + crop/voice/language/caption options) is processed through the eight
`PIPELINE_PHASES` (download → crop → split → clean → transcribe → rewrite →
voice → assemble) and returns a `ClipResult`. The select-option lists
(`CROP_STRATEGIES`, `VOICES`, `LANGUAGES`, `CAPTION_STYLES`) live here too and
drive the form UI. Change types here and the form, runner, and mock route all
follow.

### Request flow (and the mock)
1. [Studio](src/components/studio/studio.tsx) orchestrates state. On submit it
   fires `ingestVideo()` **and** a timed visual walk through the 8 phases in
   parallel, only revealing the `ClipResult` once both finish. The phase
   progress is cosmetic (timed `sleep`), independent of real backend progress.
2. [src/lib/api.ts](src/lib/api.ts) `ingestVideo()` POSTs to
   `${NEXT_PUBLIC_API_URL}/api/generate`.
3. [src/app/api/generate/route.ts](src/app/api/generate/route.ts) is a **mocked**
   endpoint: validates the request, sleeps ~1.2s, returns a random sample clip.
   This is the Day-0 stand-in. To wire a real backend, either replace this
   route's body (server-side, using `VOLFPACK_API_KEY`) or point
   `NEXT_PUBLIC_API_URL` at an external service implementing the same
   `IngestRequest → ClipResult` contract.

### Environment variables
- `NEXT_PUBLIC_API_URL` — backend base URL; empty in dev → uses the local mock route.
- `NEXT_PUBLIC_SITE_URL` — used for metadata / OG `metadataBase`.
- `VOLFPACK_API_KEY` — server-side secret; **never** prefix with `NEXT_PUBLIC_`.

### Styling & UI
- **Tailwind CSS v4** — no `tailwind.config`; configured in CSS via
  [src/app/globals.css](src/app/globals.css) (`@theme inline`, `@custom-variant`,
  CSS-variable design tokens in `oklch`). Light is the default brand theme.
- **shadcn/ui** (style `radix-nova`, base color neutral) in
  [src/components/ui/](src/components/ui/). Add components via the `shadcn` CLI;
  config is [components.json](components.json).
- Use the `cn()` helper from [src/lib/utils.ts](src/lib/utils.ts) for class
  merging. Fonts: `--font-sans` (Quicksand), `--font-heading` (Baloo 2),
  `--font-mono` (Geist Mono), loaded via `next/font` in
  [src/app/layout.tsx](src/app/layout.tsx).
- Theming via `next-themes` (`ThemeProvider`, `attribute="class"`,
  `enableSystem={false}`). Toasts via `sonner`.

### SEO / metadata
Metadata is centralized in [src/app/layout.tsx](src/app/layout.tsx) driven by
`siteConfig`. OG/Twitter/icon images are generated at runtime by the
`opengraph-image.tsx`, `twitter-image.tsx`, `icon.tsx`, `apple-icon.tsx` route
files (shared helper in [src/lib/og-image.tsx](src/lib/og-image.tsx)).
`robots.ts` and `sitemap.ts` are also code-generated.

## Conventions
- Server Components by default; add `"use client"` only where interactivity is
  needed (the Studio components, theme toggle).
- Keep product copy/config in `src/lib/site.ts`; keep the pipeline domain model
  in `src/lib/types.ts` — don't hardcode either in components.
