import { mountCursor } from "./cursor";
import { lines, progress, reduced, reveals, settle, sync } from "./reveal";
import "./transition";

/** Sub-pages: no boot overlay, no spine, no rail. Headline, reveals, TOC, progress. */
function init() {
  mountCursor();
  if (reduced) return settle();

  reveals();
  progress();
  sync("[data-toc]");
  lines(0.15);
}

try {
  init();
} catch (err) {
  console.error(err);
  settle();
}
