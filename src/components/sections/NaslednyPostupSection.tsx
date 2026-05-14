import AnimatedSection from "@/components/AnimatedSection";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import { Check } from "lucide-react";

const steps = [
  {
    title: "Bezplatný úvodný hovor",
    subtitle: "(30 - 60 min, online)",
    points: [
      "Zhodnotíme vašu aktuálnu finančnú situáciu",
      "Ujasníme si vaše ciele",
      "Overíme, či je Wealth Map pre vás vhodná",
      "Žiadny predajný nátlak",
      "Šetríme váš aj môj čas",
    ],
  },
  {
    title: "Získate Wealth Map",
    subtitle: "(do 7–14 dní)",
    points: [
      "Kde sa nachádzate (váš majetok dnes)",
      "Kam chcete ísť",
      "Ako sa tam dostanete (presné kroky)",
    ],
    intro: "Jeden prehľadný dokument, kde vidíte:",
  },
  {
    title: "Uvedenie mapy do praxe",
    subtitle: "(Dlhodobá správa)",
    points: [
      "Stratégiu preklopíme do reality",
      "Otvoríme účty a nastavíme ETF portfólio",
      "Naplánujeme investičnú nehnuteľnosť, ak dáva zmysel",
      "Dlhodobo spolupracujeme a váš majetok prispôsobujem trhu a vašej situácii",
    ],
  },
];

const NaslednyPostupSection = () => (
  <section className="section-cream section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="mx-auto max-w-4xl text-center mb-10 md:mb-12">
          <h2 className="headline-serif">
            Čo bude nasledovať, keď <span className="text-primary font-bold">začnete teraz:</span>
          </h2>
        </div>
      </AnimatedSection>

      <div className="mx-auto w-fit max-w-full space-y-4 md:space-y-5">
        {steps.map((step, index) => (
          <AnimatedSection key={step.title} delay={index * 0.06}>
            <article className="w-full max-w-[980px] rounded-2xl border border-primary/12 bg-[#f7f4ef] px-5 py-6 md:px-7 md:py-7 shadow-[0_8px_22px_-16px_rgba(0,0,0,0.2)]">
              <div className="flex items-start gap-4 md:gap-5">
                <span
                  className="inline-flex h-11 w-11 shrink-0 -translate-x-1 items-center justify-center text-white [font-family:var(--font-serif)] h5 bg-center bg-contain bg-no-repeat"
                  style={{ backgroundImage: `url(${brandPattern})` }}
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-serif h4 text-foreground">{step.title}</h3>
                  <p className="mt-1 font-sans text-lead text-muted-foreground">{step.subtitle}</p>

                  {step.intro ? <p className="mt-4 font-sans text-body text-muted-foreground">{step.intro}</p> : null}

                  <div className="mt-4 space-y-2.5">
                    {step.points.map((point) => (
                      <p
                        key={point}
                        className="flex items-start gap-2.5 font-sans text-body text-foreground/90 leading-relaxed"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>

    </div>
  </section>
);

export default NaslednyPostupSection;
