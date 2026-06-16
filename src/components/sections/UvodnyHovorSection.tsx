import AnimatedSection from "@/components/AnimatedSection";

import { scrollToFormular } from "@/lib/scrollToFormular";

const scrollToBooking = () => {
  scrollToFormular();
};

const steps = [
  {
    num: "01",
    title: "Pýtam sa, ty hovoríš",
    body: "Prvých 15 minút sa pýtam ja. Aká je tvoja aktuálna situácia, čo už máš naakumulované, kam smeruješ. Bez hodnotenia, bez tlaku.",
  },
  {
    num: "02",
    title: "Otvorene odpovedám",
    body: "Druhých 15 minút hovorím ja. Poviem ti čo by som robil na tvojom mieste, kde vidím priestor, a či ti viem reálne pomôcť. Aj keď odpoveď je nie.",
  },
  {
    num: "03",
    title: "Žiadny záväzok",
    body: "Po hovore nemusíš nič podpisovať. Ak si to chceš premyslieť, premyslíš si. Ak chceme pokračovať, dohodneme ďalší krok. Šetríme tvoj aj môj čas.",
  },
];

type UvodnyHovorSectionProps = {
  ctaLabel?: string;
};

const UvodnyHovorSection = ({ ctaLabel = "Získať Wealth Map" }: UvodnyHovorSectionProps) => (
  <section id="prvy-krok" className="section-padding relative overflow-hidden scroll-mt-24 bg-[#111111]">
    <div className="absolute inset-0 bg-dot-grid opacity-10" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="text-center max-w-5xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow !text-white/50">Prvý krok</p>
          <h2 className="headline-serif !text-white">
            Ale <span className="text-white font-bold">najprv potrebujeme zistiť,</span>{" "}
            či ti vôbec viem pomôcť.
          </h2>
          <p className="sub-headline !text-white/70">
            Predtým než ti niečo sľúbim, potrebujem rozumieť tvojej situácii.
            Preto <strong className="text-white">všetko začína jedným bezplatným úvodným hovorom,</strong> bez nátlaku,
            bez záväzku, bez predaja.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-12 md:mb-16 items-stretch">
        {steps.map((s, i) => (
          <AnimatedSection key={s.num} delay={i * 0.1} className="h-full">
            <div className="h-full text-center md:text-left rounded-2xl border border-white/10 bg-black p-6 md:p-8 flex flex-col">
              <p className="[font-family:var(--font-serif)] h1 mb-4 bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
                {s.num}
              </p>
              <p className="[font-family:var(--font-serif)] h5 text-white mb-3">
                {s.title}
              </p>
              <p className="font-sans text-body text-white/60">
                {s.num === "01" && (
                  <>
                    Prvých 15 minút sa pýtam ja. <strong className="text-white/90">Aká je tvoja aktuálna situácia,</strong>{" "}
                    čo už máš naakumulované, kam smeruješ. Bez hodnotenia, bez tlaku.
                  </>
                )}
                {s.num === "02" && (
                  <>
                    Druhých 15 minút hovorím ja. Poviem ti čo by som robil na tvojom
                    mieste, <strong className="text-white/90">kde vidím priestor, a či ti viem reálne pomôcť.</strong>{" "}
                    Aj keď odpoveď je nie.
                  </>
                )}
                {s.num === "03" && (
                  <>
                    <strong className="text-white/90">Po hovore nemusíš nič podpisovať</strong>. Ak si to chceš
                    premyslieť, premyslíš si. Ak chceme pokračovať, dohodneme ďalší
                    krok. Šetríme tvoj aj môj čas.
                  </>
                )}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection>
        <div className="text-center">
          <button onClick={scrollToBooking} className="btn-primary text-body mb-4">
            {ctaLabel}
          </button>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default UvodnyHovorSection;
