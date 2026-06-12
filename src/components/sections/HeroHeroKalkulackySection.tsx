import AnimatedSection from "@/components/AnimatedSection";
import bonusAkcieReality from "@/assets/images/js-bonus-akcie-reality.png";
import bonusChecklist from "@/assets/images/js-bonus-checklist.png";
import bonusInvestovaniePoplatky from "@/assets/images/js-bonus-investovanie-poplatky.png";
import {
  Banknote,
  BarChart3,
  House,
  Lightbulb,
  Percent,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

type CalculatorItem = {
  id: string;
  title: ReactNode;
  description: string;
  Icon: LucideIcon;
};

const serifTitle = (bold: string, rest?: string) => (
  <span className="[font-family:var(--font-serif)] text-[1.125rem] leading-snug text-foreground sm:text-[1.125rem] md:text-[1.4375rem] lg:text-[1.5rem]">
    <strong className="font-bold">{bold}</strong>
    {rest ? <span className="font-[500]"> {rest}</span> : null}
  </span>
);

const calculators: CalculatorItem[] = [
  {
    id: "rentova",
    title: serifTitle("Rentová", "kalkulačka"),
    description: "Koľko potrebuješ investovať na pravidelný príjem z majetku.",
    Icon: Percent,
  },
  {
    id: "investicna",
    title: serifTitle("Investičná", "kalkulačka"),
    description: "Čo robí čas, pravidelné vklady a výnos s tvojím majetkom.",
    Icon: BarChart3,
  },
  {
    id: "hypotekarna",
    title: serifTitle("Hypotekárna", "kalkulačka"),
    description: "Akú hypotéku si reálne môžeš dovoliť podľa príjmu, LTV a DSTI.",
    Icon: House,
  },
  {
    id: "mzdova",
    title: serifTitle("Mzdová", "kalkulačka"),
    description: "Vyrátaš výšku odvodov, dane, detailne budeš poznať príjem.",
    Icon: Banknote,
  },
  {
    id: "splatit-investovat",
    title: (
      <span className="[font-family:var(--font-serif)] text-[1.125rem] font-bold leading-snug text-foreground sm:text-[1.125rem] md:text-[1.4375rem] lg:text-[1.5rem]">
        Splatiť alebo investovať?
      </span>
    ),
    description: "Vyrátaš či sa oplatí úver splatiť alebo peniaze použiť inak.",
    Icon: Lightbulb,
  },
];

const calculatorCardClass =
  "flex items-center gap-3.5 rounded-[1.125rem] border border-foreground/80 bg-white px-3.5 py-4 sm:gap-4 sm:rounded-[1.25rem] sm:px-4 sm:py-4 md:gap-5 md:px-5 md:py-[1.125rem]";

const bonusDocumentCards = [
  {
    id: "investovanie-poplatky",
    alt: "Investovanie a poplatky",
    imageSrc: bonusInvestovaniePoplatky,
  },
  {
    id: "akcie-reality",
    alt: "Akcie alebo reality?",
    imageSrc: bonusAkcieReality,
  },
  {
    id: "checklist-byt",
    alt: "Check LIST pred prvým bytom",
    imageSrc: bonusChecklist,
  },
] as const;

const KalkulackyBracketLabel = () => (
  <div className="relative w-10 shrink-0 self-stretch sm:w-11 md:w-14" aria-hidden>
    <svg
      className="absolute inset-0 h-full w-full text-foreground"
      viewBox="0 0 48 100"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 16 9 H 42"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 16 9 V 38"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 16 62 V 91"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 16 91 H 42"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>

    <span
      className="absolute left-[16%] top-1/2 z-10 -translate-y-1/2 font-serif font-normal text-[1rem] leading-none tracking-[0.02em] text-foreground [writing-mode:vertical-rl] rotate-180 sm:text-[1.0625rem] md:text-[1.125rem] lg:text-[1.1875rem]"
      style={{ backgroundColor: "#FFF9F5" }}
    >
      kalkulačky
    </span>
  </div>
);

const HeroHeroKalkulackySection = () => (
  <section
    id="bonusy-kalkulacky"
    className="hero-section-pad relative scroll-mt-24 overflow-hidden px-5 md:px-8 pt-[72px] pb-[72px] md:pt-[96px] md:pb-[96px]"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

    <div className="section-container relative z-10">
      <AnimatedSection className="flex w-full justify-center">
        <h2 className="headline-landing-section mx-auto max-w-4xl text-pretty text-center text-[2.125rem] leading-[1.12] text-foreground md:max-w-xl md:text-[3.375rem] lg:max-w-2xl">
          <span className="font-[500]">A k tomu dostaneš aj</span>{" "}<strong className="font-bold">praktické bonusy</strong> <span aria-hidden>🎁</span>
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.08}>
        <div className="mx-auto mt-12 flex w-full max-w-xl items-stretch gap-1.5 sm:gap-2 md:mt-14 md:w-max md:max-w-full md:gap-3 lg:mt-16">
          <KalkulackyBracketLabel />

          <ul className="flex min-w-0 flex-1 list-none flex-col gap-2.5 p-0 sm:gap-3 md:w-max md:flex-none md:gap-4">
            {calculators.map(({ id, title, description, Icon }) => (
              <li key={id} className="w-full">
                <div className={`${calculatorCardClass} w-full`}>
                  <Icon
                    className="h-9 w-9 shrink-0 stroke-[1.35] text-foreground sm:h-9 sm:w-9 md:h-10 md:w-10"
                    aria-hidden
                  />
                  <div className="min-w-0 text-left">
                    {title}
                    <p className="mt-1.5 font-sans text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-[0.875rem] md:text-[0.9375rem]">
                      {description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.12} className="w-full text-center">
        <p className="mx-auto mt-6 max-w-xl text-center font-sans text-[1.125rem] leading-snug text-foreground/90 md:mt-8 md:max-w-lg md:text-[1.0625rem] lg:max-w-xl lg:text-[1.125rem]">
          <span className="font-serif font-bold text-foreground">+ 3 stručné dokumenty,</span> kde hovorím o
          poplatkoch v investovaní, Porovnávam Akcie vs Nehnuteľnosti a spravil som Check List pred kúpou prvého
          investičného bytu
        </p>

        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-2 sm:mt-10 sm:gap-3 md:max-w-3xl md:gap-4">
          {bonusDocumentCards.map(({ id, alt, imageSrc }) => (
            <div
              key={id}
              className="overflow-hidden rounded-2xl shadow-[0_8px_24px_-16px_rgba(28,22,18,0.2)]"
            >
              <img
                src={imageSrc}
                alt={alt}
                className="block h-auto w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        <a href="#formular" className="btn-primary mt-8 inline-flex text-body sm:mt-10">
          Chcem tieto bonusy 🎁
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroKalkulackySection;
