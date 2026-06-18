# VolfPack — Design Guidelines

> **Theme:** Soft Pastel · friendly, airy, cute.
> The product is playful but trustworthy. Think "a creative tool that feels like
> a warm hug" — soft cream backgrounds, pastel accents, rounded everything, and
> gentle shadows. Never harsh, never neon.

This is the source of truth for VolfPack's look & feel. When building any new
page or component, match these tokens and patterns instead of inventing new
ones. All tokens live as CSS variables in
[`src/app/globals.css`](src/app/globals.css) and are consumed through Tailwind /
shadcn utilities.

---

## 1. Brand personality

| We are              | We are not                  |
| ------------------- | --------------------------- |
| Soft, warm, friendly | Harsh, corporate, edgy      |
| Playful & cute       | Childish or unprofessional  |
| Calm & airy          | Loud, cluttered, neon       |
| Rounded & soft       | Sharp, boxy, high-contrast  |

---

## 2. Color

Colors are defined in `oklch` for perceptual consistency. Light theme is the
**default**; a gentle dark theme exists but the brand lives in the light.

### Core palette (light)

| Token            | Value                  | Use                                   |
| ---------------- | ---------------------- | ------------------------------------- |
| `--background`   | cream `#FFFDF9`        | Page background                       |
| `--foreground`   | soft ink `#4A4458`     | Body text (warm dark, never pure black) |
| `--card`         | white `#FFFFFF`        | Cards, surfaces                       |
| `--muted`        | `#F6F1FA`              | Subtle fills, secondary surfaces      |
| `--primary`      | lavender `#A78BFA`-ish | Primary buttons, links, focus rings   |
| `--accent`       | soft pink `#FFD6E8`    | Highlights, chips, soft fills         |
| `--border`       | `#EFE7F2`              | Hairline borders (low contrast)       |

### Pastel accent set (for illustrations, chips, gradients)

- **Lavender** `#C9B8F5`
- **Pink** `#FFB3D1`
- **Mint** `#A8E6CF`
- **Peach** `#FFD9B3`
- **Sky** `#BFE3FF`

Use accents sparingly and in **pairs or trios** as soft gradients. Text on
pastel fills should use the warm ink foreground, not white.

### Rules

- **Never pure black or pure white text.** Use the warm ink `--foreground`.
- **Backgrounds are cream**, surfaces are white. This subtle contrast is the
  whole vibe — don't flatten it.
- Gradients are **soft and multi-pastel**, low opacity, often blurred (blobs).
- One primary action color per screen (lavender). Don't compete CTAs.

---

## 3. Typography

Two rounded typefaces, loaded via `next/font/google`:

| Role     | Font          | Notes                                      |
| -------- | ------------- | ------------------------------------------ |
| Display / headings | **Baloo 2** | Chunky, rounded, friendly. Headings & logo. |
| Body / UI          | **Quicksand** | Rounded geometric sans. All body & UI text. |
| Mono (rare)        | Geist Mono   | Code snippets only.                        |

Exposed as `--font-heading`, `--font-sans`, `--font-mono`.

### Scale & usage

- Headings use `font-heading` (Baloo 2), `font-bold`, `tracking-tight`.
- Body uses `font-sans` (Quicksand). Default weight 500 (Quicksand reads thin at 400).
- Keep line length comfortable (`max-w-2xl` for prose). Generous line-height.
- Prefer `text-balance` on headings so they wrap prettily.

---

## 4. Shape, radius & shadow

Everything is **round and soft**. This is the signature of the theme.

| Token        | Value     | Use                          |
| ------------ | --------- | ---------------------------- |
| `--radius`   | `1.25rem` | Base radius (cards, inputs)  |
| pills        | `rounded-full` | Buttons, chips, badges   |

- **Cards / panels:** `rounded-3xl` (≈1.25–1.5rem).
- **Buttons & chips:** `rounded-full` (fully pill).
- **Inputs / selects:** `rounded-2xl`.

**Shadows are soft, low-contrast, slightly tinted** — never hard black drop
shadows. Use the `.shadow-cute` utility (a soft, lifted, faintly-lavender
shadow). Hover states lift gently (`hover:-translate-y-0.5` + slightly stronger
shadow).

Borders are hairline and low-contrast (`--border`). Many surfaces can rely on
shadow + background contrast instead of borders.

---

## 5. Layout & spacing

- Generous whitespace — the design breathes. Don't crowd.
- Page content max width: `max-w-6xl`, padded `px-4 sm:px-6`.
- Section vertical rhythm: `py-20`–`py-28`.
- Grid gaps: `gap-5`–`gap-8`.
- Decorative **blurred pastel blobs** in hero/section backgrounds add depth;
  keep them low-opacity and behind content (`-z-10`, `pointer-events-none`).

---

## 6. Components

- **Buttons:** pill-shaped, `font-heading` or medium-weight, soft shadow,
  gentle hover lift. Primary = lavender. Secondary = white/cream with border.
- **Cards:** white, `rounded-3xl`, `shadow-cute`, generous padding (`p-6`+).
- **Chips / badges:** pastel fill, `rounded-full`, small, warm ink text.
- **Inputs:** `rounded-2xl`, soft border, lavender focus ring.
- **Icons:** [lucide-react](https://lucide.dev), `size-5` default, rounded
  stroke. Brand icons (GitHub/X) are inline SVGs in `src/components/icons.tsx`.
- **Emoji** are welcome as small, tasteful accents (sparingly).

---

## 7. Motion

- Subtle and soft. Hover lifts, gentle fades, slow floating blobs.
- Respect `prefers-reduced-motion`.
- Nothing bouncy-aggressive or fast; motion should feel calm.

---

## 8. Do / Don't

✅ **Do**
- Keep it cream + pastel + rounded + soft-shadowed.
- Use warm ink text, pastel accents, lots of whitespace.
- Reach for existing tokens & utilities first.

🚫 **Don't**
- Use pure black/white, sharp corners, or hard shadows.
- Add a second loud accent color that competes with lavender.
- Crowd the layout or use neon/high-saturation colors.
