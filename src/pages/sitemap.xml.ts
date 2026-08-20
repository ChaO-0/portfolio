import type { APIRoute } from "astro";

// A handful of pages, so generating the file beats adding @astrojs/sitemap.
// Derived from `site` in astro.config.mjs, so it can't drift from the canonical URL.
const paths = [
  "/",
  "/work",
  "/work/monark",
  "/work/classportal",
  "/work/stencil",
  "/systems",
  "/services",
  "/for-agencies",
  "/about",
];

// Trailing slashes on purpose: the build emits directory-style pages, so the
// canonical on /services is ".../services/". A sitemap that lists the unslashed
// form points at a different URL to the one the page declares as canonical.
const href = (site: URL | undefined, path: string) =>
  new URL(path === "/" ? "/" : `${path}/`, site).href;

export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${href(site, p)}</loc></url>`).join("\n")}
</urlset>
`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  );
