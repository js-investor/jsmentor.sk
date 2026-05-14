import AnimatedSection from "@/components/AnimatedSection";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import { Building2, Gem, Landmark, WalletCards } from "lucide-react";

const pillars = [
  {
    icon: <Landmark className="h-6 w-6 -translate-x-0.5 text-primary" strokeWidth={1.8} />,
    title: "Inteligentné ETF stratégie",
    body: (
      <>
        Nastavíme vám portfólio <strong>presne podľa vašej situácie a horizontu.</strong> Žiadny „jeden fond pre
        všetkých", žiadni predražení sprostredkovatelia. Získate <strong>jasnú stratégiu, ktorá váš majetok rozhýbe.</strong>
      </>
    ),
  },
  {
    icon: <Building2 className="h-6 w-6 -translate-x-0.5 text-primary" strokeWidth={1.8} />,
    title: "Investičné nehnuteľnosti",
    subtitle: "(ktoré dávajú zmysel pre vás)",
    body: (
      <>
        <strong>Nie každý potrebuje investičný byt.</strong> Ak ho kúpite, musí dávať matematický zmysel. ROI
        kalkulačka, stresové scenáre, model financovania.{" "}
        <strong>Žiadne pocity ale čísla, ktoré zapadnú do vášho majetku.</strong>
      </>
    ),
  },
  {
    icon: <Gem className="h-6 w-6 -translate-x-0.5 text-primary" strokeWidth={1.8} />,
    title: "Prémiové investície",
    body: (
      <>
        <strong>Bežný človek sa k nim jednoducho nedostane.</strong> Od 50 000 € majetku vám odomknem{" "}
        <strong>dvere k neverejným fondom s fixnými výnosmi</strong> 4–7 % ročne. Ako ďalší motor rastu popri vašom
        portfóliu.
      </>
    ),
  },
  {
    icon: <WalletCards className="h-6 w-6 -translate-x-0.5 text-primary" strokeWidth={1.8} />,
    title: "Renta a skutočná sloboda",
    body: (
      <>
        Toto je cieľ celého plánu. <strong>V správny moment vaše aktíva prestavíme do rentového módu</strong> a
        vytvoríme systém výberov. Ten vám zabezpečí stabilný pasívny príjem{" "}
        <strong>bez toho, aby ste sa museli o čokoľvek starať.</strong>
      </>
    ),
  },
];

const WealthMapPilieresSection = () => (
  <section id="riesenie" className="bg-footer-bg section-padding relative overflow-hidden scroll-mt-24">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="headline-serif text-cream">
            Dajte svojim peniazom <span className="text-[#d4dfdb] font-bold">jasnú stratégiu.</span>
          </h2>
          <p className="sub-headline-cream">
            Wealth Map stojí na štyroch pilieroch. Každý rieši inú časť vášho finančného života.
          </p>
        </div>
      </AnimatedSection>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar, index) => (
          <AnimatedSection key={pillar.title} delay={index * 0.06}>
            <article className="h-full rounded-2xl border border-white/20 bg-white/95 p-6 md:p-7">
              <div
                className="mb-4 inline-flex h-11 w-11 items-center justify-center"
                style={{
                  backgroundColor: "#d4dfdb",
                  WebkitMaskImage: `url(${brandPattern})`,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskImage: `url(${brandPattern})`,
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  maskSize: "contain",
                }}
              >
                {pillar.icon}
              </div>
              <h3 className="font-serif h4 text-foreground leading-tight">{pillar.title}</h3>
              {pillar.subtitle ? (
                <p className="mt-1 font-sans text-base text-muted-foreground">{pillar.subtitle}</p>
              ) : null}
              <p className="mt-4 font-sans text-base text-muted-foreground leading-relaxed">{pillar.body}</p>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WealthMapPilieresSection;
