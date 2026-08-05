import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const EASE = "power4.out"; // ≈ cubic-bezier(.16, 1, .3, 1)
const START = "top 88%";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;

const all = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
const outsideHero = (sel: string) => all(sel).filter((el) => !el.closest("#top"));
const easeInOut = (q: number) => (q < 0.5 ? 2 * q * q : 1 - (-2 * q + 2) ** 2 / 2);

/* ------------------------------------------------------------ pointer surfaces
   These only publish CSS custom properties; the stylesheet owns the visuals. */

for (const btn of all(".btn")) {
  btn.addEventListener("pointermove", (e) => {
    const box = btn.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    btn.style.setProperty("--btn-mx", `${x}px`);
    btn.style.setProperty("--btn-my", `${y}px`);
    btn.style.setProperty("--btn-x", `${((x / box.width - 0.5) * 8).toFixed(2)}px`);
    btn.style.setProperty("--btn-y", `${((y / box.height - 0.5) * 5).toFixed(2)}px`);
  });
  btn.addEventListener("pointerleave", () => {
    btn.style.setProperty("--btn-x", "0px");
    btn.style.setProperty("--btn-y", "0px");
  });
}

for (const card of all(".spot")) {
  card.addEventListener("pointermove", (e) => {
    const box = card.getBoundingClientRect();
    card.style.setProperty("--sx", `${Math.round(e.clientX - box.left)}px`);
    card.style.setProperty("--sy", `${Math.round(e.clientY - box.top)}px`);
  });
}

/* ------------------------------------------------------------------ smooth nav */

for (const link of all<HTMLAnchorElement>('a[href^="#"]')) {
  link.addEventListener("click", (e) => {
    if (link.hash.length < 2) return;
    const target = document.querySelector(link.hash);
    if (!target) return;
    e.preventDefault();
    gsap.to(window, {
      duration: reduced ? 0 : 1,
      ease: "power3.inOut",
      scrollTo: { y: target, autoKill: true },
    });
  });
}

/* ---------------------------------------------------------------- cursor ring */

if (fine && !reduced) {
  const ring = document.createElement("div");
  ring.className = "ring";
  const label = document.createElement("span");
  ring.append(label);

  // The trailing ring lags by design, so it cannot double as the pointer. This
  // dot tracks 1:1 and is what actually aims.
  const dot = document.createElement("div");
  dot.className = "dot";
  document.body.append(ring, dot);

  // Only hide the system cursor once a replacement exists — the class gates the
  // `cursor: none` rule, so no-JS and reduced-motion visitors keep a real pointer.
  document.documentElement.classList.add("has-cursor");

  const xTo = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3" });
  const yTo = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3" });
  const dotX = gsap.quickSetter(dot, "x", "px");
  const dotY = gsap.quickSetter(dot, "y", "px");

  window.addEventListener(
    "pointermove",
    (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    },
    { passive: true }
  );
  document.addEventListener("pointerleave", () => {
    ring.style.opacity = "0";
    dot.style.opacity = "0";
  });

  // Order matters: both handlers fire on an element matching two selectors and the
  // last one wins the label. The booking buttons are now external links, so exclude
  // them from OPEN or they'd stop reading BOOK.
  const labelled: [string, string][] = [
    [".frame", "VIEW"],
    [".btn-p", "BOOK"],
    ['a[target="_blank"]:not(.btn-p):not(.frame)', "OPEN"],
  ];
  for (const [sel, text] of labelled) {
    for (const el of all(sel)) {
      el.addEventListener("pointerenter", () => {
        ring.dataset.big = "";
        dot.dataset.big = ""; // the ring takes over, so the dot shrinks away
        label.textContent = text;
      });
      el.addEventListener("pointerleave", () => {
        delete ring.dataset.big;
        delete dot.dataset.big;
      });
    }
  }
}

/* ---------------------------------------------------------------- mobile nav */

