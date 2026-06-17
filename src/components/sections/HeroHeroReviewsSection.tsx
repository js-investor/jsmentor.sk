import AnimatedSection from "@/components/AnimatedSection";
import imgVanecko from "@/assets/images/MuDr.-Martin-Vanecko.png";
import imgLatkoczy from "@/assets/images/Simon-Latkoczy.png";
import imgPapik from "@/assets/images/Ladislav-Papik.png";
import { useLayoutEffect, useRef, useState } from "react";

type StatCard = {
  number: string;
  label: string;
  boldWord: string;
  bg: string;
  border?: boolean;
};

type TestimonialCard = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const stats: StatCard[] = [
  { number: "2000+", label: "ľudí si pozrelo môj kurz", boldWord: "investičný", bg: "#1A1A1A", border: true },
  { number: "1100+", label: "ľudí si pozrelo môj kurz", boldWord: "rentový", bg: "#1B4332" },
  { number: "900+", label: "Som individuálne nastavil plán", boldWord: "", bg: "#6B5744" },
];

const testimonials: TestimonialCard[] = [
  {
    quote: "Ivan mi za dva týždne ukázal plán, podľa ktorého investujem dodnes.",
    name: "MuDr. Martin Vanečko",
    role: "Doktor pôsobiaci vo Švajčiarsku",
    avatar: imgVanecko,
  },
  {
    quote: "Ivan je profesionál. Spolupracujeme 5 rokov. Každý rok môj majetok rastie.",
    name: "Šimon Latkoczy",
    role: "Slovenský hokejový reprezentant",
    avatar: imgLatkoczy,
  },
  {
    quote: "Ivan presne vie, ako z firemného zisku spraviť osobný majetok.",
    name: "Ladislav Papik",
    role: "Konateľ PAPIK ENTERPRISE s.r.o.",
    avatar: imgPapik,
  },
];

// Desktop rows: alternating layout with statRight for row 2
const desktopRows = [
  { stat: stats[0], testimonial: testimonials[0], statRight: false },
  { stat: stats[1], testimonial: testimonials[1], statRight: true },
  { stat: stats[2], testimonial: testimonials[2], statRight: false },
];

// Mobile flat order: stat → testimonial × 3
type MobileItem =
  | { type: "stat"; data: StatCard }
  | { type: "testimonial"; data: TestimonialCard };

const mobileItems: MobileItem[] = [
  { type: "stat", data: stats[0] },
  { type: "testimonial", data: testimonials[0] },
  { type: "stat", data: stats[1] },
  { type: "testimonial", data: testimonials[1] },
  { type: "stat", data: stats[2] },
  { type: "testimonial", data: testimonials[2] },
];

const StatCardEl = ({ data }: { data: StatCard }) => (
  <div
    className="flex h-full flex-col justify-end rounded-2xl p-6 md:p-8"
    style={{ backgroundColor: data.bg, border: data.border ? "1px solid rgba(255,255,255,0.15)" : undefined }}
  >
    <span className="[font-family:var(--font-serif)] text-[3.5rem] font-bold leading-none text-white md:text-[4rem]">
      {data.number}
    </span>
    <p className="mt-4 font-sans text-[1.25rem] leading-snug text-white/80 md:text-[1.375rem]">
      {data.boldWord ? (
        <>
          {data.label.replace(data.boldWord, "").split("kurz")[0]}
          <strong className="font-bold text-white">{data.boldWord}</strong>
          {" kurz"}
        </>
      ) : (
        data.label
      )}
    </p>
  </div>
);

const TestimonialCardEl = ({ data }: { data: TestimonialCard }) => (
  <div className="flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-white p-6 md:p-8">
    <p className="[font-family:var(--font-serif)] text-[1.375rem] font-normal leading-[1.4] text-foreground md:text-[1.5rem]">
      {data.quote}
    </p>
    <div className="mt-5 flex items-center gap-3">
      <img
        src={data.avatar}
        alt={data.name}
        className="h-14 w-14 shrink-0 rounded-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div>
        <p className="font-sans text-[1rem] font-bold leading-tight text-foreground md:text-[0.9375rem]">{data.name}</p>
        <p className="font-sans text-[0.9375rem] leading-tight text-muted-foreground md:text-[0.8125rem]">{data.role}</p>
      </div>
    </div>
  </div>
);

const HeroHeroReviewsSection = () => {
  const mobileRef = useRef<HTMLDivElement>(null);
  const [cardH, setCardH] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const measure = () => {
      const container = mobileRef.current;
      if (!container) return;
      const items = container.querySelectorAll<HTMLElement>("[data-mobile-card]");
      // Reset heights so we measure each card's natural size
      items.forEach(el => { el.style.height = ""; });
      let max = 0;
      items.forEach(el => { if (el.offsetHeight > max) max = el.offsetHeight; });
      if (max > 0) setCardH(max);
    };

    // Initial measure (text layout)
    measure();

    // Re-measure after all images (avatars) have fully loaded
    const imgs = mobileRef.current?.querySelectorAll<HTMLImageElement>("img") ?? [];
    let pending = 0;
    imgs.forEach(img => {
      if (!img.complete) {
        pending++;
        img.addEventListener("load", () => { pending--; if (pending === 0) measure(); }, { once: true });
        img.addEventListener("error", () => { pending--; if (pending === 0) measure(); }, { once: true });
      }
    });
  }, []);

  return (
  <section
    id="recenzie"
    className="scroll-mt-24 overflow-hidden px-5 py-[72px] md:px-8 md:py-[96px]"
    style={{ backgroundColor: "#000000" }}
  >
    <div className="section-container">
      <AnimatedSection>
        <h2 className="headline-landing-section mx-auto mb-10 max-w-3xl text-balance text-center text-white md:mb-14">
          Ľudia potrebujú o peniazoch počuť ľudskou rečou{" "}
          <span aria-hidden>🙌</span>
        </h2>
      </AnimatedSection>

      {/* ── MOBILE: 6 flat equal cards, consistent gap ── */}
      <div ref={mobileRef} className="mx-auto flex max-w-3xl flex-col gap-4 sm:hidden">
        {mobileItems.map((item, i) => (
          <AnimatedSection key={i} delay={i * 0.07}>
            {/* data-mobile-card lets the hook measure natural heights */}
            <div
              data-mobile-card
              style={cardH ? { height: cardH } : undefined}
            >
              {item.type === "stat" ? (
                <StatCardEl data={item.data} />
              ) : (
                <TestimonialCardEl data={item.data} />
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* ── DESKTOP: 3 rows, alternating 35% stat / 65% testimonial ── */}
      <div className="mx-auto hidden max-w-3xl flex-col gap-4 sm:flex md:gap-5">
        {desktopRows.map((row, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div
              className={`flex min-h-[220px] flex-row gap-4 md:gap-5 ${
                row.statRight ? "flex-row-reverse" : ""
              }`}
            >
              <div className="w-[35%] shrink-0">
                <StatCardEl data={row.stat} />
              </div>
              <div className="flex-1">
                <TestimonialCardEl data={row.testimonial} />
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.35}>
        <div className="mt-12 flex justify-center md:mt-16">
          <a
            href="https://herohero.co/jsmentor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-body"
            data-umami-event="click_herohero"
            data-umami-event-section="recenzie"
          >
            Vyskúšať na 15 dní zadarmo 🚀
          </a>
        </div>
      </AnimatedSection>
    </div>
  </section>
  );
};

export default HeroHeroReviewsSection;
