/**
 * Panel-slide navigation between pages. The panel ships in the HTML already
 * covering the viewport, so the incoming page is never briefly visible before it
 * arrives, and it uncovers by CSS animation — arriving needs no JS. This file only
 * handles leaving: a link click sends the same element back down, then navigates.
 *
 * Plain multi-page navigation on purpose. A client router would swap documents
 * without a reload, but then every script here would need a re-entry lifecycle —
 * the cursor would mount twice, ScrollTriggers would leak — to buy an effect the
 * panel already hides.
 */
const OUT = 380; // cover, before navigating away
const EASE = "cubic-bezier(.76,0,.24,1)";

const panel = document.getElementById("tx");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Above the viewport, instantly, with nothing animating it back. */
export function park() {
  if (!panel) return;
  panel.style.animation = "none";
  panel.style.transition = "none";
  panel.style.transform = "translateY(-100%)";
  panel.removeAttribute("data-show");
}

/** Bring it up from below to cover, then hand over to the browser. */
function leave(href: string) {
  if (!panel || reduced) {
    location.href = href;
    return;
  }
  panel.style.animation = "none";
  panel.style.transition = "none";
  panel.style.transform = "translateY(100%)";
  panel.style.pointerEvents = "auto"; // swallow clicks on the page being left
  panel.removeAttribute("data-show");
  void panel.offsetHeight; // commit the start position before animating from it
  panel.style.transition = `transform ${OUT}ms ${EASE}`;
  panel.style.transform = "translateY(0)";
  setTimeout(() => panel.setAttribute("data-show", ""), OUT - 130);
  setTimeout(() => (location.href = href), OUT + 90);
}

document.addEventListener("click", (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }
  const link = (e.target as HTMLElement)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin) return;
  // same page, different anchor: that is a scroll, not a navigation
  if (url.pathname === location.pathname && url.search === location.search) return;

  e.preventDefault();
  leave(url.href);
});

// Restoring from the back/forward cache replays the covered state, so clear it.
addEventListener("pageshow", (e) => {
  if (e.persisted) park();
});
