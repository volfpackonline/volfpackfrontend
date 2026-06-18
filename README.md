# VolfPack — Frontend

> Turn words into video. The open-source text-to-video AI.

This repo contains the **Next.js frontend** for VolfPack. It ships a marketing
landing page and a working **Studio** where you describe a scene and generate a
video. The generation backend is currently **mocked** so the full UX works
end-to-end on Day 0 — wiring up real inference is the next step.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) components (Radix primitives)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode
- [sonner](https://sonner.emilkowal.ski) for toasts
- [lucide-react](https://lucide.dev) icons

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Description                    |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the dev server          |
| `npm run build`     | Production build              |
| `npm run start`     | Run the production build      |
| `npm run lint`      | Lint with ESLint              |
| `npm run typecheck` | Type-check with `tsc --noEmit` |

## Project structure

```
src/
├── app/
│   ├── api/generate/route.ts   # Mocked text-to-video endpoint
│   ├── generate/page.tsx       # The Studio page
│   ├── layout.tsx              # Root layout (theme, header, footer, toaster)
│   └── page.tsx                # Marketing landing page
├── components/
│   ├── marketing/              # Hero, features, how-it-works, CTA
│   ├── studio/                 # Prompt form, result card, studio shell
│   ├── ui/                     # shadcn/ui primitives
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   └── theme-*.tsx
└── lib/
    ├── api.ts                  # Client for the generation endpoint
    ├── site.ts                 # Central site/brand config
    ├── types.ts                # Shared types (jobs, request, options)
    └── utils.ts                # cn() helper
```

## Connecting a real backend

The Studio calls `POST /api/generate`, which today returns a sample clip after a
short delay (see [`src/app/api/generate/route.ts`](src/app/api/generate/route.ts)).

To swap in real inference, either:

1. Replace the body of that route with a call to your model service, using the
   `NEXT_PUBLIC_API_URL` and `VOLFPACK_API_KEY` env vars, **or**
2. Point `NEXT_PUBLIC_API_URL` at an external API that implements the same
   `GenerateRequest` → `VideoJob` contract (see
   [`src/lib/types.ts`](src/lib/types.ts)).

## Environment variables

See [`.env.example`](.env.example). Anything prefixed `NEXT_PUBLIC_` is exposed
to the browser — keep secrets (like `VOLFPACK_API_KEY`) unprefixed.

## License

MIT