const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");
if (burger && drawer) {
  // `inert` takes the page behind the overlay out of the tab order — a native
  // feature, so no hand-rolled focus trap. The header stays live: it holds the burger.
  const behind = [document.querySelector("main"), document.querySelector("footer")];

  const setOpen = (open: boolean) => {
    // read before inert lands: making an ancestor inert blurs whatever it contains
    const hadFocus = drawer.contains(document.activeElement);
    burger.setAttribute("aria-expanded", String(open));
    drawer.toggleAttribute("data-open", open);
    drawer.toggleAttribute("inert", !open);
    // the drawer covers the page; letting the page scroll under it is disorienting
    document.body.style.overflow = open ? "hidden" : "";
    for (const el of behind) el?.toggleAttribute("inert", open);

    if (open) drawer.querySelector<HTMLAnchorElement>("a")?.focus();
    // focus just became unreachable, so hand it back to the control that opened it
    else if (hadFocus) burger.focus();
  };

  burger.addEventListener("click", () =>
    setOpen(burger.getAttribute("aria-expanded") !== "true")
  );
  // a link both closes the drawer and hands off to the smooth-scroll handler
  for (const link of drawer.querySelectorAll("a")) {
    link.addEventListener("click", () => setOpen(false));
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
  // Past 900px the burger is display:none. Without this, resizing while open leaves
  // the drawer covering the page with nothing left to dismiss it and body scroll
  // still locked.
  matchMedia("(max-width: 900px)").addEventListener("change", (e) => {
    if (!e.matches) setOpen(false);
  });
}

/* -------------------------------------------------------------- scroll progress */

gsap.to("#prog", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: { start: 0, end: "max", scrub: true },
});

/* ------------------------------------------------------------------------ hero */

if (!reduced) {
  const masks = all("#top .mask > span");
  const reveals = all("#top [data-rv]");

  gsap.set(masks, { yPercent: 112 });
  gsap.set(reveals, { opacity: 0, y: 30 });

  // The preloader panel leaves on a CSS animation, which keeps wall-clock time.
  // GSAP's ticker does not: lagSmoothing caps large frame deltas, so its clock
  // falls behind whenever load contends for the main thread. A gsap.delayedCall
  // here fires late and the panel lifts to reveal an unrevealed hero, so drive
  // the trigger off a plain timer instead.
  let heroPlayed = false;
  const playHero = () => {
    if (heroPlayed) return;
    heroPlayed = true;
    gsap
      .timeline()
      .to(masks, { yPercent: 0, duration: 1, ease: EASE, stagger: 0.085 })
      .to(reveals, { opacity: 1, y: 0, duration: 1.05, ease: EASE }, 0.25);
  };
  setTimeout(playHero, 2600); // counter lands at 2.6s, panel clears at 2.75s
  document.getElementById("pre")?.addEventListener("animationend", playHero);

  // the hero recedes over its own first viewport of scroll
  const overFirstScreen = () => ({
    start: 0,
    end: () => window.innerHeight,
    scrub: true,
    invalidateOnRefresh: true,
  });
  gsap.to("#heroBody", {
    y: () => -window.innerHeight * 0.14,
    scale: 0.95,
    opacity: 0.15,
    ease: "none",
    scrollTrigger: overFirstScreen(),
  });
  gsap.to("#heroFade", { opacity: 1, ease: "none", scrollTrigger: overFirstScreen() });
}

/* --------------------------------------------------------------------- reveals */

