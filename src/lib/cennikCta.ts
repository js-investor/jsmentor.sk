import { scrollToAnchorId } from "@/lib/scrollToFormular";

export const CENNIK_SECTION_ID = "CTA1";
export const CENNIK_SECTION_HASH = `#${CENNIK_SECTION_ID}`;
export const CENNIK_SECTION_HREF = `/${CENNIK_SECTION_HASH}`;
export const HEROHERO_JOIN_URL = "https://herohero.co/jsmentor";

function isHomePage(): boolean {
  const path = window.location.pathname;
  return path === "/" || path === "";
}

export function scrollToCennik(): void {
  scrollToAnchorId(CENNIK_SECTION_ID);
}

/** Na homepage scrolluje na CTA1, inde presmeruje na /#CTA1. */
export function navigateToCennik(): void {
  if (isHomePage()) {
    scrollToCennik();
    if (window.location.hash !== CENNIK_SECTION_HASH) {
      window.history.replaceState(null, "", CENNIK_SECTION_HASH);
    }
    return;
  }

  window.location.href = CENNIK_SECTION_HREF;
}
