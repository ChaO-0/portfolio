import type { APIRoute } from "astro";

// One page, so generating the file beats adding @astrojs/sitemap for a single <url>.
// Derived from `site` in astro.config.mjs, so it can't drift from the canonical URL.
export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${new URL("/", site).href}</loc></url>
</urlset>
`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  );