if (!reduced) {
  for (const inner of outsideHero(".mask > span")) {
    gsap.from(inner, {
      yPercent: 112,
      duration: 1,
      ease: EASE,
      scrollTrigger: { trigger: inner, start: START, once: true },
    });
  }

  // data-rv-fade elements carry (or contain) the fixed lattice, so they must not
  // be transformed: a transform makes the element a containing block, which
  // re-anchors background-attachment: fixed to the element and blanks the grid for
  // the length of the tween. Those reveal on opacity alone.
  const groups: [string, gsap.TweenVars][] = [
    ["[data-rv]:not([data-rv-fade]):not([data-rv-x])", { opacity: 0, y: 30 }],
    ["[data-rv-fade]", { opacity: 0 }],
    ["[data-rv-x]", { opacity: 0, x: -34 }],
  ];
  for (const [sel, from] of groups) {
    const els = outsideHero(sel);
    if (!els.length) continue;
    gsap.set(els, from);
    ScrollTrigger.batch(els, {
      start: START,
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.05,
          ease: EASE,
          stagger: 0.085,
          // Drop the leftover identity transform. Any transform makes the element
          // a containing block, which re-anchors a background-attachment: fixed
          // lattice to the element instead of the viewport — the cards' grid would
          // then sit a few pixels off from the section's for good.
          onComplete: () => gsap.set(batch, { clearProps: "transform" }),
        }),
    });
  }

  // process step rules draw themselves left to right
  for (const rule of all(".ps-rule")) {
    gsap.from(rule, {
      scaleX: 0,
      duration: 1.1,
      ease: EASE,
      scrollTrigger: { trigger: rule.parentElement!, start: START, once: true },
    });
  }

  // contribution grid washes in
  const grid = document.getElementById("gh");
  if (grid) {
    gsap.set(grid.querySelectorAll(".gc"), { opacity: 0 });
    ScrollTrigger.create({
      trigger: grid,
      start: START,
      once: true,
      onEnter: () =>
        gsap.to(grid.querySelectorAll(".gc"), { opacity: 1, duration: 0.4, stagger: 0.0015 }),
    });
  }

  // big numbers count up, keeping any currency prefix and separators
  for (const el of all("[data-count]")) {
    const raw = el.textContent?.trim() ?? "";
    const digits = raw.match(/[\d,]+/);
    if (!digits) continue;
    const target = Number(digits[0].replace(/,/g, ""));
    if (!target) continue;

    const render = (n: number) => raw.replace(digits[0], n.toLocaleString("en-US"));
    const counter = { v: 0 };
    el.textContent = render(0);

    gsap.to(counter, {
      v: target,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: START, once: true },
      onUpdate: () => {
        el.textContent = render(Math.round(counter.v));
      },
      onComplete: () => {
        el.textContent = raw;
      },
    });
  }

  // small section counters drift against the scroll
  const drift = (el: Element, strength: number) =>
    gsap.fromTo(
      el,
      { y: () => (-window.innerHeight * strength) / 2 },
      {
        y: () => (window.innerHeight * strength) / 2,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

  for (const el of all("[data-px]")) drift(el, 0.035);
  // gentler, and no scale: the cutout has no frame to hide a crop behind
  const portrait = document.getElementById("portrait");
  if (portrait) drift(portrait, 0.045);
}

/* ------------------------------------------------- pinned horizontal case studies */

if (!reduced) {
  gsap.matchMedia().add("(min-width: 900px)", () => {
    const track = document.getElementById("workTrack");
    const sticky = document.getElementById("workSticky");
    const bar = document.getElementById("workBar");
    const panels = all(".wp");
    const rails = all(".wr");
    if (!track || !sticky || panels.length < 2) return;

    const distance = () => (panels.length - 1) * window.innerWidth;
    // resolved once: onUpdate runs every scrubbed frame, so it must not re-query
    const texts = panels.map((p) => p.querySelector<HTMLElement>(".wp-t"));
    const shots = panels.map((p) => p.querySelector<HTMLElement>(".frame-i"));

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: "#work",
        start: "top top",
        // 110vh of scroll buys each extra panel, as in the source design
        end: () => `+=${(panels.length - 1) * 1.1 * window.innerHeight}`,
        pin: sticky,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (bar) gsap.set(bar, { scaleX: p });

          const active = Math.round(p * (panels.length - 1));
          rails.forEach((rail, i) => rail.toggleAttribute("data-on", i === active));

          const vw = window.innerWidth;
          for (let i = 0; i < panels.length; i++) {
            const offset = i * vw - p * distance(); // signed distance from centre
            const away = Math.min(1, Math.abs(offset) / vw);
            const text = texts[i];
            const shot = shots[i];
            if (text) gsap.set(text, { opacity: 1 - away * 1.1 });
            if (shot) gsap.set(shot, { x: offset * 0.04, scale: 1.02 });
          }
        },
      },
    });

    // onUpdate's gsap.set calls are outside matchMedia's recording, so undo them.
    // The bar and the rails need it too, or dropping below 900px leaves a half-filled
    // progress rail and a stale highlight in a layout that no longer scrubs.
    return () => {
      tween.scrollTrigger?.kill();
      gsap.set([...texts, ...shots, bar].filter(Boolean), { clearProps: "all" });
      rails.forEach((rail, i) => rail.toggleAttribute("data-on", i === 0));
    };
  });
}

/* --------------------------------------------------------------------- curtain */

