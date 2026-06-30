import { scrollToAnchorId } from "@/lib/scrollToFormular";

export const CENNIK_SECTION_ID = "cennik-start";
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

/** Na homepage scrolluje na cenník, inde presmeruje na /#cennik-start. */
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
