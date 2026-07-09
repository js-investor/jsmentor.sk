import AnimatedSection from "@/components/AnimatedSection";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import {
  Archive,
  Calculator,
  MessageCircle,
  PlayCircle,
  Users,
  type LucideIcon,
} from "lucide-react";

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

const ValueItemIcon = ({ Icon }: { Icon: LucideIcon }) => (
  <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center sm:h-[3.25rem] sm:w-[3.25rem] md:h-14 md:w-14" aria-hidden>
    <span className="absolute inset-0" style={brandIconMaskStyle} />
    <Icon className="relative z-10 h-5 w-5 -translate-x-[3px] text-white sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={2} />
  </span>
);
const valueItems: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: PlayCircle,
    title: "Pravidelný exkluzívny obsah",
    description: "4× mesačne nový obsah s tvrdou pravdou o financiách, ktorú inde nenájdeš.",
  },
  {
    Icon: Users,
    title: "Analýzy reálnych prípadov",
    description: "Rozbory finančných situácií, na ktorých uvidíš presný postup v praxi.",
  },
  {
    Icon: Calculator,
    title: "Interaktívne kalkulačky",
    description: "Nástroje na tvoje vlastné finančné rozhodovanie, ktoré ti ušetria čas aj peniaze.",
  },
  {
    Icon: Archive,
    title: "Archív know-how",
    description: "Okamžitý prístup ku všetkým doterajším rozborom a videám bez cenzúry.",
  },
  {
    Icon: MessageCircle,
    title: "Extra bonus: Priama podpora",
    description: "Možnosť pýtať sa na veci, ktoré ťa v investovaní trápia.",
  },
];

const HeroHeroHodnotaSection = () => (
  <section
    id="hodnota"
    className="relative scroll-mt-24 overflow-hidden px-5 pb-12 pt-[72px] md:px-8 md:pb-16 md:pt-[96px]"
    style={{ backgroundColor: "#FFF9F5" }}
    aria-labelledby="hodnota-heading"
  >
    <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.18]" />

    <div className="section-container relative z-10">
      <AnimatedSection>
        <header className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
          <h2
            id="hodnota-heading"
            className="headline-landing-section text-balance leading-[1.1] text-foreground"
          >
            <span className="text-primary">Toto všetko získaš</span> po pridaní sa do komunity
          </h2>
        </header>
      </AnimatedSection>

      <AnimatedSection delay={0.07}>
        <ul className="mx-auto flex w-fit max-w-4xl flex-col gap-7 md:gap-8">
          {valueItems.map(({ Icon, title, description }) => (
            <li key={title} className="flex items-start gap-4 md:gap-5">
              <ValueItemIcon Icon={Icon} />
              <div>
                <p className="[font-family:var(--font-serif)] text-[1.25rem] font-bold leading-snug text-foreground md:text-[1.4375rem] lg:text-[1.5625rem]">
                  {title}
                </p>
                <p className="mt-2 font-sans text-[1.0625rem] leading-relaxed text-foreground/75 md:text-[1.1875rem] lg:text-[1.25rem]">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.12}>
        <div
          className="mx-auto mt-12 max-w-3xl rounded-[1.75rem] px-6 py-9 text-center md:mt-14 md:px-12 md:py-11"
          style={{ backgroundColor: "#1A1A1A" }}
        >
          <p className="flex flex-wrap items-center justify-center gap-x-3 text-center">
            <span className="font-sans text-[1.4375rem] leading-none text-white/80 md:text-[1.5625rem] lg:text-[1.625rem]">
              Celková hodnota
            </span>
            <strong className="[font-family:var(--font-serif)] text-[3.125rem] font-[900] leading-none text-white md:text-[3.75rem] lg:text-[4rem]">
              997 €
            </strong>
          </p>
          <p className="mt-5 font-sans text-[1.25rem] leading-relaxed text-white/75 md:mt-6 md:text-[1.4375rem] lg:text-[1.5rem]">
            Ty to <strong className="font-bold text-white">získavaš zadarmo k členstvu</strong> Hero Hero
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroHodnotaSection;
