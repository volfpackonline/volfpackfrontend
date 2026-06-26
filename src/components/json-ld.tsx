/**
 * Renders a schema.org JSON-LD payload as a native <script> tag (the Next.js
 * recommended approach for structured data). The `<` → `<` replacement
 * prevents `</script>`-based XSS from any string values.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
