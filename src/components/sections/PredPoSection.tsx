import AnimatedSection from "@/components/AnimatedSection";
import CtaResponseNote from "@/components/CtaResponseNote";
import { CheckCircle2, XCircle } from "lucide-react";

const beforeItems = [
  <>
    Zaspávate s otázkou, či vám to vyjde. Zarábate dobre, no vaše peniaze nemajú jasný smer. A vnútri{" "}
    <strong>tušíte, že každý mesiac bez plánu vás niečo stojí.</strong>
  </>,
  <>
    Keď prídu správy o kríze, inflácii alebo poklese trhu, <strong>stratíte logický odstup.</strong> Predať? Čakať?
    Dokúpiť? <strong>Rozhodujete sa pod tlakom emócií, nie podľa stratégie.</strong>
  </>,
  <>
    Na internete každý hovorí niečo iné. ETF, zlato, nehnuteľnosti, krypto. Aj keď už investujete, v hlave{" "}
    <strong>máte pochybnosť: robím to správne? A neviete, koho sa spýtať.</strong>
  </>,
];

const afterItems = [
  <>
    <strong>Viete presne, kde</strong> sú vaše peniaze, <strong>kam</strong> smerujú a <strong>čo sa stane ďalej.</strong>
  </>,
  <>
    Nerozhodujete sa sami pod tlakom. Keď trh klesne, <strong>máte partnera, ktorý vám povie ako ďalej.</strong>
  </>,
  <>
    Vaše ETF, nehnuteľnosti a <strong>aktíva spolupracujú na jednom cieli</strong>: doživotná renta, ktorú ste si
    zaslúžili.
  </>,
  <>
    Celý váš finančný majetok vidíte <strong>na jednom mieste</strong>.
  </>,
  <>
    Zložité finančné rozhodnutia delegujete na odborníka. <strong>Váš majetok rastie a vy spíte pokojne.</strong>
  </>,
];

const PredPoSection = () => (
  <section className="section-cream section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="mx-auto max-w-4xl text-center mb-10 md:mb-12">
          <h2 className="headline-serif">
            Vaše peniaze si zaslúžia <span className="text-primary font-bold">niekoho, kto je pri každom
            rozhodnutí pri vás.</span>
          </h2>
        </div>
      </AnimatedSection>

      <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        <AnimatedSection>
          <article className="h-full rounded-2xl border border-primary/12 bg-[#f7f4ef] p-6 md:p-7">
            <h3 className="font-serif h3 text-[#B64A4A] mb-5">
              PRED <span className="h5 text-foreground/70">(Chaos)</span>
            </h3>
            <div className="space-y-4">
              {beforeItems.map((item, index) => (
                <p key={index} className="flex items-start gap-2.5 font-sans text-body text-foreground/85">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#B64A4A]" />
                  <span>→ {item}</span>
                </p>
              ))}
            </div>
          </article>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <article className="h-full rounded-2xl border border-primary/12 bg-[#f7f4ef] p-6 md:p-7">
            <h3 className="font-serif h3 text-primary mb-5">
              PO <span className="h5 text-foreground/70">(Wealth Map)</span>
            </h3>
            <div className="space-y-4">
              {afterItems.map((item, index) => (
                <p key={index} className="flex items-start gap-2.5 font-sans text-body text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </article>
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <div className="mt-10 text-center">
          <a href="#formular" className="btn-primary text-body">
            Získať Wealth Map
          </a>
          <div>
            <CtaResponseNote />
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default PredPoSection;
