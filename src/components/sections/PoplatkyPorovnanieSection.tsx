import AnimatedSection from "@/components/AnimatedSection";
import { CheckCircle2, XCircle } from "lucide-react";

const oldWay = [
  "Tabuľková stratégia",
  "Žiadny plán",
  "Zbytočné dane z výnosov",
  "Výnosy pod trhovým priemerom",
  "Predaj namiesto poradenstva",
];

const newWay = [
  "Individuálna stratégia",
  "Investičné nehnuteľnosti",
  "Neverejné fondy (FKI)",
  "Individualita = lepší výnos",
  "Rentové a dividendové účty",
];

const PoplatkyPorovnanieSection = () => (
  <section className="section-cream section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="mx-auto max-w-5xl text-center mb-10 md:mb-12">
          <h2 className="headline-serif">
            <span className="text-primary font-bold">Váš majetok dlhodobo rastie,</span> poplatky klesajú
          </h2>
        </div>
      </AnimatedSection>

      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedSection>
          <article className="h-full rounded-2xl border border-white/10 bg-[#11131b] text-white p-6 md:p-7">
            <div className="inline-flex rounded-full bg-[#e63737] px-3 py-1 text-caption font-semibold tracking-wide">
              Starý spôsob
            </div>
            <h3 className="mt-4 font-serif h3 leading-tight">Banka & bežný poradca</h3>
            <p className="mt-4 [font-family:var(--font-serif)] h2 leading-none">1 - 2 %</p>
            <p className="mt-2 font-sans text-white/85">ročný poplatok za správu</p>
            <div className="mt-6 h-px bg-white/20" />

            <div className="mt-5 space-y-3.5">
              {oldWay.map((item) => (
                <p key={item} className="flex items-start gap-2.5 font-sans text-base text-white/95">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#ff3a3a]" />
                  {item}
                </p>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-[#e63737]/50 bg-[#381116] px-4 py-3 font-sans h6 text-white">
              Za 20 rokov investovania prídete o 30 až 40 % majetku kvôli poplatkom.
            </div>
          </article>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <article className="h-full rounded-2xl border border-white/15 bg-[#2f7c63] text-white p-6 md:p-7">
            <div className="inline-flex rounded-full bg-white px-3 py-1 text-caption font-semibold tracking-wide text-[#1f4538]">
              Nový spôsob
            </div>
            <h3 className="mt-4 font-serif h3 leading-tight">Komplexná správa majetku</h3>
            <p className="mt-4 [font-family:var(--font-serif)] h2 leading-none">0,35 - 0,49 %</p>
            <p className="mt-2 font-sans text-white/90">ročný poplatok za správu</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/45 bg-white/10 px-3 py-1 text-caption font-semibold">
                0,49 % do 100 000 € a 0,35 % nad 100 000 €
              </span>
              <span className="rounded-full border border-white/45 bg-white/10 px-3 py-1 text-caption font-semibold">
                1% poplatok z vkladov
              </span>
            </div>

            <div className="mt-6 h-px bg-white/25" />
            <div className="mt-5 space-y-3.5">
              {newWay.map((item) => (
                <p key={item} className="flex items-start gap-2.5 font-sans text-base text-white">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  {item}
                </p>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/35 bg-white/10 px-4 py-3 font-sans h6 text-white">
              Úspora na poplatkoch až 100 000 €.
            </div>
          </article>
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <p className="mx-auto mt-10 max-w-4xl text-center font-sans text-lead text-foreground/90">
          Začíname na <strong>férovej sadzbe 0,49 % ročne</strong> za správu portfólia.
          <br />
          Nad 100 000 € platíte už len exkluzívnych 0,35 % p.a.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default PoplatkyPorovnanieSection;
