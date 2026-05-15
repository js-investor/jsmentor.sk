import AnimatedSection from "@/components/AnimatedSection";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const comparisons = [
  {
    oldSide: "Chaos v peniazoch a neustály stres",
    newSide: "Jasnosť a istota vo financiách",
  },
  {
    oldSide: "Nevieš, čomu veriť na Instagrame a YouTube",
    newSide: "Konkrétne rady na slovenské produkty a situácie",
  },
  {
    oldSide: "Odkladáš investovanie „na neskôr“",
    newSide: "Reálne prípady ľudí + moje priame odporúčania",
  },
  {
    oldSide: "Platíš zbytočné poplatky a strácaš peniaze na inflácii",
    newSide: "Obsah, ktorý ti Instagram nikdy nedovolí ukázať",
  },
  {
    oldSide: "Nemáš jasný plán. Každý rok si na rovnakom mieste",
    newSide: "Každý týždeň nové hodnotné video + novinky",
  },
] as const;

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: 0.06 * i },
  }),
};

const HeroHeroBezCenzurySection = () => (
  <section
    id="bez-cenzury"
    className="section-padding relative overflow-hidden scroll-mt-24"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="absolute inset-0 bg-dot-grid opacity-50" />
    <div className="pointer-events-none absolute top-20 right-[20%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
    <div className="pointer-events-none absolute bottom-0 left-[10%] h-[300px] w-[300px] rounded-full bg-forest-glow/5 blur-[80px]" />

    <div className="section-container relative z-10">
      <AnimatedSection>
        <header className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <h2 className="headline-serif leading-[1.15]">
            Ideme totálne bez cenzúry <span aria-hidden>🔓</span>
          </h2>
          <p className="sub-headline mt-5 text-foreground/85">
            Instagram odstraňuje účty a blokuje môj obsah. Na HeroHero ti{" "}
            <strong className="font-bold text-foreground">poviem skutočnú pravdu o peniazoch, ktorú ti tají tvoj bankár aj poradca</strong>,
            pretože by prišiel o províziu.
          </p>
        </header>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-4xl">
        {/* rám: tvoja červená #A52821 ↔ zelená strana */}
        <div
          className="relative rounded-2xl bg-gradient-to-br from-[#A52821]/55 via-[#edd9d7]/50 to-emerald-400/65 p-[2px] shadow-[0_20px_56px_-22px_rgba(16,85,60,0.28),0_12px_36px_-16px_rgba(165,40,33,0.2)]"
        >
          <div className="overflow-hidden rounded-[0.9rem] bg-white ring-1 ring-black/[0.05]">
            {/* Mobile: najprv celý „starý“ stĺpec, potom celý „nový“ — bez striedania riadkov */}
            <div className="md:hidden">
              <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#fffbfb] via-[#fdf4f3] to-[#fcecea] px-4 py-4">
                <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-[#A52821]/15 blur-2xl" />
                <p className="font-serif text-lg font-extrabold tracking-tight text-[#2a1411]">
                  Stará realita{" "}
                  <span className="font-sans text-xs font-semibold normal-case tracking-normal text-[#A52821]">
                    (väčšina ľudí)
                  </span>
                </p>
              </div>
              <div className="divide-y divide-[#A52821]/14 bg-[#A52821]/[0.04]">
                {comparisons.map((row, index) => {
                  const stripe = index % 2 === 0 ? "bg-[#A52821]/[0.055]" : "bg-[#A52821]/[0.09]";
                  return (
                    <motion.div
                      key={`mobile-old-${row.oldSide}`}
                      custom={index}
                      variants={rowVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-40px" }}
                      className={`flex w-full gap-2.5 px-4 py-3 ${stripe}`}
                    >
                      <span className="mt-0.5 shrink-0 text-base leading-none" aria-hidden>
                        ❌
                      </span>
                      <p className="font-sans text-sm font-medium leading-snug text-[#3a1815]">{row.oldSide}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="relative border-t-2 border-[#A52821]/22 bg-gradient-to-r from-[#A52821]/[0.06] via-transparent to-emerald-500/10">
                <div className="relative w-full overflow-hidden bg-gradient-to-br from-emerald-100/95 via-teal-50/90 to-[#ecfdf5] px-4 py-4">
                  <div className="pointer-events-none absolute -left-6 bottom-0 h-20 w-20 rounded-full bg-emerald-400/20 blur-2xl" />
                  <p className="font-serif text-lg font-extrabold tracking-tight text-emerald-950">
                    JS Mentor na Hero Hero
                  </p>
                </div>
                <div className="divide-y divide-emerald-900/10 bg-emerald-50/35">
                  {comparisons.map((row, index) => {
                    const stripe = index % 2 === 0 ? "bg-emerald-50/65" : "bg-teal-50/50";
                    return (
                      <motion.div
                        key={`mobile-new-${row.newSide}`}
                        custom={index + comparisons.length}
                        variants={rowVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-40px" }}
                        className={`flex w-full gap-2.5 px-4 py-3 ${stripe}`}
                      >
                        <span className="mt-0.5 shrink-0 text-base leading-none" aria-hidden>
                          ✅
                        </span>
                        <p className="font-sans text-sm font-semibold leading-snug text-emerald-950">{row.newSide}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop: klasické porovnanie vedľa seba */}
            <div className="hidden md:block">
              <div className="flex w-full flex-col md:grid md:grid-cols-2 md:divide-x md:divide-[#A52821]/18">
                <div className="relative w-full overflow-hidden border-b border-[#A52821]/18 bg-gradient-to-br from-[#fffbfb] via-[#fdf4f3] to-[#fcecea] px-5 py-4 md:border-b-0">
                  <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-[#A52821]/15 blur-2xl" />
                  <p className="font-serif text-xl font-extrabold tracking-tight text-[#2a1411]">
                    Stará realita{" "}
                    <span className="font-sans text-sm font-semibold normal-case tracking-normal text-[#A52821]">
                      (väčšina ľudí)
                    </span>
                  </p>
                </div>
                <div className="relative w-full overflow-hidden bg-gradient-to-br from-emerald-100/95 via-teal-50/90 to-[#ecfdf5] px-5 py-4">
                  <div className="pointer-events-none absolute -left-6 bottom-0 h-20 w-20 rounded-full bg-emerald-400/20 blur-2xl" />
                  <p className="font-serif text-xl font-extrabold tracking-tight text-emerald-950">
                    JS Mentor na Hero Hero
                  </p>
                </div>
              </div>

              <div className="divide-y divide-[#A52821]/14 bg-gradient-to-b from-[#A52821]/[0.035] via-white to-emerald-50/28">
                {comparisons.map((row, index) => {
                  const stripeLeft = index % 2 === 0 ? "bg-[#A52821]/[0.055]" : "bg-[#A52821]/[0.09]";
                  const stripeRight = index % 2 === 0 ? "bg-emerald-50/65" : "bg-teal-50/50";
                  return (
                    <motion.div
                      key={row.oldSide}
                      custom={index}
                      variants={rowVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-40px" }}
                      className="grid w-full grid-cols-2 divide-x divide-[#A52821]/16"
                    >
                      <div className={`flex w-full gap-3 px-5 py-3.5 ${stripeLeft}`}>
                        <span className="mt-0.5 shrink-0 text-[0.95rem] leading-none" aria-hidden>
                          ❌
                        </span>
                        <p className="font-sans text-[0.9375rem] font-medium leading-relaxed text-[#3a1815]">
                          {row.oldSide}
                        </p>
                      </div>
                      <div className={`flex w-full gap-3 px-5 py-3.5 ${stripeRight}`}>
                        <span className="mt-0.5 shrink-0 text-[0.95rem] leading-none" aria-hidden>
                          ✅
                        </span>
                        <p className="font-sans text-[0.9375rem] font-semibold leading-relaxed text-emerald-950">
                          {row.newSide}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-[1] mx-auto mt-8 w-full max-w-4xl px-2 text-center md:mt-10">
          <p className="mx-auto max-w-2xl text-balance font-sans text-[0.98rem] leading-relaxed text-foreground md:max-w-none md:text-[1.0625rem] md:leading-snug">
            <ShieldCheck
              className="mr-1.5 inline-block h-[1.15em] w-[1.15em] shrink-0 align-[-0.18em] text-primary md:mr-2"
              strokeWidth={2.2}
              aria-hidden
            />
            Za{" "}
            <span className="relative mx-0.5 inline-flex translate-y-[-0.05em] align-middle">
              <span className="rounded-full border border-[#A52821]/35 bg-[#A52821]/[0.09] px-3 py-1 font-extrabold tabular-nums text-[#A52821] shadow-sm shadow-[#A52821]/10 md:px-3.5 md:py-1">
                7 € mesačne
              </span>
            </span>{" "}
            máš{" "}
            <strong className="font-bold text-foreground">vlastného finančného parťáka</strong>, ktorý ti{" "}
            <strong className="bg-gradient-to-r from-primary to-emerald-700 bg-clip-text font-bold text-transparent">
              kryje chrbát
            </strong>
            .
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroBezCenzurySection;
