import AnimatedSection from "@/components/AnimatedSection";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import { CENNIK_SECTION_ID, HEROHERO_JOIN_URL } from "@/lib/cennikCta";
import {
  BarChart3,
  Calculator,
  CalendarDays,
  Check,
  MessageCircle,
  Route,
  Shield,
  type LucideIcon,
} from "lucide-react";

const forest = "#023c2e";
const forestMid = "#065f4a";
const forestEnd = "#0a5a47";

const brandIconMaskStyle = {
  backgroundColor: "#0a4d3d",
  WebkitMaskImage: `url(${brandPattern})`,
  maskImage: `url(${brandPattern})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
} as const;

const CardIcon = ({ Icon }: { Icon: LucideIcon }) => (
  <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center md:h-14 md:w-14" aria-hidden>
    <span className="absolute inset-0" style={brandIconMaskStyle} />
    <Icon className="relative z-10 h-5 w-5 -translate-x-[3px] text-white md:h-6 md:w-6" strokeWidth={2} />
  </span>
);

const benefitCards: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: CalendarDays,
    title: "Nový odborný obsah každý týždeň",
    description: "Rozbory, čísla a témy, ktoré práve hýbu na finančnom trhu.",
  },
  {
    Icon: BarChart3,
    title: "Rozbory fondov, hypoték a bytov",
    description: "Aj ďalších finančných produktov — konkrétne poplatky, riziká a rozhodnutia.",
  },
  {
    Icon: Calculator,
    title: "Kalkulačky a aplikácie",
    description: "Rôzne aplikácie a kalkulačky — od investičných bytov až po výpočet daňového priznania.",
  },
  {
    Icon: Route,
    title: "Cesta k rezerve, portfóliu a rente",
    description: "Systém krok za krokom — od prvej rezervy po pasívny príjem.",
  },
  {
    Icon: Shield,
    title: "Slovenské produkty ľudskou rečou",
    description: "Čo majú bežní ľudia — a čo dáva skutočný zmysel.",
  },
  {
    Icon: MessageCircle,
    title: "Odpovede na otázky členov",
    description: "Pýtaš sa priamo mňa.",
  },
];

const priceChecks = [
  "Prvé 2 týždne úplne zadarmo",
  "Žiadna viazanosť — zrušíš jedným klikom",
  "Okamžitý prístup k celému archívu a nástrojom",
] as const;

const HeroHeroHodnotaSection = () => (
  <section
    id={CENNIK_SECTION_ID}
    className="relative scroll-mt-24 overflow-hidden px-5 pb-12 pt-[72px] md:px-8 md:pb-16 md:pt-[96px]"
    style={{ backgroundColor: "#FFF9F5" }}
    aria-labelledby="hodnota-heading"
    data-section="CTA1"
  >
    <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.18]" />

    <div className="section-container relative z-10">
      <AnimatedSection>
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.28em] text-primary">
            Členstvo v komunite
          </p>
          <h2
            id="hodnota-heading"
            className="headline-landing-section mt-4 text-balance leading-[1.1] text-foreground"
          >
            Čo všetko získaš v komunite?
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-muted-foreground md:text-[1.1875rem]">
            Praktický obsah, nástroje a odpovede, ktoré ti pomôžu robiť lepšie rozhodnutia s peniazmi.
          </p>
        </header>
      </AnimatedSection>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:gap-5 lg:grid-cols-3 lg:gap-6">
        {benefitCards.map(({ Icon, title, description }, index) => (
          <AnimatedSection key={title} delay={0.05 + index * 0.04}>
            <article
              className="group flex h-full flex-col rounded-2xl px-6 py-6 transition-transform duration-300 hover:-translate-y-1 md:px-7 md:py-7"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              <CardIcon Icon={Icon} />
              <h3 className="mt-5 [font-family:var(--font-serif)] text-[1.125rem] font-bold leading-snug text-white md:text-[1.25rem] lg:text-[1.3125rem]">
                {title}
              </h3>
              <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-white/65 md:text-[1rem]">
                {description}
              </p>
            </article>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.15}>
        <div
          className="relative mx-auto mt-8 max-w-6xl overflow-hidden rounded-[1.75rem] px-6 py-10 shadow-[0_32px_80px_-20px_rgba(2,60,46,0.42)] md:mt-10 md:px-10 md:py-12 lg:px-14 lg:py-14"
          style={{
            background: `linear-gradient(160deg, ${forest} 0%, ${forestMid} 52%, ${forestEnd} 100%)`,
          }}
        >
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-[55%] opacity-[0.07]"
            aria-hidden
            style={{
              WebkitMaskImage: `url(${brandPattern})`,
              maskImage: `url(${brandPattern})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "right -8% top -10%",
              maskPosition: "right -8% top -10%",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              backgroundColor: "#ffffff",
            }}
          />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div className="text-center lg:text-left">
              <p className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.26em] text-[#8FBFA4]">
                To všetko za
              </p>
              <p className="mt-4 [font-family:var(--font-serif)] text-[4rem] font-[900] leading-none text-white md:text-[5.5rem] lg:text-[6.5rem]">
                0,17&nbsp;€
                <span className="ml-2 align-[0.45em] text-[0.35em] font-bold uppercase tracking-[0.04em] text-white/90 md:ml-3">
                  denne
                </span>
              </p>
              <p className="mt-5 font-sans text-[1.0625rem] font-semibold leading-snug text-white/90 md:text-[1.1875rem]">
                Menej, ako necháš pri pokladni v drobných. 5&nbsp;€ mesačne.
              </p>
              <p className="mx-auto mt-4 max-w-md font-sans text-[1rem] leading-relaxed text-white/70 md:text-[1.0625rem] lg:mx-0">
                Jedno lepšie finančné rozhodnutie ti môže ušetriť stovky až tisíce eur.
              </p>
            </div>

            <div className="mx-auto w-full max-w-md lg:mx-0">
              <ul className="flex flex-col gap-4">
                {priceChecks.map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#4ade80]/40 bg-[#4ade80]/20">
                      <Check className="h-3.5 w-3.5 text-[#6ee7a0]" strokeWidth={2.8} />
                    </span>
                    <span className="font-sans text-[1.0625rem] leading-snug text-white/95 md:text-[1.125rem]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={HEROHERO_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 font-sans text-[1.0625rem] font-semibold text-[#023c2e] shadow-[0_4px_20px_rgba(0,0,0,0.22)] transition-all duration-200 hover:bg-white/92 hover:shadow-[0_10px_32px_rgba(0,0,0,0.28)] md:w-auto"
                data-umami-event="click_herohero"
                data-umami-event-section="CTA1"
              >
                Chcem vstúpiť do komunity 🚀
              </a>
              <p className="mt-4 font-sans text-[0.9375rem] text-white/60 md:text-[1rem]">
                Platba až po skončení skúšobného obdobia.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroHodnotaSection;
