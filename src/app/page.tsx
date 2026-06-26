import { Hero } from "@/components/marketing/hero";
import { Stats } from "@/components/marketing/stats";
import { Features } from "@/components/marketing/features";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { CTA } from "@/components/marketing/cta";
import { JsonLd } from "@/components/json-ld";
import { softwareApplicationSchema } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
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
