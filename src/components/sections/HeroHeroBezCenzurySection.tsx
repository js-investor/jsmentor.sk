import AnimatedSection from "@/components/AnimatedSection";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const problemHeader = "Čo rieši väčšina ľudí (a možno aj ty)";
const heroHeader = "V Hero Hero je to úplne iné";

const bold = (text: string) => (
  <strong className="font-bold text-inherit">{text}</strong>
);

const comparisonRows: { problem: ReactNode; hero: ReactNode }[] = [
  {
    problem: <>Chaotické financie a {bold("neustály stres okolo peňazí")}</>,
    hero: (
      <>
        {bold("Konečne máš jasno")} a presne vieš, čo robiť.
      </>
    ),
  },
  {
    problem: (
      <>
        {bold("Nevieš, komu a čomu veriť.")} Každý hovorí na sociálnych sieťach aj v médiách niečo iné.
      </>
    ),
    hero: (
      <>
        {bold("Prístup k obsahu, ktorý mi Instagram blokuje")} alebo ti nedovolí povedať priamo
      </>
    ),
  },
  {
    problem: <>Odkladáš dôležité veci {bold("„na neskôr“")}</>,
    hero: (
      <>
        {bold("Každý týždeň")} nový hodnotný obsah
      </>
    ),
  },
  {
    problem: (
      <>
        Platíš {bold("zbytočne vysoké poplatky")} a {bold("inflácia žerie tvoje úspory")} každý rok
      </>
    ),
    hero: (
      <>
        Reálne finančné situácie, {bold("rozhovory s bežnými ľuďmi")} (napr. páry, podnikatelia,...) a moje
        rady
      </>
    ),
  },
  {
    problem: (
      <>
        {bold("Problémy s peniazmi")} ovplyvňujú tvoje vzťahy, deti aj tvoj vnútorný pokoj
      </>
    ),
    hero: (
      <>
        Praktické {bold("tipy, ktoré môžeš hneď použiť")} (napr. pri tvorbe rezervy, investovaní,
        hypotéke)
      </>
    ),
  },
  {
    problem: (
      <>
        Každý rok si na rovnakom mieste, pretože {bold("nemáš žiadny systém ani plán")}
      </>
    ),
    hero: (
      <>
        {bold("Konkrétne rozbory slovenských produktov")}, fondov a platforiem
      </>
    ),
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: 0.06 * i },
  }),
};

const cellTextClass =
  "font-sans text-[0.9375rem] font-normal leading-snug md:text-base md:leading-relaxed";

const leftHeaderClass =
  "relative overflow-hidden bg-gradient-to-br from-[#fffbfb] via-[#fdf4f3] to-[#fcecea] px-4 py-4 md:px-5 md:py-5";
const rightHeaderClass =
  "relative overflow-hidden border-t border-[#A52821]/14 bg-gradient-to-br from-emerald-100/95 via-teal-50/90 to-[#ecfdf5] px-4 py-4 md:border-l md:border-t-0 md:px-5 md:py-5";

const leftRowClass = (index: number) =>
  index % 2 === 0
    ? "bg-[#fdf4f3] md:border-r md:border-[#A52821]/14"
    : "bg-[#f5e6e4] md:border-r md:border-[#A52821]/14";

const rightRowClass = (index: number) =>
  index % 2 === 0 ? "bg-emerald-50/90" : "bg-teal-50/75";

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
            Ideme naplno a bez cenzúry <span aria-hidden>🔓</span>
          </h2>
          <p className="sub-headline mt-5 text-foreground/85">
            Instagram odstraňuje účty a blokuje môj obsah. Na HeroHero ti{" "}
            <strong className="font-bold text-foreground">
              poviem skutočnú pravdu o peniazoch, ktorú ti tají tvoj bankár aj poradca
            </strong>
            , pretože by prišiel o províziu.
          </p>
        </header>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-4xl">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#A52821]/55 via-[#edd9d7]/50 to-emerald-400/65 p-[2px] shadow-[0_20px_56px_-22px_rgba(16,85,60,0.28),0_12px_36px_-16px_rgba(165,40,33,0.2)]">
          <div className="overflow-hidden rounded-[0.9rem] bg-white ring-1 ring-black/[0.05]">
            {/*
              Jeden grid: na md sú priame deti v poradí ľavá bunka, pravá bunka →
              stĺpec 1 = červený, stĺpec 2 = zelený. motion.div má display:contents,
              aby nezlomil zoradenie buniek.
            */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className={`${leftHeaderClass} border-b border-[#A52821]/14`}>
                <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-[#A52821]/15 blur-2xl" />
                <p className="font-serif text-xl leading-snug tracking-tight text-[#2a1411] md:text-2xl">
                  <strong className="font-bold">{problemHeader}</strong>
                </p>
              </div>
              <div className={`${rightHeaderClass} border-b border-[#A52821]/14`}>
                <div className="pointer-events-none absolute -left-6 bottom-0 h-20 w-20 rounded-full bg-emerald-400/20 blur-2xl" />
                <p className="font-serif text-xl leading-snug tracking-tight text-emerald-950 md:text-2xl">
                  <strong className="font-bold">{heroHeader}</strong>
                </p>
              </div>

              {comparisonRows.map((row, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className="contents"
                >
                  <div
                    className={`flex gap-2.5 border-b border-[#A52821]/14 px-4 py-3.5 md:gap-3 md:px-5 md:py-4 ${leftRowClass(index)} ${
                      index === comparisonRows.length - 1 ? "md:border-b-0" : ""
                    }`}
                  >
                    <span
                      className="mt-0.5 shrink-0 text-[0.9375rem] leading-none md:text-base"
                      aria-hidden
                    >
                      ❌
                    </span>
                    <p className={`${cellTextClass} text-[#3a1815]`}>{row.problem}</p>
                  </div>
                  <div
                    className={`flex gap-2.5 border-b border-t border-[#A52821]/14 px-4 py-3.5 md:gap-3 md:border-l md:border-t-0 md:px-5 md:py-4 ${rightRowClass(index)} ${
                      index === comparisonRows.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <span
                      className="mt-0.5 shrink-0 text-[0.9375rem] leading-none md:text-base"
                      aria-hidden
                    >
                      ✅
                    </span>
                    <p className={`${cellTextClass} text-emerald-950`}>{row.hero}</p>
                  </div>
                </motion.div>
              ))}
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
