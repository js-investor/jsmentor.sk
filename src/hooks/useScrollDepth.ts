import { useEffect, useRef } from "react";

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

/** Sekcie hlavnej stránky sledované cez Intersection Observer. */
const SECTIONS: { id: string; label: string }[] = [
  { id: "ivan",             label: "O Ivanovi" },
  { id: "financne-chyby",  label: "Finančné chyby" },
  { id: "nastroje",        label: "Nástroje" },
  { id: "ukazky-videi",    label: "Ukážky videi" },
  { id: "bonusy-kalkulacky", label: "Bonusy a kalkulačky" },
  { id: "recenzie",        label: "Recenzie" },
  { id: "CTA1",            label: "CTA1" },
  { id: "faq",             label: "FAQ" },
];

/** Scroll depth milníky ako záloha (25 / 50 / 75 / 90 %). */
const DEPTH_MILESTONES = [25, 50, 75, 90];

const useScrollDepth = () => {
  const firedDepths = useRef<Set<number>>(new Set());

  /** 1. Scroll depth — percentuálne milníky */
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((window.scrollY / docHeight) * 100);

      for (const milestone of DEPTH_MILESTONES) {
        if (percent >= milestone && !firedDepths.current.has(milestone)) {
          firedDepths.current.add(milestone);
          window.umami?.track(`scroll_${milestone}pct`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** 2. Section visibility — keď sekcia príde do viewportu */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            window.umami?.track("section_view", { section: section.label });
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);
};

export default useScrollDepth;
