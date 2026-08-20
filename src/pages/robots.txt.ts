import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) =>
  new Response(
    // An empty Disallow is the original protocol's way of saying "all of it".
    // Allow is a later extension every major crawler supports but not every
    // simpler one parses, so both are here and they say the same thing.
    //
    // The wildcard group covers AI crawlers too, which is deliberate rather than
    // an oversight: a portfolio with no client logos needs to be findable, and
    // the answer engines cite with a link. Nothing here is paywalled, so there is
    // nothing for a training crawler to take that publishing it did not already
    // give away. To opt out of model training while keeping Google rankings
    // untouched, the switch is a Google-Extended group with Disallow: / — that
    // one is separate from Googlebot and does not affect Search.
    `User-agent: *
Disallow:
Allow: /

Sitemap: ${new URL("/sitemap.xml", site).href}
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
