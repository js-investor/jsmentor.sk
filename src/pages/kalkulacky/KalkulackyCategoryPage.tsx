import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import BonusyKonzultaciaSection from "@/components/sections/BonusyKonzultaciaSection";
import KalkulackyShell from "@/pages/kalkulacky/KalkulackyShell";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import brandPatternDark from "@/assets/logo/js-brand-pattern-black.svg";
import {
  BONUSY_BASE_PATH,
  BONUSY_PDF_CARD,
  KALKULACKY_CALCULATORS,
} from "@/pages/kalkulacky/kalkulackyConfig";
import { NOISE_TEXTURE } from "@/lib/noiseTexture";
import { cn } from "@/lib/utils";
import type { KalkulackaCalculatorMeta } from "@/pages/kalkulacky/kalkulackyConfig";

/* ---------------------------------------------------------------------------
 * Rozdelenie nástrojov: 3 vlajkové interaktívne nástroje hore (featured),
 * zvyšné kalkulačky v knižnici nižšie. Čisto prezentačné — config ostáva
 * jediným zdrojom dát (title, description, Icon, slug).
 * ------------------------------------------------------------------------- */

const FEATURED: { slug: string; category: string }[] = [
  { slug: "etf-semafor", category: "Investovanie" },
  { slug: "poplatkovy-rontgen", category: "Poplatky" },
  { slug: "bytovy-semafor", category: "Nehnuteľnosti" },
];

const featuredSlugs = new Set(FEATURED.map((f) => f.slug));

const featuredTools = FEATURED.map(({ slug, category }) => {
  const meta = KALKULACKY_CALCULATORS.find((c) => c.slug === slug);
  return meta ? { meta, category } : null;
}).filter((tool): tool is { meta: KalkulackaCalculatorMeta; category: string } => tool !== null);

const libraryTools = KALKULACKY_CALCULATORS.filter((c) => !featuredSlugs.has(c.slug));

/** Fokus viditeľný cez outline — ring utility sú box-shadow a globálny reset ich nuluje. */
const cardFocusClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/* ------------------------------- Hlavička ------------------------------- */

const BonusyPageHeader = () => (
  <div className="mx-auto max-w-3xl text-center">
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 font-sans text-caption font-semibold text-primary">
      Bonusy · {KALKULACKY_CALCULATORS.length} nástrojov zadarmo
    </span>
    <h1 className="headline-serif mt-5 md:mt-6">
      Rozhoduj sa s istotou, <span className="text-primary">nie pocitom</span>
    </h1>
    <p className="mt-4 font-sans text-[18px] leading-relaxed text-muted-foreground md:text-xl">
      Zisti presné čísla skôr, než podpíšeš, investuješ alebo zaplatíš. Každý nástroj tu
      existuje preto, aby si videl, čo ťa rozhodnutie skutočne stojí a čo ti môže zarobiť.
    </p>
  </div>
);

/* --------------------------- Hlavička sekcie ---------------------------- */

const SectionHeader = ({
  id,
  title,
  subtitle,
  count,
}: {
  id: string;
  title: string;
  subtitle?: string;
  count?: number;
}) => (
  <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
    <div>
      <h2
        id={id}
        className="flex items-center gap-3 [font-family:var(--font-serif)] text-[1.5rem] font-extrabold leading-[1.2] text-foreground md:text-[1.875rem]"
      >
        {title}
        {typeof count === "number" ? (
          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-primary/10 px-2 font-sans text-[0.875rem] font-semibold leading-none text-primary">
            {count}
          </span>
        ) : null}
      </h2>
      {subtitle ? (
        <p className="mt-1.5 font-sans text-[1rem] leading-relaxed text-muted-foreground md:text-[1.0625rem]">
          {subtitle}
        </p>
      ) : null}
    </div>
  </div>
);

/* --------------------------- Vlajkové nástroje --------------------------- */

const FeaturedToolCard = ({
  meta,
  category,
}: {
  meta: KalkulackaCalculatorMeta;
  category: string;
}) => (
  <Link
    to={`${BONUSY_BASE_PATH}/${meta.slug}`}
    className={cn(
      "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl p-6 md:p-7 lg:min-h-[18rem] lg:p-8",
      "transition-transform duration-300 ease-out hover:-translate-y-1",
      cardFocusClass,
    )}
    data-umami-event="click_bonus_tool"
    data-umami-event-slug={meta.slug}
  >
    {/* Pozadie: tmavý lesný gradient (spoločný token) + šum + vzor značky */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ background: "var(--btn-primary-gradient)" }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] mix-blend-soft-light"
      style={{ backgroundImage: NOISE_TEXTURE }}
    />
    <img
      src={brandPatternDark}
      alt=""
      aria-hidden
      className="pointer-events-none absolute -bottom-10 -right-8 -z-10 h-48 w-auto select-none opacity-[0.16] transition-transform duration-500 ease-out group-hover:scale-105 md:h-56"
    />

    <div className="flex items-start justify-between gap-4">
      <span className="inline-flex items-center rounded-full border border-[#fdf8f2]/25 bg-[#fdf8f2]/[0.08] px-3 py-1 font-sans text-caption font-semibold text-[#fdf8f2]/85">
        {category}
      </span>
      <span
        aria-hidden
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#fdf8f2]/20 bg-[#fdf8f2]/[0.06] text-[#fdf8f2]/80 transition-colors duration-300 group-hover:bg-[#fdf8f2] group-hover:text-[#023c2e]"
      >
        <ArrowUpRight className="h-4 w-4 stroke-[2.25]" />
      </span>
    </div>

    <span className="mt-6 block [font-family:var(--font-serif)] text-[1.55rem] font-bold leading-[1.15] text-[#fdf8f2] md:mt-7 md:text-[1.7rem] lg:text-[1.85rem]">
      {meta.title}
    </span>
    <span className="mt-3 block font-sans text-[1rem] leading-relaxed text-[#f0ebe3]/80 md:text-[1.0625rem]">
      {meta.description}
    </span>

    <span className="mt-auto flex items-center gap-2 pt-6 font-sans text-[0.9375rem] font-semibold text-[#fdf8f2]">
      Spustiť nástroj
      <ArrowRight className="h-4 w-4 stroke-[2.25] transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  </Link>
);

