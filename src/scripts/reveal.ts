/**
 * Motion every page shares: the headline line-wipe, scroll reveals, image masks,
 * parallax, the scroll progress bar, and lighting the nav anchor whose section is
 * on screen. Page-specific pieces (the boot overlay, the spine, the rail) live in
 * the entry that imports this.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { park } from "./transition";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const all = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel));

/**
 * The state every animation resolves to. Used three ways: as the reduced-motion
 * answer, as the failsafe if something throws, and after a boot overlay leaves.
 */
export function settle() {
  document.body.style.overflow = "";
  park();
  gsap.set("[data-line]", { yPercent: 0 });
  gsap.set("[data-hero-fade],[data-hero-panel],[data-reveal],[data-fade]", { opacity: 1, y: 0 });
  gsap.set("[data-mask]", { clipPath: "none" });
  gsap.set("[data-mask] img", { scale: 1 });
  gsap.set("#spine", { opacity: 1 });
  const overlay = document.getElementById("boot");
  if (overlay) overlay.style.display = "none";
}

export function reveals() {
  all("[data-reveal]").forEach((el) =>
    gsap.fromTo(
      el,
      { y: 26, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.95,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      },
    ),
  );

  all("[data-mask]").forEach((el) => {
    const trigger = { trigger: el, start: "top 86%" };
    gsap.fromTo(
      el,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "expo.out", scrollTrigger: trigger },
    );
    const img = el.querySelector("img");
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.12 },
        { scale: 1, duration: 1.6, ease: "expo.out", scrollTrigger: trigger },
      );
    }
  });

  all("[data-parallax]").forEach((el) =>
    gsap.to(el, {
      y: Number(el.dataset.parallax) || -30,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    }),
  );
}

/** Headline lines wipe up from behind their own clipped edge. */
export function lines(delay = 0) {
  gsap.from("[data-line]", {
    yPercent: 112,
    duration: 1.15,
    ease: "expo.out",
    stagger: 0.09,
    delay,
  });
}

export function progress() {
  const bar = document.getElementById("prog");
  if (!bar) return;
  gsap.to(bar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
  });
}

/**
 * Light the anchor whose target section is on screen. The rail, the work tab strip
 * and a page's table of contents are the same problem, so they run through the
 * same function: each anchor's own href says which section it watches.
 */
export function sync(selector: string, onActive?: (i: number) => void) {
  const anchors = all(selector) as HTMLAnchorElement[];
  anchors.forEach((anchor, i) => {
    const section = document.querySelector(anchor.hash);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: "top 55%",
      end: "bottom 45%",
      onToggle: (self) => {
        if (!self.isActive) return;
        anchors.forEach((a, k) => a.toggleAttribute("data-on", k === i));
        onActive?.(i);
      },
    });
  });
}
