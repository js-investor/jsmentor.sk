const HEADER_SELECTOR = "[data-js-site-header]";
const HEADER_FALLBACK_PX = 88;
const GAP_PX = 16;

let anchorScrollGeneration = 0;

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

function beginAnchorScrollSession(): number {
  anchorScrollGeneration += 1;
  return anchorScrollGeneration;
}

function isAnchorScrollSessionActive(session: number): boolean {
  return session === anchorScrollGeneration;
}

/** Zruší pending anchor korekciu, keď používateľ sám scrolluje. */
function cancelAnchorScrollOnUserInput(session: number): void {
  const markCancelled = () => {
    if (isAnchorScrollSessionActive(session)) {
      anchorScrollGeneration += 1;
    }
  };

  window.addEventListener("wheel", markCancelled, { passive: true, once: true });
  window.addEventListener("touchmove", markCancelled, { passive: true, once: true });
  window.addEventListener("keydown", (event) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
      markCancelled();
    }
  }, { once: true });
}

function settleAnchorScroll(
  resolveTarget: () => HTMLElement | null,
  session: number,
  delayMs: number,
): void {
  window.setTimeout(() => {
    if (!isAnchorScrollSessionActive(session)) return;

    const target = resolveTarget();
    if (!(target instanceof HTMLElement)) return;

    const targetY = Math.max(0, scrollTopForElementUnderHeader(target));
    if (Math.abs(window.scrollY - targetY) > 12) {
      window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
    }
  }, delayMs);
}

export function isScrolledNearAnchor(elementId: string, tolerancePx = 24): boolean {
  const el = document.getElementById(elementId);
  if (!(el instanceof HTMLElement)) return false;
  const targetY = Math.max(0, scrollTopForElementUnderHeader(el));
  return Math.abs(window.scrollY - targetY) <= tolerancePx;
}

/**
 * Scroll to an in-page anchor, accounting for the fixed site header (use `[data-js-site-header]`, not `header` — third-party scripts may inject other `<header>` elements).
 */
export function scrollToAnchorId(elementId: string): void {
  const resolveTarget = () =>
    elementId === "formular" ? resolveFormularScrollTarget() : document.getElementById(elementId);

  const el = resolveTarget();
  if (!(el instanceof HTMLElement)) return;

  const session = beginAnchorScrollSession();
  cancelAnchorScrollOnUserInput(session);
  scrollWindowToElement(el, "smooth");
  settleAnchorScroll(resolveTarget, session, 520);
}

function resolveFormularScrollTarget(): HTMLElement | null {
  const section = document.getElementById("formular");
  if (!(section instanceof HTMLElement)) return null;

  // Vždy začiatok booking sekcie (nadpis + layout), nie len `<form>` vpravo
  return section;
}

function scrollToFormularElement(behavior: ScrollBehavior): void {
  const resolveTarget = resolveFormularScrollTarget;
  const el = resolveTarget();
  if (!(el instanceof HTMLElement)) return;

  const session = beginAnchorScrollSession();
  cancelAnchorScrollOnUserInput(session);
  scrollWindowToElement(el, behavior);

  settleAnchorScroll(resolveTarget, session, 120);
  settleAnchorScroll(resolveTarget, session, 520);
}

/** Scroll na začiatok sekcie `#formular` (pod fixný header). */
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
