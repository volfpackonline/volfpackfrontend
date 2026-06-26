import { siteConfig } from "@/lib/site";

/**
 * Schema.org JSON-LD builders. Rendered via <JsonLd> (see components/json-ld).
 * Validate output with Google's Rich Results Test / validator.schema.org.
 */

const url = siteConfig.url;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url,
  logo: `${url}/icon`,
  description: siteConfig.description,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url,
  description: siteConfig.description,
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  url,
  description: siteConfig.description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free to start",
  },
};

export type Faq = { q: string; a: string };

export const faqPageSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${url}${c.path}`,
  })),
});