const run = document.getElementById("curtainRun");
if (run && !reduced) {
  const front = document.getElementById("curtFront");
  const inner = document.getElementById("curtInner");
  const back = document.getElementById("curtBack");
  const arrow = document.getElementById("curtArrow");
  let lifted = 0; // eased 0–1, also feeds the canvas backdrop

  ScrollTrigger.create({
    trigger: run,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      // the panel holds, then travels through the middle 62% of the run
      lifted = easeInOut(gsap.utils.clamp(0, 1, (self.progress - 0.22) / 0.62));
      if (front) gsap.set(front, { yPercent: -lifted * 100 });
      if (inner) gsap.set(inner, { y: `${lifted * 22}vh` });
      if (arrow) gsap.set(arrow, { y: -4 - lifted * 10 });
      if (back) gsap.set(back, { y: `${(1 - lifted) * 7}vh`, opacity: 0.25 + lifted * 0.75 });
    },
  });

  // drifting lattice behind the problem statement
  const canvas = document.getElementById("curtCv") as HTMLCanvasElement | null;
  const ctx = canvas?.getContext("2d");
  if (canvas && ctx) {
    const S = 90;
    let tick = 0;
    let raf = 0;
    let last = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 33) return;
      last = now;

      const { width: W, height: H } = canvas;
      const shift = ((window.scrollY - run.offsetTop) * 0.5) % (H + S);
      const wrap = (v: number) => (((v % (H + S)) + H + S) % (H + S)) - S;

      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(233,237,245,.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= W + S; x += S) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y <= H + S; y += S) {
        const py = wrap(y - shift);
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(W, py);
        ctx.stroke();
      }

      // a handful of cells pulse, faster as the panel lifts
      const cols = Math.ceil(W / S);
      const rows = Math.ceil(H / S);
      for (let n = 0; n < 22; n++) {
        const phase = ((tick * (1 + lifted * 2)) / 30 + n * 1.37) % 6;
        if (phase > 2.4) continue;
        const alpha = Math.sin((phase / 2.4) * Math.PI) * 0.4;
        const frac = (seed: number, mul: number) => ((((Math.sin(seed) * mul) % 1) + 1) % 1);
        const cx = Math.floor(frac(n * 4.1, 43758.5453) * cols);
        const cy = Math.floor(frac(n * 91.7, 12345.6789) * rows);
        ctx.fillStyle = `oklch(.78 .13 220 / ${alpha.toFixed(3)})`;
        ctx.fillRect(cx * S + 1, wrap(cy * S - shift) + 1, S - 1, S - 1);
      }
      tick++;
    };

    ScrollTrigger.create({
      trigger: run,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        if (self.isActive && !raf) raf = requestAnimationFrame(draw);
        else if (!self.isActive && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
    });
  }
}

/* ------------------------------------------------------------------ hero WebGL */

const heroCanvas = document.getElementById("hero3d") as HTMLCanvasElement | null;
if (heroCanvas && !reduced) {
  import("./hero3d")
    .then(({ initHero3d }) => {
      const scene = initHero3d(heroCanvas); // throws without WebGL

      // Seed from the current position, not `true`. If the page opens below the hero —
      // a #work deep link, a restored scroll position, or scrolling past before this
      // chunk resolves — no scroll event is guaranteed to arrive and stop the loop, so
      // it would render an offscreen WebGL scene forever.
      const heroVisible = () => window.scrollY < window.innerHeight;
      let running = heroVisible();
      let raf = 0;

      const loop = (now: number) => {
        if (!running) {
          raf = 0;
          return;
        }
        scene.render(now, Math.min(1, window.scrollY / window.innerHeight));
        raf = requestAnimationFrame(loop);
      };

      // only draw while the hero is on screen
      window.addEventListener(
        "scroll",
        () => {
          if (heroVisible()) {
            running = true;
            if (!raf) raf = requestAnimationFrame(loop);
          } else {
            running = false;
          }
        },
        { passive: true }
      );

      if (running) raf = requestAnimationFrame(loop);
    })
    .catch(() => {
      /* no WebGL, or the chunk failed — the CSS lattice still shows */
    });
}

/* ---------------------------------------------------------------- remeasure */

// webfonts reflow the display type, which moves every trigger
document.fonts?.ready.then(() => ScrollTrigger.refresh());
