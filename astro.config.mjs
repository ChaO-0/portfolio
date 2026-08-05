import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Canonical origin. Everything derives from this one line: the canonical link,
  // og:url, the absolute og:image URL, /sitemap.xml and /robots.txt. Change it here
  // when the domain is registered and nothing else needs touching.
  site: "https://christopheryu.com",
  vite: { plugins: [tailwindcss()] },
});
