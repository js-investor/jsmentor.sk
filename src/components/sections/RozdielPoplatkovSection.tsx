import AnimatedSection from "@/components/AnimatedSection";
import CtaResponseNote from "@/components/CtaResponseNote";
import { CalendarDays, PiggyBank, TrendingUp } from "lucide-react";

const RozdielPoplatkovSection = () => (
  <section className="section-white section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="mx-auto mb-8 max-w-4xl text-center">
          <h2 className="headline-serif">
            Čo znamená <span className="text-primary font-bold">rozdiel v poplatkoch za 30 rokov?</span>
          </h2>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.06}>
        <div className="mx-auto max-w-4xl rounded-2xl border border-primary/10 bg-[#f4efea] p-4 md:p-6 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.22)]">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-primary/12 bg-white px-4 py-3 text-left">
              <div className="flex items-center gap-2 text-primary">
                <PiggyBank className="h-4 w-4" />
                <span className="font-sans text-caption text-muted-foreground">Mesačná investícia</span>
              </div>
              <p className="mt-1 font-sans h5 text-foreground">300 €</p>
            </div>

            <div className="rounded-xl border border-primary/12 bg-white px-4 py-3 text-left">
              <div className="flex items-center gap-2 text-primary">
                <CalendarDays className="h-4 w-4" />
                <span className="font-sans text-caption text-muted-foreground">Investičný horizont</span>
              </div>
              <p className="mt-1 font-sans h5 text-foreground">30 rokov</p>
            </div>

            <div className="rounded-xl border border-primary/12 bg-white px-4 py-3 text-left">
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="h-4 w-4" />
                <span className="font-sans text-caption text-muted-foreground">Priemerný ročný výnos</span>
              </div>
              <p className="mt-1 font-sans h5 text-foreground">10 %</p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <p className="mb-2 font-sans text-body text-foreground">
                <strong className="h6">Banka a bežný poradca</strong>
                <br />
                <span className="text-body text-muted-foreground">ročný poplatok: ~ 1,5 %</span>
              </p>
              <div className="h-12 rounded-[6px] border border-black/10 bg-white p-1">
                <div className="flex h-full w-[79.5%] items-center justify-end rounded-[3px] bg-[#7f7265] px-5">
                  <span className="[font-family:var(--font-serif)] h5 text-white">453 000 €</span>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 font-sans text-body text-foreground">
                <strong className="h6">JS Investor (JS Wealth Map)</strong>
                <br />
                <span className="text-body text-muted-foreground">ročný poplatok: 0,4 % + 0,3 %</span>
              </p>
              <div className="h-12 rounded-[6px] border border-black/10 bg-white p-1">
                <div className="flex h-full w-full items-center justify-end rounded-[3px] bg-primary px-5">
                  <span className="[font-family:var(--font-serif)] h5 text-white">570 000 €</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary/85 px-5 py-4 text-white shadow-[0_8px_22px_-12px_rgba(32,122,90,0.38)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-sans text-body leading-tight">
                  Rozdiel vo váš prospech
                  <br />
                  <span className="text-body text-white/90">Len vďaka nižším poplatkom</span>
                </p>
                <p className="[font-family:var(--font-serif)] h3 leading-none">+ 117 000 €</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.12}>
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <p className="font-sans text-body text-foreground/90">
            Neplaťte zbytočné poplatky a <span className="font-semibold text-primary">chráňte svoj čistý výnos.</span>
          </p>
          <a href="#formular" className="btn-primary mt-5 inline-flex">
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

export default RozdielPoplatkovSection;
