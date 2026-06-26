# VolfPack — Ad (Remotion)

A 30-second, fully-animated product ad for VolfPack, built with
[Remotion](https://remotion.dev) and themed to match
[`../design.md`](../design.md) (Soft Pastel: cream + lavender, Baloo 2 +
Quicksand, rounded everything, soft shadows).

> **Story:** Creators burn all day shooting long-form, but the feed only wants
> shorts — so when do they make those? VolfPack turns the long video they
> _already shot_ into a week of ready-to-post shorts. **Shoot once. Post all week.**

## Setup

```bash
cd remotion
npm install
```

## Preview & render

```bash
npm run dev      # open Remotion Studio to scrub/preview ALL compositions live
npm run render   # → out/volfpack-ad.mp4  (the original, 30s)

# Render any specific reel by composition id:
npx remotion render Goldmine    out/Goldmine.mp4
npx remotion render Secret      out/Secret.mp4
npx remotion render Math        out/Math.mp4
npx remotion render NotAnEditor out/NotAnEditor.mp4
npx remotion render Freedom     out/Freedom.mp4
npx remotion render Demo        out/Demo.mp4
```

## The seven reels (all 1080×1920, 30fps)

Each reel is a **different angle, visual language, theme, and bespoke component
set** — deliberately not one template. Music is matched per mood.

| id            | Angle                         | Look / theme                         | Track          | Len |
| ------------- | ----------------------------- | ------------------------------------ | -------------- | --- |
| `VolfPackAd`  | Pain / time (original)        | Light pastel, kinetic type           | sigma          | 30s |
| `Goldmine`    | Loss aversion (back catalog)  | Warm cream + archive grid, sparkles  | acoustic-spring| 24s |
| `Secret`      | Envy / social proof           | Light split-screen You-vs-Her        | joyful-funk    | 24s |
| `Math`        | Volume / ROI                  | **Dark** analytics dashboard + charts| funk-breakbeat | 22s |
| `NotAnEditor` | Skill barrier                 | **Dark** editor UI → dissolves → light| sigma         | 22s |
| `Freedom`     | Burnout → freedom             | Continuous **night → morning** sky   | honey-kisses   | 28s |
| `Demo`        | Show, don't tell              | Light app-UI, pipeline runs live     | funk-breakbeat | 18s |

## Creative-zone batch (concept-first reels)

Eight more, each inventing its own little world — heavier on bespoke components,
deliberately no shared template.

| id           | Concept                          | Signature device                              | Track          | Len |
| ------------ | -------------------------------- | --------------------------------------------- | -------------- | --- |
| `Factory`    | "Your shorts factory" (tagline)  | Conveyor belt + machine stations → shipped boxes | joyful-funk | 24s |
| `Oddly`      | Oddly-satisfying, **no words**   | Long bar sliced → tiles snap into a grid       | honey-kisses   | 18s |
| `TierList`   | Meme tier-list ranking           | Cards slot into S–F; VolfPack slams into S     | funk-breakbeat | 22s |
| `TextThread` | iMessage story                   | Chat + typing dots + expanding in-chat demo    | sigma          | 22s |
| `Speedrun`   | Any% speedrun overlay            | Live timer, split times, glitch "NEW RECORD!"  | funk-breakbeat | 20s |
| `Footage`    | Anthropomorphized file (cute)    | File with blinking eyes begs; clip-characters escape | acoustic-spring | 20s |
| `Recipe`     | Cooking-show recipe card         | Ingredients/method tick off; shorts "plated"   | acoustic-spring| 22s |
| `Portal`     | Sci-fi clone machine             | Video enters a swirling portal; 8 clones exit  | funk-breakbeat | 20s |

Render any: `npx remotion render <id> out/<id>.mp4`.

Bespoke components live next to each reel in [`src/ads/`](src/ads). Shared
brand pieces (PhoneMock, ShortCard, BrandMark, Chip) are in
[`src/components/`](src/components); tokens in [`src/theme.ts`](src/theme.ts)
(light + `dark`).

## Add sound (music + SFX)

The project renders **silently by default**. To add a soundtrack:

1. Drop an audio file at `public/music/track.mp3`.
2. In [`src/VolfPackAd.tsx`](src/VolfPackAd.tsx), set:
   ```ts
   const MUSIC_FILE: string | null = "music/track.mp3";
   ```
3. Re-render. Adjust `volume` (0–1) on the `<Audio>` tag to taste.

**Royalty-free music that fits the brand** (upbeat-but-soft, ~30s, no harsh
drops): Pixabay Music, Uppbeat, YouTube Audio Library, or Epidemic Sound.
Look for "playful / hopeful / light corporate" at ~100–120 BPM.

To layer SFX (a soft "pop" as each short appears, a gentle riser on the reveal),
add more `<Audio>` tags inside the matching `<Sequence>` in `VolfPackAd.tsx`
using `staticFile("sfx/pop.mp3")` etc.

## Structure

```
src/
├── Root.tsx            # registers the <Composition>
├── VolfPackAd.tsx      # sequences the 8 scenes + background + music slot
├── theme.ts            # brand tokens mirrored from design.md / globals.css
├── scenes.tsx          # the 8 scenes (problem → reveal → magic → logo)
├── components/         # Background (blobs), PhoneMock, ShortCard, Chip, BrandMark
└── util/anim.ts        # fadeUp / pop / fade-out helpers
```

Timing (frames @30fps): problem 90 · time-sink 90 · feed 120 · question 60 ·
reveal 90 · magic 210 · approve 120 · logo 120 = **900 (30s)**.
