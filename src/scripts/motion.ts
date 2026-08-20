import { mountCursor } from "./cursor";
import { gsap, lines, reduced, reveals, ScrollTrigger, settle, sync } from "./reveal";
import { mountSpine } from "./spine";
import { park } from "./transition";

/**
 * The mark being drawn is the entrance to the site, not a toll on every visit.
 * Arriving means: a reload, or a load that did not come from another page here.
 * Moving around inside the site gets the panel slide instead.
 *
 * Navigation type rather than a session flag, because a refresh is a deliberate
 * "start again" and a stored flag would swallow it for the rest of the tab.
 */
const arriving = (() => {
  const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  if (entry?.type === "reload") return true;
  if (entry?.type === "back_forward") return false;
  return !document.referrer.startsWith(location.origin);
})();

/**
 * The mark constructed as a technical drawing: guides cross, the ring is struck,
 * the disc fills it, then the bore and the slot are cut out, each dimension
 * labelled as it appears. Then the drawing is wiped and the page is underneath.
 */
function boot(): Promise<void> {
  const overlay = document.getElementById("boot");
  const ring = document.getElementById("bt-ring") as SVGCircleElement | null;
  if (!overlay || !ring) return Promise.resolve();

  document.body.style.overflow = "hidden";

  // Hold the overlay until the page is actually paintable, but never past 2.2s:
  // a slow font or a big screenshot shouldn't hold the site hostage.
  const ready = Promise.race([
    Promise.all([
      document.fonts?.ready,
      ...Array.from(document.images, (img) =>
        img.complete
          ? null
          : new Promise((done) => {
              img.addEventListener("load", done, { once: true });
              img.addEventListener("error", done, { once: true });
            }),
      ),
    ]),
    new Promise((done) => setTimeout(done, 2200)),
  ]);

  const length = ring.getTotalLength?.() ?? 147;
  const dims = ["#bt-d1", "#bt-d2", "#bt-d3"];

  return new Promise((finished) => {
    const leave = () => {
      document.body.style.overflow = "";
      gsap
        .timeline({ onComplete: () => finished() })
        .to([...dims, "#bt-gv", "#bt-gh"], { opacity: 0, duration: 0.22 })
        .to("#bt-wm", { opacity: 0, duration: 0.2 }, 0.06)
        .to(overlay, { opacity: 0, duration: 0.42, ease: "power2.inOut" }, 0.16)
        .set(overlay, { display: "none" });
    };

    gsap
      .timeline({ onComplete: () => void ready.then(leave) })
      // the ring is drawn by unwinding its own dash, so the stroke appears struck
      .set(ring, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 })
      .set("#bt-bore", { scale: 0, svgOrigin: "24 24" })
      .set("#bt-slot", { scaleX: 0, svgOrigin: "24 24" })
      .to("#bt-gv", { scaleY: 1, duration: 0.32, ease: "expo.out" })
      .to("#bt-gh", { scaleX: 1, duration: 0.32, ease: "expo.out" }, 0.05)
      .to(ring, { strokeDashoffset: 0, duration: 0.58, ease: "power2.inOut" }, 0.16)
      .to("#bt-d1", { opacity: 1, duration: 0.22 }, 0.58)
      .to("#bt-disc", { opacity: 1, duration: 0.28, ease: "power2.out" }, 0.76)
      .to(ring, { opacity: 0, duration: 0.22 }, 0.84)
      .to("#bt-bore", { scale: 1, duration: 0.4, ease: "expo.out" }, 0.94)
      .to("#bt-d2", { opacity: 1, duration: 0.2 }, 1.04)
      .to("#bt-slot", { scaleX: 1, duration: 0.42, ease: "expo.out" }, 1.14)
      .to("#bt-d3", { opacity: 1, duration: 0.2 }, 1.26)
      .to("#bt-wm", { opacity: 1, duration: 0.34 }, 1.34);
  });
}

function intro() {
  lines();
  gsap
    .timeline({ defaults: { ease: "expo.out" } })
    .to("[data-hero-fade]", { opacity: 1, duration: 0.9, stagger: 0.12 }, 0.45)
    .fromTo("[data-hero-fade]", { y: 14 }, { y: 0, duration: 0.9, stagger: 0.12 }, 0.45)
    .to("[data-hero-panel]", { opacity: 1, duration: 1.1 }, 0.3)
    .to("#spine", { opacity: 1, duration: 1.6 }, 0.5);
}

/** Past the hero, the bar tightens and the links step aside. */
function topbar() {
  const bar = document.getElementById("topbar");
  const links = document.getElementById("navlinks");
  if (!bar || !links) return;
  ScrollTrigger.create({
    start: "top -140",
    onToggle: (self) => {
      const away = self.isActive;
      gsap.to(links, {
        opacity: away ? 0 : 1,
        y: away ? -6 : 0,
        pointerEvents: away ? "none" : "auto",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(bar, {
        paddingTop: away ? 9 : 15,
        paddingBottom: away ? 9 : 15,
        duration: 0.4,
        ease: "power2.out",
      });
    },
  });
}

function init() {
  mountCursor();
  if (reduced) return settle();

  const host = document.getElementById("spine");
  if (host) mountSpine(host);

  reveals();
  topbar();

  const count = document.getElementById("rail-count");
  const total = count?.textContent?.split("/")[1] ?? "";
  sync("[data-rail]", (i) => {
    if (count) count.textContent = `${String(i + 1).padStart(2, "0")} /${total}`;
  });
  sync("[data-wtab]");

  if (arriving) {
    park(); // the boot overlay is the entrance; the panel stays out of its way
    void boot().then(intro);
    return;
  }

  // coming back to home: the panel uncovers on its own, the name does not replay
  const overlay = document.getElementById("boot");
  if (overlay) overlay.style.display = "none";
  intro();
}

// If anything above throws, the page must still be readable and scrollable.
try {
  init();
} catch (err) {
  console.error(err);
  settle();
}
