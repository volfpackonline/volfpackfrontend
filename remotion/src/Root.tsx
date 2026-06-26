import { Composition } from "remotion";
import { FPS, DURATION_FRAMES } from "./theme";
import { VolfPackAd } from "./VolfPackAd";
import { GoldmineAd, GOLDMINE_DUR } from "./ads/Goldmine";
import { SecretAd, SECRET_DUR } from "./ads/Secret";
import { MathAd, MATH_DUR } from "./ads/MathAd";
import { EditorAd, EDITOR_DUR } from "./ads/EditorAd";
import { FreedomAd, FREEDOM_DUR } from "./ads/FreedomAd";
import { DemoAd, DEMO_DUR } from "./ads/DemoAd";
import { FactoryAd, FACTORY_DUR } from "./ads/FactoryAd";
import { OddlyAd, ODDLY_DUR } from "./ads/OddlyAd";
import { TierAd, TIER_DUR } from "./ads/TierAd";
import { TextThreadAd, TEXT_DUR } from "./ads/TextThreadAd";
import { SpeedrunAd, SPEEDRUN_DUR } from "./ads/SpeedrunAd";
import { FootageAd, FOOTAGE_DUR } from "./ads/FootageAd";
import { RecipeAd, RECIPE_DUR } from "./ads/RecipeAd";
import { PortalAd, PORTAL_DUR } from "./ads/PortalAd";

const V = { fps: FPS, width: 1080, height: 1920 } as const;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Original — pain / time angle */}
      <Composition id="VolfPackAd" component={VolfPackAd} durationInFrames={DURATION_FRAMES} {...V} />
      {/* 1 · Goldmine — loss aversion (light / treasure) */}
      <Composition id="Goldmine" component={GoldmineAd} durationInFrames={GOLDMINE_DUR} {...V} />
      {/* 2 · Secret — envy / social proof (light / split-screen) */}
      <Composition id="Secret" component={SecretAd} durationInFrames={SECRET_DUR} {...V} />
      {/* 3 · Math — volume / ROI (dark dashboard) */}
      <Composition id="Math" component={MathAd} durationInFrames={MATH_DUR} {...V} />
      {/* 4 · Not an Editor — skill barrier (dark NLE → light) */}
      <Composition id="NotAnEditor" component={EditorAd} durationInFrames={EDITOR_DUR} {...V} />
      {/* 5 · Freedom — burnout → freedom (night → morning) */}
      <Composition id="Freedom" component={FreedomAd} durationInFrames={FREEDOM_DUR} {...V} />
      {/* 6 · Demo — show, don't tell (app UI, fast) */}
      <Composition id="Demo" component={DemoAd} durationInFrames={DEMO_DUR} {...V} />

      {/* ─── Creative-zone batch ─── */}
      {/* A · Shorts Factory — assembly line (light, on-brand tagline) */}
      <Composition id="Factory" component={FactoryAd} durationInFrames={FACTORY_DUR} {...V} />
      {/* B · Oddly Satisfying — no words, slice → snap grid (muted-proof) */}
      <Composition id="Oddly" component={OddlyAd} durationInFrames={ODDLY_DUR} {...V} />
      {/* C · Tier List — meme ranking (shareable) */}
      <Composition id="TierList" component={TierAd} durationInFrames={TIER_DUR} {...V} />
      {/* D · Text Thread — iMessage story with expanding demo */}
      <Composition id="TextThread" component={TextThreadAd} durationInFrames={TEXT_DUR} {...V} />
      {/* E · Speedrun — any% glitch overlay (dark/neon) */}
      <Composition id="Speedrun" component={SpeedrunAd} durationInFrames={SPEEDRUN_DUR} {...V} />
      {/* F · Footage Begs — anthropomorphized file (cute) */}
      <Composition id="Footage" component={FootageAd} durationInFrames={FOOTAGE_DUR} {...V} />
      {/* G · Recipe Card — cooking-show framing (warm) */}
      <Composition id="Recipe" component={RecipeAd} durationInFrames={RECIPE_DUR} {...V} />
      {/* H · Portal — sci-fi clone machine (dark/neon) */}
      <Composition id="Portal" component={PortalAd} durationInFrames={PORTAL_DUR} {...V} />
    </>
  );
};
