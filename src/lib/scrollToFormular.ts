const HEADER_SELECTOR = "[data-js-site-header]";
const FORMULAR_SCROLL_TARGET = "[data-formular-scroll-target]";
const HEADER_FALLBACK_PX = 88;
const GAP_PX = 16;

function getSiteHeaderHeightPx(): number {
  const header = document.querySelector<HTMLElement>(HEADER_SELECTOR);
  if (!header) return HEADER_FALLBACK_PX;
  return Math.max(Math.ceil(header.getBoundingClientRect().height), 48);
}

function scrollTopForElementUnderHeader(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const headerH = getSiteHeaderHeightPx();
  return Math.round(rect.top + window.scrollY - headerH - GAP_PX);
}

function scrollWindowToElement(el: HTMLElement, behavior: ScrollBehavior): void {
  const top = Math.max(0, scrollTopForElementUnderHeader(el));
  window.scrollTo({ top, left: 0, behavior });
}

/**
 * Scroll to an in-page anchor, accounting for the fixed site header (use `[data-js-site-header]`, not `header` — third-party scripts may inject other `<header>` elements).
 */
export function scrollToAnchorId(elementId: string): void {
  const el =
    elementId === "formular"
      ? resolveFormularScrollTarget()
      : document.getElementById(elementId);
  if (!(el instanceof HTMLElement)) return;

  scrollWindowToElement(el, "smooth");

  window.setTimeout(() => {
    const again =
      elementId === "formular"
        ? resolveFormularScrollTarget()
        : document.getElementById(elementId);
    if (!(again instanceof HTMLElement)) return;
    const targetY = Math.max(0, scrollTopForElementUnderHeader(again));
    if (Math.abs(window.scrollY - targetY) > 12) {
      window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
    }
  }, 520);
}

function resolveFormularScrollTarget(): HTMLElement | null {
  const section = document.getElementById("formular");
  if (!(section instanceof HTMLElement)) return null;

  // Homepage CTA (`cardOnLight`) — začiatok celej sekcie, nie len pravý formulár
  if (section.dataset.bookingVariant === "cardOnLight") {
    return section;
  }

  return (
    document.querySelector<HTMLElement>(FORMULAR_SCROLL_TARGET) ?? section
  );
}

function scrollToFormularElement(behavior: ScrollBehavior): void {
  const el = resolveFormularScrollTarget();
  if (!(el instanceof HTMLElement)) return;

  scrollWindowToElement(el, behavior);

  const settle = () => {
    const target = resolveFormularScrollTarget();
    if (!(target instanceof HTMLElement)) return;
    const y = Math.max(0, scrollTopForElementUnderHeader(target));
    if (Math.abs(window.scrollY - y) > 12) {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    }
  };

  requestAnimationFrame(() => requestAnimationFrame(settle));
  window.setTimeout(settle, 120);
  window.setTimeout(settle, 520);
}

/** Scroll to booking CTA: homepage → celá `#formular` sekcia; /konzultacia → formulár. */
export function scrollToFormular(): void {
  scrollToFormularElement("smooth");
}

/** Hash `#formular` na homepage — rovnaký offset ako scrollToFormular. */
export function scrollToFormularFromHash(): void {
  scrollToFormularElement("smooth");
  if (window.location.hash !== "#formular") {
    window.history.replaceState(null, "", "#formular");
  }
}
