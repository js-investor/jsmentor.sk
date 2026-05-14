import { useCallback, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import recenzia1 from "@/assets/images/recenzia-1.png";
import recenzia2 from "@/assets/images/recenzia-2.png";
import recenzia3 from "@/assets/images/recenzia-3.png";
import recenzia4 from "@/assets/images/recenzia-4.png";
import recenzia5 from "@/assets/images/recenzia-5.png";
import recenzia6 from "@/assets/images/recenzia-6.png";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Poradie v lightboxe: 6 prvá, potom 1–5 */
const LIGHTBOX_IMAGES = [
  { src: recenzia6, alt: "Recenzia klienta — screenshot 6" },
  { src: recenzia1, alt: "Recenzia klienta — screenshot 1" },
  { src: recenzia2, alt: "Recenzia klienta — screenshot 2" },
  { src: recenzia3, alt: "Recenzia klienta — screenshot 3" },
  { src: recenzia4, alt: "Recenzia klienta — screenshot 4" },
  { src: recenzia5, alt: "Recenzia klienta — screenshot 5" },
] as const;

const scrollToBooking = () => {
  document.getElementById("formular")?.scrollIntoView({ behavior: "smooth" });
};

function ReviewsLightbox({
  open,
  onOpenChange,
  startIndex,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startIndex: number;
}) {
  const [index, setIndex] = useState(startIndex);
  const len = LIGHTBOX_IMAGES.length;

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + len) % len);
    },
    [len]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const current = LIGHTBOX_IMAGES[index];

  const navBtn =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/55",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-[51] flex flex-col items-center justify-center overflow-y-auto border-0 bg-transparent p-4 outline-none sm:p-6",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "duration-200 focus:outline-none"
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Recenzie — obrázok {index + 1} z {len}
          </DialogPrimitive.Title>

          <div className="flex w-full max-w-5xl flex-col items-center">
            <div className="mb-3 flex w-full justify-end sm:mb-4">
              <DialogPrimitive.Close
                className={cn(
                  navBtn,
                  "h-10 w-10",
                  "hover:bg-black/55"
                )}
                aria-label="Zavrieť"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </DialogPrimitive.Close>
            </div>

            {/* Jedna fotka; šípky mimo nej (mobile: pod, md+: vedľa) */}
            <div className="flex w-full flex-col items-center gap-5 md:flex-row md:justify-center md:gap-4">
              <button
                type="button"
                aria-label="Predchádzajúca recenzia"
                className={cn(navBtn, "hidden md:inline-flex")}
                onClick={() => go(-1)}
              >
                <ChevronLeft className="h-6 w-6" strokeWidth={2} />
              </button>
              <img
                key={index}
                src={current.src}
                alt={current.alt}
                className="max-h-[min(68vh,720px)] w-full object-contain object-top md:max-h-[min(82vh,880px)] md:w-auto md:max-w-[min(100%,calc(100vw-10rem))]"
              />
              <button
                type="button"
                aria-label="Ďalšia recenzia"
                className={cn(navBtn, "hidden md:inline-flex")}
                onClick={() => go(1)}
              >
                <ChevronRight className="h-6 w-6" strokeWidth={2} />
              </button>
              <div className="flex items-center justify-center gap-10 md:hidden">
                <button type="button" aria-label="Predchádzajúca recenzia" className={navBtn} onClick={() => go(-1)}>
                  <ChevronLeft className="h-6 w-6" strokeWidth={2} />
                </button>
                <button type="button" aria-label="Ďalšia recenzia" className={navBtn} onClick={() => go(1)}>
                  <ChevronRight className="h-6 w-6" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

type MoreReviewsSectionProps = {
  ctaLabel?: string;
};

const MoreReviewsSection = ({ ctaLabel = "Získať Wealth Map" }: MoreReviewsSectionProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openAt = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  return (
    <section
      className="relative overflow-hidden px-5 md:px-8 py-24 md:py-16 lg:py-20"
      style={{ backgroundColor: "#F7F3EE" }}
    >
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="section-container relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="headline-serif">
            <span className="text-primary font-bold">Ďalšie skúsenosti ľudí</span>, ktorí so mnou
            spolupracujú
          </h2>
        </div>

        <div className="mt-10 w-full">
          {/* Recenzie: masonry layout, na desktope 3 stĺpce */}
          <div className="columns-1 gap-3 space-y-3 md:columns-4 md:space-y-4">
            {LIGHTBOX_IMAGES.map((item, idx) => (
              <button
                key={item.alt}
                type="button"
                onClick={() => openAt(idx)}
                className={cn(
                  "mb-3 block w-full break-inside-avoid cursor-zoom-in overflow-hidden rounded-lg ring-1 ring-black/10 transition hover:ring-primary/40 md:mb-4",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                )}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-contain object-top"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center md:mt-12">
          <button type="button" onClick={scrollToBooking} className="btn-primary text-body">
            {ctaLabel}
          </button>
        </div>
      </div>

      <ReviewsLightbox open={lightboxOpen} onOpenChange={setLightboxOpen} startIndex={lightboxIndex} />
    </section>
  );
};

export default MoreReviewsSection;
