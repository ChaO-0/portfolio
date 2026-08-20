/**
 * Instrument cursor: bracket arms that snap around whatever is hoverable, a mono
 * label naming the action, and a caret over long text. Shape is in global.css —
 * this only moves it and flips classes.
 */

const HOT = 'a[href],button,[role="button"],[data-cursor]';

/** Perceived brightness of a computed background, or -1 if effectively transparent. */
function lum(color: string) {
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/.exec(color);
  if (!m || (m[4] !== undefined && +m[4] < 0.15)) return -1;
  return (0.2126 * +m[1] + 0.7152 * +m[2] + 0.0722 * +m[3]) / 255;
}

function label(el: HTMLElement) {
  const given = el.dataset.cursor;
  if (given) return given;
  const href = el.getAttribute("href") ?? "";
  if (/^mailto:/i.test(href)) return "EMAIL";
  if (/calendly/i.test(href)) return "BOOK";
  if (/^https?:/i.test(href)) return "OPEN";
  if (href.startsWith("#")) return "JUMP";
  return el.tagName === "BUTTON" ? "PRESS" : "OPEN";
}

function el<T extends HTMLElement>(tag: string, id: string, html = "") {
  const n = document.createElement(tag) as T;
  n.id = id;
  n.dataset.cur = "";
  n.innerHTML = html;
  document.body.appendChild(n);
  return n;
}

export function mountCursor() {
  if (matchMedia("(hover: none)").matches) return;

  const box = el("div", "cur-box", "<i></i><i></i><i></i><i></i><b></b>");
  const lab = el("div", "cur-lab");
  const caret = el("div", "cur-caret");
  // Not `data-cursor`: that attribute is the per-element label hook below, and on
  // <html> it would make closest() match the whole document as one hover target.
  document.documentElement.dataset.cursorOn = "";

  const move = (e: { clientX: number; clientY: number; target: EventTarget | null }) => {
    const target = e.target as HTMLElement | null;
    const hot = target?.closest?.<HTMLElement>(HOT) ?? null;

    if (hot) {
      const r = hot.getBoundingClientRect();
      box.className = "on";
      box.style.cssText = `left:${r.left - 8}px;top:${r.top - 8}px;width:${r.width + 16}px;height:${r.height + 16}px`;
      if (lum(getComputedStyle(hot).backgroundColor) > 0.42) box.classList.add("dark");

      lab.textContent = label(hot);
      lab.style.cssText = `left:${r.left - 8}px;top:${r.top - 26}px;opacity:1`;
      caret.style.opacity = "0";
      return;
    }

    // long prose gets a text caret instead of a target frame
    const prose =
      target && /^(P|H1|H2|H3|LI)$/.test(target.tagName) && (target.textContent ?? "").length > 50;

    box.className = prose ? "text" : "";
    box.style.cssText = prose
      ? `left:${e.clientX}px;top:${e.clientY}px;width:1px;height:1px`
      : `left:${e.clientX - 6}px;top:${e.clientY - 6}px`;
    lab.style.opacity = "0";
    caret.style.cssText = prose
      ? `left:${e.clientX}px;top:${e.clientY - 10}px;opacity:1`
      : "opacity:0";
  };

  addEventListener("pointermove", move, { passive: true });
  document.addEventListener("mouseleave", () => {
    box.style.opacity = lab.style.opacity = caret.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    box.style.opacity = "1";
  });

  move({ clientX: innerWidth / 2, clientY: innerHeight * 0.42, target: document.body });
}
