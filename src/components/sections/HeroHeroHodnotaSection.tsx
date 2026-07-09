import AnimatedSection from "@/components/AnimatedSection";
import { CircleCheck } from "lucide-react";

const valueItems: { title: string; description: string }[] = [
  {
    title: "Pravidelný exkluzívny obsah",
    description: "4× mesačne nový obsah s tvrdou pravdou o financiách, ktorú inde nenájdeš.",
  },
  {
    title: "Analýzy reálnych prípadov",
    description: "Rozbory finančných situácií, na ktorých uvidíš presný postup v praxi.",
  },
  {
    title: "Interaktívne kalkulačky",
    description: "Nástroje na tvoje vlastné finančné rozhodovanie, ktoré ti ušetria čas aj peniaze.",
  },
  {
    title: "Archív know-how",
    description: "Okamžitý prístup ku všetkým doterajším rozborom a videám bez cenzúry.",
  },
  {
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
        <ul className="mx-auto flex w-fit max-w-3xl flex-col gap-7 md:gap-8">
          {valueItems.map(({ title, description }) => (
            <li key={title} className="flex items-start gap-3.5 md:gap-4">
              <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={2} />
              <div>
                <p className="[font-family:var(--font-serif)] text-[1.125rem] font-bold leading-snug text-foreground md:text-[1.3125rem] lg:text-[1.4375rem]">
                  {title}
                </p>
                <p className="mt-2 font-sans text-[1rem] leading-relaxed text-foreground/75 md:text-[1.0625rem] lg:text-[1.125rem]">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.12}>
        <div
          className="mx-auto mt-12 max-w-3xl rounded-[1.75rem] px-6 py-8 text-center md:mt-14 md:px-10 md:py-10"
          style={{ backgroundColor: "#1A1A1A" }}
        >
          <p className="font-sans text-[1.0625rem] leading-relaxed text-white/80 md:text-[1.1875rem]">
            Celková hodnota{" "}
            <strong className="[font-family:var(--font-serif)] text-[2.25rem] font-[900] leading-none text-white md:text-[2.75rem]">
              997 €
            </strong>
          </p>
          <p className="mt-5 font-sans text-[1.0625rem] leading-relaxed text-white/75 md:mt-6 md:text-[1.1875rem]">
            Ty to <strong className="font-bold text-white">získavaš zadarmo k členstvu</strong> Hero Hero
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroHodnotaSection;
