# Portfolio — Christopher Hendratno

Single-page portfolio. Astro 7 (static), Tailwind 4, GSAP ScrollTrigger, three.js for the hero.

```sh
npm install
npm run dev      # localhost:4321
npm run build    # → dist/
npm run preview
```

## Where things live

| Path | What |
| :--- | :--- |
| `src/data/site.ts` | **All copy and links.** Edit content here, not in components. |
| `src/components/*.astro` | One per page section, composed by `src/pages/index.astro`. |
| `src/styles/global.css` | Design tokens (`@theme`), type scale, and every hover/component style. |
| `src/scripts/motion.ts` | All scroll animation: reveals, the pinned work scroll, the curtain, cursor ring. |
| `src/scripts/hero3d.ts` | The WebGL hero. Lazy-loaded as its own chunk; never blocks paint. |

Animation splits by cost: anything CSS can do (button fills, label rolls, card
spotlights, corner brackets) is CSS driven by custom properties. GSAP only owns
what needs scroll position. Repeated markup — the preloader ticks, the marquee,
the contribution grid — is rendered at build time, not assembled by JS.

## Notes

- **Two values deliberately diverge from the source design.** Bali is WITA (UTC+8),
  but the design says `GMT+7`, which is Jakarta. And the design still says
  "Christopher Hendratno". `site.timezone` and `site.name` are correct here on
  purpose — don't let a future design sync revert either.
- **The mobile drawer is gated by `inert`, not `visibility`.** It looks like
  `visibility: hidden` would be simpler, and it was, until it wasn't: `visibility` is
  in the drawer's transition list, so at the instant the open class lands the
  transition sits at progress 0, the computed value is still `hidden`, and a hidden
  element silently refuses `focus()`. Forcing a reflow doesn't help — the transition
  has to advance a tick first. `inert` carries the same meaning (out of the tab order
  and out of the a11y tree) and applies instantly. It's also the markup default on
  `#drawer`, so with no JS the invisible full-screen overlay can't be tabbed into.

- **`src/assets/portrait.png` must be a transparent cutout.** The About block
  deliberately lets the figure overhang its accent frame on the left and below,
  so there is no container clipping it and no `overflow: hidden` to hide a
  rectangular edge. A photo with a baked-in background will look wrong there.
- **The system cursor is hidden, but only once a replacement exists.** The
  `cursor: none` rule is gated behind `html.has-cursor`, which `motion.ts` adds
  only when it actually builds the ring and the 1:1 dot — i.e. fine pointer, no
  reduced-motion preference. Without that gate a no-JS or reduced-motion visitor
  would get no pointer at all.
- **`Flip.astro` splits a label into per-glyph spans**, so buttons and nav links
  can roll over letter by letter. That markup is `aria-hidden`, and the enclosing
  link or button carries an `aria-label` — otherwise a screen reader would read
  the text one character at a time.
- **The `lattice` utility uses `background-attachment: fixed`**, which is what makes
  one continuous 90px grid across every panel and card instead of each box
  restarting its own. The catch: a CSS transform makes an element a containing
  block, which re-anchors that background to the element and blanks the grid. So
  anything carrying the lattice must never be transformed — that is why services,
  pricing, stack and stat cards reveal with `data-rv-fade` (opacity only) rather
  than the `y`/`scale` the other reveals use. Note iOS Safari ignores
  `background-attachment: fixed`, so there the grids anchor per-box.
- The hero keeps its own grid overlay div at `.04` rather than using `lattice`,
  matching the source design. It aligns anyway, since the hero is sticky at the
  viewport top.
- The GitHub contribution grid reads `github.com/users/<handle>/contributions`
  at build time. That markup is unofficial: if it ever changes shape the whole
  section is omitted rather than showing invented activity.
- `hero3d.ts` derives its colour from `--color-accent` by painting one pixel and
  reading the sRGB back, because three.js cannot parse `oklch()`. Change the
  accent in `global.css` only — the WebGL scene follows.
- The preloader count is driven by rAF *and* a 60 ms interval, with a hard
  force-to-100 at 2.75 s. rAF alone stalls under load while fonts, modules and
  WebGL init compete for the main thread, which freezes the number mid-count
  while the CSS panel animation slides away on wall-clock time regardless. For
  the same reason the hero reveal fires from `setTimeout`, not
  `gsap.delayedCall` — GSAP's `lagSmoothing` lets its clock drift behind real
  time, and a late reveal means the panel lifts on an empty hero.
- `prefers-reduced-motion` unstacks the pinned work scroll and the curtain, since
  both hide content that only scroll-driven motion would reveal.
- `astro check` is not installed: it still requires TypeScript ^5/^6 and this
  project is on 7. Use `npx tsc --noEmit`.
