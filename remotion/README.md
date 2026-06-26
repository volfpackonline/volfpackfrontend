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
npm run dev      # open Remotion Studio to scrub/preview live
npm run render   # → out/volfpack-ad.mp4  (1080×1920, 30fps, 30s)
npm run still    # → out/frame.png (single frame, for a quick look)
```

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
