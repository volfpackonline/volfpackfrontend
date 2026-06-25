import { Hero } from "@/components/marketing/hero";
import { Stats } from "@/components/marketing/stats";
import { Features } from "@/components/marketing/features";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { CTA } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="pt-16 sm:pt-20">
        <Stats />
      </div>
      <Features />
      <HowItWorks />
      <CTA />
    </>
  );
}