/* ---------------------------- Knižnica kalkulačiek ----------------------- */

const LibraryToolCard = ({ meta }: { meta: KalkulackaCalculatorMeta }) => {
  const { Icon } = meta;
  return (
    <Link
      to={`${BONUSY_BASE_PATH}/${meta.slug}`}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 md:p-7",
        "transition-[transform,border-color] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-primary/30",
        cardFocusClass,
      )}
      data-umami-event="click_bonus_tool"
      data-umami-event-slug={meta.slug}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center md:h-12 md:w-12" aria-hidden>
          <img
            src={brandPattern}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-contain"
          />
          <Icon className="relative z-10 h-[1.15rem] w-[1.15rem] -translate-x-[1px] stroke-[2] text-white md:h-5 md:w-5" />
        </span>
        <ArrowUpRight
          className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/60 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          aria-hidden
        />
      </div>

      <span className="mt-5 block [font-family:var(--font-serif)] text-[1.25rem] font-bold leading-[1.2] text-foreground md:text-[1.35rem]">
        {meta.title}
      </span>
      <span className="mt-2.5 block font-sans text-[0.9375rem] leading-relaxed text-muted-foreground md:text-[1rem]">
        {meta.description}
      </span>
    </Link>
  );
};

/* ------------------------------- PDF banner ------------------------------ */

const PdfBanner = () => {
  const PdfIcon = BONUSY_PDF_CARD.Icon;
  const isReady = Boolean(BONUSY_PDF_CARD.href);

  const content = (
    <>
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden>
        <PdfIcon className="h-5 w-5 stroke-[2]" />
      </span>
      <div className="min-w-0 flex-1">
        <h2
          id="bonusy-pdf-heading"
          className="flex flex-wrap items-center gap-x-3 gap-y-1.5 [font-family:var(--font-serif)] text-[1.25rem] font-bold leading-[1.2] text-foreground md:text-[1.35rem]"
        >
          {BONUSY_PDF_CARD.title}
          {!isReady ? (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 font-sans text-caption font-semibold text-primary">
              Už čoskoro
            </span>
          ) : null}
        </h2>
        {BONUSY_PDF_CARD.description ? (
          <p className="mt-1.5 font-sans text-[0.9375rem] leading-relaxed text-muted-foreground md:text-[1rem]">
            {BONUSY_PDF_CARD.description}
          </p>
        ) : null}
      </div>
      {isReady ? (
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary" aria-hidden />
      ) : null}
    </>
  );

  const bannerClass =
    "flex flex-col items-start gap-5 rounded-2xl border bg-cream/60 p-6 sm:flex-row sm:items-center md:p-7";

  if (isReady) {
    return (
      <Link
        to={BONUSY_PDF_CARD.href}
        className={cn(bannerClass, "group border-border/70 transition-colors hover:border-primary/30", cardFocusClass)}
      >
        {content}
      </Link>
    );
  }

  return <div className={cn(bannerClass, "border-dashed border-primary/25")}>{content}</div>;
};

/* --------------------------------- Stránka ------------------------------- */

const KalkulackyCategoryPage = () => (
  <KalkulackyShell>
    <div className="section-container px-4 sm:px-6 lg:px-8">
      <BonusyPageHeader />

      {/* Vlajkové nástroje */}
      <section className="mx-auto mt-10 max-w-6xl md:mt-14" aria-labelledby="bonusy-featured-heading">
        <SectionHeader
          id="bonusy-featured-heading"
          title="Začni tu"
          subtitle="Tri nástroje, ktoré ti o tvojich peniazoch prezradia najviac."
        />
        <ul className="mt-5 grid list-none grid-cols-1 gap-5 p-0 md:mt-6 md:gap-6 lg:grid-cols-3">
          {featuredTools.map(({ meta, category }) => (
            <li key={meta.slug} className="h-full">
              <FeaturedToolCard meta={meta} category={category} />
            </li>
          ))}
        </ul>
      </section>

      {/* Knižnica kalkulačiek */}
      <section className="mx-auto mt-12 max-w-6xl md:mt-16" aria-labelledby="bonusy-library-heading">
        <SectionHeader
          id="bonusy-library-heading"
          title="Kalkulačky"
          subtitle="Presné prepočty pre hypotéku, investície, mzdu aj rentu."
          count={libraryTools.length}
        />
        <ul className="mt-5 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 md:mt-6 md:gap-6 lg:grid-cols-3">
          {libraryTools.map((meta) => (
            <li key={meta.slug} className="h-full">
              <LibraryToolCard meta={meta} />
            </li>
          ))}
        </ul>
      </section>

      {/* PDF materiály */}
      <section className="mx-auto mt-8 max-w-6xl md:mt-10" aria-labelledby="bonusy-pdf-heading">
        <PdfBanner />
      </section>

      <BonusyKonzultaciaSection />
    </div>
  </KalkulackyShell>
);

export default KalkulackyCategoryPage;
